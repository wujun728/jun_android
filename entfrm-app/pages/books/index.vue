<template>
	<view>
		<!--标题栏-->
		<bar-search-title bgColor="bg-white" content="vue3.0" @contentTap="searchTap">
			<block slot="right">
				<text @tap="goContact" class="cuIcon-service top-right" />
			</block>
		</bar-search-title>

		<!--轮播图-->
		<view class="bg-white swiper-box">
			<swiper class="screen-swiper square-dot c" autoplay circular indicator-dots :current="swiperIndex" @change="swiperChange">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<view class="swiper-padding">
						<image :src="item.img" mode="widthFix" />
					</view>
				</swiper-item>
			</swiper>
		</view>

		<!--最新推荐-->
		<view class="bg-white seckill-list-view-box">
			<view class="list-title-box">
				<view class="text-view">
					<text class="text-red text-lg text-bold">最新推荐</text>
				</view>
				<view class="text-gray text-sm text-right-view">
					<text>更多</text>
					<text class="cuIcon-right" />
				</view>
			</view>
			<view class="seckill-books-list-view">
				<scroll-view class="recommend-scroll" scroll-x>
					<block v-for="(items,indexs) in booksSortListData" :key="indexs">
						<view :id="['scroll' + (indexs + 1 )]" class="recommend-scroll-item">
							<view class="books-img-view">
								<view class="cu-avatar xl radius" :style="[{backgroundImage:'url('+ items.img +')'}]" />
								<text class="cu-tag radius sm bg-gradual-pink">hot</text>
							</view>
							<view class="text-cut-2 text-sm text-black text-bold margin-tb-sm">{{items.title}}</view>
						</view>
					</block>
				</scroll-view>
			</view>
		</view>

		<!--书籍列表-->
		<view class="bg-white margin-top padding-bottom-sm padding-top-sm books-list-view-box">
			<scroll-view scroll-x class="nav z">
				<view class="flex text-center">
					<block v-for="(item,index) in booksTab" :key="index">
						<view class="cu-item flex-sub text-black" :class="index==TabCur?'select':''" @tap="tabSelect" :data-id="index">
							<view>{{item}}</view>
							<view class="tab-dot bg-red" />
						</view>
					</block>
				</view>
			</scroll-view>
			<!--书籍列表 前端-->
			<books-sort-list :list_data="booksSortListData" @listTap="booksSortListTap" :show="TabCur==0?true:false"></books-sort-list>
			<!--书籍列表 后端-->
			<books-sort-list :list_data="booksListData" @listTap="booksSortListTap" :show="TabCur==1?true:false"></books-sort-list>
		</view>

	</view>
</template>

<script>
	import barSearchTitle from '@/components/basics/bar-search-title';
	import booksSortList from '@/components/list/books-sort-list';

	import _sort_list_data from '@/static/data/sort_list.js'; //虚拟数据
	import _tool from '@/util/tools.js'; //工具函数
	export default {
		components: {
			barSearchTitle,
			booksSortList,
		},
		data() {
			return {
				swiperIndex: 0,
				swiperList: [],
				gridRoundList: [],
				booksTab: ['前端', '后端'],
				TabCur: 0,
				booksSortListData: [],
				booksListData: []
			}
		},
		onLoad() {
			this.swiperList = _sort_list_data.swiperListData();
			this.gridRoundList = _sort_list_data.gridRoundList();
			this.booksSortListData = _sort_list_data.booksSortListData();
			this.booksListData = _sort_list_data.booksListData();
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		methods: {
			goContact(){
				uni.showToast({
				    title: '联系客服',
				    duration: 2000
				});
			},
			swiperChange(e) {
				this.swiperIndex = e.detail.current;
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			},
			booksSortListTap(e) {
				console.log(e);
			},
			searchTap() {

			}
		}
	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
	@import "../../static/css/app.scss";
	/* #endif */
	@import "../../static/css/sort_list.scss";

</style>
