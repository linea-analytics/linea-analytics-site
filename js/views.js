document.addEventListener("DOMContentLoaded", function () {
    fetch("/views/header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-container").innerHTML = data;

            // Determine active page from the current URL
            let currentPage = window.location.pathname.split("/").pop().replace(".html", "");
            if (!currentPage) currentPage = "index"; // Default to index if empty

            // Highlight the active page in the nav
            document.querySelectorAll(".nav-item").forEach(link => {
                if (link.dataset.page === currentPage) {
                    link.classList.add("active"); // Add active class
                }
            });
        })
        .catch(error => console.error("Error loading header:", error));

    fetch("/views/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-container").innerHTML = data;
        })
        .catch(error => console.error("Error loading footer:", error));

    const storedLang = localStorage.getItem('userLang');

    if (storedLang) {
        setTimeout(2000, translateContent(storedLang));
    } else {
        fetch('https://api.ipregistry.co/?key=tryout')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok: " + response.status);
                }
                return response.json();
            })
            .then(data => {
                console.log("Country data:", data);

                // Extract the country code
                const countryCode = data.location?.country?.code || null;
                console.log("Detected country code:", countryCode);

                // Example translation logic
                if (countryCode === 'IT') {
                    translateContent('ita');
                } else if (countryCode === 'DE') {
                    translateContent('de');
                } else {
                    translateContent('eng');
                }
            })
            .catch(error => {
                console.error("Failed to fetch location from ipregistry:", error);
                // Fallback logic, default to English, for example
                translateContent('eng');
            });
    }

});
