var windowParams = location.params;
express.renderComponent(function () {
    return (`<div class="loader"></div>`)
}, ".content-app")
if (windowParams.postId) {
    var postId = windowParams.postId;
    express.renderComponent(function (data) {
        var post = data.ajax.data;
        return (`
                <div class="container-show-post">
                <link rel="stylesheet" href="css/blog/post.css"/>
                    <div class="container">
                    <div class="container-post-and-sidebar">
                             ${post.id ?

            `
                                                        <div class="container-post">
                                <div expName="containerPostImg" class="container-post-image">
                                </div>
                                <div class="post-title"><h2>${post.title.rendered}</h2></div>
                                <div class="post-description">${post.content.rendered}</div>
                            </div>
                            `: "not found"
            }
                            <div class="sidebar-postpage"></div>
                        </div>
                    </div>
                </div>
            `)
    }, ".content-app", {
        style: {
            "component": "display:none"
        },
        scripts: ["js/components/sidebar-postpage.js"],
        fadeIn: {
          duration: 300
        },
        get: {
            fetch: true,
            url: `https://speckyboy.com/wp-json/wp/v2/posts/${postId}`,
            callback: function (err, data) {
                express.filterContent(".content-app");
            }
        }
    }, function (component) {
        document.title = component.data.ajax.data.title.rendered;
        if (component.containerPostImg) {
            express.renderComponent(function () {
                return `<div class="loader"></div>`
            }, component.containerPostImg)
            express.renderComponent(function (data) {
                return (`<img class="responsive-img" src="${data.ajax.data.guid.rendered}">`)
            }, component.containerPostImg, {
                get: {
                    fetch: true,
                    url: `https://speckyboy.com/wp-json/wp/v2/media/${component.data.ajax.data.featured_media}`,
                    callback: function (err, data) {
                        express.filterContent(component.containerPostImg)
                    }
                }
            })
        }
    });
}
