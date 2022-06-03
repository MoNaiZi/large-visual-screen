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
	}
})
exports.largeScreenData.index({
	_id: 1
}).exec()
