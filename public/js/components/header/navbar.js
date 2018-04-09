express.renderComponent(function () {
    return (`
        <header>
            <div class="container">
                <div class="navbar-brand">
                <img src="images/logo.png" router="/">
            </div>
            <!--ul for navbar links-->
            <ul class="ul-nav-links">
                <li class="link-nav"><a router="/">Home</a></li>
                <li class="link-nav"><a router="/about">About</a></li>
                <li class="link-nav"><a router="/blog">Blog</a></li>
                <li class="link-nav"><a href="https://speckyboy.com" target="_blank">original site</a></li>
            </ul>
                            <i class="btn-toggle-navbar fa fa-bars fa-2x"></i>
            <div class="responsive-navbar"></div>
            </div>
        </header>
    `)
}, ".header-app", {
    scripts: ["js/components/header/headerFunc.js"]
}, function (component) {
});
