(function () {
    var responsiveNavbar = document.querySelector(".responsive-navbar");
    var ulLinks = document.querySelector(".ul-nav-links");
    var btnToggleMenu = document.querySelector(".btn-toggle-navbar");
    window.addEventListener("resize", function () {
        if (window.innerWidth <= 500) {
            responsiveNavbar.appendChild(ulLinks);
            ulLinks.style.display = "block";
        } else {
            document.querySelector("header .container").insertBefore(ulLinks, btnToggleMenu);
        }
    });
    if (window.innerWidth <= 500) {
        responsiveNavbar.appendChild(ulLinks);
        ulLinks.style.display = "block";
    }
    btnToggleMenu.toggleClick(function () {
        responsiveNavbar.slideDown(600);
    }, function () {
        responsiveNavbar.slidingUp(600);
    });
})();