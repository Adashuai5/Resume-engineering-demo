! function () {
	var view = document.querySelector('section.message')

	var controller = {
		view: null,
		messageList: null,
		init: function (view) {
			this.view = view
			this.messageList = view.querySelector('#messageList')
			this.form = view.querySelector('form')
			this.initAV()
			this.loadMessages()
			this.bindEvents()
		},
		initAV: function () {
			var APP_ID = '2zeITbbU6cgHT0mdBscQtmp0-gzGzoHsz'
			var APP_KEY = 'iByF5Dy55tJodAoxC4cxwAwx'

			AV.init({
				appId: APP_ID,
				appKey: APP_KEY
			})
		},
		loadMessages: function () {
			var query = new AV.Query('Message');
			query.find().then((messages) => {
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
			var Message = AV.Object.extend('Message');
			var message = new Message();
			message.save({
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
	}
	controller.init(view)
}.call()