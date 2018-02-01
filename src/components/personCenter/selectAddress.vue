<template>
	<div>
		<x-header :left-options="{backText: ''}" title="选择收货地址" style="background-color: #f9f9f9;">
			<a slot="right" style="color: #9A7BFF;font-size: .32rem;" href="/personCenter/myOrder/addressList">管理</a>
		</x-header>
		<div style="height: .88rem;"></div>
		<div>
			<div class="list" v-for="i in 3">
				<h5 class="f28 c3"><span class="left"><span class="default">默认</span><span>姓名</span></span><small class="f28" style="font-family: arial;">1321432453</small></h5>
				<p class="f26 c9">您的享利客订单1224325435已发货~，请注意查收顺丰快递，单号：2425345646</p>
			</div>
		</div>
		
	</div>
</template>

<script>
	import { XHeader} from 'vux'
	export default {
		name: 'Realize',
		components: {
			XHeader,
		},
		data() {
			return {

			}
		},
		methods: {
            
		},
		created: function() {

		},
		mounted: function() {

		}
	}
</script>

<style scoped="scoped">
	.list {
		background: white;
		border-radius: .06rem;
		margin: .3rem .26rem;
		padding: .27rem .29rem;
	}
	
	.list h5 {
		font-weight: normal;
		margin-bottom: .1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.list p{
		line-height: .34rem;
	}
	.default{
		line-height: .28rem;
        width: .6rem;
		display: inline-block;
		border: .01rem solid #927BFF;
		border-radius: .06rem;
		color: #927BFF;
		margin-right: .14rem;
		font-size: .2rem;
		text-align: center;
	}
	.left{
		display: flex;
		align-items: center;
	}
</style>