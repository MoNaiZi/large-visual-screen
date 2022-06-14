const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb://localhost:27017/large-visual-screen'
module.exports = function db() {
	return new Promise((resolve, reject) => {
		MongoClient.connect(url, {
			useUnifiedTopology: true
		}, async (err, db) => {
			const test = db.db('test')
			const largescreendata = test.collection('largescreendata')
			const users = test.collection('users')
			// users.findOne({
			// 	_id: ObjectId('62a302d08e22816128d20a50')
			// }).then(res => {
			// 	console.log('res', res)
			// })
			resolve({
				largescreendata,
				users
			})
		})
	})

}
