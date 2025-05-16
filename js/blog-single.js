function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve(); // already loaded
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}


async function loadArticle() {
  const params = new URLSearchParams(window.location.search);
  const folder = params.get('folder');

  if (!folder) return;

  try {
    const response = await fetch(`articles/${folder}/article.md`);
    const markdown = await response.text();

    // Parse markdown
    const articleHtml = marked.parse(markdown, {
      baseUrl: `articles/${folder}/`
    });

    // Create temp container to manipulate HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = articleHtml;
    // Fix image paths relative to the Markdown file
    tempDiv.querySelectorAll('img').forEach((img) => {
      const src = img.getAttribute('src');
      if (src && !src.startsWith('http') && !src.startsWith('/')) {
        img.src = `articles/${folder}/${src}`;
      }
    });

    // Find all widget divs
    const widgetDivs = tempDiv.querySelectorAll('div[id$="-widget"]');
    await Promise.all([...widgetDivs].map(async (div) => {
      const widgetId = div.id;
      try {
        const widgetResponse = await fetch(`widgets/${widgetId}.html`);
        const widgetHtml = await widgetResponse.text();

        const widgetContainer = document.createElement('div');
        widgetContainer.innerHTML = widgetHtml;

        // Move child nodes and execute scripts
        while (widgetContainer.firstChild) {
          const node = widgetContainer.firstChild;
          if (node.tagName === 'SCRIPT') {
            const newScript = document.createElement('script');
            if (node.src) {
              await loadScriptOnce(node.src);
            } else {
              newScript.textContent = node.textContent;
              document.body.appendChild(newScript); // Execute inline script
            }
            widgetContainer.removeChild(node);
          } else {
            div.appendChild(node);
            div.classList.add('blog-widget');
          }
        }

      } catch (err) {
        console.warn(`Could not load widget: ${widgetId}`, err);
        div.innerHTML = `<p style="color: red;">[Missing widget: ${widgetId}]</p>`;
      }
    }));

    document.getElementById('article-content').innerHTML = tempDiv.innerHTML;

  } catch (error) {
    console.error('Error loading article:', error);
    document.getElementById('article-content').innerHTML =
      '<p>Article could not be loaded.</p>';
  }
}

loadArticle();