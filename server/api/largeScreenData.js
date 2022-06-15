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
	async remove(req, res) {
		const _id = ObjectId(req.body.id)
		let where = {
			createdUserId: _id
		}
		const result = await global.db.largescreendata.findOne(where).remove()
		console.log('删除结果', result)
		res.send(result)
	},
	async update(req, res) {
		const _id = ObjectId(req.body.id)
		const updateData = req.body.data
		let where = {
			createdUserId: _id
		}
		const result = await global.db.largescreendata.update(where, updateData)
		console.log('更新结果', result)
		res.send(result)

	}
}
