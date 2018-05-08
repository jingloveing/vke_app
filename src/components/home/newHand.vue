<template>
	<div style="font-size: 0;">
		<x-header :left-options="{backText: ''}" title="新手秒懂" class="header">
		</x-header>
		<div style="height: 1.28rem;"></div>
		<img src="../../../static/images/detail.jpg" alt="" style="width: 100%;"/>
	</div>
</template>

<script>
	import { XHeader} from 'vux'
	export default {
		components: {
			XHeader
		},
	}
</script>

<style scoped="scoped">
	.header{
		background: linear-gradient(left, #ff8e00, #ff5200);
	}
</style>