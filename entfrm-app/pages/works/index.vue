<template>
	<view>
		<!--标题栏-->
		<bar-search-title bgColor="bg-white" content="搜索" @contentTap="searchTap">
			<block slot="right">
				<text class="cuIcon-service" />
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

		<!--我的应用-->
		<view class="bg-white invest-title-box">
			<view class="text-box">
				<text class="text-lg text-bold text-black">我的应用</text>
			</view>
			<text class="lg more-app text-gray cuIcon-add"></text>
		</view>

		<!--应用列表-->
		<view class="bg-white grid-round-box">
			<view class="cu-list grid col-5 no-border">
				<block v-for="(item,index) in gridRoundList" :key="index" v-if="index < 5">
					<view class="cu-item">
						<view class="grid-icon">
							<image class="icon" :src="item.img" mode="widthFix" />
						</view>
						<view class="cu-tag badge z bg-orange" v-if="item.badge">{{item.badge}}</view>
						<text class="text-black">{{item.name}}</text>
					</view>
				</block>
			</view>
		</view>

		<!--推荐应用-->
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="text-lg text-bold text-black">推荐应用</text>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow">更多</button>
			</view>
		</view>
		<view class="cu-list grid col-4 no-border">
			<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<3*2">
				<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>

		<!--应用列表-->
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
			<!--应用列表1-->
			<books-sort-list :list_data="booksSortListData" @listTap="booksSortListTap" :show="TabCur==0?true:false"></books-sort-list>
			<!--应用列表2-->
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
				booksTab: ['方案', '表单'],
				TabCur: 0,
				booksSortListData: [],
				booksListData: [],
				cuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: 'VR'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					name: '录像'
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '图像'
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '通知'
				}, {
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '排行榜'
				}, {
					cuIcon: 'clothesfill',
					color: 'blue',
					badge: 0,
					name: '皮肤'
				}, {
					cuIcon: 'discoverfill',
					color: 'purple',
					badge: 0,
					name: '发现'
				}, {
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '帮助'
				}, {
					cuIcon: 'commandfill',
					color: 'purple',
					badge: 0,
					name: '问答'
				}, {
					cuIcon: 'brandfill',
					color: 'mauve',
					badge: 0,
					name: '版权'
				}],
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
