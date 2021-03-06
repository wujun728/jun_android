//工具函数库
const now = () => {
	return parseInt(new Date().getTime() / 1000)
}

const toTimestamp = t => {
	return parseInt(new Date(t).getTime() / 1000)
}

const relativeTime = t => {

	let timestamp = toTimestamp(t)
	let n = now()
	let diff = n - timestamp
	let minute = 60;
	let hour = minute * 60;
	let day = hour * 24;
	let month = day * 30;

	let monthC = diff / month;
	let dayC = diff / day;
	let hourC = diff / hour;
	let minC = diff / minute;

	if (monthC > 12) {
		return parseInt(monthC / 12) + " 年前";
	} else if (monthC >= 1) {
		return parseInt(monthC) + " 月前";
	} else if (dayC >= 1) {
		return parseInt(dayC) + " 天前";
	} else if (hourC >= 1) {
		return parseInt(hourC) + " 小时前";
	} else if (minC >= 1) {
		return parseInt(minC) + " 分钟前";
	}
	return '刚刚';
}

const toastError = (content) => {
	uni.showToast({
		title: content,
		icon: 'none',
		duration: 3000
	})
}

const toastSuccess = (content) => {
	uni.showToast({
		title: content,
	})
}

//设置手机通知栏字体颜色
const setBarColor = (black = false) => {
	if (black) {
		uni.setNavigationBarColor({
			frontColor: '#000000',
			backgroundColor: '#FAFAFA'
		});
	} else {
		uni.setNavigationBarColor({
			frontColor: '#ffffff',
			backgroundColor: '#FAFAFA'
		});
	}
}


module.exports = {
	now,
	toTimestamp,
	relativeTime,
	setBarColor,
	toastError,
	toastSuccess
}
