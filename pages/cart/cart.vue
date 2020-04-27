<template>
	<view class="main">
		<view v-if="!cart.length" class="empty">
			空空如也，去添加一些吧
		</view>

		<view v-if="cart.length" class="card" v-for="(shop,sIndex) in cart" :key="shop.sid">
			<view class="card-head rows">
				<view class="card-head-left">
					<checkbox-group>
						<label>
							<checkbox disabled style="transform:scale(0.7);" :value="shop.sid" :checked="shopCheck(shop.goods)" />
						</label>
					</checkbox-group>
					<view class="card-head-title">
						{{shop.shopTitle}}
					</view>
				</view>
				<view class="card-head-right">
					<image src="../../static/quanicon.png"></image>
				</view>
			</view>
			<view class="card-body">
				<view class="card-item rows" v-for="(item,gIndex) in shop.goods" :key="item.gid">
					<checkbox-group @change="onCheckBoxClick(sIndex,gIndex)">
						<label>
							<checkbox style="transform:scale(0.7);" :value="item.gid" :checked="item.selected" />
						</label>
					</checkbox-group>
					<view class="card-item-content">
						<view class="card-item-content-left">
							<image :src="item.src" class="card-item-content-left-pic"></image>
							<view class="card-item-content-left-info">
								<view class="card-item-content-left-info-text">
									<view class="card-item-content-left-info-text-title">
										{{item.gTitle}}
									</view>
									<view class="card-item-content-left-info-text-detail">
										{{item.info}}
									</view>
								</view>
								<view class="card-item-content-left-counter-wrapper">
									<view class="counter-reduce counter" @click="goodsNumChange(sIndex,gIndex,item.num,false)">
										-
									</view>
									<view class="counter-num counter">
										{{item.num}}
									</view>
									<view class="counter-plus counter" @click="goodsNumChange(sIndex,gIndex,item.num,true)">
										+
									</view>
								</view>
							</view>
						</view>
						<view class="card-item-content-right">
							<view class="origin">
								{{'￥' + item.origin}}
							</view>
							<view class="price">
								{{'￥' + item.price}}
							</view>
							<image src="../../static/del.png" class="delete" @click="removeItem(shop.sid,item.gid)"></image>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="bill">
			<checkbox-group class="bill-checkbox" @change="selectAll">
				<label>
					<checkbox style="transform:scale(0.7);" :value="all" :checked="isAllSelected" /><text>全选</text>
				</label>
			</checkbox-group>

			<view class="bill-counts">
				<text class="bill-counts-total">合计:</text>
				<text class="bill-counts-totalPrice">{{'￥' + Number(totalCount.totalPrice).toFixed(1)}}</text>
				<text class="bill-counts-save">为您节省 {{'￥' + Number(totalCount.totalSave).toFixed(1)}}</text>
			</view>

			<view class="bill-button">
				结算({{allSelectNum}})
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {

			};
		},

		computed: {
			...mapState(['cart']),

			allSelectNum() {
				return this.cart.reduce((acc, ele) => {
					const selectedArr = ele.goods.filter(item => item.selected)
					return acc + selectedArr.length
				}, 0)
			},
			
			totalCount(){
				return this.cart.reduce((acc,ele) => {
					const shopTotal = ele.goods.reduce((gacc,item) => {
						if(item.selected){
							return {
								totalPrice:	gacc.totalPrice + parseFloat(item.price) * parseFloat(item.num),
								totalSave: gacc.totalSave + (parseFloat(item.origin) - parseFloat(item.price)) * parseFloat(item.num)
							}
						}else{
							return gacc
						}
					},{
					totalPrice:0,
					totalSave:0
				})
					return {
						totalPrice:acc.totalPrice + shopTotal.totalPrice,
						totalSave:acc.totalSave + shopTotal.totalSave
					}
				},{
					totalPrice:0,
					totalSave:0
				})
			},
			
			isAllSelected(){
				if(!this.cart.length) return false
				
				return this.cart.every(ele => {
					return ele.goods.every(item => item.selected)
				})
			}
		},

		methods: {
			...mapMutations(['updateGoodsNum', 'removeGoods', 'toogleSelectItem','selectAll']),

			goodsNumChange(shopIndex, goodsIndex, cuNum, isAdd) {
				if (isAdd) {
					if (cuNum < 99) {
						const data = {
							shopIndex,
							goodsIndex,
							num: cuNum + 1
						}
						this.updateGoodsNum(data)
					} else {
						return;
					}
				} else {
					if (cuNum <= 1) {
						const sid = this.cart[shopIndex].sid
						const gid = this.cart[shopIndex].goods[goodsIndex]

						const data = {
							gid,
							sid
						}

						this.removeGoods(data)
					} else {
						const data = {
							shopIndex,
							goodsIndex,
							num: cuNum - 1
						}
						this.updateGoodsNum(data)
					}
				}
			},

			shopCheck(goods) {
				return !goods.every(ele => !ele.selected)
			},

			onCheckBoxClick(shopIndex, goodsIndex) {
				this.toogleSelectItem({
					shopIndex,
					goodsIndex
				})
			},

			removeItem(sid, gid) {
				this.removeGoods({
					sid,
					gid
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color-grey;
	}

	.empty {
		height: 800rpx;
		text-align: center;
		line-height: 800rpx;
		color: #999;
	}

	.card {
		background-color: $uni-bg-color;
		margin: 12rpx 0;

		.rows {
			border-bottom: 1px solid #eee;
		}

		.card-head {
			height: 96rpx;
			display: flex;
			padding: 25.6rpx 16rpx;
			align-items: center;
			justify-content: space-between;

			.card-head-left {
				display: flex;

				.card-head-title {
					line-height: 48rpx;
				}
			}

			.card-head-right {
				height: 36rpx;
				width: 58rpx;

				image {
					height: 100%;
					width: 100%;
				}
			}
		}

		.card-body {
			padding: 0 16rpx;

			.card-item {
				display: flex;
				align-items: center;
				height: 176rpx;
				padding: 16rpx 0;

				.card-item-content {
					display: flex;
					// flex-grow: 1;
					// width: auto;
					width: calc(100% - 60rpx);
					height: 100%;
					justify-content: space-between;

					.card-item-content-left {
						display: flex;
						height: 100%;
						width: 80%;

						.card-item-content-left-pic {
							height: 100%;
							width: 144rpx;
							margin-right: 16rpx;
						}

						.card-item-content-left-info {
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							width: 60%;

							.card-item-content-left-info-text {
								.card-item-content-left-info-text-title {
									overflow: hidden;
									white-space: nowrap;
									text-overflow: ellipsis;
								}

								.card-item-content-left-info-text-detail {
									font-size: $uni-font-size-sm;
									color: #999;
								}
							}

							.card-item-content-left-counter-wrapper {
								margin-top: 22.4rpx;
								height: 48rpx;
								display: flex;

								.counter {
									background-color: #f7f7f7;
									height: 100%;
									line-height: 48rpx;
									text-align: center;
								}

								.counter-reduce {
									width: 48rpx;
								}

								.counter-plus {
									width: 48rpx;
									color: $uni-border-red;
								}

								.counter-num {
									width: 84rpx;
									border-left: 1px solid #fff;
									border-right: 1px solid #fff;
								}
							}
						}
					}

					.card-item-content-right {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: flex-end;

						.origin {
							text-decoration: line-through;
							font-size: $uni-font-size-sm;
							color: #999;
						}

						.price {
							color: $uni-border-red;
							margin-top: -8rpx;
						}

						.delete {
							width: 32rpx;
							height: 32rpx;
						}
					}
				}
			}
		}
	}
	
	.bill{
		width: 100%;
		height: 90rpx;
		position: fixed;
		bottom: 0;
		justify-content: space-between;
		align-items: center;
		display: flex;
		background-color: $uni-bg-color;
		.bill-checkbox{
			line-height: 90rpx;
		}
		
		.bill-counts{
			line-height: 90rpx;
			.bill-counts-total{
				font-size: $uni-font-size-sm;
				color: $uni-border-red;
			}
			.bill-counts-totalPrice{
				color: $uni-border-red;
				margin:0 16rpx 0 8rpx;
			}
			.bill-counts-save{
				font-size: $uni-font-size-sm;
				color: #999;
			}
		}
		
		.bill-button{
			text-align: center;
			height: 90rpx;
			line-height: 90rpx;
			background-color: $uni-border-red;
			color: #fff;
			width: 160rpx;
		}
	}

	/* #ifdef H5 */
	uni-checkbox .uni-checkbox-input {
		border-radius: 50% !important;
		color: #ffffff !important;
	}

	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
		color: #fff;
		background: $uni-border-red
	}

	.uni-checkbox-input.uni-checkbox-input-checked {
		border: none !important;
	}

	/* #endif */
	/* #ifdef MP-WEIXIN */
	checkbox .wx-checkbox-input {
		border-radius: 50% !important;
		color: #ffffff !important;
	}

	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		color: #fff;
		background: $uni-border-red;
	}

	.wx-checkbox-input.wx-checkbox-input-checked {
		border-color: $uni-border-red;
	}

	/* #endif */
</style>
