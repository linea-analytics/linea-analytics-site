/**
 * WEBSITE: https://www.linea-analytics.com
 * GITHUB: https://github.com/linea-analytics/
 */

(function ($) {
	'use strict';

	// testimonial-wrap
	if ($('.testimonial-wrap').length !== 0) {
		$('.testimonial-wrap').slick({
			slidesToShow: 2,
			slidesToScroll: 2,
			infinite: true,
			dots: true,
			arrows: false,
			autoplay: true,
			autoplaySpeed: 6000,
			responsive: [{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 900,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}, {
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
			]
		});
	}

	// navbarDropdown
	if ($(window).width() < 992) {
		$('#navbar .dropdown-toggle').on('click', function () {
			$(this).siblings('.dropdown-menu').animate({
				height: 'toggle'
			}, 300);
		});
	}

	$(window).on('scroll', function () {
		//.Scroll to top show/hide
		if ($('#scroll-to-top').length) {
			var scrollToTop = $('#scroll-to-top'),
				scroll = $(window).scrollTop();
			if (scroll >= 200) {
				scrollToTop.fadeIn(200);
			} else {
				scrollToTop.fadeOut(100);
			}
		}
	});
	// scroll-to-top
	if ($('#scroll-to-top').length) {
		$('#scroll-to-top').on('click', function () {
			$('body,html').animate({
				scrollTop: 0
			}, 600);
			return false;
		});
	}

	// portfolio-gallery
	if ($('.portfolio-gallery').length !== 0) {
		$('.portfolio-gallery').each(function () {
			$(this).find('.popup-gallery').magnificPopup({
				type: 'image',
				gallery: {
					enabled: true
				}
			});
		});
	}

	// Counter
	if ($('.counter-stat').length !== 0) {
		$('.counter-stat').counterUp({
			delay: 10,
			time: 1000
		});
	}

	// Dynamic Article Loading
	$(document).ready(async function () {
		const articlesContainer = $('#articles-container');

		try {
			const response = await fetch('/articles/articles.json');
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const articles = await response.json();

			articles.forEach(article => {
				const articleHTML = `
          <div class="col-lg-4 col-md-6 mb-5">
            <div class="card border-0 bg-transparent">
              <img loading="lazy" src="${article.image}" alt="blog" class="img-fluid rounded">
              <div class="card-body mt-2">
                <div class="blog-item-meta">
                  <a href="#" class="text-white-50">${article.category}<span class="ml-2 mr-2">/</span></a>
                  <a href="#" class="text-white-50"><i class="fa fa-user mr-2"></i>${article.author}</a>
                </div>
                <h3 class="mt-3 mb-5 lh-36"><a href="${article.url}" class="text-white">${article.title}</a></h3>
                <a href="${article.url}" class="btn btn-small btn-solid-border btn-round-full text-white">Learn More</a>
              </div>
            </div>
          </div>
        `;
				articlesContainer.append(articleHTML);
			});
		} catch (error) {
			console.error('Failed to load articles:', error);
		}
	});

})(jQuery);
