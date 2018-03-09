import Vue from 'vue'
import Router from 'vue-router'
import PageAinimate from '@/components/common/pageAinimate'
import Home from '@/components/home/Home'
import ShareRoom from '@/components/share/shareRoom'
import BrandSite from '@/components/brandSite/brandSite'
import PersonCenter from '@/components/personCenter/personCenter'
import Info from '@/components/personCenter/info'
import MyOrder from '@/components/personCenter/myOrder'
import OrderList from '@/components/personCenter/orderList'
import OrderDeatail from '@/components/personCenter/orderDeatail'
import Refund from '@/components/personCenter/refund'
import InfoList from '@/components/personCenter/infoList'
import Setting from '@/components/personCenter/setting'
import Accredit from '@/components/personCenter/accredit'
import BindTel from '@/components/personCenter/bindTel'
import Taobao from '@/components/home/taobao'
import Fuli from '@/components/home/fuli'
import Classify from '@/components/home/classify'
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
import EditShoppingCart from '@/components/personCenter/EditShoppingCart'
import HelpCenter from '@/components/personCenter/HelpCenter'
import Code from '@/components/personCenter/code'
import ShareList from '@/components/personCenter/shareList'
import ToShowList from '@/components/personCenter/toShowList'
import CollectList from '@/components/personCenter/collectList'
import IndexSearch from '@/components/home/indexSearch'
import StoreIndex from '@/components/brandSite/storeIndex'
import StoreClassify from '@/components/brandSite/storeClassify'
import StoreGoods from '@/components/brandSite/storeGoods'
import ToPay from '@/components/personCenter/topay'
import Seek from '@/components/personCenter/seek'
import GoodsDetail from '@/components/common/goodsDetail'
import JD from '@/components/home/JD'
import NewJD from '@/components/home/new_JD'
import NewMogu from '@/components/home/new_mogu'
import NewVip from '@/components/home/new_vip'
//import JDDetail from '@/components/home/JDDetail'
import TBDetail from '@/components/home/TBDetail'
import BrandDetail from '@/components/brandSite/brandDetail'
import SelfSupport from '@/components/home/selfSupport'
import RefundList from '@/components/personCenter/refundList'
import RefundDetail from '@/components/personCenter/refundDetail'
import SelectReason from '@/components/personCenter/selectReason'
import Login from '@/components/login'
import NewHand from '@/components/home/newHand'
import Rule from '@/components/personCenter/rule'
import AboutUs from '@/components/personCenter/AboutUs'
import CashRule from '@/components/personCenter/cashRule'
import Upgrade from '@/components/personCenter/upgrade'
import ShareDetail from '@/components/share/shareDetail'
import Vedio from '@/components/brandSite/vedio'
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
		name:'Home',
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
		path: '/home/taobao',
		component: Taobao
	},
	{
		path: '/home/assortment/Classify',
		name:'Classify',
		component: Classify,
		meta: {
			showHeader: true,
			title:"淘宝领券"
		}
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
		path: '/shareRoom',
		component: ShareRoom,
		meta: {
			showFooter: true
		}
	},
	{
		path: '/shareRoom/shareDetail',
		component: ShareDetail,
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
		path: '/brandSite/storeIndex/storeGoods',
		name:'StoreGoods',
		component: StoreGoods
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
		component: ShoppingCart,
		meta: {
			showHeader: true,
			title:"购物车"
		}
	},
	{
		path: '/personCenter/shoppingCart/editShoppingCart',
		name: 'EditShoppingCart',
		component: EditShoppingCart,
		meta: {
			showHeader: true,
			title:"购物车"
		}
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
		path: '/personCenter/refundList',
		name: 'RefundList',
		component: RefundList,
		meta: {
			showHeader: true,
			title:"宝物退换"
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
		component: Feedback,
		meta: {
			showHeader: true,
			title:"意见反馈"
		}
	},
	{
		path: '/personCenter/info/infoList',
		name: 'InfoList',
		component: InfoList,
		meta: {
			showHeader: true
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
		path: '/personCenter/myOrder/topay',
		name: 'ToPay',
		component: ToPay,
		meta: {
			showHeader: true,
			title:"支付订单"
		}
	},
	{
		path: '/personCenter/myOrder/seek',
		name: 'Seek',
		component: Seek,
		meta: {
			showHeader: true,
			title:"查看物流"
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
	{
		path: '/refundDetail',
		name: 'RefundDetail',
		component: RefundDetail,
		meta: {
			showHeader: true,
			title:"退换详情"
		}
	},
	{
		path: '/home/goodsDetail',
		name: 'GoodsDetail',
		component: GoodsDetail,

	},
	{
		path: '/newJD',
		name: 'NewJD',
		component: NewJD,
		meta: {
			showHeader: true,
			title:"京东"
		}
	},
	{
		path: '/newMogu',
		name: 'NewMogu',
		component: NewMogu,
		meta: {
			showHeader: true,
			title:"蘑菇街"
		}
	},
	{
		path: '/newVip',
		name: 'NewVip',
		component: NewVip,
		meta: {
			showHeader: true,
			title:"唯品会"
		}
	},
//	{
//		path: '/JD',
//		name: 'JD',
//		component: JD,
//	},
	{
		path: '/brandDetail',
		name: 'BrandDetail',
		component: BrandDetail,
	},
	{
		path: '/taobao/TBDetail',
		name: 'TBDetail',
		component: TBDetail,
	},
	{
		path: '/taobao/fuli',
		name: 'Fuli',
		component: Fuli,
		meta: {
			showHeader: true
		}
	},
	{
		path: '/taobao/newHand',
		name: 'NewHand',
		component: NewHand,
		meta: {
			showHeader: true,
			title:"新手秒懂"
		}
	},
	{
		path: '/selfSupport',
		name: 'SelfSupport',
		component: SelfSupport,
	},
	{
		path: '/selectReason',
		name: 'SelectReason',
		component: SelectReason,
		meta: {
			showHeader: true,
			title:"选择服务类型"
		}
	},
	{
		path: '/rule',
		name: 'Rule',
		component: Rule,
		meta: {
			showHeader: true,
			title:"江湖规矩"
		}
	},
	{
		path: '/aboutUs',
		name: 'AboutUs',
		component: AboutUs,
		meta: {
			showHeader: true,
			title:"自报家门"
		}
	},
	{
		path: '/cashRule',
		name: 'CashRule',
		component: CashRule,
		meta: {
			showHeader: true,
			title:"挂单规则"
		}
	},
	{
		path: '/upgrade',
		name: 'Upgrade',
		component: Upgrade,
		meta: {
			showHeader: true,
			title:"升级地位"
		}
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
	},
	{
		path: '/vedio',
		name: 'Vedio',
		component: Vedio,
		meta: {
			showHeader: true,
			title:"视频"
		}
	},
]
})

export default router