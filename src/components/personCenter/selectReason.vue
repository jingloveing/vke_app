<template>
	<div>
		<div class="order_des">
				<img src="../../../dist/static/images/default_img.png" alt="" class="order_pic" />
				<div class="order_des_m">
					<p class="break break_two order_name">商品名称商品名称商品名称商品名称商品是的法商品名称商品名称商品名称商品名称商品是的法商品名称商品名称商品名称商品名称商品是的法律上都没佛打扫地方撒是地方撒地方撒</p>
					<p class="order_des_num">规格：24包 </p>
				</div>
			</div>
		<router-link to="/personCenter/myOrder/refund" class="flex" style="background: white;margin-top: .16rem;height: 1.2rem;padding: 0 .3rem;justify-content: space-between;border-bottom: .01rem solid #e5e5e5;">
			<div class="flex">
				<div class="tb-quan">
					<div class="f26 c3">仅退款</div>
					<div class="f24 c9">未收到货（含未签收）,或卖家协商同意前提下</div>
				</div>
			</div>
			<div class="r-arrow"></div>
		</router-link>
		<router-link to="/personCenter/myOrder/refund" class="flex" style="background: white;height: 1.2rem;padding: 0 .3rem;justify-content: space-between;">
			<div class="flex">
				<div class="tb-quan">
					<div class="f26 c3">退货退款</div>
					<div class="f24 c9">已收到货,需要退换已收到的货物</div>
				</div>
			</div>
			<div class="r-arrow"></div>
		</router-link>
	</div>
</template>

<script>
</script>

<style scoped="scoped">
	.order_des {
		padding: .15rem .26rem;
		background: white;
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
	
	.r-arrow {
		display: inline-block;
		height: 6px;
		width: 6px;
		border-width: 2px 2px 0 0;
		border-color: #C8C8CD;
		border-style: solid;
		-webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
		transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
	}
</style>