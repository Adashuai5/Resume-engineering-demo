var APP_ID = '2zeITbbU6cgHT0mdBscQtmp0-gzGzoHsz';
var APP_KEY = 'iByF5Dy55tJodAoxC4cxwAwx';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

var query = new AV.Query('Message');
query.find().then(function (messages) {
  let array = messages.map((item) => item.attributes)
  array.forEach((item) => {
    let li = document.createElement('li')
    li.innerText = item.content
    let messageList = document.querySelector('#messageList') 
    messageList.appendChild(li)
  })
})

let myForm = document.querySelector('#postMessageForm')
myForm.addEventListener('submit', function (e) {
  e.preventDefault()
  let content = myForm.querySelector('input[name=content]').value
  var Message = AV.Object.extend('Message');
  var message = new Message();
  message.save({
    content: content
  }).then(function (object) {
    window.location.reload()
    console.log(object)
  })
})

// //创建 TestObject 表
// var TestObject = AV.Object.extend('TestObject');
// //在表中创建一行数据
// var testObject = new TestObject();
// //数据内容是 words:'Hello World'
// //若保存成功，则运行 alert('')
// testObject.save({
//   words: 'Hello World!'
// }).then(function(object) {
//   alert('LeanCloud Rocks!');
// })