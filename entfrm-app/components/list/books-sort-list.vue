<template>
	<view class="margin-top books-list-box" :class="show?'show':''">
		<view class="cu-list menu-avatar">
			<block v-for="(item,index) in list_data" :key="index">
				<view class="cu-item" @tap="listTap(item,index)">
					<view class="cu-avatar radius lg" :style="[{backgroundImage:'url('+ item.img +')'}]"></view>
					<view class="content">
						<view class="text-black text-cut">
							<text class="cu-tag bg-red radius sm" v-if="item.recommend">推荐</text>
							<text>{{item.title}}</text>
						</view>
						<view class="text-gray text-cut text-sm">
							<block v-for="(items,indexs) in item.type" :key="indexs">
								<text class="cu-tag radius sm">{{items}}</text>
							</block>
						</view>
						<view class="text-gray text-cut text-sm tag-view">
							<text class="text-red text-price text-lg">{{item.price}}</text>
							<text class="text-gray through" v-if="item.cost_price">￥{{item.cost_price}}</text>
						</view>
						<view class="text-gray text-cut text-sm ">
							<text class="light radius sm">{{item.introduce}}</text>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import _tool from '@/util/tools.js';
	export default {
		name: 'books-sort-list',
		props: {
			list_data: {
				type: Array,
				default: () => {
					return []
				}
			},
			show: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			listTap(data,index) {
				this.$emit('listTap', {
					data,
					index
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.books-list-box {
		display: none;
		.cu-list.menu-avatar > .cu-item {
			height: 218.18rpx;
			&:after {
				width: 0;
				height: 0;
				border-bottom: 0;
			}
			.cu-avatar.lg {
				width: 181.81rpx;
				height: 181.81rpx;
				font-size: 2em;
			}
			.content {
				left: 236.36rpx;
				width: calc(100% - 94.54rpx - 59.99rpx - 119.99rpx);
				line-height: 1.7em;
				.cu-tag.sm {
					display: inline-block;
					margin-left: 0;
					height: 29.09rpx;
					font-size: 14.54rpx;
					line-height: 29.09rpx;
					margin-right: 9.09rpx;
					margin-bottom: 9.09rpx;
				}
				view:first-child {
					font-size: 29.09rpx;
					display: inherit;
					align-items: inherit;
				}
				.through {
					text-decoration:line-through;
				}
				.tag-view {
					text {
						margin-right: 9.09rpx;
					}
				}
			}
		}
	}
	.books-list-box.show {
		display: block;
	}
</style>
