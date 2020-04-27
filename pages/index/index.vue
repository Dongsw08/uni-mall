<template>
	<view class="main">
		<!-- #ifdef MP -->
		<view class="mp-search-box">
			<input class="ser-input" type="text" value="输入关键字搜索" disabled />
		</view>
		<!-- #endif -->
		<!-- 轮播图 -->
		<view class="swiper-container">
			<swiper class="carousel" circular :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item class="carousel-item" v-for="(item,index) in carouselList" :key="index">
					<image :src="item.src"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 分类区 -->
		<view class="cate-container">
			<view class="cate-items" v-for="(item,index) in cateList" :key="index">
				<image :src="item.src"></image>
				<view class="cate-title">
					<text>{{item.text}}</text>
				</view>
			</view>
		</view>
		<!-- 热门资讯 -->
		<view class="hot-info">
			<view class="hot-info-left">
				<image src="../../static/hotit.png"></image>
			</view>

			<swiper class="hot-message-swiper" circular vertical :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item class="hot-message-swiper-item" v-for="(item,index) in hotMessage" :key="index">
					<text>{{item.text}}</text>
				</swiper-item>
			</swiper>
		</view>
		<!-- 限时抢购 -->
		<view class="flash-sale">
			<view class="flash-sale-head">
				<view class="flash-sale-head-title"><text>限时</text>抢购</view>
				<image src="../../static/more.png"></image>
				<view class="flash-sale-right-button">全场一折起</view>
			</view>
			<view class="flash-sale-items-card">
				<view class="flash-sale-item" v-for="(item,index) in flashSaleList" :key="index" @click="navigateToItemDetail(item.id)">
					<image :src="item.src"></image>
					<text>{{item.text}}</text>
				</view>
			</view>
		</view>

		<!-- hot market -->
		<view class="hot-market">
			<image v-for="(item,index) in hotMarkets" :src="item.src" :key="index"></image>
		</view>

		<!-- 热门品牌 -->
		<view class="hot-brands">
			<view class="hot-brands-head">
				<view class="hot-brands-head-title"><text>品牌</text>特卖 <text>知名品牌，特价销售</text></view>
				<image src="../../static/more.png"></image>
				<view class="hot-brands-right">更多</view>
			</view>

			<view class="hot-brands-item-card">
				<image v-if="firstHotBrand" class="hot-brands-item-big" :src="firstHotBrand.src"></image>
				<view v-if="restHotBrand" class="hot-brands-item-right-container">
					<image class="hot-brands-right-item" v-for="(item,index) in restHotBrand" :key="index" :src="item.src">
					</image>
				</view>
			</view>
		</view>

		<!-- 热门话题 -->
		<view class="hot-topic">
			<view class="hot-topic-head">
				<view class="hot-topic-head-title"><text>热门</text>主题 <text>太热门啦，要挤爆了</text></view>
				<image src="../../static/more.png"></image>
				<view class="hot-topic-right">更多</view>
			</view>

			<view class="hot-topic-item-card">
				<view class="hot-topic-item-card-top">
					<image v-if="firstHotTopic" class="hot-topic-item-big" :src="firstHotTopic.src"></image>
					<view v-if="hotTopicTopRight" class="hot-topic-item-right-container">
						<image v-for="(item,index) in hotTopicTopRight" :key="index" :src="item.src" class="hot-topic-right-item"></image>
					</view>
				</view>
				<view v-if="hotTopicBottom" class="hot-topic-items-card-bottom">
					<image v-for="(item,index) in hotTopicBottom" :src="item.src" :key="index" class="hot-topic-bottom-item"></image>
				</view>
			</view>
		</view>
		
		<!-- 猜你喜欢 -->
		<view class="youlike">
			<view class="youlike-head">
				<image src="../../static/heart.png" ></image>
				<text>猜你喜欢</text>
			</view>
			
			<view class="youlike-card">
				<view class="youlike-item" v-for="(item,index) in likeList" :key="index" @click="navigateToItemDetail(item.id)">
					<image :src="item.src" class="youlike-item-pic"></image>
					<view class="youlike-item-title">{{item.title}}</view>
					<view class="youlike-item-price">
						<text class="price">{{"￥" + item.price}}</text>
						<text class="origin">{{item.originPrice}}</text>
						<image src="../../static/f3.png" ></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				carouselList: [],
				cateList: [],
				hotMessage: [],
				flashSaleList: [],
				hotMarkets: [],
				hotBrands: [],
				hotTopic: [],
				likeList:[]
			}
		},
		onLoad() {
			this.loadData()
		},
		methods: {
			loadData() {
				this.getCarouselList()
				this.getCateList()
				this.getHotMessage()
				this.getFlashSaleList()
				this.getHotMarkets()
				this.getHotBrands()
				this.getHotTopic()
				this.getLikeList()
			},

			async getCarouselList() {
				const carouselList = await this.$api.getData('carouselList')
				this.carouselList = carouselList
			},

			async getCateList() {
				const cateList = await this.$api.getData('cateList')
				this.cateList = cateList
			},

			async getHotMessage() {
				const hotMessage = await this.$api.getData('hotMessage')
				this.hotMessage = hotMessage
			},

			async getFlashSaleList() {
				const flashSaleList = await this.$api.getData('flashSaleList')
				this.flashSaleList = flashSaleList
			},

			async getHotMarkets() {
				const hotMarkets = await this.$api.getData('hotMarkets')
				this.hotMarkets = hotMarkets
			},

			async getHotBrands() {
				const hotBrands = await this.$api.getData('hotBrands')
				this.hotBrands = hotBrands
			},

			async getHotTopic() {
				const hotTopic = await this.$api.getData('hotTopic')
				this.hotTopic = hotTopic
			},
			
			async getLikeList() {
				const likeList = await this.$api.getData('likeList')
				this.likeList = likeList
			},
			
			navigateToItemDetail(id){
				uni.navigateTo({
					url:`../goodsDetail/goodsDetail?id=${id}`
				})
			}
		},

		computed: {
			firstHotBrand() {
				return this.hotBrands[0]
			},

			restHotBrand() {
				return this.hotBrands.slice(1)
			},

			firstHotTopic() {
				return this.hotTopic[0]
			},

			hotTopicTopRight() {
				return this.hotTopic.slice(1, 5)
			},

			hotTopicBottom() {
				return this.hotTopic.slice(5)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color-grey;
	}


	/* #ifdef MP */
	.mp-search-box {
		position: absolute;
		left: 0;
		top: 30rpx;
		z-index: 9999;
		width: 100%;
		padding: 0 80rpx;

		.ser-input {
			flex: 1;
			height: 56rpx;
			line-height: 56rpx;
			text-align: center;
			font-size: 28rpx;
			color: $uni-text-color;
			border: 1px solid #eee;
			border-radius: 6px;
			background: rgba(255, 255, 255, .6);
		}
	}

	/* #endif */

	.swiper-container {
		height: 400rpx;
		background-color: $uni-bg-color;

		.carousel {
			width: 100%;
			height: 400rpx;

			.carousel-item {
				width: 100%;
				height: 100%;
				padding: 0;
				overflow: hidden;
			}

			image {
				width: 100%;
				height: 100%;
				display: block;
			}

		}
	}

	.cate-container {

		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		border-bottom: 1px solid #eee;
		background-color: $uni-bg-color;

		.cate-items {
			max-width: 200rpx;
			width: 25%;
			text-align: center;
			margin: 20rpx 0;

			image {
				height: 100rpx;
				width: 100rpx;
			}

			.cate-title {
				text-align: center;
			}
		}
	}

	.hot-info {
		height: 104rpx;
		padding: 20rpx;
		background-color: $uni-bg-color;
		margin-bottom: 12rpx;

		.hot-info-left {
			float: left;

			image {
				height: 64rpx;
				width: 250rpx;
			}
		}

		.hot-message-swiper {
			display: inline-block;
			width: calc(100% - 250rpx);
			height: 64rpx;

			.hot-message-swiper-item {
				line-height: 64rpx;
			}
		}
	}

	.flash-sale {
		background-color: $uni-bg-color;
		margin-bottom: 24rpx;

		.flash-sale-head {
			height: 92rpx;
			padding: 16rpx;
			border-bottom: 1px solid #eee;

			.flash-sale-head-title {
				float: left;
				line-height: 60rpx;

				text {
					color: #ff2150;
				}
			}

			image {
				float: right;
				height: 48rpx;
				width: 32rpx;
				margin-top: 6rpx;
			}

			.flash-sale-right-button {
				float: right;
				min-width: 144rpx;
				height: 52rpx;
				text-align: center;
				line-height: 52rpx;
				color: #ff2150;
				border: 1px solid #ff2150;
				padding: 0 10rpx;
				border-radius: 4px;
			}
		}

		.flash-sale-items-card {
			display: flex;

			.flash-sale-item {
				height: 200rpx;
				width: 25%;
				border-right: 1px solid #eee;
				display: flex;
				flex-direction: column;
				padding: 16rpx 0;
				align-items: center;

				image {
					width: 80%;
					height: 140rpx;
				}

				text {
					font-size: $uni-font-size-sm;
					white-space: nowrap;
				}
			}

			.flash-sale-item:last-child {
				border: none;
			}
		}
	}

	.hot-market {
		display: flex;
		flex-wrap: wrap;
		background-color: $uni-bg-color;
		margin-bottom: 12rpx;

		image {
			height: 224rpx;
			flex-basis: 25%;
			border-right: 1px solid #eee;
		}

		image:nth-child(3n+1) {
			flex-basis: 50%;
			width: 374rpx;
		}

		image:nth-child(3n) {
			border-right: none;
		}

		image:nth-child(n+3) {
			border-top: 1px solid #eee;
		}
	}

	.hot-brands {
		background-color: $uni-bg-color;
		margin-bottom: 12rpx;

		.hot-brands-head {
			height: 92rpx;
			padding: 16rpx;
			border-bottom: 1px solid #eee;

			.hot-brands-head-title {
				float: left;
				line-height: 60rpx;

				text:last-child {
					font-size: $uni-font-size-sm;
					margin-left: 16rpx;
				}

				text:first-child {
					color: #ff2150;
				}

			}

			image {
				float: right;
				height: 48rpx;
				width: 32rpx;
				margin-top: 6rpx;
			}

			.hot-brands-right {
				float: right;
				line-height: 60rpx;
			}
		}

		.hot-brands-item-card {
			height: 320rpx;
			display: flex;

			.hot-brands-item-big {
				height: 320rpx;
				width: 50%;
				border-right: 1px soild #eee;
			}

			.hot-brands-item-right-container {
				height: 320rpx;
				width: 50%;
				display: flex;
				flex-wrap: wrap;

				.hot-brands-right-item {
					height: 50%;
					width: 50%;
					border-bottom: 1px solid #eee;
					;
				}

				.hot-brands-right-item:nth-child(2n+1) {
					border-right: 1px solid #eee;
					border-left: 1px solid #eee;
				}
			}
		}
	}

	.hot-topic {
		background-color: $uni-bg-color;
		margin-bottom: 12rpx;

		.hot-topic-head {
			height: 92rpx;
			padding: 16rpx;
			border-bottom: 1px solid #eee;

			.hot-topic-head-title {
				float: left;
				line-height: 60rpx;

				text:last-child {
					font-size: $uni-font-size-sm;
					margin-left: 16rpx;
				}

				text:first-child {
					color: #ff2150;
				}

			}

			image {
				float: right;
				height: 48rpx;
				width: 32rpx;
				margin-top: 6rpx;
			}

			.hot-topic-right {
				float: right;
				line-height: 60rpx;
			}
		}

		.hot-topic-item-card {
			min-height: 320rpx;

			.hot-topic-item-card-top {
				width: 100%;
				display: flex;
				.hot-topic-item-big {
					height: 382rpx;
					width: 50%;
					border-right: 1px soild #eee;
					border-bottom: 1px solid #eee;
				}

				.hot-topic-item-right-container {
					height: 382rpx;
					width: 50%;
					display: flex;
					flex-wrap: wrap;

					.hot-topic-right-item {
						height: 50%;
						width: 50%;
						border-bottom: 1px solid #eee;
						;
					}

					.hot-topic-right-item:nth-child(2n+1) {
						border-right: 1px solid #eee;
						border-left: 1px solid #eee;
					}
				}
			}

			.hot-topic-items-card-bottom {
				display: flex;
				width: 100%;

				.hot-topic-bottom-item {
					height: 190rpx;
					width: 25%;
					border-right: 1px solid #eee;
				}

				.hot-topic-bottom-item:last-child {
					border-right: none
				}
			}
		}
	}
	
	.youlike{
		background-color: $uni-bg-color;
		margin-bottom: 12rpx;
		
		.youlike-head{
			height: 92rpx;
			padding: 16rpx;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #eee;
			
			image{
				width: 32rpx;
				height: 26rpx;
			}
			
			text{
				font-size: $uni-font-size-sm;
				margin-left: 16rpx;
			}
		}
		
		.youlike-card{
			@extend .youlike-card
		}
	}
</style>
