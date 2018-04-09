express.renderComponent(function () {
    return (`<div class="loader"></div>`)
}, ".sidebar");
express.renderComponent(function (data) {
    return (`
        <div class="container-sidebar">
            <button expName="buttonToggle" class="toggle-menu-blogs fa fa-bars fa-2x"></button>
            <!--menu of blogs-->
            <div expName="menuBlogs" class="container-blogs">
                   <h4>choose the category</h4>
                   <!--blogs list-->
                   ${data.ajax ? 
                        `
                       <ul class="blogs-list">
                       ${express.loopComponent(data.ajax.data, function (category, i) {
                           return (`
                              <li class="blog-list"><a router="/blog?categories=${category.id}">${category.name}</a></li>
                           `)
                        })}
                    </ul>
                        `
                    : ""}
                   <!--end blogs list-->
                   <div class="posts"></div>
            </div>
            <!--end menu og blogs-->
        </div>
    `)
}, ".sidebar", {
    fadeIn: {
        duration: 300
    },
    style: {
        ".container-blogs": "display:block;"
    },
    data: {
    },
    get: {
        url: "https://www.speckyboy.com/wp-json/wp/v2/categories/?per_page=11",
        fetch: true,
        callback: function (err, data) {
            express.filterContent(".sidebar");
        }
    },
    scripts: ["css/sidebar.css"]
}, function (component) {
    component.buttonToggle.toggleClick(function () {
        component.menuBlogs.fadeOut(200)
    }, function () {
        component.menuBlogs.fadeIn(200);
    })
});