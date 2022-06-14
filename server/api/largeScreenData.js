const ObjectId = require('mongodb').ObjectId;
module.exports = {
	saveData(data) {
		return global.db.largescreendata.insertOne(data)
	},
	async getData(req, res) {
		const _id = ObjectId(req.query.id)
		let where = {
			_id
		}
		const result = await global.db.largescreendata.findOne(where)
		res.send(result)
	},
	async getDataList(req, res) {
		const _id = ObjectId(req.query.id)
		let where = {
			createdUserId: _id
		}
		const list = await global.db.largescreendata.find(where).toArray()
		res.send(list)
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
