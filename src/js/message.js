! function () {
	// MVC 的 V
	// 这里 window.View 的 window 可以省略，是默认的
	let view = View('section.message')
	//添加 M
	let model = Model({
		resourceName: 'Message'
	})
	// MVC 的 C
	// 1.controller === object
	var controller = Controller({
		init: function () {
			this.messageList = view.querySelector('#messageList')
			this.form = view.querySelector('form')
			this.loadMessages()
			// 这里的 this 是 object，但是 object 没有上面参数
			// 所以才要 for...in...遍历一下，让 object 有这些 controller 独有的参数
		},
		loadMessages: function () {
			this.model.fetch().then((messages) => {
				let array = messages.map((item) => item.attributes)
				array.forEach((item) => {
					let li = document.createElement('li')
					li.innerText = `${item.name} : ${item.content}`
					this.messageList.appendChild(li)
				})
			})
		},
		bindEvents: function () {
			this.form.addEventListener('submit', (e) => {
				e.preventDefault()
				this.saveMessage()
			})
		},
		saveMessage: function () {
			let myForm = this.form
			let content = myForm.querySelector('input[name=content]').value
			let name = myForm.querySelector('input[name=name]').value
			this.model.save({
				name: name,
				content: content
			}).then(function (object) {
				let li = document.createElement('li')
				li.innerText = `${object.attributes.name} : ${object.attributes.content}`
				let messageList = document.querySelector('#messageList')
				messageList.appendChild(li)
				myForm.querySelector('input[name=content]').value = ''
				console.log(object)
			})
		}
	})
	// 2.controller.init(view, model)
	controller.init(view, model)
}.call()