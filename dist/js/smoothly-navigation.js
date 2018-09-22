'use strict';

!function () {
    var view = View('nav.menu');
    var controller = {
        view: null,
        aTags: null,
        init: function init(view) {
            this.view = view;
            this.initAnimation();
            this.bindEvents();
        },
        initAnimation: function initAnimation() {
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }
            requestAnimationFrame(animate);
        },
        scrollToElement: function scrollToElement(element) {
            var top = element.offsetTop;
            var currentTop = window.scrollY;
            var targetTop = top - 80;
            var s = targetTop - currentTop; //路程
            var coords = {
                y: currentTop
            }; //起始位置
            var t = Math.abs(s / 100) * 300;
            if (t > 500) {
                t = 500;
            } //时间
            var tween = new TWEEN.Tween(coords) //起始位置
            .to({
                y: targetTop
            }, t) //结束位置和时间
            .easing(TWEEN.Easing.Quadratic.InOut) //缓动类型
            .onUpdate(function () {
                //coords.y 已经变了
                window.scrollTo(0, coords.y); //如何更新界面
            }).start(); //开始缓动
        },
        bindEvents: function bindEvents() {
            var _this = this;

            var aTags = this.view.querySelectorAll('nav.menu > ul > li > a');
            for (var i = 0; i < aTags.length; i++) {
                aTags[i].onclick = function (x) {
                    x.preventDefault();
                    var a = x.currentTarget;
                    var href = a.getAttribute('href'); //'#siteAbout'
                    var element = document.querySelector(href);
                    _this.scrollToElement(element);
                };
            }
        }
    };
    controller.init(view);
}.call();