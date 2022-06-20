const ObjectId = require('mongodb').ObjectId;
const handlerLargescreendata = function (data) {
	const isAuto = data.isAuto === 'true' ? true : false
	data.isAuto = typeof data.isAuto === 'string' ? isAuto : data.isAuto
	data.createdAt = new Date()
	for (let key in data) {
		if (['mainW', 'mainH', 'containerScale'].includes(key)) {
			data[key] = Number(data[key])
		}
	}
	const list = data.list || []
	for (let item of list) {
		item.z = Number(item.z || 0)
		item.x = Number(item.x || 0)
		item.y = Number(item.y || 0)
		item.w = Number(item.w || 0)
		item.h = Number(item.h || 0)
		let cptDataForm = item.options.cptDataForm || {}
		if (cptDataForm.hasOwnProperty('pollTime')) {
			cptDataForm.pollTime = Number(cptDataForm.pollTime)
		}
		let dataText = cptDataForm.dataText
		if (Array.isArray(dataText)) {
			for (let j of dataText) {
				j.value = Number(j.value)
			}
		}
	}
}
module.exports = {
	async saveData(req, res) {
		const body = req.body
		handlerLargescreendata(body)
		let msg = '保存失败'
		let code = 1
		let id = ''
		const result = await global.db.largescreendata.insertOne(body)

		if (result && result.insertedId) {
			msg = '保存成功'
			code = 0
			id = result.insertedId
		}
		res.send({
			msg,
			code,
			id
		})

	},
	async getData(req, res) {
		const _id = ObjectId(req.query.id)
		let where = {
			_id
		}
		const result = await global.db.largescreendata.findOne(where)
		const list = JSON.parse(JSON.stringify(result.list))
		delete result.list
		res.send({ list, data: result })
	},
	async getDataList(req, res) {
		const _id = req.query.id
		let where = {
			createdUserId: _id
		}
		const list = await global.db.largescreendata.find(where).toArray()
		res.send(list)
	},
	async remove(req, res) {
		const _id = req.body.id
		let where = {
			_id: ObjectId(_id)
		}
		let msg = '删除失败'
		let code = 1
		const result = await global.db.largescreendata.deleteOne(where)
		console.log('result', result)
		if (result && result.acknowledged && result.deletedCount > 0) {
			msg = '删除成功'
			code = 0
		}
		res.send({
			msg,
			code
		})
	},
	async update(req, res) {
		const updateData = req.body.data
		let where = { _id: ObjectId(req.body.id) }
		let msg = '更新失败'
		let code = 1
		delete updateData._id
		handlerLargescreendata(updateData)
		const result = await global.db.largescreendata.replaceOne(where, updateData)

		if (result && result.acknowledged) {
			msg = '更新成功'
			code = 0
		}
		res.send({
			msg,
			code
		})

	}
}
