const db = require('../lib/mongo').user

module.exports = {
	login(data) {
		return db.findOne(data).exec()
	},
	register(data) {
		return db.create(data).exec()
	}
}
