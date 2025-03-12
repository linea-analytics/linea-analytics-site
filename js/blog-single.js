
async function loadArticle() {
    // Suppose we read ?folder=test-1 from the URL
    const params = new URLSearchParams(window.location.search);
    const folder = params.get('folder');

    if (!folder) {
      // fallback / error
      return;
    }

    try {
      const response = await fetch(`articles/${folder}/article.md`);
      const markdown = await response.text();

      // Use Marked with the baseUrl option
      const articleHtml = marked.parse(markdown, {
        baseUrl: `articles/${folder}/`
      });

      document.getElementById('article-content').innerHTML = articleHtml;
    } catch (error) {
      console.error('Error loading article:', error);
      document.getElementById('article-content').innerHTML = 
        '<p>Article could not be loaded.</p>';
    }
  }

  loadArticle();
