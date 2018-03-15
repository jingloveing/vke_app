<template>
	<div>
		<div class="header">
			<div style="display: table-cell;vertical-align: middle;">
				<!--退款成功--退款关闭--请等待商家处理--商家已同意申请--退货中--->
				<!--退款成功--2018/01/11 8:11-->
				<!--退款关闭--2018/01/11 8:11-->
				<!--请等待商家处理--还剩2天23时59分-->
				<!--商家已同意申请----2018/01/11 8:11--->
				<!--退货中----2018/01/11 8:11-->
				<div v-show="status==0">
					<p class="header—title">请等待商家处理</p>
					<p class="header-time">还剩2天23时59分</p>
				</div>
				<div v-show="status==1">
					<p class="header—title">商家已同意申请</p>
					<p class="header-time" style="font-family: arial;">2014/01/01 08:54</p>
				</div>
				<div v-show="status==2">
					<p class="header—title">退货中</p>
					<p class="header-time" style="font-family: arial;">2014/01/01 08:54</p>
				</div>
				<div v-show="status==3">
					<p class="header—title">退款成功</p>
					<p class="header-time" style="font-family: arial;">2014/01/01 08:54</p>
				</div>
				<div v-show="status==4||status==5">
					<p class="header—title">退款关闭</p>
					<p class="header-time" style="font-family: arial;">2014/01/01 08:54</p>
				</div>
			</div>
		</div>
		<div style="background: white;margin-bottom: .2rem;" v-show="status==0">
			<div class="f28 c3" style="line-height: 1rem;border-bottom: .01rem solid #e5e5e5;padding:0 .26rem;">您已成功发起退换申请，请耐心等待商家处理</div>
			<ul style="padding:.2rem .26rem .2rem .6rem;" class="f24 c9">
				<li>商家同意后，请按照给出的退货地址退货，并请记录退货运单号</li>
				<li>如商家拒绝，您可以修改申请后再次发起，商家会重新处理</li>
				<li>如商家超时未处理，退货申请将达成，请按系统给出的退货地址退货</li>
			</ul>
			<div class="flex" style="justify-content: flex-end;padding-bottom: .2rem;padding-right: .26rem;">
				<router-link class="btn" to="/personCenter/myOrder/refund">撤销申请</router-link>
				<router-link class="btn btn1" to="/personCenter/myOrder/refund">修改申请</router-link>
			</div>
		</div>
		<div style="background: white;margin-bottom: .2rem;" v-show="status==1">
			<div class="f28 c3" style="line-height: 1rem;border-bottom: .01rem solid #e5e5e5;padding:0 .26rem;">退货地址</div>
			<ul style="padding:.2rem .26rem .2rem .6rem;" class="f24 c9">
				<li>浙江省杭州市某某街道某某号（某某收）联系电话：<span style="font-family: arial;">12123242134</span></li>
			</ul>
			<div class="flex" style="justify-content: flex-end;padding-bottom: .2rem;padding-right: .26rem;">
				<router-link class="btn" to="/personCenter/myOrder/refund">撤销申请</router-link>
				<router-link class="btn btn1" to="/personCenter/myOrder/refund">填写物流</router-link>
			</div>
		</div>
		<div style="background: white;margin-bottom: .2rem;" v-show="status==3">
			<div class="f28 c3 flex" style="line-height: 1rem;border-bottom: .01rem solid #e5e5e5;padding:0 .26rem;justify-content: space-between;"><span>退货地址</span><span class="f28 c_m">￥<span class="f36">19</span><span>.00</span></span></div>
			<div class="f28 c3 flex" style="line-height: 1rem;border-bottom: .01rem solid #e5e5e5;padding:0 .26rem;justify-content: space-between;"><span>退回支付宝</span><span class="f28 c3">￥19<span>.00</span></span></div>
		</div>
		<div style="background: white;margin-bottom: .2rem;">
			<div class="f28 c3" style="line-height: 1rem;border-bottom: .01rem solid #e5e5e5;padding:0 .26rem;" v-show="status==4">因您撤销退款申请，退款已关闭，交易将正常进行。</div>
			<div class="f28 c3" style="line-height: 1rem;border-bottom: .01rem solid #e5e5e5;padding:0 .26rem;" v-show="status==5">商家已拒绝退换申请，可与商家协商后再次发起申请。</div>
			<div class="flex" style="justify-content: flex-end;padding: .2rem .26rem" v-show="status==5">
				<router-link class="btn btn1" to="/SelectReason">修改申请</router-link>
			</div>
		</div>
		<div class="list">
			<p class="order_num">退换信息</p>
			<div class="order_des">
				<img src="../../../static/images/default_img.png" alt="" class="order_pic" />
				<div class="order_des_m">
					<p class="break break_two order_name">商品名称商品名称商品名称商品名称商品是的法商品名称商品名称商品名称商品名称商品是的法商品名称商品名称商品名称商品名称商品是的法律上都没佛打扫地方撒是地方撒地方撒</p>
					<p class="order_des_num">规格：24包 </p>
				</div>
			</div>
			<div class="list_num f24 c9">
				<p>退款原因：7天无理由退换</p>
				<p>退款金额：￥<span style="font-family: arial;">22.00</span></p>
				<p>退款编号：<span style="font-family: arial;">22222</span></p>
				<p>申请时间：<span style="font-family: arial;">2013-01-11 11:00</span></p>
				<p>成交时间：<span style="font-family: arial;">2013-01-11 11:00</span></p>
			</div>
		</div>
		<div class="footer f32 c6">
			<img src="../../../static/images/xiaoer.png" alt="" style="width: .34rem;height: .36rem;vertical-align: middle;margin-right: .2rem;" />联系小二
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
				status: 5,
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
	
	.name {
		margin-right: .3rem;
	}
	
	.list {
		margin-bottom: .1rem;
	}
	
	.order_num {
		font-size: .28rem;
		color: #333;
		line-height: 1rem;
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
		font-size: .24rem;
		color: #F51D46;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.rmb {
		font-size: .32rem;
	}
	
	.list_num {
		background: white;
		padding: .44rem .26rem .76rem;
	}
	
	.order-des {
		padding: .15rem .26rem;
		background: white;
	}
	
	.footer {
		width: 100%;
		position: fixed;
		bottom: 0;
		height: 1rem;
		line-height: 1rem;
		background: white;
		vertical-align: middle;
		text-align: center;
	}
</style>