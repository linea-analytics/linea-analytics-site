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
function insertLatest() {
  const contactUs = document.getElementById('contactUs');
  if (!contactUs) return console.warn('Element with id="contactUs" not found');

  const featuredContainer = document.createElement('section');
  featuredContainer.id = 'featured-articles';
  featuredContainer.className = 'my-5 container';

  const featuredArticles = [
    {
      title: 'First step to measuring the long-term impact of Marketing: The Memory Effect',
      thumbnail: '/articles/adstocks/thumbnail.jpg',
      url: '/articles/adstocks/article.html'
    },
    {
      title: 'If we keep scaling media spend, will my CAC always increase?',
      thumbnail: '/articles/cac-increase/thumbnail.jpg',
      url: '/articles/cac-increase/article.html'
    },
    {
      title: 'Demystifying building an MMM model',
      thumbnail: '/articles/demistify-mmm/thumbnail.jpg',
      url: '/articles/demistify-mmm/article.html'
    },
    {
      title: 'Measuring the long-term impact of media',
      thumbnail: '/articles/measuring-long-term/thumbnail.jpg',
      url: '/articles/measuring-long-term/article.html'
    },
    {
      title: 'Choosing The Best Marketing Measurement Tools',
      thumbnail: '/articles/choosing-right-tool/thumbnail.jpg',
      url: '/articles/choosing-right-tool/article.html'
    },
    {
      title: 'Optimising future media budget',
      thumbnail: '/articles/optimising-media/thumbnail.jpg',
      url: '/articles/optimising-media/article.html'
    }
  ];

  featuredContainer.innerHTML = `
    <h4 class="mb-4 text-center fw-semibold">Most Popular Articles</h4>
    <div class="row g-4">
      ${featuredArticles.map(a => `
        <div class="col-12 col-sm-6 col-md-4">
          <div class="card h-100 border-0 shadow-sm">
            <img src="${a.thumbnail}" 
                 alt="${a.title}" 
                 class="card-img-top" 
                 style="height:180px;object-fit:cover;">
            <div class="card-body d-flex flex-column">
              <h6 class="card-title fw-semibold mb-2">
                <a href="${a.url}" class="stretched-link text-decoration-none text-dark">
                  ${a.title}
                </a>
              </h6>
              <p class="text-muted small mt-auto mb-0">Read more →</p>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  contactUs.parentNode.insertBefore(featuredContainer, contactUs);
}



window.addEventListener('DOMContentLoaded', () => {
  loadWidgets();
  insertLatest();
});

