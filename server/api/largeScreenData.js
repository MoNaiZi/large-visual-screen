const db = require('../lib/mongo').largeScreenData


module.exports = {
	saveData(data) {
		return db.create(data).exec()
	},
	getData(data) {
		return db.findOne(data).exec()
	},
	getDataList(data) {
		return db.find(data).exec()
	},
	remove(data) {
		return db.findOne(data).remove().exec()
	},
	update(data) {
		const _id = data._id
		delete data._id
		const updateData = data
		return db.update({
			_id
		}, updateData).exec()
	}
}
