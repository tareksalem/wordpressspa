express.renderComponent(function () {
    return (`<div class="loader"></div>`)
}, ".posts-homepage");
express.renderComponent(function (data) {
    return (`
        <div class="container-homepage-posts">
        <link rel="stylesheet" href="css/posts-home.css">
        <div class="wrapper">
        ${express.loopComponent(data.ajax.data, function (post) {
            return (`<div class="post-container">
                    <div expName="postImg" data-img="${post.featured_media}" class="post-image-container">
                    </div>
                    <div class="post-capture">
                        <h3>${post.title.rendered}</h3>
                    </div>
                    <div class="readMore-container">
                        <button expName="readMore" class="readmore-post" router="/blog?postId=${post.id}">read more</button>
                    </div>
            </div>`)
    })}
        </div>
        
        </div>
    `)
}, ".posts-homepage", {
    name: "posts-homepage",
    fadeIn: {
        duration: 300
    },
    scripts: [
        // "css/posts-home.css"
    ],
    data: {
        username: "tarek"
    },
    get: {
        url: "https://speckyboy.com/wp-json/wp/v2/posts?per_page=21",
        fetch: true,
        callback: function (err, data) {
            express.filterContent(".posts-homepage")
        }
    }
}, function (component) {
    component.postImg.forEach(function (postImg) {
        express.renderComponent(function () {
            return (`<div class="loader"></div>`)
        }, postImg);
        express.renderComponent(function (data) {
            return (`<img src="${data.ajax.data.guid.rendered !== undefined ? data.ajax.data.guid.rendered: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAYFBMVEXa2tpVVVXd3d1OTk5SUlK1tbVwcHBLS0uOjo7h4eGcnJxWVlbU1NRaWlphYWGnp6fHx8dra2vBwcF1dXW5ubmGhobMzMyWlpampqagoKCvr699fX3CwsJmZmaQkJBEREQ6bgTvAAACeUlEQVR4nO3b646qMBRAYVqqpePlgKIozOX933JAREDBjEKOcbO+f8NEk65gaRE9DwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwCXpErx7Lc/Qhmo/HvXo4T9Ef1oznXRv4ajQLGtCABhIa+HYQCQ1MEs8GiNcCGvipG7I2cmsjoMG/QWs8GkyzwfXWYHoNtPeZpvvmCybXQIfz/GpogsahqTXQoTkN2G7rY5NrsDXlisjWr5lag321uDbRZcgTa6BjW20PVpeDU2uwqRqYteTPgo6zO0nW5/nADyR/FnRkg97h6EN5IhizF3we6NQqm/SOxyXFLUhfxfVL5DXwvvIR2Y/+M2Gzi+ZJc6EoroErT3Z76I/gnGtNGOIaeKvznJe2h3RnmpTWwCXVIuhn1r5Y9L+LtAZLdWHixqCWJuv9Mk1YA7dr3Gi2n/XpEfh+tOyJIKuB3jfvtZtFWB0PbbEy3HdHENYgM6oZoVoIlbtF4286I4hqUO8GLpuCUwQ9889N0q5ximrg5kZdRzhNAtUmQdljx0AlNWhsjOsI+UzojvVxG9x+HCQ18KLr06D43zy/Ljb+ttnNcklQg2Kz1MHPdq00t9dISQ0WXQmKmfB6jgjbEeQ0cMe/fg9vWitISQ2Wqz8mKBYKrWukmAY6fORxjNZNlok2UHYn8D7Sgw2U3V4uD5IadKwO7vC/qi2UoAZq9ZjF6ryFEtMgvzA8rnwXQQ2eRgMpDVI3iIQGJvsOBvguV5jv3UANfGhfSWgwChrQgAbv3SD5GfbUfsubNgiHPLN/7V1/3DemVw8GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP6DXzFINM884L83AAAAAElFTkSuQmCC"}" class="responsive-img"/>`)
        }, postImg, {
            get: {
                url: `https://speckyboy.com/wp-json/wp/v2/media/${postImg.getAttribute("data-img")}`,
                fetch: true,
                callback: function (err, data) {
                    if (err) {
                    }
                    if (data) {
                    }
                    express.filterContent(postImg);
                }
            },
            data: {}
        })
    })
});
