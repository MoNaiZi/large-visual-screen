<template>
	<div>
		<div class="bg">
			<div class="login_main">
				<div class="tab">
					<text>密码登录</text>
					<text>免费注册</text>
				</div>

				<el-form class="from" :model="loginForm" ref="login" label-width="0">
					<el-form-item prop="account" class="item"
						:verify="{ minLen: 8, maxLen: 16, typeOptions: ['字母|数字'] }">
						<el-input v-model="loginForm.account" placeholder="请输入账户名"></el-input>
					</el-form-item>
					<el-form-item prop="password" class="item" :verify="{ passwordOptions: [6, 18, '字母|数字'] }">
						<el-input v-model="loginForm.password" placeholder="输入密码登录" show-password></el-input>
					</el-form-item>

				</el-form>

				<div class="btn">
					<el-button style="width: 100%;height: 40px;" type="primary">登录</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loginForm: {}
			}
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .el-input__inner {
		border: 0;
		border-radius: 0;
		padding: 0;
		font-size: 16px;
		border-bottom: solid 1px #dcdee0 !important;
	}

	::v-deep .el-input__icon {
		font-size: 20px;
	}

	::v-deep .el-input__wrapper:hover {
		box-shadow: 0 0 0 0;
	}

	::v-deep .el-input__wrapper {
		box-shadow: 0 0 0 0 !important;
	}

	.from {
		margin: 30px 0px;

		.item {
			margin-top: 40px;
		}
	}

	.login_main {
		height: 36%;
		width: 35%;
		padding: 20px;
		background: #fff;

		div {
			width: 100%;
			display: flex;
			font-size: 19px;

			text:last-child {
				margin-left: 10px;
			}
		}
	}

	.bg {
		// background-image: url('https://t7.baidu.com/it/u=810585695,3039658333&fm=193&f=GIF');
		background: #a0a0a0;
		background-size: 100%;
		background-position: center;
		background-repeat: no-repeat;
		width: 100vw;
		height: 100vh;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
