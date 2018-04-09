express.renderComponent(function () {
    return (`<div class="loader"></div>`)
}, ".content-app")


setTimeout(renderAboutPage, 1000);
function renderAboutPage() {
    express.filterContent(".content-app");
    express.renderComponent(function (data) {
        return (`
        <div class="about-page">
                      <link rel="stylesheet" href="css/about/about-page.css"/>
              <div class="container">
              <div class=" container-about">
                <div class="container-image-about">
                    <img src="images/about-us-page1.png" class="responsive-img">
                </div>
                <div class="container-about-description">
                    <h3>Hello wordpress</h3>
                    <p>Hello and welcom in this site, this site is a demo of word press single page application. <br> All articles here in this site are graped from <a href="https://speckyboy.com" target="_blank">this site</a></p>
                    <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>
                </div>
                </div>
              </div>
        </div>
    `)
    }, ".content-app", {
        animate: {
            // animations: [{opacity: 0}, {opacity: 1}],
            // options: {duration: 1300, fill: "forwards"}
            animations: [{right: "100%"}, {right: "0"}],
            options: {duration: 300, fill: "forwards"}
        },
        style: {}

    }, function (component) {

    });
}
