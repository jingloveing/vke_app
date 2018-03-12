<template>
	<div class="pay-success">
		<div class="header">
			<p class="f28 c3">支付成功</p>
			<h1 class="c_f">恭喜升级到“长老”</h1>
			<div class="btn f28" @click="gohome()">回到首页</div>
		</div>
		<img src="../../../static/images/pay_success_bg.png" alt="" />
		<div class="main">
			<p class="f28 c3">已通知商家发货，货物状态可在消息中心查看</p>
			<div style="line-height: .5rem;margin-top: .4rem;">
				<p class="f24 c9">商品名称：名称名称</p>
				<p class="f24 c9">商品价格：￥12<span>.00</span></p>
				<p class="f24 c9">收货地址：某某省某某市某某小区某某<span style="font-family: arial;">2343253</span></p>
				<p class="f24 c9">成交时间：<span style="font-family: arial;">2013-01-21</span></p>
				<p class="f24 c9">订单编号：<span style="font-family: arial;">112343254</span></p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Realize',
		components: {
			
		},
		data() {
			return {
				total:{}
			}
		},
		methods: {
            gohome(){
            	this.$router.push({name:'Home',query:{}})
            }
		},
		created: function() {
            this.total=JSON.parse(this.$route.query.total)
		},
		mounted: function() {

		}
	}
</script>

<style scoped="scoped">
	.pay-success {
		margin: .2rem .35rem 0;
		background: white;
	}
	
	.header {
		padding-top: .6rem;
		text-align: center;
	}
	
	.header h1 {
		font-size: .48rem;
		padding: .34rem 0 .56rem;
	}
	
	.header .btn {
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
	
	.main {
		padding: .5rem .3rem .8rem;
	}
</style>