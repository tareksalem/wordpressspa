const express = new Express();
const router = express.Router;
express.loadStaticComponents(function () {
    express.render(false, "js/components/header/navbar.js", ".header-app");
    express.render(false, "js/components/footer/footer.js", "footer");
});
router.initialRouter(function () {
    router.get("/", "home", function (req, res) {
        res.filterContent(".content-app", {
            element: ".container-about",
            fadeOut: 800
        }, function () {
            res.render(true, "js/pages/home.js", ".content-app");
        });
    });
    router.get("/about", "about", function (req, res) {
        res.filterContent(".content-app", {
            element: ".container-home",
            fadeOut: 800
        }, function () {
            res.render(true, "js/pages/about.js", ".content-app");
        });
    });

    router.get("/blog", "blog", function (req, res) {
        res.filterContent(".content-app");
        res.render(false, "js/pages/blog.js", ".content-app");
    });
    router.get("/blog?categories", "blog", function (req, res) {
        res.filterContent(".content-app");
        res.render(false, "js/pages/category.js", ".content-app");
    });
    router.get("/blog?postId", "post",  function (req, res) {
        res.filterContent(".content-app");
        res.render(false, "js/components/post.js", ".content-app");
    })
    router.errorPage(function () {
        express.render(false, "js/pages/error.js", ".content-app");
        document.title =  "error";
    });
});

/*
*
*
* */