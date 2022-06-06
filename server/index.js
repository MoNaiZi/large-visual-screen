const express = require('express')
const app = express()
const indexRouter = require('./routes/index')
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())
app.use(cors())
app.use('/', indexRouter)

app.listen(3000)
