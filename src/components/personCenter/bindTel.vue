<template>
	<div>
		<p class="f28 c9" style="line-height: 1rem;padding-left: .26rem;" v-show="type==3">为了您的账号安全，请绑定手机号</p>
		<p class="f28 c9" style="line-height: 1rem;padding-left: .26rem;" v-show="type==4">注意：解除绑定后，将无法更好为您保护账号的安全</p>
		<group class="myOrder" style="margin-bottom: .4rem;">
			<x-input title="" mask="99999999999" v-model="tel" :max="13" is-type="china-mobile" placeholder="输入手机号"></x-input>
			<div style="position: relative;border-bottom: .01rem solid #e5e5e5;">
				<x-input :max="6" v-model="code" type="number" placeholder="验证码" style="width: 60%;"></x-input>
				<button class="f36 c_f code_btn" @click="getCode()" id="send-code">{{texts}}</button>
			</div>
		</group>
		<div style="margin:0 .26rem;">
			<x-button action-type="button" v-text="type==3?'确认绑定':'确认解绑'" @click.native="save()"></x-button>
		</div>
		<toast v-model="showToast" type="text" :time="800" is-show-mask position="middle">{{toast}}</toast>
	</div>
</template>

<script>
	import { Group, XInput, XButton,Toast } from 'vux'
	const url = 'http://xlk.dxvke.com'
//  const url=''
	export default {
		components: {
			Group,
			XInput,
			XButton,
			Toast
		},
		data() {
			return {
				value: '',
				tel: '',
				code: "",
				type: '',
				texts:"获取验证码",
				countdown:60,
				showToast: false,
				toast: '',
			}
		},
		methods: {
			save() {
				this.$http.post(url + '/api/bindTelephone', {
					telephone: this.tel,
					type: this.type,
					code:this.code
				}).then((res) => {
					if(res.data.code == '200') {
                        this.toast=res.data.data.message
						this.showToast=true
						this.tel=''
						this.code=''
						this.type=4
					} else {
                        this.toast=res.data.error
						this.showToast=true
					}
				}, (err) => {
					this.toast=err.statusText
					this.showToast=true
				})
			},
			getCode() {
				this.$http.post(url + '/api/sendCode', {
					telephone: this.tel,
					type: this.type
				}).then((res) => {
					if(res.data.code == '200') {
                         this.invokeSettime()
					} else {
                        this.toast=res.data.error
						this.showToast=true
					}
				}, (err) => {
					this.toast=err.statusText
					this.showToast=true
				})
			},
			 //定时器
        invokeSettime(){
            this.settime()
            
           },
         settime(){
         	var self =this
            	if (this.countdown == 0) {
                    document.getElementById('send-code').disabled=false
                    this.texts="获取验证码";
                    this.countdown = 60;
                    return
                } else {
                    document.getElementById('send-code').disabled=true
                    this.texts= "重新发送"+"(" + this.countdown + ")";
                    this.countdown--;
                } 
                setTimeout(function() {
                   self.settime()
                },1000)
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
		background: none;
		border: none;
		outline: none;
	}
</style>
<style>
	.weui-cell__ft {
		font-size: .28rem;
	}
</style>