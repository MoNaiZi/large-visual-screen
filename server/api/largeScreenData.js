const db = require('../lib/mongo').largeScreenData


module.exports = {
	saveData(data) {
		return db.create(data).exec()
	}
}
