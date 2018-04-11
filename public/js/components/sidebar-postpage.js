express.renderComponent(function () {
    return (`<div class="loader"></div>`)
}, ".sidebar-postpage");

express.renderComponent(function (data) {
    return (`
    
           <div class="container-sidebar-categories container-categories">
                <link rel="stylesheet" href="css/blog/sidebar-posts.css"/>
                              <h4>choose the category</h4>
                <ul class="categoies blogs-list">
                    ${express.loopComponent(data.ajax.data, function (category, i) {
                        return (`
                         <li class="blog-list">
                            <a router="/blog?categories=${category.id}">${category.name}</a></li>
                         `)
                    })}
                </ul>
           </div>
    `)
}, ".sidebar-postpage", {
    get: {
        url: "https://www.speckyboy.com/wp-json/wp/v2/categories/?per_page=20",
        fetch: true,
        callback: function (err, data) {
            express.filterContent(".sidebar-postpage");
        }
    },
    fadeIn: {
        duration: 300
    }
})