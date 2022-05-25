const express = require('express')
const app = express()
const indexRouter = require('./routes/index')
const cors = require('cors')

app.use(cors())
app.use('/', indexRouter)

app.listen(3000)
