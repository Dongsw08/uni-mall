<template>
	<view class="main">
		<scroll-view scroll-y="true" class="left-aside">
			<view v-for="(item,index) in cateList" :key="item.pid" class="left-aside-cate" :class="{active:item.pid === currentId}" @click="onCateClick(item.pid)">
				{{item.title}}
			</view>
		</scroll-view>
		<scroll-view scroll-y="true" scroll-with-animation class="right-aside" :scroll-top="tabScrollTop" @scroll="rightAsideScroll">
			<view class="cate-item-container" v-for="(cate,index) in cateItemList" :key="cate.pid" :id="'item-'+cate.pid">
				<view class="cate-item-title">
					{{cate.title}}
				</view>
				<view class="cate-item-wrapper">
					<view class="cate-item" v-for="(item,index) in cate.items" :key="index">
						<image :src="item.src"></image>
						<view class="item-name">
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sizeCalcState: false,
				cateList:[],
				cateItemList:[],
				currentId:1,
				tabScrollTop:null
			};
		},
		
		onLoad(){
			this.loadData()
		},
		
		methods:{
			loadData(){
				this.getCateList();
				this.getCateItemList()
			},
			
			async getCateList(){
				const cateList = await this.$api.getData('categoryList')
				this.cateList = cateList
			},
			
			async getCateItemList(){
				const cateItemList = await this.$api.getData('categoryItemList')
				this.cateItemList = cateItemList.sort((a,b) => a.pid - b.pid)
			},
			
			onCateClick(pid){
				if(!this.sizeCalcState){
					this.calcSize().then(() => {
						this.currentId = pid
						let index = this.cateItemList.findIndex((item) => 
							item.pid === pid
						)
						this.tabScrollTop = this.cateItemList[index].top
					})
					return;
				}
				this.currentId = pid
				let index = this.cateItemList.findIndex((item) => 
					item.pid === pid
				)
				this.tabScrollTop = this.cateItemList[index].top
			},
			
			//计算右侧栏每个tab的高度等信息
			calcSize(){
				return new Promise((resolve,reject) => {
					let h = 0;
					this.cateItemList.forEach(item=>{
						let view = uni.createSelectorQuery().select("#item-" + item.pid);
						view.fields({
							size: true
						}, data => {
							item.top = h;
							h += data.height;
							item.bottom = h;
							// resolve();
						}).exec(resolve);
					})
					this.sizeCalcState = true;
				})
			},
			
			rightAsideScroll(e){
				if(!this.sizeCalcState){
					this.calcSize().then(() => {
						let scrollTop = e.detail.scrollTop;
						let tabs = this.cateItemList.filter(item=>item.top <= scrollTop).reverse();
						if(tabs.length > 0){
							this.currentId = tabs[0].pid;
						}
					})
					return;
				}
				let scrollTop = e.detail.scrollTop;
				let tabs = this.cateItemList.filter(item=>item.top <= scrollTop).reverse();
				if(tabs.length > 0){
					this.currentId = tabs[0].pid;
				}
			}
		}
	}
</script>

<style lang="scss">
page,.main{
	height: 100%;
}	
	
.main{
	display: flex;
}	
	
.left-aside{
	background-color: #f7f7f7;
	width: 186rpx;
	height: 100%;
	border-right: 1px solid #eee;
	
	.left-aside-cate{
		height: 96rpx;
		border-bottom: 1px solid #eee;
		text-align: center;
		line-height: 96rpx;
		
		&.active{
			background-color: #fff;
			color: #ff2150;
		}
	}
}

.right-aside{
	flex:1;
	min-height: 100%;
	background-color: $uni-bg-color;
	padding: 20rpx;
	
	.cate-item-container{
		margin-bottom: 96rpx;
		.cate-item-title{
			height: 64rpx;
			margin-bottom: 20rpx;
			color: #ff2150;
		}
		.cate-item-wrapper{
			display: flex;
			flex-wrap: wrap;
			
			.cate-item{
				flex-basis: 30%;
				margin-right: 10rpx;
				margin-bottom: 20rpx;
				flex-grow: 1;
				max-width: 33%;
				
				&:nth-child(3n){
					margin-right:0px;
				}
				
				image{
					height: 144rpx;
					width: 144rpx;
				}
				
				.item-name{
					width: 100%;
					max-width: 144rpx;
					text-align: center;
					font-size: $uni-font-size-sm;
				}
			}
		}
	}
}
</style>
