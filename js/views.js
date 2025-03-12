document.addEventListener("DOMContentLoaded", function () {
    fetch("views/header.html")
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

    fetch("views/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-container").innerHTML = data;
        })
        .catch(error => console.error("Error loading footer:", error));
});
