import Vue from 'vue'
import Router from 'vue-router'
import PageAinimate from '@/components/common/pageAinimate'
import Home from '@/components/home/Home'
import LiveRoom from '@/components/liveRoom/liveRoom'
import BrandSite from '@/components/brandSite/brandSite'
import PersonCenter from '@/components/personCenter/personCenter'
import Info from '@/components/personCenter/info'
import MyOrder from '@/components/personCenter/myOrder'
import OrderList from '@/components/personCenter/orderList'
import OrderDeatail from '@/components/personCenter/orderDeatail'
import Refund from '@/components/personCenter/refund'
import InfoList from '@/components/personCenter/infoList'
import AcerStorage from '@/components/personCenter/acerStorage'
import EmailList from '@/components/personCenter/emailList'
import Setting from '@/components/personCenter/setting'
import Accredit from '@/components/personCenter/accredit'
import BindTel from '@/components/personCenter/bindTel'
import Assortment from '@/components/home/assortment'
import Search from '@/components/home/search'
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
		path: '/home/assortment',
		component: Assortment
	},
	{
		path: '/home/assortment/search',
		component: Search
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
		path: '/personCenter/setting',
		name: 'Setting',
		component: Setting,
		meta: {
			showHeader: true,
			title:"掌事堂"
		}
	},
	{
		path: '/personCenter/setting/accredit',
		name: 'Accredit',
		component: Accredit,
		meta: {
			showHeader: true,
			title:"宝库设防"
		}
	},
	{
		path: '/personCenter/setting/bindTel',
		name: 'BindTel',
		component: BindTel,
		meta: {
			showHeader: true,
			title:"手机绑定"
		}
	},
	{
		path: '/personCenter/info/infoList',
		name: 'InfoList',
		component: InfoList,
		meta: {
			showHeader: true,
			title:"商品发货"
		}
	},
	{
		path: '/personCenter/info/acerStorage',
		name: 'AcerStorage',
		component: AcerStorage,
		meta: {
			showHeader: true,
			title:"财宝入库"
		}
	},
	{
		path: '/personCenter/info/emailList',
		name: 'EmailList',
		component: EmailList,
		meta: {
			showHeader: true,
			title:"官方信件"
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