<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">通知助手</block>
		</bar-title>

		<!--卡片区域-->
		<view v-if="msgList.length == 0" class="solids-bottom padding-xs flex align-center">
			<view class="flex-sub text-center">
				<view class="text-xsl padding">
					<text class=" cuIcon-warnfill text-green"></text>
				</view>
				<view class="padding">暂无数据</view>
			</view>
		</view>
		
		<view v-else class="cart-view-box"  v-for="(item,index) in msgList">
			<view class="text-gray text-center">{{item.createTime}}</view>
			<!--内容-->
			<view class="bg-white margin-top radius card-view">
				<view class="content-view">
					<view class="text-black text-cut">{{item.contentTitle}}</view>
					<view class="text-gray text-sm text-cut margin-tb-sm">{{item.content}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import barTitle from '@/components/basics/bar-title';
	import _tool from '@/util/tools.js'; //工具函数
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				msgList: [],
			}
		},
		onLoad() {
			this.getMsgList()
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		methods: {
			getMsgList() {
				this.$http.request("/msg/infoPush/msgList", {current: 1, size: 10}).then(res => {
					if (res.code === 0) {
						this.msgList = res.data
					}
				});
			}
		},
	}
</script>

<style lang="scss">
	.cart-view-box {
		padding: 36.36rpx 27.27rpx;

		.card-view {
			position: relative;
			border-radius: 18.18rpx;

			.head-img {
				width: 100%;
				height: 236.36rpx;
				border-radius: 9.09rpx 9.09rpx 0 0;
			}

			.content-view {
				padding: 27.27rpx;

				.view-text-box {
					position: relative;

					.cuIcon-right {
						position: absolute;
						top: 5.45rpx;
						right: 0;
					}
				}
			}
		}
	}
</style>
