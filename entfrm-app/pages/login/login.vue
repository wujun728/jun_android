<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="wrapper">
			<view class="left-top-sign">entfrm-app</view>
			<!-- <view class="welcome">
                登录
            </view> -->
			<view class="input-content">
				<view class="cu-form-group" style="border: 1px solid whitesmoke;margin-bottom: 20px;border-radius: 30px">
					<view class="title">账号</view>
					<input :value="userName" placeholder="请输入账号" maxlength="60" data-key="userName" @input="inputChange" />
				</view>
				<view class="cu-form-group" style="border: 1px solid whitesmoke;border-radius: 30px">
					<view class="title">密码</view>
					<input type="password" placeholder="请输入密码" maxlength="30" :value="password" data-key="password" @input="inputChange"
					 @confirm="toLogin" />
					<text class="send-msg" @click="forget">忘记密码</text>
				</view>
			</view>
			<button :class="userName&&password?'confirm-btn':'confirm-btn1'" @click="toLogin">登录</button>
			<view style="margin-top: 32px;text-align: center">
				<view>没有账号？
					<text style="color: #ffd04b" @click="register()">立即注册</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName: '',
				password: '',
				sending: false,
				sendTime: '获取验证码',
				count: 60,
			}
		},
		onBackPress(e) {
			return true;
		},
		methods: {
			forget() {
				uni.showModal({
					showCancel: false,
					title: '提示',
					content: '忘记密码',
				});
			},
			register() {
				/* uni.navigateTo({
				    url: '/pages/public/register'
				}); */
				uni.showModal({
					showCancel: false,
					title: '提示',
					content: '请到官网注册',
				});
			},
			inputChange(e) {
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack() {
				uni.navigateBack();
			},

			toLogin() {
				this.$store.clear();
				const {
					userName,
					password
				} = this;
				if (!userName && !password) {
					return;
				}

				this.$http.request("/oauth/token", {
					username: userName,
					password: password,
					grant_type: 'password',
					scope: 'server'
				}, 'GET', {
					'Content-Type': "application/json;charset=utf-8",
					'Authorization': 'Basic ZW50ZnJtOmVudGZybQ=='
				}).then(res => {

					this.$store.setData("access_token", res.access_token);

					setTimeout(() => {

						this.$http.request("/system/user/info").then(res => {

							if (res.code === 0) {

								this.$store.setData("avatar", res.data.avatar ? this.$http.baseUrl() + res.data.avatar : '/static/logo.png');
								this.$store.setData("nickName", res.data.nickName ? res.data.nickName : res.data.phone);

								uni.switchTab({
									url: '/pages/msg/index'
								});

							} else {
								uni.showModal({
									showCancel: false,
									title: '提示',
									content: res.msg,
								});
								this.$store.clear();
							}
						});
					}, 500);

				});
			}
		},

	}
</script>

<style lang='scss'>
	page {
		background: #fff;
	}

	.send-msg {
		border-radius: 30px;
		color: black;
		background: white;
		height: 30px;
		font-size: 14px;
		line-height: 30px;
	}

	.container {
		top: 0;
		padding-top: 50px;
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: #fff;
	}

	.wrapper {
		position: relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 20px;
	}

	.back-btn {
		position: absolute;
		left: 20px;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 20px;
		font-size: 20px;
		color: #fff;
	}

	.left-top-sign {
		font-size: 50px;
		color: #ffd04b;
		position: relative;
		margin-bottom: 50px;
		text-align: center;
	}


	.right-top-sign {
		position: absolute;
		top: 40px;
		right: -15px;
		z-index: 95;

		&:before,
		&:after {
			display: block;
			content: "";
			width: 20px;
			height: 40px;
			background: #ffd04b;
		}

		&:before {
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}

		&:after {
			position: absolute;
			right: -198px;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}

	.left-bottom-sign {
		position: absolute;
		left: -270px;
		bottom: -320px;
		/*border: 100upx solid #d0d1fd;*/
		border-radius: 50%;
		padding: 90px;
	}

	.welcome {
		position: relative;
		left: 30px;
		top: -55px;
		font-size: 28px;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0, 0, 0, .3);
	}

	.input-content {
		padding: 0 20px;
	}

	.input-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 0 30px;
		background: #fff;
		height: 64px;
		border-radius: 4px;
		margin-bottom: 30px;

		&:last-child {
			margin-bottom: 0;
		}

		.tit {
			height: 30px;
			line-height: 28px;
			font-size: 26upx;
			color: #fff;
		}

		input {
			height: 40px;
			font-size: 30upx;
			color: #fff;
			width: 100%;
		}
	}

	.confirm-btn {
		width: 300px;
		height: 42px;
		line-height: 42px;
		border-radius: 30px;
		margin-top: 40px;
		background: #ffd04b;
		color: #fff;
		font-size: 30px;

		&:after {
			border-radius: 60px;
		}
	}

	.confirm-btn1 {
		width: 300px;
		height: 42px;
		line-height: 42px;
		border-radius: 30px;
		margin-top: 40px;
		background: whitesmoke;
		color: grey;
		font-size: 30px;

		&:after {
			border-radius: 60px;
		}
	}

	.forget-section {
		font-size: 26upx;
		color: #fff;
		text-align: center;
		margin-top: 40px;
	}

	.register-section {
		left: 0;
		margin-top: 30px;
		bottom: 30px;
		width: 100%;
		font-size: 26upx;
		color: #fff;
		text-align: center;

		text {
			color: #fff;
			margin-left: 10px;
		}
	}
</style>
