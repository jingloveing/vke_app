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
import 'animate.css/animate.css'
import { ConfirmPlugin, AlertPlugin, ToastPlugin, LoadingPlugin } from 'vux'
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
Vue.prototype.http='http://xlk.dxvke.com'
/* eslint-disable no-new */
new Vue({
	router,
	render: h => h(App),
	created() {
		var self = this
		document.addEventListener("plusready", function() {
			plus.navigator.setStatusBarBackground("#9A7BFF");
			// 扩展API加载完毕，现在可以正常调用扩展API
			plus.oauth.getServices(function(services) {
				window.auths = services;
			}, function(e) {
				alert("获取分享服务列表失败：" + e.message + " - " + e.code);
			});
			// 扩展API加载完毕，现在可以正常调用扩展API
			plus.share.getServices(function(s) {
				window.shares = s;
				for(var i in s) {
					var t = s[i]
					shares[t.id] = t
				}
			}, function(e) {
				alert("获取分享服务列表失败：" + e.message);
			});
			plus.payment.getChannels(function(s) {
				for(var i in s) {
					var channel = s[i]
					//获取支付宝支付
					if(channel.id === 'alipay') {
						window.alipay = channel;
					}
				}
			}, function(e) {
				alert("获取支付通道列表失败：" + e.message);
			});
			var webview = plus.webview.currentWebview();
			var first = null;
			plus.key.addEventListener('backbutton', function() {
				webview.canBack(function(e) {
					if(e.canBack) {
						if(self.$route.path=='/home'||self.$route.path=='/shareRoom'||self.$route.path=='/brandSite'||self.$route.path=='/PersonCenter'){
							//首页返回键处理
						//处理逻辑：1秒内，连续两次按返回键，则退出应用；
//						plus.key.addEventListener('backbutton', function() {
							//首次按键，提示‘再按一次退出应用’
							if(!first) {
								first = new Date().getTime();
								plus.nativeUI.toast('再按一次退出应用', "享利客");
								setTimeout(function() {
									first = null;
								}, 1000);
							} else {
								if(new Date().getTime() - first < 1500) {
									plus.runtime.quit();
								}
							}
//						}, false);
						}else{
							var service_comfirm = plus.webview.getWebviewById("new");
						plus.webview.close(service_comfirm, "none");
						var view = plus.nativeObj.View.getViewById('test')
						if(view){
							view.clear()
						}else{
							
						}
						webview.back();
						}
						
					} else {
						//首页返回键处理
						//处理逻辑：1秒内，连续两次按返回键，则退出应用；
//						var first = null;
//						plus.key.addEventListener('backbutton', function() {
							//首次按键，提示‘再按一次退出应用’
							if(!first) {
								first = new Date().getTime();
								plus.nativeUI.toast('再按一次退出应用', "享利客");
								setTimeout(function() {
									first = null;
								}, 2000);
							} else {
								if(new Date().getTime() - first < 1500) {
									plus.runtime.quit();
								}
							}
//						}, false);
					}
				})
			});

		}, false);
	}
}).$mount('#app-box')

/******************拦截器设置请参考这部分(开始)******************/
Vue.http.interceptors.push((request, next) => {
	//登录成功后将后台返回的TOKEN在本地存下来,每次请求从sessionStorage中拿到存储的TOKEN值  
	let token = plus.storage.getItem("token")
//	       let token='eyJ0eXAiOiJKV1QiLCJhbGciOiJTSEEyNTYifQ==.eyJpc3MiOiJKV1QgRlJFRURPTSIsImlhdCI6MTUxNjg2Mzg3NiwiYXVkIjoiTEoiLCJqdGkiOm51bGwsImRhdGEiOnsidXNlcl9pZCI6MSwidXNlcl9uYW1lIjoiZnJlZWRvbSJ9fQ==.2e20945c06282cc6edd693dac3c3b6a5746269cccdac9f6465b7dc3296325076'
	if(token) {
		//如果请求时TOKEN存在,就为每次请求的headers中设置好TOKEN,后台根据headers中的TOKEN判断是否放行      
		request.headers.set("token", token);
	}
	next((response) => {
		if(response.status === 400 || response.status === 401) {
			// 当 Token 已经失效时，清空所有保存在 localStorage 的数据
			plus.storage.removeItem("token");
			plus.storage.removeItem("userInfo");
		}
		return response;
	});

});
/******************拦截器设置请参考这部分(结束)******************/