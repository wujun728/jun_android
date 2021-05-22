<template>
	<view class="news-box" :class="show?'show':''">
		<!--标题栏-->
		<bar-title bgColor="bg-white" :isBack="false" @rightTap="barTitleRightTap">
			<block slot="content">消 息</block>
			<block slot="right">
				<text class="cuIcon-info" />
			</block>
		</bar-title>

		<!--关注-->
		<view class="cu-bar bg-white follow-box">
			<view class="action action-text-cut">
				<view class="text-cut-2 text-sm">
					开源不易，如果对您有帮助，请“Star” 支持一下
				</view>
			</view>
			<view class="action" @tap="follow">
				<button class="cu-btn sm bg-red">立即关注</button>
			</view>
		</view>

		<!--宫格菜单-->
		<view class="margin-bottom grid-menu">
			<view class="bg-white cu-list grid col-3 no-border">
				<view class="cu-item" @tap="goHome">
					<view class="cu-avatar lg round" style="background-image:url(/static/images/msg/h.png);" />
					<view class="margin-top-sm text-sm">官网</view>
				</view>
				<view class="cu-item" @tap="goDoc">
					<view class="cu-avatar lg round" style="background-image:url(/static/images/msg/2.png);" />
					<view class="margin-top-sm text-sm">文档</view>
				</view>
				<view class="cu-item" @tap="goQQ">
					<view class="cu-avatar lg round" style="background-image:url(/static/images/msg/3.png);" />
					<view class="margin-top-sm text-sm">客服</view>
				</view>
			</view>
		</view>

		<!--消息列表-->
		<view class="bg-white news-list-box">
			<view class="margin-bottom cu-list menu-avatar">

				<view class="cu-item" :class="modalName=='move-box-'+ 0?'move-cur':''" @touchstart="ListTouchStart" @touchmove="ListTouchMove"
				 @touchend="ListTouchEnd" :data-target="'move-box-' + 0" @tap="tapNews(0)">
					<view class="cu-avatar round" style="background-image:url(/static/images/msg/4.png);">
						<view class="cu-tag badge" v-if="msgInfo.count > 0" />
					</view>
					<view class="content">
						<view class="text-black">通知助手</view>
						<view class="text-gray text-sm text-cut">{{msgInfo.info}}</view>
						<view class="text-gray text-sm">{{msgInfo.createTime}}</view>
					</view>
					<view class="move">
						<view class="bg-grey">置顶</view>
						<view class="bg-red">删除</view>
					</view>
				</view>

				<view class="cu-item" :class="modalName=='move-box-'+ 1?'move-cur':''" @touchstart="ListTouchStart" @touchmove="ListTouchMove"
				 @touchend="ListTouchEnd" :data-target="'move-box-' + 1" @tap="tapNews(1)">
					<view class="cu-avatar round" style="background-image:url(/static/images/msg/e.png);">
						<view class="cu-tag badge" />
					</view>
					<view class="content">
						<view class="text-black">entfrm助手</view>
						<view class="text-gray text-sm text-cut">欢迎使用entfrm开发平台!”</view>
						<view class="text-gray text-sm">刚刚</view>
					</view>
					<view class="move">
						<view class="bg-grey">置顶</view>
						<view class="bg-red">删除</view>
					</view>
				</view>

			</view>
		</view>

		<!--占位底部距离-->
		<view class="cu-tabbar-height" />
	</view>
</template>

<script>
	import barTitle from '@/components/basics/bar-title';
	import _tool from '@/util/tools.js'; //工具函数
	export default {
		name: 'msg',
		components: {
			barTitle
		},
		data() {
			return {
				msgInfo: {
					count: 0,
					info: '暂无',
					createTime: new Date()
				},
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null
			}
		},
		props: {
			show: {
				type: Boolean,
				default: true
			},
			scrollY: {
				type: Number,
				default: 0
			},
			scrollBottom: {
				type: Number,
				default: 0
			}
		},
		watch: {
			scrollY() {
				//通知滚动了。
				this.setPageScroll(this.scrollY);
			},
			scrollBottom() {
				if (this.scrollBottom != 0) {
					//通知触底了
					this.setReachBottom();
				}
			},
		},
		created() {
			//判断是否登录
			if (!this.$store.getData('access_token')) {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}

			this.getMsgInfo()
		},
		mounted() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		onShow() {
			this.getMsgInfo()
		},
		methods: {
			//页面被滚动
			setPageScroll(scrollTop) {
				//console.log(scrollTop);
			},
			//触底了
			setReachBottom() {
				console.log('触底了');
			},
			getMsgInfo() {
				this.$http.request("/msg/infoPush/msgInfo").then(res => {
					if (res.code === 0) {
						console.log(res.data)
						this.msgInfo = res.data
						if (this.msgInfo) {
							this.msgInfo.createTime = _tool.relativeTime(this.msgInfo.createTime)
						}
					}
				});
			},
			barTitleRightTap() {
				uni.showToast({
					title: '感谢您的使用',
					duration: 2000
				});
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
			//被点击
			tapNews(index) {
				console.log(index);
				if (index == 0) {
					uni.navigateTo({
						url: '/pages/msg/notice',
					});
				} else if (index == 1) {
/* 					uni.navigateTo({
						url: '/pages/msg/notice',
					}); */
				}
			},
			follow() {
				const url=  encodeURIComponent('https://gitee.com/entfrm/entfrm-boot')
				//#ifdef APP-PLUS
				uni.navigateTo({
					url: '/pages/web/index?url=' + url
				});
				//#endif
				//#ifdef H5
				location.href = url
				//#endif
			},
			goHome() {
				const url= encodeURIComponent('http://www.entfrm.com/')
				//#ifdef APP-PLUS
				uni.navigateTo({
					url: '/pages/web/index?url=' + url
				});
				//#endif
				//#ifdef H5
				location.href = url
				//#endif
			},
			goDoc() {
				const url= encodeURIComponent('http://www.entfrm.com/doc')
				
				//#ifdef APP-PLUS
				uni.navigateTo({
					url: '/pages/web/index?url=' + url
				});
				//#endif
				//#ifdef H5
				location.href = url
				//#endif
			},
			goQQ() {
				const url= encodeURIComponent('http://wpa.qq.com/msgrd?v=3&uin=1029861695&site=qq&menu=yes')
				//#ifdef APP-PLUS
				uni.navigateTo({
					url: '/pages/web/index?url=' + url
				});
				//#endif
				//#ifdef H5
				location.href = url
				//#endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	.news-box {
		width: 100%;
		display: none;

		.follow-box {
			.action-text-cut {
				width: 70%;
			}
		}

		.grid-menu {
			.cu-list.grid.no-border>.cu-item {
				.cu-avatar {
					margin: 0 auto;
				}
			}
		}

		.news-list-box {
			padding: 0 9.09rpx;

			.cu-list.menu-avatar>.cu-item>.cu-avatar {
				width: 81.81rpx;
				height: 81.81rpx;
			}

			.cu-list.menu-avatar>.cu-item {
				height: 163.63rpx;
				align-items: inherit;

				.cu-avatar {
					margin-top: 25.45rpx;

					.cu-tag.badge {
						width: 21.81rpx;
						height: 21.81rpx;
						top: 0;
						right: 0;
						border: 1.81rpx solid #fff;
					}
				}

				.content {
					left: 136.36rpx;
					margin-top: 18.18rpx;
					width: calc(100% - 90.9rpx - 54.54rpx - 18.18rpx);
					line-height: 1.7em;

					.cu-tag {
						padding: 0 3.63rpx;

						text {
							position: relative;
							top: -2rpx;
						}
					}
				}

				&:after {
					width: 0;
					height: 0;
					border-bottom: 0;
				}
			}

			.cu-list.menu-avatar>.cu-item.goods {
				.content {
					width: calc(100% - 309.09rpx);
				}

				.action {
					position: absolute;
					right: 23.63rpx;
					width: 127.27rpx;

					.cu-avatar {
						width: 127.27rpx;
						height: 127.27rpx;
						margin-top: 18.18rpx;
					}
				}
			}
		}
	}

	.news-box.show {
		display: block;
	}
</style>
