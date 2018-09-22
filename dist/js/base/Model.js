'use strict';

// Model 办事，我放心
// 通过全局函数 window 引入 Model 便于所有 model 调用
// 提供三个参数：Options、resourceName 和 object
window.Model = function (Options) {
    var resourceName = Options.resourceName;
    return {
        init: function init() {
            var APP_ID = '2zeITbbU6cgHT0mdBscQtmp0-gzGzoHsz';
            var APP_KEY = 'iByF5Dy55tJodAoxC4cxwAwx';

            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            });
        },
        fetch: function fetch() {
            var query = new AV.Query(resourceName);
            return query.find();
        },
        //创建数据
        save: function save(object) {
            var X = AV.Object.extend(resourceName);
            var x = new X();
            return x.save(object);
        }
    };
};