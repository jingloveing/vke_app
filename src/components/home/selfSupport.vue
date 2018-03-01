<template>
	<div>
		<x-header :left-options="{backText: ''}" title="享利客专区" class="header"></x-header>
		<div style="height: .88rem;"></div>
		<div class="header-right">
			<img src="../../../static/images/search_icon.png" alt="" />
			<img src="../../../static/images/cart_white.png" alt="" />
		</div>
	</div>
</template>

<script>
	import { XHeader} from 'vux'
	export default {
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

		},
	}
</script>

<style scoped="scoped">
	.header{
		background: #9A7BFF;
	}
	.header-right{
		position: fixed;
		top: 0;
		right: .25rem;
		z-index: 999999;
	}
	.header-right img{
		width: .4rem;
		height: .4rem;
		padding: .2rem .1rem;
	}
</style>