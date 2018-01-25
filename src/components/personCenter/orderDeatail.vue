<template>
	<div>
		<div class="header">
			<div style="display: table-cell;vertical-align: middle;">
				<!--待付款--已发货--交易成功--交易关闭--待发货--->
				<!--待付款--剩14分34秒自动关闭-->
				<!--交易关闭--超时关闭、买家取消订单、订单退款-->
				<!--待发货--请耐心等待卖家发货-->
				<p class="header—title">已发货</p>
				<p class="header-time">还剩7天20时自动确认收货</p>
			</div>
		</div>
		<div class="user-info">
			<div class="user-left">
				<img src="../../../static/images/address_icon.png" alt="" class="icon" />
			</div>
			<div class="user-des">
				<p class="user-info1"><span class="name">姓名</span><span>13254364654</span></p>
				<p class="user-address">地址都到家四十多佛山低分递搜啊发动机搜啊等方式地址都到家四十多佛山低分递搜啊发动机搜啊等方式地址都到家四十多佛山低分递搜啊发动机搜啊等方式</p>
			</div>
		</div>
		<div class="list">
			<p class="order_num">订单信息</p>
			<div class="order_des">
				<img src="../../../dist/static/images/default_img.png" alt="" class="order_pic" />
				<div class="order_des_m">
					<p class="break break_two order_name">商品名称商品名称商品名称商品名称商品是的法商品名称商品名称商品名称商品名称商品是的法商品名称商品名称商品名称商品名称商品是的法律上都没佛打扫地方撒是地方撒地方撒</p>
					<p class="order_des_num">规格：24包 <span>x1</span></p>
					<p class="order_price">
						<span>￥<span class="rmb">22</span><span class="corner">.90</span></span>
					</p>
					<router-link class="btn" style="float: right;" to="/personCenter/myOrder/refund">申请退款</router-link>
				</div>
			</div>
			<div class="list_num">
				<p class="f24 c9">商品总价：￥33<span>.90</span></p>
				<p class="f24 c9">运费：￥10<span>.00</span></p>
				<p class="f28 c3" style="padding: .1rem 0;">订单总价：<span class="c_m">￥10<span>.00</span></span></p>
			</div>
		</div>
	    <div class="f24 c9 order-des">
	    	<p>订单编号：<span style="font-family: arial;">2334543</span></p>
	    	<p style="font-family: arial;">创建时间：2013-12-11</p>
	    	<p style="font-family: arial;">成交时间：2012-11-11</p>
	    </div>
	    <div class="footer">
	    	<span class="btn btn1" style="margin-right: .26rem;">确认收货</span>
	    </div>
	</div>
</template>

<script>
//	import { } from 'vux'
	export default {
		components: {
			
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped="scoped">
	.header {
		width: 100%;
		height: 2rem;
		background: #9a7bff;
		color: white;
		text-align: center;
		display: table;
	}
	
	.header-title {
		font-size: .36rem;
	}
	
	.header-time {
		font-size: .24rem;
	}
	
	.user-info {
		background: white;
		display: flex;
		align-content: center;
		padding: .4rem .8rem .4rem 0;
		margin-bottom: .2rem;
	}
	
	.user-left {
		width: .82rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	
	.icon {
		width: .28rem;
		height: .35rem;
	}
	
	.user-info1 {
		font-size: .28rem;
		color: #333;
		margin-bottom: .1rem;
	}
	
	.name {
		margin-right: .3rem;
	}
	
	.user-address {
		font-size: .24rem;
		color: #999;
		line-height: .32rem;
	}
	
	
	.list{
		margin-bottom: .1rem;
		border-top:.01rem solid #e5e5e5 ;
		border-bottom: .01rem solid #e5e5e5;
	}
	.order_num {
		font-size: .28rem;
		color: #333;
		line-height: .78rem;
		padding: 0 .26rem;
		background: white;
	}
	.order_des {
		padding: .15rem .26rem;
		background: #f5f5f5;
		display: flex;
	}
	
	.order_pic {
		width: 1.5rem;
		height: 1.5rem;
		margin-right: .2rem;
	}
	
	.order_des_m {
		width: calc(100% - 1.6rem);
		width: -moz-calc(100% - 1.6rem);
		width: -webkit-calc(100% - 1.6rem);
	}
	
	.order_name {
		font-size: .26rem;
		color: #333;
		line-height: .35rem;
	}
	
	.order_des_num {
		font-size: .24rem;
		color: #999;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.order_des_num>span {
		font-size: .28rem;
		color: #333;
	}
	
	.order_price {
		font-size: .24rem;color: #F51D46;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.rmb {
		font-size: .32rem;
	}
	.list_num{
		background: white;
		padding: .05rem .26rem 0;
	}
	.order-des{
		padding: .15rem .26rem;
		background: white;
	}
	.footer{
		width: 100%;
		position: fixed;
		bottom: 0;
		height: 1rem;
		line-height: 1rem;
		background: white;
		vertical-align: middle;
		text-align: right;
	}
</style>