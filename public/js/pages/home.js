express.renderComponent(function () {
    return (`<div class="loader"></div>`)
}, ".content-app");
function renderCompo() {
    express.filterContent(".content-app");
    express.renderComponent(function () {
        return (`
        <div class="container container-home">
            <!--sidebar component-->
            <aside class="sidebar">
                
            </aside>
            <!--end slidebar component-->
            <!--slider components-->
            <section class="slider-container">
            </section>
            <!--end slider component-->
            <!--posts components-->
            <section class="posts-homepage">
            </section>
            <!--end posts components-->
        </div>
    `)
    }, ".content-app", {
        // beforeLoading: {
        //     timer: 4000,
        //     func: function (component) {
        //         var div = document.createElement("div");
        //         div.classList.add("loader");
        //         component.append(div)
        //     }
        // },
        scripts: ["css/home.css",
            "js/components/slider.js",
            "js/components/sidebar.js",
            "js/components/postsComponent/posts-home.js"]
    }, function (component) {
    });
}
setTimeout(renderCompo, 1000)
