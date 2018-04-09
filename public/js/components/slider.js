/*
* */
express.renderComponent(function () {
    return (`<div class="loader"></div>`)
}, ".slider-container");
var images = [
    "https://images.pexels.com/photos/4458/cup-mug-desk-office.jpg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/267569/pexels-photo-267569.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/261577/pexels-photo-261577.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/6469/red-hands-woman-creative.jpg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/261579/pexels-photo-261579.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/265667/pexels-photo-265667.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/6356/hands-woman-laptop-working.jpg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/34601/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/34658/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
];

express.renderComponent(function (data) {
    express.filterContent(".slider-container");
    if (data) {
        var ajax = data.ajax;
        var posts = ajax.data.items;
        posts.length = 5;
        return (`
            <div class="container-slides">
                ${express.loopComponent(posts, function (post, i) {
                    return (`
                              <div data-selfe="1" expName="slider" class="slider slide${i}">
                            <div class="capture">
                                <h1>${post.title}</h1>
                                <p>description slider one</p>
                            </div>
                            <div class="container-img">
                                <img class="responsive-img" src="${images[i]}"/>
                            </div>
                        </div>
                    `)
                })}
                <!--indicators of slider-->
                      <div class="indecators-slider">
                        ${express.loopComponent(posts, function (post, i) {
                    return (`
                          <span expName="indicator" data-slider="slide${i}" class="indicator-slider"></span>
                    `)
                        })}
                        </div>
                <!--end indecators of slider-->
            </div>
        `)
    } else {
        return (`<h1>hello user</h1>`)
    }
}, ".slider-container", {
    scripts: ["css/slider.css"],
        data: {username: "tarek"},
    fadeIn: {
        duration: 300
    },
    get: {
        url: "https://www.googleapis.com/blogger/v3/blogs/2399953/posts?key=AIzaSyCZrmfo30wuBE61Z6n1X8XED_y7-eOagPA",
        fetch: true,
        callback: function (err, data) {
        }
    }
}, function (component) {
    sliderFunctions(component)
});


function sliderFunctions(component) {
        (function () {
            var slides = component.slider;
            var indicators = component.indicator;
            var current = 0;
            setInterval(function () {
                current++;
                indicators.forEach(function (ind) {
                    ind.style.background = "none";
                });
                if (slides[current] === undefined) {
                    current = 0;
                }
                    slides.forEach(function (slide) {
                        slide.fadeOut(100);
                    });
                    slides[current].style.display = "block";
                    indicators[current].style.backgroundColor = "white";

            }, 6000);
            indicators.on("click", function (e) {
                indicators.forEach(function(ind) {
                    ind.style.background = "none";
                });
                e.target.style.backgroundColor = "white";
                var nextItem = component.self.querySelector(`.${e.target.getAttribute("data-slider")}`);
                current = slides.indexOf(nextItem);
                slides.forEach(function (slide) {
                    if (nextItem === slide) {
                        return null;
                    } else {
                        slide.style.display = "none";
                    }
                });
                if (getComputedStyle(nextItem).getPropertyValue("display") === "none") {
                    nextItem.fadeIn(200);
                }
            });
            indicators[current].style.backgroundColor = "white";
        })();
    }
