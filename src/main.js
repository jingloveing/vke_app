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
import { ConfirmPlugin ,AlertPlugin,ToastPlugin,AjaxPlugin ,LoadingPlugin} from 'vux'
import VueScroller from 'vue-scroller'
import VueAwesomeSwiper from "vue-awesome-swiper"
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)
Vue.use(VueScroller)
Vue.use(LoadingPlugin)
Vue.use(AjaxPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(VueRouter)
Vue.use(ConfirmPlugin)
//const routes = [
//{
//  path: '/',
//  redirect: '/home',
//  component: Home,
//  meta: {
//    showFooter: true
//  }
//},
//{
//  path: '/home',
//  component: Home,
//  meta: {
//    showFooter: true
//  }
//},
//{
//  path: '/liveRoom',
//  component: LiveRoom,
//  meta: {
//    showFooter: true
//  }
//},
//{
//  path: '/brandSite',
//  component: BrandSite,
//  meta: {
//    showFooter: true
//  }
//},
//{
//  path: '/PersonCenter',
//  name:'PersonCenter',
//  component: PersonCenter,
//  meta: {
//    showFooter: true
//  }
//}
//]

//const router = new VueRouter({
////mode:'history',
//routes
//})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')



