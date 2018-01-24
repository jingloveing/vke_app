import Vue from 'vue'
import Router from 'vue-router'
import PageAinimate from '@/components/common/pageAinimate'
import Home from '@/components/home/Home'
import LiveRoom from '@/components/liveRoom/liveRoom'
import BrandSite from '@/components/brandSite/brandSite'
import PersonCenter from '@/components/personCenter/personCenter'
import Info from '@/components/personCenter/info'
import MyOrder from '@/components/personCenter/myOrder'
import OrderList from '@/components/personCenter/OrderList'
import OrderDeatail from '@/components/personCenter/orderDeatail'
import Refund from '@/components/personCenter/Refund'

Vue.use(Router)
Router.prototype.goBack = function() {
	this.isBack = true
	window.history.go(-1)
}
//export default new Router({
////mode:'history',
//routes: [
//  {
//    path: '/',
//    name: 'Home',
//    component: Home
//  }
//]
//})

//name: 'PageAinimate',
//component: PageAinimate, // 引入页面切换组件

const router = new Router({
mode: 'history',
routes: [{
		path: '',
		redirect: '/home',
		component: Home,
		meta: {
			showFooter: true
		}
	},
	{
		path: '/home',
		component: Home,
		meta: {
			showFooter: true
		}
	},
	{
		path: '/liveRoom',
		component: LiveRoom,
		meta: {
			showFooter: true
		}
	},
	{
		path: '/brandSite',
		component: BrandSite,
		meta: {
			showFooter: true
		}
	},
	{
		path: '/personCenter',
		name: 'PersonCenter',
		component: PersonCenter,
		meta: {
			showFooter: true
		}
	},
	{
		path: '/personCenter/info',
		name: 'Info',
		component: Info,
		meta: {
			showHeader: true,
			title:"江湖邮局"
		}
	},
	{
		path: '/personCenter/myOrder',
		name: 'MyOrder',
		component: MyOrder,
		meta: {
			showHeader: true,
			title:"我的订单"
		}
	},
	{
		path: '/personCenter/myOrder/orderList',
		name: 'OrderList',
		component: OrderList,
		meta: {
			showHeader: true,
			title:"享利客订单"
		}
	},
	{
		path: '/personCenter/myOrder/orderDeatail',
		name: 'OrderDeatail',
		component: OrderDeatail,
		meta: {
			showHeader: true,
			title:"订单详情"
		}
	},
	{
		path: '/personCenter/myOrder/refund',
		name: 'Refund',
		component: Refund,
		meta: {
			showHeader: true,
			title:"申请退款"
		}
	},
]
})

export default router