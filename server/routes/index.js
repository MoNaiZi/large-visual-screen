const express = require('express')
const router = express.Router()
const largeScreenData = require('../api/largeScreenData')

router.get('/', function(req, res) {
	res.send('hello, express11')
})

router.post('/save', (req, res) => {
	console.log('body', req.body)
})



module.exports = router
