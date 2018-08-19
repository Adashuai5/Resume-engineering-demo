// Model 办事，我放心
window.Model = function (Options) {
    let resourceName = Options.resourceName
    return {
        init: function () {
            var APP_ID = '2zeITbbU6cgHT0mdBscQtmp0-gzGzoHsz'
            var APP_KEY = 'iByF5Dy55tJodAoxC4cxwAwx'

            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            })
        },
        //获取所有数据
        fetch: function () {
            var query = new AV.Query(resourceName)
            return query.find() //Promise 对象
        },
        //创建数据
        save: function (object) {
            var X = AV.Object.extend(resourceName)
            var x = new X();
            return x.save(object)
        }
    }
}