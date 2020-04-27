import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
		cart:[
			{
				sid:1,
				shopTitle:'皇宫婚纱旗舰店',
				goods:[
					{
						gid:1,
						src:"../../static/goods/gwc1.png",
						gTitle:'2015新款婚纱冬季新娘结婚韩版蕾',
						info:"颜色：白色；尺码：L",
						origin:'895',
						price:'495.9',
						num:2,
						selected:false
					},
					{
						gid:2,
						src:"../../static/goods/gwc2.png",
						gTitle:'2015新款敬酒服冬季新娘结婚韩版',
						info:"颜色：白色；尺码：L",
						origin:'895',
						price:'298.9',
						num:1,
						selected:false
					},
				]
			},
			{
				sid:2,
				shopTitle:'日韩衣橱',
				goods:[
					{
						gid:1,
						src:"../../static/goods/gwc3.png",
						gTitle:'秋冬款韩版半高领中长款宽松套头打...',
						info:"颜色：白色；尺码：L",
						origin:'79',
						price:'19',
						num:2,
						selected:false
					},
				]
			},
			
		]
	},
	mutations: {
		login(state, provider) {

			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: provider  
			}) 
			console.log(state.userInfo);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'  
            })
		},
		updateCart(state,arr){
			state.cart = arr
		},
		updateGoodsNum(state,data){
			
			const { shopIndex,goodsIndex,num } = data
			state.cart[shopIndex].goods[goodsIndex].num = num
		},
		addGoods(state,item){
			const { shop,goods } = item
			const cart = state.cart
			const shopIndex = cart.findIndex(ele => ele.sid === shop.sid)
			if(shopIndex === -1){
				state.cart.push({
					...shop,
					goods:[{...goods,selected:false,num:1}]
				})
			}else{
				const goodsIndex = cart[shopIndex].goods.findIndex(ele => ele.gid === goods.gid)
				if(goodsIndex === -1){
					state.cart[shopIndex].goods.push({...goods,selected:false,num:1})
				}else{
					state.cart[shopIndex].goods[goodsIndex].num + 1
				}
			}
		},
		removeGoods(state,data){
			const { gid, sid } = data
			const shopIndex = state.cart.findIndex(ele => ele.sid === sid)
			if(state.cart[shopIndex].goods.length === 1){
				state.cart.splice(shopIndex,1)
				return;
			}
			const goodsIndex = state.cart[shopIndex].goods.findIndex(ele => ele.gid === gid)
			
			state.cart[shopIndex].goods.splice(goodsIndex,1)
		},
		toogleSelectItem(state,data){
			const { shopIndex,goodsIndex } = data
			state.cart[shopIndex].goods[goodsIndex].selected = !state.cart[shopIndex].goods[goodsIndex].selected
		},
		selectAll(state){
			const isAllSelected = state.cart.every((ele) => {
				return ele.goods.every(item => item.selected)
			})
			
			state.cart.forEach(shop => {
				shop.goods.forEach(item => {
					if(isAllSelected){
						item.selected = false
					}else{
						item.selected = true
					}
				})
			})
		}
	},
	actions: {
	
	}
})

export default store
