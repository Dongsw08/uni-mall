<template>
	<view class="main">
		<view class="user-head">
			<!-- <image class="user-head-bg" src="../../static/mybg.png" mode=""></image> -->
			<view class="head-user">
				<image src="../../static/goods/tx.png" class="user-head-avatar" mode=""></image>
				<view class="user-head-userinfo">
					<view class="user-head-userinfo-name">
						ssaef
					</view>
				</view>
			</view>
		</view>
		
		<view class="user-content">
			<view class="user-content-reocrds">
				<view class="user-content-reocrds-item">
					<view>
						{{userData.collection}}
					</view>
					<view>
						收藏夹
					</view>
				</view>
				<view class="user-content-reocrds-item">
					<view>
						{{userData.follow}}
					</view>
					<view>
						关注商品
					</view>
				</view>
				<view class="user-content-reocrds-item">
					<view>
						{{userData.viewed}}
					</view>
					<view>
						浏览记录
					</view>
				</view>
			</view>
			
			<view class="card user-card">
				<view class="user-card-item">
					<view>
						{{userData.points}}
					</view>
					<view>
						积分
					</view>
				</view>
				
				<view class="user-card-item">
					<view>
						{{userData.coupon}}
					</view>
					<view>
						优惠券
					</view>
				</view>
				
				<view class="user-card-item">
					<view>
						{{userData.orderNum}}
					</view>
					<view>
						订单数量
					</view>
				</view>
				
				<view class="user-card-item">
					<view>
						{{userData.payedOrderNum}}
					</view>
					<view>
						支付订单
					</view>
				</view>
				
				<view class="user-card-item">
					<view>
						<image src="../../static/my01.png" mode=""></image>
					</view>
					<view>
						消费记录
					</view>
				</view>
			</view>
			
			<view class="user-order card">
				<view class="user-order-head rows">
					<view>
						我的订单
					</view>
					
					<view>
						查看更多订单 >
					</view>
				</view>
				
				<view class="user-order-content">
					<view class="user-order-content-item">
						<view><image src="../../static/my02.png" mode=""></image></view>
						<view>待付款</view>
					</view>
					
					<view class="user-order-content-item">
						<view><image src="../../static/my03.png" mode=""></image></view>
						<view>待发货</view>
					</view>
					
					<view class="user-order-content-item">
						<view><image src="../../static/my04.png" mode=""></image></view>
						<view>待收货</view>
					</view>
					
					<view class="user-order-content-item">
						<view><image src="../../static/my05.png" mode=""></image></view>
						<view>待评价</view>
					</view>
					
					<view class="user-order-content-item">
						<view><image src="../../static/my06.png" mode=""></image></view>
						<view>退款/售后</view>
					</view>
				</view>
			</view>
			
			<view class="coupon card">
				<view class="coupon-head rows">
					<view>
						我的优惠券
					</view>
					<view>
						
					</view>
				</view>
			</view>
			
			<view class="card links">
				<view class="links-item">
					<view class="">
						<image src="../../static/my11.png" mode=""></image>
					</view>
					<view class="">
						我的活动
					</view>
				</view>
				
				<view class="links-item">
					<view class="">
						<image src="../../static/my12.png" mode=""></image>
					</view>
					<view class="">
						社区
					</view>
				</view>
				
				<view class="links-item">
					<view class="">
						<image src="../../static/my13.png" mode=""></image>
					</view>
					<view class="">
						客户服务
					</view>
				</view>
				
				<view class="links-item">
					<view class="">
						<image src="../../static/my14.png" mode=""></image>
					</view>
					<view class="">
						京东超市
					</view>
				</view>
				
				<view class="links-item">
					<view class="">
						<image src="../../static/my7.png" mode=""></image>
					</view>
					<view class="">
						我的优惠券
					</view>
				</view>
				
				<view class="links-item">
					<view class="">
						<image src="../../static/my8.png" mode=""></image>
					</view>
					<view class="">
						收货地址
					</view>
				</view>
				
				<view class="links-item">
					<view class="">
						<image src="../../static/my9.png" mode=""></image>
					</view>
					<view class="">
						我的积分
					</view>
				</view>
				
				<view class="links-item">
					<view class="">
						<image src="../../static/my10.png" mode=""></image>
					</view>
					<view class="">
						我的客服
					</view>
				</view>
			</view>
			
			<view class="tmallcard card">
				<view class="tmallcard-head">
					<view>天猫超市卡</view>
					<view>立刻充值 ></view>
				</view>
				
				<view class="tmallcard-content">
					<image src="../../static/my00.jpg" ></image>
				</view>
				
				<view class="tmallcard-balance">
					账户余额：{{'￥' + userData.balance}}
				</view>
			</view>
			
			<view class="recommend-pic">
				<image src="../../static/my15.png" ></image>
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
				userData:{
					collection:13,
					follow:1,
					viewed:3,
					points:0,
					coupon:3,
					orderNum:0,
					payedOrderNum:0,
					balance:0
				},
				likeList:[]
			};
		},
		
		onLoad() {
			this.loadData()
		},
		
		methods:{
			loadData(){
				this.getLikeList()
			},
			
			navigateToItemDetail(id){
				uni.navigateTo({
					url:`../goodsDetail/goodsDetail?id=${id}`
				})
			},
			
			async getLikeList() {
				const likeList = await this.$api.getData('likeList')
				this.likeList = likeList
			},
		}
	}
</script>

<style lang="scss">
.main{
	position: relative;
	width: 100%;
}

.card{
	background-color: $uni-bg-color;
	border-radius: 6px;
	margin-bottom: 24rpx;
	padding: 16rpx 25.6rpx;
	.rows{
		border-bottom: 1px solid #eee;
	}
}

.user-head{
	position: absolute;
	height: 312rpx;
	width: 100%;
	top:0;
	z-index: -1;
	background-color: rgb(255,51,99);
	
	.head-user{
		height: 152.1rpx;
		padding: 25.6rpx;
		display: flex;
		
		.user-head-avatar{
			height: 100%;
			width: 112rpx;
			margin-right: 16rpx;
		}
		
		.user-head-userinfo{
			height: 100%;
			.user-head-userinfo-name{
				color: #fff;
				font-size: $uni-font-size-lger;
			}
		}
	}
}

.user-content{
	position: relative;
	top:160rpx;
	padding: 0 32rpx;
	z-index: 3;
	.user-content-reocrds{
		height: 80rpx;
		margin-bottom: 16rpx;
		display: flex;
		justify-content: center;
		.user-content-reocrds-item{
			width: 200rpx;
			height: 100%;
			
			view{
				text-align: center;
				height: 50%;
				line-height: 40rpx;
				color: #fff;
				font-size: $uni-font-size-sm;
			}
		}
	}
	
	.user-card{
		height: 148rpx;
		display: flex;
		justify-content: space-between;
		.user-card-item{
			width: 20%;
			view{
				// text-align: center;
				height: 50%;
				// line-height: 58rpx;
				font-size: $uni-font-size-sm;
				display: flex;
				justify-content: center;
				align-items: center;
				
				image{
					height: 48rpx;
					width: 48rpx;
				}
			}
			
			&:last-child{
				border-left: 1px solid #eee;
			}
		}
	}
	
	.user-order{
		.user-order-head{
			display: flex;
			justify-content: space-between;
			view{
				line-height: 66rpx;
				&:first-child{
					font-weight: bold;
					color: #000;
				}
				
				&:last-child{
					font-size: $uni-font-size-sm;
					color: #999;
				}
			}
		}
		
		.user-order-content{
			margin-top: 9.6rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.user-order-content-item{
				width: 20%;
				padding: 16rpx 0;
				height: 120rpx;
				view{
					display: flex;
					height: 50%;
					justify-content: center;
					align-items: center;
					font-size: $uni-font-size-sm;
					image{
						height: 48rpx;
						width: 48rpx;
					}
				}
			}
		}
	}
	
	.coupon{
		.coupon-head{
			display: flex;
			justify-content: space-between;
			view{
				line-height: 66rpx;
				&:first-child{
					font-weight: bold;
					color: #000;
				}
				
				&:last-child{
					font-size: $uni-font-size-sm;
					color: #999;
				}
			}
		}
	}
	
	.links{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding-top: 32rpx;
		.links-item{
			width: 25%;
			margin-bottom: 16rpx;
			view{
				font-size: $uni-font-size-sm;
				
				&:first-child{
					display: flex;
					justify-content: center;
				}
				
				&:last-child{
					align-items: center;
					text-align: center;
					line-height: 48rpx;
				}
				
				image{
					width: 74rpx;
					height: 80rpx;
				}
			}
		}
	}
	
	.tmallcard{
		.tmallcard-head{
			display: flex;
			justify-content: space-between;
			view{
				line-height: 66rpx;
				&:first-child{
					font-weight: bold;
					color: #000;
				}
				
				&:last-child{
					font-size: $uni-font-size-sm;
					color: #999;
				}
			}
		}
		
		.tmallcard-content{
			image{
				height: 128rpx;
			}
		}
		
		.tmallcard-balance{
			height: 64rpx;
			line-height: 64rpx;
		}
	}
	
	.recommend-pic{
		display: flex;
		justify-content: center;
		margin: 16rpx;
		image{
			width: 314rpx;
			height: 48rpx;
		}
	}
	
	.youlike-card{
		@extend .youlike-card;
		background-color: $uni-bg-color;
	}
}
</style>
