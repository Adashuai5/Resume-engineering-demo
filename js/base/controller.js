window.Controller = function (options) {
    var init = options.init //这个 init 就是 controller 传进来的，记为 initB
    // 4-21 return 一个 object
    let object = {
        view: null,
        model: null,
        init: function (view, model) { // 注意这里的 init 是 object 的属性,记为 initA
            this.view = view
            this.model = model
            this.model.init()
            // 3.initB.call(this)
            init.call(this, view, model) // 这里的 init 当然是 initB，写成这样 init(view,model) 你就懂了
            this.bindEvents.call(this)
        },
    }
    // 把除 init 外的所有 options 的参数传给 object
    for (let key in options) {
        if (key !== 'init') {
            object[key] = options[key]
        }
    }
    return object
}