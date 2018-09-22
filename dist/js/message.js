'use strict';

!function () {
	// MVC 的 V
	// 这里 window.View 的 window 可以省略，是默认的
	var view = View('section.message');
	//添加 M
	var model = Model({
		resourceName: 'Message'
	});
	// MVC 的 C
	// 1.controller === object
	var controller = Controller({
		init: function init() {
			this.messageList = view.querySelector('#messageList');
			this.form = view.querySelector('form');
			this.loadMessages();
			// 这里的 this 是 object，但是 object 没有上面参数
			// 所以才要 for...in...遍历一下，让 object 有这些 controller 独有的参数
		},
		loadMessages: function loadMessages() {
			var _this = this;

			this.model.fetch().then(function (messages) {
				var array = messages.map(function (item) {
					return item.attributes;
				});
				array.forEach(function (item) {
					var li = document.createElement('li');
					li.innerText = item.name + ' : ' + item.content;
					_this.messageList.appendChild(li);
				});
			});
		},
		bindEvents: function bindEvents() {
			var _this2 = this;

			this.form.addEventListener('submit', function (e) {
				e.preventDefault();
				_this2.saveMessage();
			});
		},
		saveMessage: function saveMessage() {
			var myForm = this.form;
			var content = myForm.querySelector('input[name=content]').value;
			var name = myForm.querySelector('input[name=name]').value;
			this.model.save({
				name: name,
				content: content
			}).then(function (object) {
				var li = document.createElement('li');
				li.innerText = object.attributes.name + ' : ' + object.attributes.content;
				var messageList = document.querySelector('#messageList');
				messageList.appendChild(li);
				myForm.querySelector('input[name=content]').value = '';
				console.log(object);
			});
		}
	});
	// 2.controller.init(view, model)
	controller.init(view, model);
}.call();