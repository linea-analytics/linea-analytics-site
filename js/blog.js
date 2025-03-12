async function populateBlogPosts() {
    try {
      // Fetch the articles metadata
      const response = await fetch('articles/articles-meta.json');
      const articles = await response.json();

      // Container where we'll insert our blog items
      const rowContainer = document.getElementById('blog-row');

      // We'll build the HTML structure in a string and then insert it
      let htmlContent = '';

      articles.forEach(article => {
        // Generate a blog card/item for each article
        htmlContent += `
          <div class="col-lg-6 col-md-6 mb-5">
            <div class="blog-item">
              <!-- Example: we assume each article folder has "image.jpg" -->
              <img loading="lazy" 
                   src="articles/${article.folder}/thumbnail.jpg" 
                   alt="${article.title}" 
                   class="img-fluid rounded">
              
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
                  <!-- Link to a detail page, e.g., blog-single.html, passing the folder as a query param -->
                  <a href="blog-single.html?folder=${article.folder}">${article.title}</a>
                </h3>

                <!-- This could be a snippet or custom excerpt. For now, placeholder text: -->
                <p class="mb-4">${article.teaser}</p>

                <a href="blog-single.html?folder=${article.folder}" class="btn btn-small btn-main btn-round-full">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        `;
      });

      // Insert the generated HTML into the container
      rowContainer.innerHTML = htmlContent;
    } catch (error) {
      console.error('Error fetching articles-meta.json:', error);
    }
  }

  // Call the function to populate the blog posts on page load
  populateBlogPosts();