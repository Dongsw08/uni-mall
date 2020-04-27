<template>
	<view class="main">
		<view class="head">
			<view class="head-selects">
				<view class="head-select-item" :class="{active:selectView === 1}" @click="onTabSelect(1)">
					商品
				</view>
				<view class="head-select-item" :class="{active:selectView === 2}" @click="onTabSelect(2)">
					评价
				</view>
				<view class="head-select-item" :class="{active:selectView === 3}" @click="onTabSelect(3)">
					详情 
				</view>
			</view>
		</view>
		<scroll-view scroll-with-animation :scroll-into-view="currentView" scroll-y="true" class="content" @scroll="contentScroll">
			<view>
				<view v-if="goodsInfo.src" class="basic-info card" id="head">
					<image :src="goodsInfo.src" class="goods-img"></image>
					<view class="basic-info-texts rows">
						<view class="basic-info-texts-title">
							{{goodsInfo.title}}
						</view>
						<view class="basic-info-texts-info">
							<view class="left">
								<view class="basic-info-texts-info-price">
									{{'￥' + goodsInfo.price}}
								</view>
								<view class="basic-info-texts-info-tag">
									新品推荐
								</view>
							</view>
							<view class="right">
								<view class="basic-info-texts-info-right-text">
									全国包邮
								</view>
								<view class="basic-info-texts-info-right-text">
									销量{{goodsInfo.sales}}
								</view>
							</view>
						</view>
					</view>
					<view class="basic-info-coupon">
						<view class="left">
							<image src="../../static/goods/my3.png"></image>
							<view>领取优惠券</view>
						</view>
						<image src="/static/more.png" class="card-link"></image>
					</view>
				</view>

				<view class="select-size card">
					<view class="left">
						<view>请选择尺码</view>
					</view>
					<image src="/static/more.png" class="card-link"></image>
				</view>

				<view v-if="goodsInfo.comment" class="comments card" id="comment">
					<view class="comments-head rows">
						<view>
							商品评价（{{goodsInfo.comment.length}}）
						</view>
						<image src="/static/more.png" class="card-link"></image>
					</view>

					<view class="comments-content rows">
						<view class="comments-content-head">
							<image :src="goodsInfo.comment[0].userAvatar"></image>
							<view>{{goodsInfo.comment[0].user}}</view>
						</view>
						<view class="comments-content-text">
							{{goodsInfo.comment[0].content}}
						</view>
						<view class="comments-content-detail">
							{{goodsInfo.comment[0].detail}}
						</view>
					</view>

					<view class="comments-more">
						查看更多评论
					</view>
				</view>

				<view v-if="goodsInfo.shop" class="shop card">
					<view class="shop-detail rows">
						<view class="top">
							<view class="shop-top-left">
								<image :src="goodsInfo.shop.src"></image>
								<view class="shop-top-left-right">
									<view class="shop-name">
										{{goodsInfo.shop.name}}
									</view>
									<view class="shop-count">
										总销量：{{goodsInfo.shop.allSell}} 总收藏数：{{goodsInfo.shop.allCollect}}
									</view>
								</view>
							</view>
							<view class="shop-top-right">
								<image src="/static/goods/xq4.png"></image>
								<view>
									收藏店
								</view>
							</view>
						</view>
						<view class="bottom">
							<view class="bottom-item">
								描述相符 <text> {{goodsInfo.shop.desScore}}</text> <text> 高</text>
							</view>
							<view class="bottom-item">
								质量满意 <text> {{goodsInfo.shop.quaScore}}</text> <text> 高</text>
							</view>
							<view class="bottom-item">
								价格合理 <text> {{goodsInfo.shop.priceScore}}</text> <text> 高</text>
							</view>
						</view>
					</view>
					<view class="shop-buttons">
						<view class="shop-button">
							全部商品({{goodsInfo.shop.goodsNum}})
						</view>
						<view class="shop-button">
							进店逛逛
						</view>
					</view>
				</view>

				<view class="relates card">
					<view class="relates-head">
						相关推荐
					</view>
					<view class="relates-content">
						<view class="relates-content-item" v-for="(item,index) in goodsInfo.relates" :key="index">
							<image :src="item.src"></image>
							<view class="relates-content-item-text">
								{{'￥'+item.price}}
							</view>
						</view>
					</view>
				</view>

				<view class="detail card" id="detail">
					<view class="detail-head rows">
						<view class="detail-head-item" @click="selectDetail(1)" :class="{active:detailSelect === 1}">
							图文详情
						</view>
						<view class="detail-head-item" @click="selectDetail(2)" :class="{active:detailSelect === 2}">
							产品参数
						</view>
						<view class="detail-head-item" @click="selectDetail(3)" :class="{active:detailSelect === 3}">
							热卖推荐
						</view>
					</view>
					<view class="detail-content">
						<view v-if="detailSelect === 1" class="pic-detail">
							<image :src="goodsInfo.picDetail"></image>
						</view>
						<view v-else-if="detailSelect === 2" class="text-detail">
							<view class="text-detail-item" v-for="(item,index) in goodsInfo.goodsDetail" :key="index">
								<view>{{item.name}}</view>
								<view>{{item.des}}</view>
							</view>
						</view>
						<!-- <view v-else-if="detailSelect === 3" class="recommend">
							<view class="recommend-item" v-for="(item,index) in goodsInfo.hotSales" :key="index">
								<image :src="item.src" class="recommend-item-pic"></image>
								<view class="recommend-item-title">
									{{item.title}}
								</view>
								<view class="recommend">
									
								</view>
							</view>
						</view> -->
						<view v-else-if="detailSelect === 3" class="recommend">
							<view class="youlike-item" v-for="(item,index) in goodsInfo.hotSales" :key="index" @click="navigateToItemDetail(item.id)">
								<image :src="item.src" class="youlike-item-pic"></image>
								<view class="youlike-item-title">{{item.title}}</view>
								<view class="youlike-item-price">
									<text class="price">{{"￥" + item.price}}</text>
									<text class="origin">{{item.origin}}</text>
									<image src="../../static/f3.png"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="operatebar">
			<view class="left">
				<view class="left-item">
					<image src="../../static/goods/xqf1.png"></image>
					<view class="text">客服</view>
				</view>
				<view class="left-item">
					<image src="../../static/goods/xqf2.png"></image>
					<view class="text">店铺</view>
				</view>
				<view class="left-item">
					<image src="../../static/goods/xqf3.png"></image>
					<view class="text">收藏</view>
				</view>
			</view>

			<view class="right">
				<view class="add-button" @click="onAddClick">
					加入购物车
				</view>
				<view class="buy-button">
					立即购买
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'

	export default {
		data() {
			return {
				selectView: 1,
				itemId: null,
				goodsInfo: {},
				detailSelect: 1,
				size: '颜色：白色；尺码：L',
				heightArr: [],
				currentView:''
			};
		},

		onLoad(options) {
			this.itemId = options.id;
			this.loadData()
		},

		methods: {
			onTabSelect(selectView) {
				if(!this.heightArr.length){
					this.calcHeight()
				}
				this.selectView = selectView
				if(selectView === 1) return this.currentView = 'head'
				if(selectView === 2) return this.currentView = 'comment'
				if(selectView === 3) return this.currentView = 'detail'
			},

			selectDetail(id) {
				this.detailSelect = id
			},

			loadData() {
				this.getGoodsInfo()
			},

			async getGoodsInfo() {
				const goodsInfo = await this.$api.getData('goodsInfo')
				this.goodsInfo = goodsInfo;
			},

			navigateToItemDetail(id) {
				uni.navigateTo({
					url: `../goodsDetail/goodsDetail?id=${id}`
				})
			},

			...mapMutations(['addGoods']),

			onAddClick() {
				const shop = {
					sid: this.goodsInfo.shop.id,
					shopTitle: this.goodsInfo.shop.name
				}

				const goods = {
					gid: this.itemId,
					src: this.goodsInfo.src,
					gTitle: this.goodsInfo.title,
					origin: this.goodsInfo.origin,
					price: this.goodsInfo.price,
					info: this.size
				}

				this.addGoods({
					shop,
					goods
				})
				
				uni.showToast({
					title:'添加成功'
				})
			},

			calcHeight() {
				let h = 0;
				const _arr = [{
						id: '#head',
						viewId: 1,
						top: 0
					},
					{
						id: '#comment',
						viewId: 2,
						top: 0
					},
					{
						id: '#detail',
						viewId: 3,
						top: 0
					}
				]

				return new Promise((resolve, reject) => {
					_arr.forEach((ele, index) => {
						let view = uni.createSelectorQuery().select(ele.id);
						view.fields({
							size: true
						}, data => {
							ele.top = h;
							h += data.height;
							// resolve()
						}).exec(() => {
							if (index === _arr.length - 1) {
								resolve()
							}
						})
					})
				}).then(() => {
					this.heightArr = _arr
				})
			},

			contentScroll(e) {
				const {
					scrollTop
				} = e.detail
				if (!this.heightArr.length) {
					this.calcHeight().then(() => {
						const tabs = this.heightArr.filter((item) => item.top <= scrollTop).reverse()
						if (tabs.length) {
							this.selectView = tabs[0].viewId
						}
					})
					
					return;
				}
				
				const tabs = this.heightArr.filter((item) => item.top <= scrollTop).reverse()
				if (tabs.length) {
					this.selectView = tabs[0].viewId
				}
			},
		}
	}
</script>

<style lang="scss">
	page,
	.main {
		height: 100%;
	}

	.card {
		background-color: $uni-bg-color;
		margin-bottom: 12rpx;

		.rows {
			border-bottom: 1px solid #eee;
		}

		.card-link {
			width: 24rpx;
			height: 32rpx;
		}
	}

	.head {
		position: fixed;
		top: 0;
		z-index: 20;
		width: 100%;
		background-color: $uni-bg-color;
		height: 92rpx;
		line-height: 92rpx;

		.head-selects {
			display: flex;
			width: 50%;
			margin: 0 auto;

			.head-select-item {
				width: 33%;
				text-align: center;

				&.active {
					color: $uni-border-red;
					border-bottom: 2px solid $uni-border-red;
				}
			}
		}
	}

	.content {
		margin: 92rpx 0 96rpx 0;
		height: calc(100% - 92rpx);
		flex: 1;

		.basic-info {
			image.goods-img {
				height: 634rpx;
				width: 100%;
			}

			.basic-info-texts {
				padding-bottom: 16rpx;

				.basic-info-texts-title {
					padding: 18rpx 18rpx 0 18rpx;
				}

				.basic-info-texts-info {
					display: flex;
					height: 64rpx;
					justify-content: space-between;
					padding: 0 18rpx;

					.left {
						display: flex;
						align-items: center;

						.basic-info-texts-info-price {
							color: $uni-border-red;
						}

						.basic-info-texts-info-tag {
							margin-left: 9.6rpx;
							background-color: $uni-border-red;
							color: #fff;
							padding: 0 9.6rpx;
						}
					}

					.right {
						display: flex;
						align-items: center;

						.basic-info-texts-info-right-text {
							font-size: $uni-font-size-sm;
							color: #666;
							padding: 0 9.6rpx;

							&:first-child {
								border-right: 1px solid #666;
							}
						}
					}
				}
			}

			.basic-info-coupon {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 84rpx;
				padding: 16rpx 19.2rpx;

				.left {
					display: flex;

					image {
						height: 40rpx;
						width: 40rpx;
						margin-right: 9.6rpx;
					}

					view {
						font-size: $uni-font-size-sm;
						height: 40rpx;
						line-height: 40rpx;
					}
				}
			}
		}

		.select-size {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 84rpx;
			padding: 16rpx 19.2rpx;
		}

		.comments {
			padding: 0 19.2rpx;

			.comments-head {
				display: flex;
				height: 64rpx;
				justify-content: space-between;
				align-items: center;
			}

			.comments-content {
				padding: 16rpx 0;

				.comments-content-head {
					font-size: $uni-font-size-sm;
					display: flex;
					align-items: center;

					image {
						height: 48rpx;
						width: 48rpx;
						margin-right: 9.6rpx;
					}

					margin-bottom: 9.6rpx;
				}

				.comments-content-text {
					font-size: $uni-font-size-sm;
					min-height: 64rpx;
				}

				.comments-content-detail {
					font-size: $uni-font-size-sm;
					height: 64rpx;
					color: #999;
					line-height: 64rpx;
				}
			}

			.comments-more {
				height: 64rpx;
				line-height: 64rpx;
				text-align: center;
			}

		}

		.shop {
			padding: 19.2rpx;

			.shop-detail {
				.top {
					display: flex;
					justify-content: space-between;
					height: 80rpx;

					.shop-top-left {
						display: flex;

						image {
							width: 80rpx;
							height: 80rpx;
							margin-right: 16rpx;
						}

						.shop-top-left-right {
							view {
								line-height: 40rpx;

								&:last-child {
									font-size: $uni-font-size-sm;
									color: #999;
								}
							}
						}
					}

					.shop-top-right {
						border: 1px solid $uni-border-red;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						align-items: center;
						width: 80rpx;
						height: 80rpx;
						border-radius: 3px;

						image {
							height: 32rpx;
							width: 32rpx;
						}

						view {
							color: $uni-border-red;
							font-size: $uni-font-size-sm;
						}
					}
				}

				.bottom {
					height: 80rpx;
					display: flex;

					.bottom-item {
						width: 33%;
						line-height: 80rpx;

						text {
							font-size: $uni-font-size-sm;
							margin-left: 8rpx;
							text-align: center;

							&:first-child {
								color: $uni-border-red;
							}

							&:last-child {
								color: #fff;
								background-color: $uni-border-red;
							}
						}
					}
				}
			}

			.shop-buttons {
				height: 92rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;

				.shop-button {
					@extend .basic-button;
					border-color: #ddd;
					font-size: $uni-font-size-sm;
					height: 52rpx;
					line-height: 52rpx;
					width: 196rpx;
				}
			}
		}

		.relates {
			padding: 0 19.2rpx 19.2rpx 19.2rpx;

			.relates-head {
				height: 80rpx;
				line-height: 80rpx;
			}

			.relates-content {
				display: flex;
				overflow-x: auto;
				overflow-y: hidden;
				width: auto;

				.relates-content-item {
					height: 172rpx;
					min-width: 172rpx;
					margin-right: 10rpx;
					position: relative;

					&:last-child {
						margin: 0
					}

					image {
						width: 100%;
						height: 100%;
					}

					.relates-content-item-text {
						position: absolute;
						bottom: 0;
						height: 48rpx;
						padding-left: 19.2rpx;
						line-height: 48rpx;
						background: rgba(255, 255, 255, 0.5);
						width: 100%;
						font-size: $uni-font-size-sm;
					}
				}
			}
		}

		.detail {
			.detail-head {
				display: flex;
				height: 80rpx;

				.detail-head-item {
					width: 33%;
					flex-grow: 1;
					text-align: center;
					line-height: 80rpx;

					&.active {
						border-bottom: 1px solid $uni-border-red;
					}
				}
			}

			.detail-content {
				.pic-detail {
					height: 636rpx;
					width: 100%;

					image {
						height: 100%;
						width: 100%;
					}
				}

				.text-detail {
					.text-detail-item {
						height: 80rpx;
						display: flex;
						padding: 0 25.6rpx;
						border-bottom: 1px solid #eee;

						view:first-child {
							width: 32%;
						}

						view {
							line-height: 80rpx;
							color: #999;
						}
					}
				}

				.recommend {
					@extend .youlike-card
				}
			}
		}
	}

	.operatebar {
		height: 96rpx;
		width: 100%;
		position: fixed;
		bottom: 0;
		background-color: $uni-bg-color;
		display: flex;

		.left {
			width: 40%;
			height: 100%;
			display: flex;

			.left-item {
				width: 33%;

				image {
					display: block;
					width: 56rpx;
					height: 52rpx;
					margin: 0 auto;
				}

				.text {
					width: 100%;
					text-align: center;
					height: 44rpx;
					line-height: 44rpx;
				}
			}
		}

		.right {
			width: 60%;
			height: 100%;
			display: flex;
			line-height: 96rpx;
			justify-content: flex-end;
			align-items: center;

			.buy-button {
				@extend .red-button;
				margin-right: 16rpx;
			}

			.add-button {
				@extend .white-button;
				margin-right: 32rpx;
			}
		}
	}
</style>
