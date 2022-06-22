const express = require('express')
const app = express()
const indexRouter = require('./routes/index')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./config/db')
const fs = require('fs'); //立即执行函数需要引入


(async () => {
	global.db = await db()

})()


app.use(bodyParser.urlencoded({
	limit: '20mb',
	extended: true
}))
app.use(bodyParser.json({ limit: '20mb' }));
app.use(cors())
app.use('/', indexRouter)

app.listen(3000)
