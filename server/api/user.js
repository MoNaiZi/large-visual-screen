module.exports = {
	async login(req, res) {
		const data = req.body
		const name = data.name
		const findResult = await global.db.users.findOne({
			name
		})
		let code = 0,
			msg = "登录成功"
		if (!findResult) {
			code = 1
			msg = '请先注册'
		} else if (findResult.password != data.password) {
			code = 1
			msg = '密码错误'
		}
		res.send({
			msg,
			code
		})
	},
	async register(req, res) {
		const data = req.body
		const findResult = await global.db.users.findOne(data)
		let code = 0,
			msg = "注册成功"
		if (findResult) {
			code = 1
			msg = "已有账户，请登录"
		} else {
			try {
				const result = await global.db.users.insertOne(data)
				console.log('创建结果', result)
			} catch (err) {
				console.log('err', err)
				const errCode = err.code
				const keyValue = err.keyValue
				msg = `${keyValue.email || keyValue.name}已注册`
				code = 1

			}

		}
		res.send({
			msg,
			code
		})
	}
}
