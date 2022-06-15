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
	return await largeScreenData.saveData(req, res)
})

router.get('/getDataList', async (req, res) => {
	return await largeScreenData.getDataList(req, res)
})

router.get('/getData', async (req, res) => {
	return await largeScreenData.getData(req, res)
})

router.post('/remove', async (req, res) => {
	return await largeScreenData.remove(req, res)
})

router.post('/update', async (req, res) => {
	return await largeScreenData.update(req, res)
})

router.post('/login', async (req, res) => {
	return await user.login(req, res)
})

router.post('/register', async (req, res) => {
	return await user.register(req, res)
})


module.exports = router
