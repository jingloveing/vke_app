<template>
	<div class="indexSearch">
		<x-header :left-options="{backText: ''}" style="background: -webkit-linear-gradient(left, #8721b5, #db3283);"></x-header>
		<div style="height: .88rem;"></div>
		<div class="header f36">
			智搜一下，享全站优惠
		</div>
		<div class="main">
			<router-link class="serach_p" to="/home/assortment/searchPage">
				<img src="../../../static/images/vke.png" alt="" class="pic" />
				<input type="text" name="" id="" value="" class="input" disabled="disabled" placeholder="享利客店内搜索" />
				<img src="../../../static/images/search_black.png" class="icon" />
			</router-link>
			<router-link class="serach_p" to="/home/assortment/searchPage">
				<img src="../../../static/images/taoBao.png" alt="" class="pic" />
				<input type="text" name="" id="" value="" class="input" disabled="disabled" placeholder="淘宝智搜入口" />
				<img src="../../../static/images/search_black.png" class="icon" />
			</router-link>
           <router-link class="serach_p" to="/home/assortment/searchPage">
				<img src="../../../static/images/JD.png" alt="" class="pic" />
				<input type="text" name="" id="" value="" class="input" disabled="disabled" placeholder="京东智搜入口" />
				<img src="../../../static/images/search_black.png" class="icon" />
			</router-link>
			<router-link class="serach_p" to="/home/assortment/searchPage">
				<img src="../../../static/images/mogu.png" alt="" class="pic" />
				<input type="text" name="" id="" value="" class="input" disabled="disabled" placeholder="蘑菇街智搜入口" />
				<img src="../../../static/images/search_black.png" class="icon" />
			</router-link>
			<router-link class="serach_p" to="/home/assortment/searchPage">
				<img src="../../../static/images/vip.png" alt="" class="pic" />
				<input type="text" name="" id="" value="" class="input" disabled="disabled" placeholder="唯品会智搜入口" />
				<img src="../../../static/images/search_black.png" class="icon" />
			</router-link>
		</div>
	</div>
</template>

<script>
	import { XHeader } from 'vux'
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
	.indexSearch{
		position: relative;
	}
	.header {
		color: white;
		height: 1.68rem;
		text-align: center;
		background: -webkit-linear-gradient(left, #8721b5, #db3283);
		border-bottom-left-radius: 50% .30rem;
		border-bottom-right-radius: 50% .30rem;
	}
	.main{
		width: 100%;
		position: absolute;
		text-align: center;
		top: 2.08rem;
	}
	.serach_p {
		width: 6.62rem;
		margin: 0 auto .6rem;
		height: .88rem;
		display: flex;
		align-items: center;
		background: white;
		border-radius: .06rem;
		box-shadow: 0rem 0.06rem 0.32rem 0 #e0dfdb;
	}
	
	.input {
		background: #F4F4F4;
		outline: none;
		border: none;
		-webkit-appearance: none;
		line-height: .56rem;
		width: 4.48rem;
		border-radius: .06rem;
		font-size: .28rem;
		color: #333;
		padding: 0 .2rem;
		box-sizing: border-box;
	}
	
	.pic {
		width: .48rem;
		height: .48rem;
		border-radius: 50%;
		margin: 0 .28rem;
	}
	
	.icon {
		width: .36rem;
		height: .36rem;
		margin: 0 .37rem;
	}
</style>
<style>
	.indexSearch .vux-header .vux-header-left .left-arrow:before {
		border: 1px solid white;
		border-width: 1px 0 0 1px;
	}
	
	.indexSearch .vux-header {
		border: none;
	}
</style>