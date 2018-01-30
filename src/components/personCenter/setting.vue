<template>
	<div>
		<group class="myOrder" style="margin-bottom: .2rem;">
			<cell title="宝库设防" is-link link="/personCenter/setting/accredit"></cell>
		</group>
		<group class="myOrder" style="margin-bottom: .2rem;border-top: .01rem solid #e5e5e5;">
			<cell title="清理缓存" is-link></cell>
			<x-switch title="非wifi网络不自动播放" :value-map="['0', '1']" v-model="value"></x-switch>
		</group>
		<group class="myOrder" style="margin-bottom: .4rem;border-top: .01rem solid #e5e5e5;">
			<cell title="上书弹劾" is-link link="/personCenter/setting/feedback"></cell>
			<cell title="江湖规矩" is-link></cell>
			<cell title="自报家门" is-link></cell>
		</group>
		<div style="margin: 0 .26rem;">
			<x-button type="default" link="" class="f32 c3">退出登录</x-button>
		</div>
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
