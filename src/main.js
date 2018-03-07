// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
//import Home from './components/home/Home'
//import LiveRoom from '@/components/liveRoom/liveRoom'
//import BrandSite from '@/components/brandSite/brandSite'
//import PersonCenter from '@/components/personCenter/personCenter'
import '../static/css/main.css'
import animate from 'animate.css'
import {ConfirmPlugin, AlertPlugin, ToastPlugin, LoadingPlugin } from 'vux'
import VueScroller from 'vue-scroller'
import VueAwesomeSwiper from "vue-awesome-swiper"
import 'swiper/dist/css/swiper.css'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(VueAwesomeSwiper)
Vue.use(VueScroller)
Vue.use(LoadingPlugin)
//Vue.use(AjaxPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(VueRouter)
Vue.use(ConfirmPlugin)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	router,
	render: h => h(App)
}).$mount('#app-box')

/******************拦截器设置请参考这部分(开始)******************/
Vue.http.interceptors.push((request, next) => {
	//登录成功后将后台返回的TOKEN在本地存下来,每次请求从sessionStorage中拿到存储的TOKEN值  
		let token = sessionStorage.getItem('token');
	if(token) {
		//如果请求时TOKEN存在,就为每次请求的headers中设置好TOKEN,后台根据headers中的TOKEN判断是否放行      
		request.headers.set('Authorization', 'Bearer '+token);
	}
	next((response) => {
			if(response.status === 400 || response.status === 401) {
				// 当 Token 已经失效时，清空所有保存在 localStorage 的数据
				sessionStorage.clear();
			}
			return response;
	});

});
/******************拦截器设置请参考这部分(结束)******************/