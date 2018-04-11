function Express() {
    var route;
    // global variables
    var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
    var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame || window.webkitCancelAnimationFrame || window.oCancelAnimationFrame;

    // function to check if the obkect is empty
    Object.prototype.isEmpty = function () {
        if (Object.keys(this).length === 0) {
            return true;
        } else {
            return false;
        }
    }
    // array of dom components
    const DomComponents = [];
    //global variable
    var express = this;

    //functions to get the current params of location
    var params = {};
    window.location.search.substring(1).split('&').forEach(function(pair) {
        pair = pair.split('=');
        if (pair[1] !== undefined) {
            var key = decodeURIComponent(pair[0]),
                val = decodeURIComponent(pair[1]),
                val = val ? val.replace(/\++/g,' ').trim() : '';

            if (key.length === 0) {
                return;
            }
            if (params[key] === undefined) {
                params[key] = val;
            }
            else {
                if ("function" !== typeof params[key].push) {
                    params[key] = [params[key]];
                }
                params[key].push(val);
            }
        }
    });
    window.location.params = params;
    // end functions to get the current params of location

    //function to get a component from dom components array
    this.getComponent = function (name) {
        var components = [];
        DomComponents.forEach(function (component) {
            if (component.name === name) {
                components.push(component)
            }else {
                return component
            }
        });
        if (components.length === 1) {
            return components[0];
        } else if (components.length > 1) {
            return components;
        }
    }
    //end function to get a component from dom components array

    //function to refresh a component
    this.refreshComponent = function (component) {
        component.options.data = component.data;
        express.filterContent(component.parent)
        this.renderComponent(component.cb, component.parent, component.options, component.finish);
    };
    //end function to refresh a component


    //functions of dome events

    /*function to make an events of the dom with on event*/
    Object.prototype.on = function (event, cb, option) {
        if (Array.isArray(this)) {
            this.forEach(function (el, i) {
                return el.addEventListener(event, cb, option ? option : true);
            });
        } else {
            return this.addEventListener(event, cb, option ? option : true);
        }
    };
    /*function to make an events of the dom with on event*/

    /*function to make toggle click of a specific element, it returns a two callback the first one for the first click and the second callback for the second click*/

    Object.prototype.toggleClick = function (cb1, cb2) {
        var clicked = 0;
        if (Array.isArray(this)) {
            this.forEach(function (el, i) {
                el.addEventListener("click", function (event) {
                    clicked++;
                    if (clicked === 1) {
                        return cb1(event);
                    } else if (clicked === 2) {
                        cb2(event);
                        return clicked = 0;
                    }
                });
            });
        } else {
            this.addEventListener("click", function (event) {
                clicked++;
                if (clicked === 1) {
                    return cb1(event);
                } else if (clicked === 2) {
                    cb2(event);
                    return clicked = 0;
                }
            });
        }
    };

    //end toggle click function

    /*function to make toggle hover of a specific element, it returns a two callback the first one for the first hover and the second callback for the second hover*/

    Object.prototype.toggleHover = function (cb1, cb2) {
        if (Array.isArray(this)) {
            this.forEach(function (el, i) {
                el.addEventListener("mouseenter", function (event) {
                    return cb1(event);
                });
                el.addEventListener("mouseleave", function (event) {
                    return cb2(event);
                });
            });
        } else {
            this.addEventListener("mouseenter", function (event) {
                return cb1(event);
            });
            this.addEventListener("mouseleave", function (event) {
                return cb2(event);
            });
        }
    };

    //end toggle hover function

    //end functions of dom events

    // animation functions

    // slidedown function

    Element.prototype.slideDown = function (time, cb) {

        var element = this;
        if (element) {
            var originalHeight = getComputedStyle(element, null).getPropertyValue("height");
            var displayStatus = getComputedStyle(element, null).getPropertyValue("display");
            var currentTime = 10000 / time;
            if (displayStatus === "none") {
                var currentHeight = 0;
                element.style.display = "block";
                if (originalHeight.match(/px/gi)) {
                    element.style.height = currentHeight + "px";
                } else if (originalHeight.match(/%/gi)) {
                    element.style.height = currentHeight + "%";
                }
                var animate = function () {
                    currentHeight += currentTime;
                    if (originalHeight.match(/px/gi)) {
                        element.style.height = currentHeight + "px";
                    } else if (originalHeight.match(/%/gi)) {
                        element.style.height = currentHeight / 10 + "%";
                    }  else if (originalHeight.match(/auto/gi)) {
                        element.style.height = currentHeight + "auto";
                    }
                    if (element.style.height === originalHeight) {
                        cancelAnimationFrame(animate);
                        element.style.height = originalHeight;
                    } else {
                        requestAnimationFrame(animate);
                    }
                };
                requestAnimationFrame(animate);
            }
            if (cb) {
                setTimeout(function () {
                    return cb(element);
                }, time);
            }
        }
    };

    //end slide down function

    // slideup function

    Element.prototype.slidingUp = function (time, cb) {
        var element = this;
        if (element) {
            var originalHeight = getComputedStyle(element, null).getPropertyValue("height");
            var displayStatus = getComputedStyle(element, null).getPropertyValue("display");
            var currentTime = 10000 / time;
            var currentHeight = Number.parseInt(originalHeight);
            if (displayStatus !== "none") {
                var animate = function () {
                    currentHeight -= currentTime;
                    element.style.height = currentHeight + "px";
                    if (currentHeight <= 0) {
                        cancelAnimationFrame(animate);
                        element.style.display = "none";
                        element.style.height = originalHeight;
                    } else {
                        requestAnimationFrame(animate);
                    }
                };
                requestAnimationFrame(animate);
            }

            if (cb) {
                setTimeout(function () {
                    return cb(element);
                }, time);
            }
        }
    };

    //end slide up function

    // fade in function
    Element.prototype.fadeIn = function (time, cb) {
        var element = this;
        if (element) {
            var originalOpacity = getComputedStyle(element).getPropertyValue("opacity");
            var displayStatus = getComputedStyle(element).getPropertyValue("display");
            var originalDisplay = getComputedStyle(element).getPropertyValue("display");

            var currentTime = 1000 / time / 100;
            if (originalOpacity === "") {
                originalOpacity = 1
            }
            if (displayStatus === "") {
                displayStatus = "none";
            }
            if (displayStatus === "none") {
                var currentOpacity = 0;
                element.style.opacity = 0;
                var animate = function () {
                    element.style.display = "block";
                    currentOpacity += currentTime;
                    element.style.opacity = currentOpacity;
                    if (Number.parseInt(currentOpacity) === 1) {
                        cancelAnimationFrame(animate);
                        element.style.display = "block" || originalDisplay;
                        element.style.opacity = originalOpacity;
                    } else {
                        requestAnimationFrame(animate);
                    }
                };
                requestAnimationFrame(animate);
            }
            if (cb) {
                setTimeout(function () {
                    return cb(element);
                }, time);
            }
        }
    };

    // fade out function
    Element.prototype.fadeOut = function (time, cb) {
        var element = this;
        if (element) {
            var originalOpacity = getComputedStyle(element, null).getPropertyValue("opacity");
            var displayStatus = getComputedStyle(element, null).getPropertyValue("display");
            var currentTime = 1000 / time / 100;
            if (displayStatus !== "none") {
                var currentOpacity = 1;
                element.style.opacity = currentOpacity;
                var animate = function () {
                    currentOpacity -= currentTime;
                    element.style.opacity = currentOpacity;
                    if (currentOpacity <= 0) {
                        cancelAnimationFrame(animate);
                        element.style.display = "none";
                        element.style.opacity = originalOpacity;
                    } else {
                        requestAnimationFrame(animate);
                    }
                };
                requestAnimationFrame(animate);
            }
            if (cb) {
                setTimeout(function () {
                    return cb(element);
                }, time);
            }
        }
    };
    // end fade out function

    // animating function
    Element.prototype.animating = function (boxRotationKeyframes, boxRotationTiming, cb) {
        this.animate(boxRotationKeyframes, boxRotationTiming);
        if (cb && typeof cb === "function") {
            setTimeout(cb, boxRotationTiming.duration);
        }
    };
    // end animating function

    //function to require a javascript file
    this.require = function (path, parent) {
        var script = document.createElement("script");
        script.src = path;
        if (typeof parent === "string") {
            document.querySelector(parent).appendChild(script);
        } else if (typeof parent === "object") {
            if (Array.isArray(parent)) {
                parent.forEach(function (par) {
                    return par.appendChild(script);
                });
            } else {
                parent.appendChild(script);
            }
        }
    };
    //end function to require a javascript file

    // function to render a component and show it in the dom

    this.render = function (status, path, parent, name, cb) {
        var script = document.createElement("script");
        script.src = path;
        if (name) {
            script.setAttribute("name", name);
        }
        if (status === true) {
            if (parent.innerHTML === "") {
                document.querySelector(parent).appendChild(script);
                script.addEventListener("load", function () {
                    if (cb) {
                        return cb();
                    }
                });
            } else {
                document.querySelector(parent).appendChild(script);
                script.addEventListener("load", function () {
                    if (cb) {
                        return cb();
                    }
                });
            }
        } else {
            document.querySelector(parent).appendChild(script);
            script.addEventListener("load", function () {
                if (cb) {
                    return cb();
                }
            });
        }
    };

    // end function to render a component and show it in the dom

    // function to filter the parent of component

    this.filterContent =  function (element, options, cb) {
        var parentElement = typeof element === "string" ? document.querySelector(element) : element;
        // parentElement.innerHTML = "";
        if (options) {
            if (options.element) {
                var cont = parentElement.querySelector(options.element);
                if (cont) {
                    if (options.fadeOut) {
                        cont.fadeOut(options.fadeOut, function () {
                            setTimeout(function () {
                                parentElement.innerHTML = "";
                                return cb();
                            }, options.fadeOut + 100);
                        });
                    }
                    if (options.slidingUp) {
                        cont.slidingUp(options.slidingUp);
                        setTimeout(function () {
                            parentElement.innerHTML = "";
                            return cb();
                        }, options.slidingUp + 100);
                    }
                    if (options.animate) {
                        cont.animating(options.animate.animations, options.animate.options);
                        setTimeout(function () {
                            parentElement.innerHTML = "";
                            return cb();
                        }, options.animate.options.duration + 100);
                    }
                }
                if (!cont) {
                    parentElement.innerHTML = "";
                    return cb();
                }
            } else {
                parentElement.innerHTML = "";
                return cb();
            }
        } else {
            return parentElement.innerHTML = "";
        }
    };

    // function to filter the parent of component

    //function to loop array inside the component

    this.loopComponent = function (data, cb) {
        if (typeof data === "string") {
            data = JSON.parse(data);
        }
        if (Array.isArray(data)) {

            return data.map(function (item, i) {
                return cb(item, i);
            }).join("");
        } else if (typeof data === "object") {
            return Object.keys(data).map(function (item, i) {
                return cb(data[item], data[i]);
            }).join("");
        }
    };

    //end function to loop array inside the component

    // function to render a new component
    this.renderComponent = function (cb, parent, options, finish) {
        var container = document.createElement("div");
        var animations;
        var allData;
        var self = this;
        var da = Date.now();
        function writeIt(data) {
            var newElement = cb(data);
            container.innerHTML = newElement;
            if (options && options.scripts) {
                options.scripts.forEach(function (src) {
                    if (src.match(/.js$/)) {
                        var script = document.createElement("script");
                        script.src = src;
                        container.firstElementChild.appendChild(script);

                        // } else i
                        // }
                    }
                });
            }
            if (options && options.style) {
                var style = options.style;
                Object.keys(style).forEach(function (el) {
                    if (el === "component") {
                        var cssElement = container.firstElementChild;
                        Object.keys(style[el]).forEach(function (objStyle) {
                            cssElement.style[objStyle] = style[el][objStyle];
                        });
                    } else {
                        var cssElements = container.firstElementChild.querySelectorAll(el);
                        cssElements.forEach(function (cssElement) {
                            Object.keys(style[el]).forEach(function (objStyle) {
                                cssElement.style[objStyle] = style[el][objStyle];
                            });
                        });
                    }
                })
            }
            function Elements() {
                this.element = container.firstElementChild.cloneNode(true);
            }
            var elements = new Elements();
            var element = elements.element;
            if (options && typeof options === "object") {
                if (options.slideDown) {
                    if (!options.slideDown.cb) {
                        element.slideDown(options.slideDown.duration);
                    } else if (options.slideDown.cb) {
                        element.slideDown(options.slideDown.duration, options.slideDown.cb());
                    }
                }
                if (options.fadeIn) {
                    if (!options.fadeIn.cb) {
                        element.fadeIn(options.fadeIn.duration);
                    } else if (options.fadeIn.cb) {
                        element.fadeIn(options.fadeIn.duration, options.fadeIn.cb());
                    }
                }
                if (options.animate) {
                    element.animating(options.animate.animations, options.animate.options, options.animate.callback ? options.animate.callback : null);
                }
                if (options.methods && typeof options.methods === "object") {
                    Object.keys(options.methods).forEach(function (el) {
                        if (el === "component") {
                            element = elements.element;
                            var methodsEvents = options.methods[el];
                            Object.keys(methodsEvents).forEach(function (event) {
                                var EventHappen = methodsEvents[event];
                                Object.keys(EventHappen).forEach(function (ev) {
                                    element.on(`${ev}`, EventHappen[ev]);
                                });
                            });
                        } else {
                            var element = elements.element.querySelector(el);
                            var methodsEvents = options.methods[el];
                            Object.keys(methodsEvents).forEach(function (event) {
                                var EventHappen = methodsEvents[event];
                                Object.keys(EventHappen).forEach(function (ev) {
                                    element.on(`${ev}`, EventHappen[ev]);
                                });
                            });
                        }
                    });
                }
            }
            component = {};
            component.finish = finish
            component.data = data;
            component.options = options
            component.parent = typeof parent === "string" ? document.querySelector(parent) : parent;
            component.stringDom = cb(data);
            component.cb = cb
            component.self = elements.element;
            component.name = options && options.name ? options.name : "defaultComponent";
            component.id = Math.random().toString(36).substr(2, 9);
            // express.components.forEach(function (comp) {
            //     if (comp === component) {
                    // return null;
                // } else {

            DomComponents.push(component);
            component.update = function () {
                document.querySelector(parent).innerHTML = "";
                return writeIt(data)
            }
            //function to check about the scripts
            function checkScripts(resolve, rejected) {
                if (options && options.scripts && options.scripts.length > 0) {
                    options.scripts.forEach(function (src) {
                        if (src.match(/.css$/)) {
                            var style = document.createElement("link");
                            style.rel = "stylesheet";
                            style.href = src;
                            style.as = "style"
                            document.head.appendChild(style)
                            if (document.head.hasChildNodes(style)) {
                            	setTimeout(function () {
                            		return resolve(style);
                            	}, 50)
                            }
                        } else {
                            return rejected();
                        }
                    })
                } else {
                    return rejected();
                }
            }
            //function to load css files with promises
            function loadCssFile() {
                return new Promise(function (resolve, rejected) {
                    checkScripts(resolve, rejected);
                });
            }
            if (finish) {
                //function to access on the elements inside component with its expName attribute
                (function () {
                    var allElements = component.self.querySelectorAll("*");
                    var elem = elements.element.querySelectorAll(`[expName]`);
                    allElements.forEach(function (el, i) {
                        // component[el.getAttribute("expName")] = el;
                        if (el.getAttribute("expName")) {
                            // component[el.getAttribute("xpName")] = el;
                            if (el.getAttribute("expName") === el.getAttribute("expName")) {
                                var arr = [];
                                elem.forEach(function (it, x) {
                                    if (it.getAttribute("expName") === el.getAttribute("expName")) {
                                        var attr = el.getAttribute("expName");
                                        arr.push(it);
                                        if (arr.length === 1) {
                                            component[attr] = arr[0];
                                        } else {
                                            component[attr] = arr;
                                        }
                                    }
                                })
                            }
                        }
                    });
                })();
                //function to append elements to element
                component.append = function (elem, content) {
                    if (typeof content === "object") {
                        return elem.appendChild(content);
                    }
                    if (typeof content === "string") ;
                    return elem.insertAdjacentHTML("beforeend", content);
                };
                if (typeof parent === "string") {
                    loadCssFile().then(function (style) {
                        setTimeout(function () {
                            document.querySelector(parent).appendChild(elements.element);
                            if (document.querySelector(parent).hasChildNodes(elements.element)) {
                                elements.element.insertBefore(style, elements.element.children[0])
                                return finish(component)
                            }
                        }, 50);
                    }).catch(function () {
                         document.querySelector(parent).appendChild(elements.element);
                        return finish(component);
                    });
                } else if (typeof parent === "object") {
                    loadCssFile().then(function () {
                        setTimeout(function () {
                            parent.appendChild(elements.element)
                            if (parent.hasChildNodes(elements.element)) {
                                elements.element.insertBefore(style, elements.element.children[0])
                                return finish(component);
                            }
                        }, 50)
                    }).catch(function () {
                        parent.appendChild(elements.element)
                        return finish(component)
                    });
                }
            } else {
                if (typeof parent === "string") {
                    loadCssFile().then(function (style) {
                        setTimeout(function () {
                            document.querySelector(parent).appendChild(elements.element);
                            if (document.querySelector(parent).hasChildNodes(elements.element)) {
                                elements.element.insertBefore(style, elements.element.children[0])
                            }
                        }, 50);
                    }).catch(function () {
                        return document.querySelector(parent).appendChild(elements.element);
                    });
                } else if (typeof parent === "object") {
                    loadCssFile().then(function () {
                        setTimeout(function () {
                            parent.appendChild(elements.element)
                            if (parent.hasChildNodes(elements.element)) {
                                elements.element.insertBefore(style, elements.element.children[0])
                            }
                        }, 50)
                    }).catch(function () {
                        return parent.appendChild(elements.element)
                    });

                }
            }
        }
            if (options && options.get) {
                if (options.get.fetch === true) {
                    self.http.get(true, options.get, function (err, response) {
                        var ajax = {};
                        if (err) {
                            ajax.error = err;
                        }
                        if (response) {
                            ajax.data = response.data;
                        }
                        if (options.get.callback) {
                            options.get.callback(err, response);
                        }
                        if (options.data) {
                            allData = options.data;
                        } else {
                            allData = {};
                        }
                            allData.ajax = ajax;
                        writeIt(allData);
                    });
                } else {
                    function getPromise() {
                        return new Promise(function (resolve, reject) {
                            self.http.get(options.get.fetch, {
                                url: options.get.url,
                                onProgress: function (xhttp) {
                                    da = Date.now();
                                    if (options.get.onProgress) {
                                        options.get.onProgress(xhttp);
                                    }
                                },
                                onStart: function (xhttp) {
                                    if (options.get.onStart) {
                                        options.get.onStart(xhttp);
                                    }
                                }
                            }, function (err, data) {
                                ajax = {};
                                if (err) {
                                    ajax.error = err;
                                    resolve(ajax);
                                }
                                if (data) {
                                    ajax.data = data;
                                    resolve(ajax);
                                }
                                if (options.get.callback) {
                                    return options.get.callback(err, data);
                                }
                            });
                        });
                    }
                    getPromise().then(function (resolve) {
                        if (options && options.data) {
                            allData = options.data;
                        }
                        allData.ajax = resolve;
                        writeIt(allData);
                    });
                }
            } else {
                if (options && options.data) {
                    allData = options.data;
                    writeIt(allData);
                } else {
                    writeIt()
                }
            }
            // setTimeout(function () {

    };
    // end function to render a new component

    // function to use to start the application
    this.intiApplication = function () {
        var headerApp = document.createElement("header-app");
        var contentPages = document.createElement("content-app");
        var sideBar = document.createElement("side-app");
        var footerApp = document.createElement("footer-app");
        document.body.insertBefore(headerApp, document.querySelector("script"));
        document.body.insertBefore(contentPages, document.querySelector("script"));
        document.body.insertBefore(sideBar, document.querySelector("script"));
        document.body.insertBefore(footerApp, document.querySelector("script"));
    };
    // end function to use to start the application

    // function to load static component to still showing it in all pages as you want

    this.loadStaticComponents =  function (cb) {
        return cb();
    };

    // end function to load static component to still showing it in all pages as you want

    // function to parse the data

    this.parseData = function (data, cb) {
        if (typeof data === "string") {
            data = JSON.parse(data);
        }
        if (Array.isArray(data)) {
            data.map(function (item, i) {
                return cb(item, i);
            });
        }
        if (typeof data === "object") {
            Object.keys(data).map(function (item, i) {
                return cb(data[item], data[i]);
            });
        }
    };

    // end function to parse the data

    // request object of routing
    function Request() {
        var req = this;
        this.url = location;
    }
    // end request object of routing

    // response object of routing
    function Response () {
        this.render = function (status, path, parent, name, cb) {
            express.render(status, path, parent, name, cb);
        };
        this.renderComponent = function (cb, parent, style, scripts) {
            express.renderComponent(cb, parent, style, scripts);
        };
        this.filterContent = function (element, options, cb) {
            express.filterContent(element, options, cb);
        };
        this.redirect = function (url) {
            location.replace(url);
        };
    }
    // end request object of routing

    // router module

    express.routersObject = [];
    function Router() {
        var selfe = this;
        selfe.routers = [];
        var cbOb = {};
        this.get = function (path, title, cb) {
            selfe.routers.push(path);
            var pathname = location.href;
            pathname = pathname.split(location.origin)[1]
            var clicked = 0;
            document.addEventListener("click", function (e) {
                    var routerBtns = document.querySelectorAll("[router]");
                    routerBtns.forEach(function (routerBtn) {
                        var objectInfo = {path: routerBtn.getAttribute("router"), title: title, cb: cb};
                        express.routersObject.push(objectInfo);
                        if (e.target === routerBtn) {
                            if (e.detail === 1) {
                                e.preventDefault();
                                var routerVal = e.target.getAttribute("router");
                                if (path.split("=")[0] === routerVal.split("=")[0]) {
                                        history.pushState({
                                            url: routerVal,
                                            title: title,
                                            callback: cb.toString()
                                        }, title, routerVal);
                                    // }
                                    document.querySelector("title").innerHTML = title;
                                    var params = {};
                                    window.location.search.substring(1).split('&').forEach(function (pair) {
                                        pair = pair.split('=');
                                        if (pair[1] !== undefined) {
                                            var key = decodeURIComponent(pair[0]),
                                                val = decodeURIComponent(pair[1]),
                                                val = val ? val.replace(/\++/g, ' ').trim() : '';

                                            if (key.length === 0) {
                                                return;
                                            }
                                            if (params[key] === undefined) {
                                                params[key] = val;
                                            }
                                            else {
                                                if ("function" !== typeof params[key].push) {
                                                    params[key] = [params[key]];
                                                }
                                                params[key].push(val);
                                            }
                                        }
                                    });
                                    Request.prototype.params = params;
                                    window.location.params = params;
                                    cb(new Request(), new Response());
                                }
                            } else {
                                return null;
                            }
                        }
                    });
            });
            if (path.split("=")[0] === pathname.split("=")[0]) {
                var params = {};
                window.location.search.substring(1).split('&').forEach(function(pair) {
                    pair = pair.split('=');
                    if (pair[1] !== undefined) {
                        var key = decodeURIComponent(pair[0]),
                            val = decodeURIComponent(pair[1]),
                            val = val ? val.replace(/\++/g,' ').trim() : '';

                        if (key.length === 0) {
                            return;
                        }
                        if (params[key] === undefined) {
                            params[key] = val;
                        }
                        else {
                            if ("function" !== typeof params[key].push) {
                                params[key] = [params[key]];
                            }
                            params[key].push(val);
                        }
                    }
                });
                //function to push the current url when the document loads to the history
                var historyArr = [];
                var observer = new MutationObserver(function (mutation) {
                    var elements = document.querySelectorAll("[router]")
                    elements.forEach(function (element) {
                        var routerVal = element.getAttribute("router");
                        if (routerVal.split("=")[0] === path.split("=")[0]) {
                            historyArr.push(routerVal);
                        }
                    });
                })
                observer.observe(document.body, {subtree: true, childlist: true, attributes: true})
                setTimeout(function () {
                    var elements = document.querySelectorAll("[router]")
                    history.pushState({
                        url: historyArr[0],
                        title: title,
                        callback: cb.toString()
                    }, title, historyArr[0]);
                    var objectInfo = {path: historyArr[0], title: title, cb: cb};
                    express.routersObject.push(objectInfo);
                }, 500)
                //end function to push the current url when the document loads to the history
                Request.prototype.params = params;
                document.querySelector("title").innerHTML = title;
                if (cb) {
                    cb(new Request(), new Response());
                    return route = null;
                }
            }
        };
        this.errorPage = function (cb) {
            var errorArr = [];
            var pathname = location.href.split(location.origin)[1].split("=")[0];
            if (selfe.routers.indexOf(pathname) !== -1) {
                    return null;
                } else {
                    return cb();
                }
        };
        this.post = function (path, cb) {
                document.addEventListener("submit", function (e) {
                    e.preventDefault();
                    var form = {};
                    form.form = e.target;
                    form.action = form.form.action;
                    var inputs  = form.form.querySelectorAll("input");
                    inputs.forEach(function (input, i) {
                        var name = input.getAttribute("name");
                        form[name] = input;
                    });
                    var act = new RegExp(location.origin, "gi");
                    act = act.exec(form.action);
                    form.action = form.action.replace(act, "");
                    if (form.action === path) {
                        Request.prototype.body = form;
                        return cb(new Request(), new Response());
                    }
                });
        };
        this.initialRouter = function (cb) {

            window.onload = function () {
                return cb();
            }
        }
    }

    // end router module

    // using the router module for routing process
    this.Router = new Router();
    //end using the router module for routing process

    // http module and ajax
    function Ajax() {
        var xhr = new XMLHttpRequest();
        this.get = function (fetchFunc, options, cb) {
            if (fetchFunc === true) {
                var err,
                    response = {};
                fetch(options.url).then(function (res) {
                    response.res = res;
                    return res.json();
                }).then(function (data) {
                    response.data = data
                    return cb(err, response);
                }).catch(function (error) {
                    err = error;
                    return cb(err, response);
                });
            } else {
                xhr.open("get", options.url, options.async ? options.async: true);
                if (options.type) {
                    this.responseType = options.type;
                }
                if (options.headers) {
                    Object.keys(options.headers).forEach(function (index) {
                        xhr.setRequestHeader(index, options.headers[index]);
                    });
                }
                xhr.setRequestHeader("ajax", "express");
                xhr.onreadystatechange = function () {
                    if (this.readyState === 0) {
                        if (options.beforStart) {
                            options.beforStart();
                        }
                    }
                    if (this.readyState === 1) {
                        if (options.onStart) {
                            options.onStart(xhr);
                        }
                    }
                    if (this.readyState === 3) {
                        if (options.onProgress) {
                            options.onProgress(xhr);
                        }
                    }
                    var err;
                    var data;
                    if (this.readyState === 4) {
                        if (this.status === 404 || this.status === 403 || this.status === 500) {
                            err = {status: this.status};
                        }
                        if (this.readyState === 4 && this.status === 200) {
                            data = {response: this.response, responseText: this.responseText, responseUrl: this.responseURL, responseXML: this.responseXML, responseType: this.responseType};
                        }
                        return cb(err, data);
                    }
                };
                xhr.send();
            }
        }
        this.post = function (options, cb) {
            var err;
            var data;
            var formData = new FormData();
            if (options.url) {
                xhr.open("post", options.url, options.async ? options.async : true);
                if (options.headers) {
                        Object.keys(options.headers).forEach(function (index) {
                            xhr.setRequestHeader(index, options.headers[index]);
                        });
                }
                if (options.fullAjax) {
                    return fullAjax(this);
                }
                if (options.data) {
                    if (options.upload) {
                        var file;
                            file = options.upload.file;
                        Array.from(file).forEach(function (fil) {
                            formData.append(options.upload.fileName, fil);
                        });
                        if (options.upload.onload) {
                            xhr.upload.onload = function (e) {
                                return options.upload.onload(e);
                            }
                        }
                        if (options.upload.onprogress) {
                            xhr.upload.onprogress = function (e) {
                                return options.upload.onprogress(e);
                            }
                        }
                        if (options.upload.onerror) {
                            xhr.upload.onerror = function (e) {
                                return options.upload.onerror(e);
                            }
                        }
                    }
                    if (typeof options.data === "object") {
                        Object.keys(options.data).forEach(function (item) {
                            formData.append(item, options.data[item]);
                        });
                        options.data = formData;
                    } else if (typeof options.data === "string") {
                        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    }
                    xhr.setRequestHeader("ajax", "express");
                    if (options.onabort) {
                        xhr.onabort = function (e) {

                            return options.onabort(e);
                        };
                    }
                    xhr.onreadystatechange = function () {
                        if (this.readyState === 0) {
                            if (options.beforStart) {
                                options.beforStart();
                            }
                        }
                        if (this.readyState === 1) {
                            if (options.onStart) {
                                options.onStart();
                            }
                        }
                        if (this.readyState === 3) {
                            if (options.onProgress) {
                                options.onProgress();
                            }
                        }

                        if (this.status === 404 || this.status === 403 || this.status === 500) {
                            err = {status: this.status};
                        }
                        if (this.readyState === 4 && this.status === 200) {
                            data = {response: this.response, responseText: this.responseText, responseUrl: this.responseURL, responseXML: this.responseXML, responseType: this.responseType};
                        }
                        if (cb) {
                                return cb(err, data);
                        }
                    };
                    xhr.send(options.data);
                } else {
                    err = new Error("bad request");
                    return console.error("cannot send empty data");
                }
            } else {
                err = new Error("bad request");
                return console.error("cannot send empty url");
            }
        }
    }
    // end http module and ajax
    // using the http module and ajax
    this.http = new Ajax();
    // end using the http module and ajax
    // function to maek popstate
    window.addEventListener("popstate", function (event) {
        var link;
        var pathname = location.href;
        patname = pathname.split(location.original)[1];
        express.routersObject.forEach(function (info) {
            if (info.path === event.state.url && info.title === event.state.title && info.cb == event.state.callback) {
                link = info;
            }
        });

            var params = {};
            window.location.search.substring(1).split('&').forEach(function (pair) {
                pair = pair.split('=');
                if (pair[1] !== undefined) {
                    var key = decodeURIComponent(pair[0]),
                        val = decodeURIComponent(pair[1]),
                        val = val ? val.replace(/\++/g, ' ').trim() : '';

                    if (key.length === 0) {
                        return;
                    }
                    if (params[key] === undefined) {
                        params[key] = val;
                    }
                    else {
                        if ("function" !== typeof params[key].push) {
                            params[key] = [params[key]];
                        }
                        params[key].push(val);
                    }
                }
            });
            window.location.params = params;
            Request.prototype.params = params;
            document.querySelector("title").innerHTML = event.state.title;
            link.cb(new Request(), new Response());
    });
    // end function to make popstate
}

