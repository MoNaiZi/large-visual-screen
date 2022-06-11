const Mongolass = require('mongolass')
const mongolass = new Mongolass()
const moment = require('moment')
// mongolass.connect(config.mongodb)

exports.largeScreenData = mongolass.model('largeScreenData', {
	title: {
		type: 'string',
		require: true
	},
	isAuto: {
		type: 'boolean'
	},
	mainW: {
		type: 'number'
	},
	mainH: {
		type: 'number'
	},
	bg: {
		type: 'string'
	},
	containerScale: {
		type: 'number'
	},
	list: {
		type: 'array'
	},
	createdUserId: {
		type: 'string'
	},
	createdAt: {
		type: 'string'
	},
	updateAt: {
		type: 'string'
	},
	updatedUserId: {
		type: 'string'
	}
})
// exports.largeScreenData.index({
// 	_id: 1
// }).exec()
