<template>
	<div>
		<p class="f28 c9" style="line-height: 1rem;padding-left: .26rem;">为了您的账号安全，请绑定手机号</p>
		<group class="myOrder" style="margin-bottom: .4rem;">
			<x-input title="" mask="999 9999 9999" v-model="tel" :max="13" is-type="china-mobile" placeholder="输入手机号"></x-input>
			<div style="position: relative;">
				<x-input title="" mask="999 9999 9999" v-model="code" type="number" placeholder="验证码"></x-input>
				<span class="f36 c_f code_btn">获取验证码</span>
			</div>
		</group>
		<div style="margin:0 .26rem;">
			<x-button type="primary" action-type="button">确定绑定</x-button>
		</div>
		
		
	</div>
</template>

<script>
	import { Group, XInput,XButton} from 'vux'
	export default {
		components: {
			Group,
			XInput,
			XButton
		},
		data() {
			return {
				value: '',
				tel: '',
				code: ""
			}
		}
	}
</script>
<style scoped="scoped">
	.code_btn{
		position: absolute;
    right: 0;
    top: 0rem;
    display: inline-block;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 .26rem;
	}
</style>
<style>
	.weui-cell__ft {
		font-size: .28rem;
	}
</style>