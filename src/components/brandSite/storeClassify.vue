<template>
	<div>
		<group class="myOrder" style="margin-bottom: .4rem;border-top: .01rem solid #e5e5e5;">
			<cell title="全部商品" is-link link="/brandSite/storeIndex/storeGoods"></cell>
			<cell title="分类1" is-link></cell>
			<cell title="分类2" is-link></cell>
			<cell title="分类3" is-link></cell>
			<cell title="分类4" is-link></cell>
		</group>
	</div>
</template>

<script>
	import { Group, Cell, XButton, XSwitch } from 'vux'
	export default {
		components: {
			Group,
			Cell,
			XButton,
			XSwitch
		},
		data() {
			return {
               value:'',
			}
		}
	}
</script>

<style scoped="scoped">
	
</style>