'use strict';

window.Controller = function (options) {
    var _init = options.init; //这个 init 就是 controller 传进来的，记为 initB
    // 4-21 return 一个 object
    var object = {
        view: null,
        model: null,
        init: function init(view, model) {
            // 注意这里的 init 是 object 的属性,记为 initA
            this.view = view;
            this.model = model;
            this.model.init();
            // 3.initB.call(this)
            _init.call(this, view, model); // 这里的 init 当然是 initB，写成这样 init(view,model) 你就懂了
            this.bindEvents.call(this);
        }
        // 把除 init 外的所有 options 的参数传给 object
        // init 是公共参数，而其他实例独有的参数需要传进来
    };for (var key in options) {
        if (key !== 'init') {
            object[key] = options[key];
        }
    }
    return object;
};