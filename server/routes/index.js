const express = require('express')
const Qs = require('qs')
const router = express.Router()
const largeScreenData = require('../api/largeScreenData')
const user = require('../api/user')
const ObjectId = require('mongodb').ObjectId;

router.get('/', async (req, res) => {
	const result = await largeScreenData.getData({
		_id: '629eb8475f12dc5b80d905ee'
	})
	res.send('hello, express11')
})

router.post('/save', async (req, res) => {
	const body = req.body
	const isAuto = body.isAuto === 'true' ? true : false
	body.isAuto = typeof body.isAuto === 'string' ? isAuto : body.isAuto

	for (let key in body) {
		if (['mainW', 'mainH', 'containerScale'].includes(key)) {
			body[key] = Number(body[key])
		}
	}
	console.log('body', body)
	let msg = '保存成功'
	let code = 0
	const {
		result
	} = await largeScreenData.saveData(body)
	if (!result || !result.ok) {
		code = 1
		msg = '保存失败'
	}
	res.send({
		msg,
		code
	})
})

router.post('/login', async (req, res) => {
	return await user.login(req, res)
})

router.post('/register', async (req, res) => {
	return await user.register(req, res)
})


module.exports = router
