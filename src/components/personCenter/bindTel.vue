<template>
	<div>
		<p class="f28 c9" style="line-height: 1rem;padding-left: .26rem;" v-show="type==3">为了您的账号安全，请绑定手机号</p>
		<p class="f28 c9" style="line-height: 1rem;padding-left: .26rem;" v-show="type==4">注意：解除绑定后，将无法更好为您保护账号的安全</p>
		<group class="myOrder" style="margin-bottom: .4rem;">
			<x-input title="" mask="999 9999 9999" v-model="tel" :max="13" is-type="china-mobile" placeholder="输入手机号"></x-input>
			<div style="position: relative;">
				<x-input :max="6" v-model="code" type="number" placeholder="验证码" style="width: 60%;"></x-input>
				<span class="f36 c_f code_btn" @click="getCode()">获取验证码</span>
			</div>
		</group>
		<div style="margin:0 .26rem;">
			<x-button action-type="button" v-text="type==3?'确认绑定':'确认解绑'"></x-button>
		</div>
	</div>
</template>

<script>
	import { Group, XInput, XButton } from 'vux'
//	const url = 'http://xlk.dxvke.com',
    const url=''
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
				code: "",
				type: '',
			}
		},
		methods: {
			getCode() {
				this.$http.post(url + '/api/sendCode', {
					telephone: this.tel,
					type: this.$route.query.type
				}).then((res) => {
					if(res.data.code == '200') {

					} else {

					}
				}, (err) => {
					console.log(err)
				})
			}
		},
		created: function() {
			this.type = this.$route.query.type
		}
	}
</script>
<style scoped="scoped">
	.code_btn {
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