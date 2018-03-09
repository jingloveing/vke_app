<template>
	<div>
		<router-link class="user-info" to="/personCenter/myOrder/selectAddress">
			<div class="user-left">
				<img src="../../../static/images/address_icon.png" alt="" class="icon" />
			</div>
			<div class="user-des">
				<div>
					<p class="user-info1"><span class="name">姓名</span><span>13254364654</span></p>
					<p class="user-address">低分递搜啊发动机搜啊等方式</p>
				</div>
				<img src="../../../static/images/gt_white.png" alt="" class="gt-icon" />
			</div>
		</router-link>
		<div class="list">
			<router-link class="order_des" to="">
				<img src="../../../dist/static/images/default_img.png" alt="" class="order_pic" />
				<div class="order_des_m">
					<p class="break break_two order_name">商品名称商品名称商品名称商品名称商品是的法商品名称商品名称商品名称商品名称商品是的法商品名称商品名称商品名称商品名称商品是的法律上都没佛打扫地方撒是地方撒地方撒</p>
					<p class="order_des_num">规格：24包 <span>x1</span></p>
					<p class="order_price">
						<span>￥<span class="rmb">22</span><span class="corner">.90</span></span>
						<span class="refund">退款成功</span>
					</p>
				</div>
			</router-link>
			<!--<x-number :min="0" v-model="num" fillable :title="'请输入兑换数量'" class="num f28 c3"></x-number>
			<p class="f28 c3" style="line-height: .9rem;margin: 0 .26rem;border-bottom: .01rem solid #e5e5e5;">运费：￥10.00</p>-->
			<p class="f24 c3" style="line-height: .9rem;margin: 0 .26rem;text-align: right;">共1件商品 小计：<span style="color: #F51D46;">￥<span class="rmb">22</span><span class="corner">.90</span></span>
			</p>
		</div>
		<div style="height: 1.2rem;"></div>
		<div class="bottom">
			<div class="f32 c3">合计：<span style="color: #F51D46;">￥<span class="rmb">22</span><span class="corner">.90</span></span>
			</div>
			<router-link to="/personCenter/myOrder/topay" class="f32 pay-btn">
				提交订单
			</router-link>
		</div>
		</div>
</template>

<script>
	import { XNumber, XSwitch} from 'vux'
	export default {
		components: {
			XNumber,
			XSwitch
		},
		data() {
			return {
				num: 1,
				type:0,
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped="scoped">
	.user-info {
		background: white;
		display: flex;
		align-content: center;
		padding: .4rem .26rem .4rem 0;
		border-bottom: .14rem solid transparent;
		border-image: url(../../../static/images/personCenter/bottom_line.png) 14 round;
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
	
	.gt-icon {
		width: .13rem;
		height: .24rem;
		margin-left: .26rem;
	}
	
	.user-des {
		width: calc(100% - .41rem);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.order_pic {
		width: 1.5rem;
		height: 1.5rem;
		margin-right: .2rem;
	}
	
	.order_des {
		padding: .15rem .26rem;
		background: #f5f5f5;
		display: flex;
		align-items: center;
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
		font-size: .24rem;
		color: #F51D46;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.rmb {
		font-size: .32rem;
	}
	
	.num {
		height: .56rem;
		margin: 0 .26rem;
		height: .9rem;
		border-bottom: .01rem solid #e5e5e5;
	}
	
	.list {
		padding-top: .16rem;
		background: white;
		margin-top: .2rem;
	}
	
	.bottom {
		width: 100%;
		position: fixed;
		bottom: 0;
		height: .96rem;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		background: white;
		border-top: .01rem solid #e5e5e5;
	}
	
	.bottom .pay-btn {
		background-color: #9A7BFF;
		color: white;
		width: 2.26rem;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: .26rem;
	}
</style>
<style type="text/css">
	.num .vux-number-selector svg {
		fill: #a3a3a3!important;
	}
	
	.num.weui-cell {
		padding: 0;
	}
	
	.num.weui-cell:before {
		border-top: none!important;
	}
	
	.num .vux-number-input {
		font-size: .32rem;
		color: #333;
	}
</style>