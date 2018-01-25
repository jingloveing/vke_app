<template>
	<div>
		<p class="f28 c9" style="line-height: 1rem;padding-left: .26rem;">淘宝账号授权登录仅供购物方便，授权可解除</p>
		<group class="myOrder" style="margin-bottom: .2rem;">
			<cell title="淘宝账号未授权" :value="text" style="border-top: .01rem solid #e5e5e5;"></cell>
		</group>
		<group class="myOrder" style="margin-bottom: .2rem;">
			<cell link="/personCenter/setting/bindTel" title="手机绑定" :value="tel" style="border-top: .01rem solid #e5e5e5;" is-link></cell>
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
               tel:'1243254435',
               text:"授权登录"
			}
		}
	}
</script>

<style>
	.weui-cell__ft{
		font-size: .28rem;
	}
</style>