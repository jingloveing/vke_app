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
import SearchPage from '@/components/home/searchPage'
import SearchResult from '@/components/home/searchResult'
import Bill from '@/components/personCenter/bill'
import UserInfo from '@/components/personCenter/userInfo'
import ChangeName from '@/components/personCenter/changeName'
import MyPrerogative from '@/components/personCenter/myPrerogative'
import GoldStore from '@/components/personCenter/goldStore'
import Feedback from '@/components/personCenter/feedback'
import Realize from '@/components/personCenter/realize'
import RealizeList from '@/components/personCenter/realizeList'
import SelectDate from '@/components/personCenter/selectDate'
import Introduce from '@/components/personCenter/introduce'
import FansOffer from '@/components/personCenter/fansOffer'
import UnderWay from '@/components/personCenter/underWay'
import Share from '@/components/personCenter/Share'
import Pay from '@/components/personCenter/pay'
import SelectAddress from '@/components/personCenter/selectAddress'
import AddressList from '@/components/personCenter/AddressList'
import AddAddress from '@/components/personCenter/addAddress'
import MyWorld from '@/components/personCenter/myWorld'
import Member from '@/components/personCenter/member'
import ShoppingCart from '@/components/personCenter/shoppingCart'
import HelpCenter from '@/components/personCenter/HelpCenter'
import Code from '@/components/personCenter/code'
import ShareList from '@/components/personCenter/shareList'
import ToShowList from '@/components/personCenter/toShowList'
import CollectList from '@/components/personCenter/collectList'
import IndexSearch from '@/components/home/indexSearch'
import StoreIndex from '@/components/brandSite/storeIndex'
import StoreClassify from '@/components/brandSite/storeClassify'
Vue.use(Router)
//Router.prototype.goBack = function() {
//	this.isBack = true
//	window.history.go(-1)
//}
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
		path: '/home/indexSearch',
		component: IndexSearch
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
		path: '/home/assortment/searchPage',
		name:"searchPage",
		component: SearchPage
	},
	{
		path: '/home/assortment/searchResult',
		name:"searchResult",
		component: SearchResult
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
		path: '/brandSite/storeIndex',
		name:'StoreIndex',
		component: StoreIndex,
	},
	{
		path: '/brandSite/storeIndex/storeClassify',
		name:'StoreClassify',
		component: StoreClassify,
		meta: {
			showHeader: true,
			title:"店铺分类"
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
		path: '/personCenter/myPrerogative',
		name: 'MyPrerogative',
		component: MyPrerogative,
		meta: {
//			showHeader: true,
//			title:""
		}
	},
	{
		path: '/personCenter/userInfo/changeName',
		name: 'ChangeName',
		component: ChangeName,
		meta: {
			showHeader: true,
			title:"修改昵称"
		}
	},
	{
		path: '/personCenter/bill',
		name: 'Bill',
		component: Bill,
		meta: {
			showHeader: true,
			title:"消费账单"
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
		path: '/personCenter/userInfo',
		name: 'UserInfo',
		component: UserInfo,
		meta: {
			showHeader: true,
			title:"我的身份"
		}
	},
	{
		path: '/personCenter/goldStore',
		name: 'GoldStore',
		component: GoldStore,
		meta: {
			showHeader: true,
			title:"小金库"
		}
	},
	{
		path: '/personCenter/underWay',
		name: 'UnderWay',
		component: UnderWay,
		meta: {
			showHeader: true,
			title:"镖局押运"
		}
	},
	{
		path: '/personCenter/share',
		name: 'Share',
		component: Share,
		meta: {
			showHeader: true,
			title:"分享夺宝"
		}
	},
	{
		path: '/personCenter/myWorld',
		name: 'MyWorld',
		component: MyWorld,
		meta: {
			showHeader: true,
			title:"我的江湖"
		}
	},
	{
		path: '/personCenter/shoppingCart',
		name: 'ShoppingCart',
		component: ShoppingCart
	},
	{
		path: '/personCenter/helpCenter',
		name: 'HelpCenter',
		component: HelpCenter,
		meta: {
			showHeader: true,
			title:"白鹭书院"
		}
	},
	{
		path: '/personCenter/code',
		name: 'Code',
		component: Code,
		meta: {
			showHeader: true,
			title:"启蒙码"
		}
	},
	{
		path: '/personCenter/shareList',
		name: 'ShareList',
		component: ShareList
	},
	{
		path: '/personCenter/shareList/toShowList',
		name: 'ToShowList',
		component: ToShowList,
		meta: {
			showHeader: true,
			title:"包打听"
		}
	},
	{
		path: '/personCenter/collectList',
		name: 'CollectList',
		component: CollectList,
		meta: {
			showHeader: true,
			title:"藏宝阁"
		}
	},
	{
		path: '/personCenter/myWorld/member',
		name: 'Member',
		component: Member
	},
	{
		path: '/personCenter/goldStore/fansOffer',
		name: 'FansOffer',
		component: FansOffer,
		meta: {
			showHeader: true,
			title:"帮众贡献"
		}
	},
	{
		path: '/personCenter/goldStore/realize',
		name: 'Realize',
		component: Realize,
		
	},
	{
		path: '/personCenter/goldStore/introduce',
		name: 'Introduce',
		component: Introduce,
		meta: {
			showHeader: true,
			title:"查看二维码"
		}
	},
	{
		path: '/personCenter/goldStore/realizeList',
		name: 'RealizeList',
		component: RealizeList,
		meta: {
			showHeader: true,
			title:"挂单记录"
		}
	},
	{
		path: '/personCenter/goldStore/selectDate',
		name: 'SelectDate',
		component: SelectDate,
//		meta: {
//			showHeader: true,
//			title:"日期选择"
//		}
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
		path: '/personCenter/setting/feedback',
		name: 'Feedback',
		component: Feedback
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
		path: '/personCenter/myOrder/pay',
		name: 'Pay',
		component: Pay,
		meta: {
			showHeader: true,
			title:"确认订单"
		}
	},
	{
		path: '/personCenter/myOrder/selectAddress',
		name: 'SelectAddress',
		component: SelectAddress
	},
	{
		path: '/personCenter/myOrder/addressList',
		name: 'AddressList',
		component: AddressList,
		meta: {
			showHeader: true,
			title:"总坛位置"
		}
	},
	{
		path: '/personCenter/myOrder/addAddress',
		name: 'AddAddress',
		component: AddAddress,
		meta: {
			showHeader: true,
			title:"收货地址"
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