async function populateBlogPosts() {
  try {
    // Fetch the articles metadata
    const response = await fetch('articles/articles-meta.json');
    const articles = await response.json();

    const rowContainer = document.getElementById('blog-row');
    let htmlContent = '';

    articles.reverse().forEach(article => {
      const articleUrl = `articles/${article.folder}/article.html`; // <-- direct link to static HTML

      htmlContent += `
        <div class="col-lg-6 col-md-6 mb-5">
          <div class="blog-item">
            <a href="${articleUrl}"><img loading="lazy" 
                 src="articles/${article.folder}/thumbnail.jpg" 
                 alt="${article.title}" 
                 class="img-fluid rounded"></a>

            <div class="blog-item-content bg-white p-5">
              <div class="blog-item-meta bg-gray pt-2 pb-1 px-3">
                <span class="text-muted text-capitalize d-inline-block mr-3">
                  <i class="ti-pencil-alt mr-2"></i>${article.category}
                </span>
                <span class="text-muted text-capitalize d-inline-block mr-3">
                  <i class="ti-user mr-2"></i>${article.author}
                </span>
                <span class="text-black text-capitalize d-inline-block mr-3">
                  <i class="ti-time mr-1"></i>${article.date}
                </span>
              </div>

              <h3 class="mt-3 mb-3">
                <a href="${articleUrl}">${article.title}</a>
              </h3>

              <p class="mb-4">${article.teaser}</p>

              <a href="${articleUrl}" class="btn btn-small btn-main btn-round-full">
                Learn More
              </a>
            </div>
          </div>
        </div>
      `;
    });

    rowContainer.innerHTML = htmlContent;
  } catch (error) {
    console.error('Error fetching articles-meta.json:', error);
  }
}

function populateFeaturedArticles() {
  const featuredContainer = document.getElementById('featured-articles');
  const featuredArticles = [
    {
      title: 'First step to measuring the long-term impact of Marketing: The Memory Effect',
      thumbnail: './articles/adstocks/thumbnail.jpg',
      url: './articles/adstocks/article.html'
    },

    {
      title: 'If we keep scaling media spend, will my CAC always increase?',
      thumbnail: './articles/cac-increase/thumbnail.jpg',
      url: './articles/cac-increase/article.html'
    },

    {
      title: 'Demystifying building an MMM model',
      thumbnail: './articles/demistify-mmm/thumbnail.jpg',
      url: './articles/demistify-mmm/article.html'
    },

    {
      title: 'Measuring the long-term impact of media',
      thumbnail: './articles/measuring-long-term/thumbnail.jpg',
      url: './articles/measuring-long-term/article.html'
    },

    {
      title: 'Is AI-Powered Performance Marketing Effective?',
      thumbnail: './articles/ai-marketing/thumbnail.jpg',
      url: './articles/ai-marketing/article.html'
    },

  ];

  featuredContainer.innerHTML = featuredArticles.map(a => `
      <div class="d-flex mb-3">
        <img src="${a.thumbnail}" alt="${a.title}"
             class="img-fluid rounded mr-3"
             style="width:80px;height:80px;object-fit:cover;">
        <div>
          <h6 class="mb-1"><a href="${a.url}">${a.title}</a></h6>
          <a href="${a.url}">
            <small class="text-muted">Read more</small>
          </a>
        </div>
      </div>
    `).join('');
}

populateFeaturedArticles();
populateBlogPosts();
