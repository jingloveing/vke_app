<template>
	<div>
		<group class="myOrder">
		<cell title="享利客订单" is-link link="/personCenter/myOrder/orderList"></cell>
		<cell title="淘宝订单" is-link></cell>
		<cell title="京东订单" is-link></cell>
		<cell title="蘑菇街订单" is-link></cell>
		<cell title="唯品会订单" is-link></cell>
		</group>
	</div>
</template>

<script>
	import {Group,Cell} from 'vux'
	export default{
		components:{
			Group,
			Cell
		}
	}
</script>

<style scoped="scoped">
	
</style>