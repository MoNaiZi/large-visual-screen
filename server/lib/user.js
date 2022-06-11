const Mongolass = require('mongolass')
const mongolass = new Mongolass()

exports.user = mongolass.model('user', {
	name: {
		type: 'string',
		require: true
	},
	email: {
		type: 'string',
		require: true
	},
	password: {
		type: 'string'
	}
})
