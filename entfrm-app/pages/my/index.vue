<template>
	<view class="my-box" :class="show?'show':''">
		<view class="bg-gradual-red head-box">
			<!--标题栏-->
			<!--小程序端不显示-->
			<!-- #ifndef MP -->
			<bar-title :isBack="false" :fixed="false">
				<block slot="content">我 的</block>
				<block slot="right">
					<text class="cuIcon-settings" @tap="setupTap" />
				</block>
			</bar-title>
			<!-- #endif -->

			<!--用户信息-->
			<view class="user-info-box">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" :style="{'backgroundImage': 'url(' + avatar + ')'}" />
						<view class="content text-xl">
							<view class="text-white">
								<text class="margin-right">{{nickName}}</text>
							</view>
							<view class="text-white-bg text-sm">
								<text class="text-border-x">关注 {{follow}}</text>
								<text>粉丝 {{fans}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!--个人签名-->
			<view class="text-sm user-info-tip-box" @tap="signatureTap">
				<view class="text-cut">这家伙很懒，什么都不说~</view>
				<text class="cuIcon-right icon" />
			</view>
		</view>


		<view class="view-content">
			<!--知识库-->
			<view class="padding-xs bg-white user-info-order-box">
				<view class="text-black text-lg text-bold padding-sm">知识库</view>
				<view class="cu-list grid col-4 no-border">
					<view class="cu-item">
						<view class="text-xxl text-black">5</view>
						<text class="text-sm">我发布的</text>
					</view>
					<view class="cu-item">
						<view class="text-xxl text-black">1</view>
						<text class="text-sm">我收藏的</text>
					</view>
					<view class="cu-item">
						<view class="text-xxl text-black">2</view>
						<text class="text-sm">我关注的</text>
					</view>
					<view class="cu-item">
						<view class="text-xxl text-black">3</view>
						<text class="text-sm">我的粉丝</text>
					</view>
				</view>
			</view>

			<!--代办事项-->
			<view class="padding-xs bg-white margin-top user-info-money-box">
				<view class="text-black text-lg text-bold padding-sm">代办事项</view>
				<view class="grid col-2 money-col">
					<view class="money-item">
						<view class="money-item-view">
							<view class="cu-avatar lg" style="background-image:url(/static/images/msg/1.png);" />
							<view class="money-content">
								<view class="text-black text-cut">发布新版本</view>
								<view class="text-gray text-sm text-cut">entfrm1.1.0</view>
							</view>
						</view>
					</view>
					<view class="money-item">
						<view class="money-item-view">
							<view class="cu-avatar lg" style="background-image:url(/static/images/msg/4.png);" />
							<view class="money-content">
								<view class="text-black text-cut">BUG修复</view>
								<view class="text-gray text-sm text-cut">持续bug修复</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!--常用工具-->
			<view class="padding-xs bg-white margin-top user-info-tools-box">
				<view class="padding-sm tools-view">
					<view class="text-black text-bold text-lg tools-title">常用工具</view>
					<view class="text-gray text-sm tools-right">
						<text>更多</text>
						<text class="cuIcon-right" />
					</view>
				</view>

				<view class="tools-list-box">
					<view class="cu-list grid col-4 no-border">
						<block v-for="(item,index) in toolsList" :key="index">
							<view class="cu-item" v-if="index < 12" @tap="gridTap(item)">
								<view class="text-black" :class="['cuIcon-' + item.icon]" />
								<text>{{item.name}}</text>
							</view>
						</block>
					</view>
				</view>

			</view>

		</view>

		<!--占位底部距离-->
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	import barTitle from '@/components/basics/bar-title';

	import _my_data from '@/static/data/my.js'; //虚拟数据
	import _tool from '@/util/tools.js'; //工具函数
	export default {
		name: 'my',
		components: {
			barTitle
		},
		data() {
			return {
				nickName: '',
				avatar: '',
				follow: 0,
				fans: 0,
				toolsList: [],
				login: false,
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
				//通知他妈的滚动了。
				this.setPageScroll(this.scrollY);
			},
			scrollBottom() {
				if (this.scrollBottom != 0) {
					//通知他妈的触底了
					this.setReachBottom();
				}
			},
		},
		created() {
			//加载虚拟数据
			this.toolsList = _my_data.toolsListData();
			this.avatar = this.$store.getData('avatar');
			this.nickName = this.$store.getData('nickName');
			console.log(this.avatar)
		},
		mounted() {
			_tool.setBarColor(false);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
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
			signatureTap() {

			},
			setupTap() {
				/* this.$store.clear()
				uni.navigateTo({
					url: "/pages/login/login"
				}); */
				uni.showToast({
					title: '设置',
					duration: 2000
				});
			},
			gridTap(item) {
				if (item.name == '设置') {
					this.setupTap();
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-box {
		width: 100%;
		display: none;

		.head-box {
			padding-top: 0;
			padding-bottom: 72.72rpx;

			.user-info-box {
				/* #ifdef MP */
				padding-top: calc(var(--status-bar-height) + 50rpx);

				/* #endif */
				.login-user-view {
					position: relative;
					text-align: center;

					.login-user-avatar-view {
						position: relative;
						margin-bottom: 18.18rpx;
					}
				}

				.cu-list.menu-avatar>.cu-item {
					background-color: inherit;

					.content {
						width: calc(100% - 94.54rpx - 59.99rpx - 20rpx);

						.text-white-bg {
							color: #e8e8e8;

							.text-border-x {
								margin-right: 25.45rpx;
								position: relative;

								&:after {
									position: absolute;
									background: #dddddd;
									top: 5.45rpx;
									width: 1.81rpx;
									right: -12.72rpx;
									height: 16.36rpx;
									content: " ";
								}
							}
						}
					}

					&:after {
						width: 0;
						height: 0;
						border-bottom: 0;
					}
				}

				.cu-list.menu-avatar>.cu-item .content>view:first-child {
					font-size: 34.54rpx;
				}
			}

			.user-info-num-box {
				.cu-list.grid.no-border {
					padding: 0;
				}

				.cu-list.grid.no-border>.cu-item {
					padding-top: 27.27rpx;
					padding-bottom: 9.09rpx;
				}

				.cu-list.grid {
					background-color: inherit;
				}

				.cu-list.grid>.cu-item text {
					color: #e8e8e8;
					font-size: 20rpx;
					line-height: 27.27rpx;
				}
			}

			.user-info-tip-box {
				position: relative;
				margin: 18.18rpx 27.27rpx;
				border-radius: 9.09rpx;
				padding: 18.18rpx 27.27rpx;
				background: #F5BF29;
				background-image: linear-gradient(45deg, #D6B458, #F5BF29);

				.text-cut {
					padding-right: 45.45rpx;
				}

				.icon {
					position: absolute;
					right: 27.27rpx;
					top: 23.63rpx;
				}
			}
		}

		.view-content {
			padding: 0 27.27rpx 54.54rpx;
			margin-top: -63.63rpx;

			.user-info-order-box {
				border-radius: 18.18rpx;

				.cu-list.grid.no-border {
					padding: 0;
				}

				.cu-list.grid.no-border>.cu-item {
					padding-bottom: 9.09rpx;
				}
			}

			.cu-list.grid>.cu-item text {
				color: inherit;
			}

			.user-info-money-box {
				border-radius: 18.18rpx;

				.money-col {
					padding: 0 9.09rpx 9.09rpx;

					.money-item {
						position: relative;
						padding: 9.09rpx;

						.money-item-view {
							border: 1.81rpx solid #f3f2f3;
							border-radius: 18.18rpx;
							position: relative;
							padding: 9.09rpx;

							.cu-avatar {
								position: absolute;
								left: 9.09rpx;
							}

							.money-content {
								position: relative;
								margin-left: 109.09rpx;
								margin-bottom: 27.27rpx;
								top: 12.72rpx;
							}
						}
					}
				}
			}

			.user-info-tools-box {
				border-radius: 18.18rpx;

				.tools-view {
					position: relative;

					.tools-title {
						padding-right: 81.81rpx;
					}

					.tools-right {
						position: absolute;
						right: 9.09rpx;
						bottom: 23.63rpx;
					}
				}

			}
		}
	}

	.my-box.show {
		display: block;
	}
</style>
