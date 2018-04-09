express.renderComponent(function () {
    return (`
        <div class="container-footer">

            <!--container of blog links-->
            <div class="blog-footer-content">
                <div class="colum-footer-links">
                    <h4>blog links</h4>
                    <ul class="container-footer-links">
                        <li><a router="/">home</a></li>
                        <li><a router="/about">about</a></li>
                        <li><a router="/about">about</a></li>
                        <li><a router="/blog">blog</a></li>
                        <li><a href="https://speckyboy.com" target="_blank">original site</a></li>
                    </ul>
                </div>
                <div class="colum-footer-social">
                    <h4>social media</h4>
                    <ul class="container-footer-social">
                        <li>
                            <a href="#" class=""><i class="fab fa-facebook fa-2x"></i>
                             </a>
                        </li>
                        <li>
                            <a href="#"><i class="fab fa-google-plus fa-2x"></i></a>
                        </li>
                        <li><a href="#">
                        <i class="fab fa-twitter fa-2x"></i>
                        </a></li>
                    </ul>
                </div>
            </div>
            <!--end container of blog links-->
            
        </div>
    `)
}, "footer", {
    style: {
        // "container-footer": "display:none"
    },
    // fadeIn: {
    //     // duration: 50
    // }
});