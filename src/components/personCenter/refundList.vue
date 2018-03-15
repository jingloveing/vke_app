<template>
	<div>
		<div class="list">
			<p class="order_num">订单号：1224324325432543</p>
			<div class="order_des">
				<img src="../../../static/images/default_img.png" alt="" class="order_pic" />
				<div class="order_des_m">
					<p class="break break_two order_name">商品名称商品名称商品名称商品名称商品是的法商品名称商品名称商品名称商品名称商品是的法商品名称商品名称商品名称商品名称商品是的法律上都没佛打扫地方撒是地方撒地方撒</p>
					<p class="order_des_num">规格：24包 <span>x1</span></p>
					<!--<p class="order_price">
						<span>￥<span class="rmb">22</span><span class="corner">.90</span></span>
						<span class="refund">退款成功</span>
					</p>-->
				</div>
			</div>
			<p class="order_total c_m">退货退款</p>
			<div class="order_btns">
				<router-link to='/refundDetail'>
					<span class="btn btn1">查看详情</span>
				</router-link>
			</div>
			
		</div>
		
	</div>
</template>

<script>
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
	.list{
		background: white;
	}
	.order_num {
	font-size: .26rem;
		color: #333;
		display: flex;
		align-items: center;
		justify-content: space-between;
		line-height: .78rem;
		padding: 0 .26rem;
	}
	
	.order_class {
		color: #f51d46;
	}
	
	.order_des {
		align-items: flex-start;
		padding: .15rem .26rem;
		background: #f5f5f5;
		display: flex;
		align-items: center;
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
	
	.refund {
		font-size: .26rem;
		color: #F51D46;
	}
	
	.order_total {
		font-size: .24rem;
		padding: 0 .26rem;
		line-height: .9rem;
	}
	
	.order_btns {
		border-top: .01rem solid #e5e5e5;
		font-size: .26rem;
		padding: 0 .26rem;
		height: .9rem;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
</style>