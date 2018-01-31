<template>
	<div>
		<x-header :left-options="{backText: ''}" title="选择收货地址" style="background-color: #f9f9f9;">
			<a slot="right" style="color: #9A7BFF;font-size: .32rem;" href="/personCenter/goldStore/realizeList">管理</a>
		</x-header>
	</div>
</template>

<script>
	import { XHeader} from 'vux'
	export default {
		name: 'Realize',
		components: {
			XHeader
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
</style>