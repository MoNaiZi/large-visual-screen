module.exports = {
	saveData(data) {
		return global.db.largescreendata.insertOne(data)
	},
	getData(data) {
		return global.db.largescreendata.findOne(data)
	},
	getDataList(data) {
		return global.db.largescreendata.find(data)
	},
	remove(data) {
		return global.db.largescreendata.findOne(data).remove()
	},
	update(data) {
		const _id = data._id
		delete data._id
		const updateData = data
		return global.db.largescreendata.update({
			_id
		}, updateData).exec()
	}
}
