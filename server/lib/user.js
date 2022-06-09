const Mongolass = require('mongolass')
const mongolass = new Mongolass()

exports.user = mongolass.model('user', {
	name: {
		type: 'string'
	},
	email: {
		type: 'string'
	},
	password: {
		type: 'string'
	}
})
