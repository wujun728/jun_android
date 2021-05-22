import store from './store.js'
import errorCode from './errorCode.js'

const baseUrl = "http://www.entfrm.com/pro";

module.exports = {
	baseUrl: function(){
		return baseUrl;
	},
	request: function(url, data = {}, method = 'GET', header = {}) {
		/* console.log(url)
		console.log(data)
		console.log(method) 
		console.log(header) */
		uni.showLoading({
			title: '加载中'
		});

		header = header || "application/json";

		let token = store.getData('access_token')

		if (token) header['Authorization'] = 'Bearer ' + token

		/* if (data) {
			for (let property in data) {
				if (data[property] == null) {
					delete data[property]
				}
			}
		} */

		return new Promise((resolve, reject) => {
			uni.request({
				url: baseUrl + url,
				data,
				method,
				header,
				sslVerify: false,
				success: (res) => {

					uni.hideLoading();

					const message = errorCode[res.statusCode] || res.data.msg || errorCode['default']

					if (res.statusCode == 200) {
						console.log(res.data)
						resolve(res.data)
					} else if (res.statusCode == 401) {
						uni.showToast({
							icon: 'none',
							title: message,
							duration: 1500
						});
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/login/login',
							});
						}, 1500)
						//清空用户信息
						store.clear()
					} else {
						uni.showToast({
							icon: 'none',
							title: message,
							duration: 1500
						});
					}
				},
				fail: (err) => {
					uni.hideLoading();
					console.log('request fail', err)
					uni.showToast({
						icon: 'none',
						title: err.errMsg,
						duration: 2000
					});
					reject(err)
				}
			})
		})
	},
};
