<template>
	<div>
		<div class="pay" v-show="!showSuccess">
			<div class="top">
			<!--<div class="f24 c3 time flex">支付剩余时间 <span style="margin-left: .2rem;">20</span>分钟 <span>20</span>秒</div>-->
			<div class="price flex">
				<span class="f32 c3">订单总金额</span><span class="f28 c_m" style="margin: 0 .1rem;">￥{{order.pay_money}}</span>
				<!--<span class="f28 c9" style="display: flex;">（财宝价
				<div class="header_list_num jewel">
							<img src="../../../static/images/personCenter/jewel.png" alt="" /> 8.86
						</div>
						<div class="header_list_num gold">
                	   	   <img src="../../../static/images/personCenter/gold_acer.png" alt="" />
                	       8.86
                	     </div>
                	     <div class="header_list_num silver">
                	   	   <img src="../../../static/images/personCenter/silver.png" alt="" />
                	       8.86
                	     </div>
                	     <div class="header_list_num coppers">
                	   	   <img src="../../../static/images/personCenter/coppers.png" alt="" />
                	       8.86
                	     </div>）
			</span>-->
			</div>
		</div>
		<div class="main">
			<div class="list">
				<div class="flex">
					<img src="../../../static/images/personCenter/alipay.png" alt="" class="icon" />
					<p class="f28 c3">支付宝支付</p>
				</div>
				<div class="right">
					<input type="radio" name="type" value="1" id="alipay" class="typeList" checked="checked" v-model="type" />
					<div class="all">
						<img class="success" v-show="type==1" src="../../../static/images/checked.png">
						<label for="alipay" class="radio"></label>
					</div>
				</div>
			</div>
			<!--<div class="list">
				<div class="flex">
					<img src="../../../static/images/personCenter/wechat.png" alt="" class="icon" />
					<p class="f28 c3">微信支付</p>

				</div>
				<div class="up_img right">
					<input type="radio" name="type" value="2" id="weChat" v-model="type" />
					<div class="all">
						<img class="success" v-show="type==2" src="../../../static/images/checked.png">
						<label for="weChat" class="radio"></label>
					</div>
				</div>

			</div>-->
			<!--<div class="list">
				<div class="flex">
					<img src="../../../static/images/personCenter/share.png" alt="" class="icon" />
					<p class="f28 c3 flex">财宝支付
						<span class="f28 c9" style="display: flex;">（账户余额
				<div class="header_list_num jewel">
							<img src="../../../static/images/personCenter/jewel.png" alt="" /> 8.86
						</div>
						<div class="header_list_num gold">
                	   	   <img src="../../../static/images/personCenter/gold_acer.png" alt="" />
                	       8.86
                	     </div>
                	     <div class="header_list_num silver">
                	   	   <img src="../../../static/images/personCenter/silver.png" alt="" />
                	       8.86
                	     </div>
                	     <div class="header_list_num coppers">
                	   	   <img src="../../../static/images/personCenter/coppers.png" alt="" />
                	       8.86
                	     </div>）
			</span>
					</p>
				</div>
				<div class="right">

					<input type="radio" name="type" value="2" id="card" v-model="type" />
					<div class="all">
						<img class="success" v-show="type==2" src="../../../static/images/checked.png">
						<label for="card" class="radio"></label>
					</div>
				</div>

			</div>-->
		</div>
		<div style="margin:.4rem .26rem 0;">
			<x-button action-type="button" class='f32' @click.native="pay()">确认支付</x-button>
		</div>
		</div>
		<loading v-model="showLoading" :text="loadText"></loading>
		
		
		
		<div class="pay-success" v-show="showSuccess">
		<div class="header">
			<p class="f28 c3">支付成功</p>
			<h1 class="c_f">{{msg}}</h1>
			<div class="btn f28" @click="gohome()">回到首页</div>
		</div>
		<img src="../../../static/images/pay_success_bg.png" alt="" />
		<div class="main">
			<p class="f28 c3">已通知商家发货，货物状态可在消息中心查看</p>
			<div style="line-height: .5rem;margin-top: .4rem;">
				<p class="f24 c9">商品名称：{{product_name}}</p>
				<p class="f24 c9">商品价格：￥{{product_price}}</p>
				<p class="f24 c9">收货地址：{{address}}</p>
				<p class="f24 c9">成交时间：<span style="font-family: arial;">{{complete_time}}</span></p>
				<p class="f24 c9">订单编号：<span style="font-family: arial;">{{order_sn}}</span></p>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
	import { XHeader, XInput, XButton, Group, Loading } from 'vux'
	export default {
		name: 'Realize',
		components: {
			XHeader,
			XInput,
			XButton,
			Group,
			Loading
		},
		data() {
			return {
				alipay: '',
				type: 1,
				order: {},
				showLoading: false,
				showSuccess:false,
				msg:null,
				product_name:null,
				product_price:null,
				address:null,
				complete_time:null,
				order_sn:null
			}
		},
		methods: {
			//支付   
			pay() {
				plus.nativeUI.showWaiting();
				var self = this
				var alipay = window.alipay
				this.$http({
					method: 'get',
					url: this.http+ 'api/pay',
					params: {order:this.order.order_id,type:1}
				}).then((res) => {
					plus.nativeUI.closeWaiting();
					if(res.data.code == 200) {
						plus.payment.request(alipay, res.data.data.order, function(result) {
							plus.nativeUI.toast("付费成功");
							self.showSuccess=true
							self.paySuccess()							
						}, function(e) {
							plus.nativeUI.toast("付费失败");
						});
					} else {
						plus.nativeUI.toast("支付失败");
					}
				}, (err) => {
					plus.nativeUI.closeWaiting();
					plus.nativeUI.toast("支付失败");
				})
			},
			//支付成功之后获取订单信息
			paySuccess(){
				this.$http({
					method: 'get',
					url: this.http+ 'api/paySuccess',
					params: {order:this.order.order_id}
				}).then((res) => {
					plus.nativeUI.closeWaiting();
					if(res.data.code == 200) {
						this.msg=res.data.data.msg
						this.product_name=res.data.data.product_name
						this.product_price=res.data.data.product_price
						this.address=res.data.data.address
						this.complete_time=res.data.data.complete_time
						this.order_sn=res.data.data.order_sn
					} else {
						plus.nativeUI.toast("获取订单信息失败");
					}
				}, (err) => {
					plus.nativeUI.toast("获取订单信息失败");
				})
			},
			gohome(){
            	this.$router.push({name:'Home',query:{}})
            }
		},
		created: function() {
			this.order = JSON.parse(this.$route.query.order)
		},
		mounted: function() {

		}
	}
</script>

<style scoped="scoped">
	.pay .top {
		background: white;
		margin-bottom: .2rem;
	}
	
	.pay .time,
	.pay .price {
		border-bottom: .01rem solid #e5e5e5;
		justify-content: center;
	}
	
	.pay .time {
		margin: 0 .26rem;
		height: 1.06rem;
	}
	
	.pay .price {
		height: 1.82rem;
		line-height: 1.82rem;
	}
	
	.pay .header_list_num {
		margin: 0 .1rem;
	}
	
	.pay .main {
		background: white;
		border-bottom: .01rem solid #e5e5e5;
	}
	
	.pay .icon {
		width: .52rem;
		height: .52rem;
		margin-right: .3rem;
	}
	
	.pay .list {
		padding: 0 .4rem;
		height: 1rem;
		display: flex;
		align-items: center;
		border-top: .01rem solid #e5e5e5;
		justify-content: space-between;
	}
	
	.pay .same {
		background: #f9f9f9;
		border: none;
		height: .68rem;
		box-sizing: border-box;
		width: 5rem;
	}
	
	.pay .pic {
		width: 100%;
		height: 100%;
	}
	
	.pay .add {
		width: 1.28rem;
		height: 1.28rem;
		background-image: url("/static/images/upload.png");
		background-size: 100% 100%;
		border: 1px dashed #ececec;
		position: relative;
	}
	
	.pay .add label {
		display: inline-block;
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}
	
	.pay .vue-uploader {
		display: flex;
		align-items: flex-end;
	}
	
	.pay .vue-uploader>input[type="file"] {
		display: none;
	}
	
	.pay input[type="radio"] {
		display: none;
	}
	
	.pay .all {
		position: relative;
		width: .36rem;
		height: .36rem;
		border-radius: 50%;
		border: .01rem solid #e5e5e5;
	}
	
	.pay .radio {
		width: 100%;
		height: 100%;
		display: inline-block;
		position: absolute;
		top: 0;
		left: 0;
	}
	
	.pay .right {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.pay .success {
		width: .36rem;
		height: .36rem;
		position: absolute;
	}
	
	
	/*支付成功*/
	.pay-success {
		margin: .2rem .35rem 0;
		background: white;
	}
	
	.pay-success .header {
		padding-top: .6rem;
		text-align: center;
	}
	
	.header h1 {
		font-size: .48rem;
		padding: .34rem 0 .56rem;
	}
	
	.pay-success .header .btn {
		height: .72rem;
		line-height: .72rem;
		color: white;
		background: #9A7BFF;
		width: 2.78rem;
		border-radius: .06rem;
		margin-bottom: .46rem;
	}
	
	.pay-success img {
		width: 100%;
	}
	
	.pay-success .main {
		padding: .5rem .3rem .8rem;
	}
</style>