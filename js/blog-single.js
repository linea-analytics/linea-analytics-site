// blog-single.js
function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve(); // Already loaded
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function loadWidgets() {
  const widgetDivs = document.querySelectorAll('div[id$="-widget"]');

  await Promise.all([...widgetDivs].map(async (div) => {
    const widgetId = div.id;
    try {
      const response = await fetch(`/widgets/${widgetId}.html`);
      const widgetHtml = await response.text();

      const widgetContainer = document.createElement('div');
      widgetContainer.innerHTML = widgetHtml;

      while (widgetContainer.firstChild) {
        const node = widgetContainer.firstChild;
        if (node.tagName === 'SCRIPT') {
          const newScript = document.createElement('script');
          if (node.src) {
            await loadScriptOnce(node.src);
          } else {
            newScript.textContent = node.textContent;
            document.body.appendChild(newScript); // Run inline script
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
}

window.addEventListener('DOMContentLoaded', loadWidgets);

