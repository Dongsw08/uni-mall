import Vue from 'vue'
import App from './App'
import json from 'json.js'
import store from 'store/index.js'

Vue.config.productionTip = false

App.mpType = 'app'

const getData = type => new Promise((resolve,reject) => {
	setTimeout(() => {
		resolve(json[type])
	},300)
})

const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}

Vue.prototype.$api = { getData, prePage }

const app = new Vue({
    ...App,
	store
})
app.$mount()
