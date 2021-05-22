<template>
	<view>
		<web-view :src="url" :progress="false">
		</web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'http://www.entfrm.com/'
			}
		},
		onLoad(val) {
			this.url = decodeURIComponent(val.url) //解码网址
		},
		methods: {

		}
	}
</script>

<style>

</style>
