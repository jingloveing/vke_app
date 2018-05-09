<template>
	<div class="login">
		<div class="main" v-show="type==1">
			<img src="../../static/images/login/logo.png" alt="" />
			<div class="login-btn flex f32" @click="authLogin()">
				<img src="../../static/images/login/icon.png" alt="" class="icon" />微信登录
			</div>
		</div>
		<div v-transfer-dom>
			<confirm v-model="showConfirm" :close-on-confirm="false" title="去绑定手机号？" @on-confirm="onConfirm">
				
			</confirm>
		</div>
		<div v-show="type==2" style="background: white;height: calc(100vh - .88rem);text-align: center;">
			<input type="text" placeholder="账号" class="input-info" v-model="username"/>
			<input type="password" placeholder="密码" class="input-info" v-model="password"/>
			<x-button action-type="button" class='f32' @click.native="Login()" style="width: 80%;height: 1rem;line-height: 1rem;border-radius: .5rem;">登录</x-button>
		</div>
		<loading v-model="showLoading" :text="loadText"></loading>
	</div>
</template>

<script>
	import { Loading, TransferDomDirective as TransferDom, Confirm ,XButton} from 'vux'
	export default {
		directives: {
			TransferDom
		},
		components: {
			Loading,
			Confirm,
			XButton
		},
		data() {
			return {
				showLoading: false,
				loadText: '',
				showConfirm: false,
				type:1,
				username:'',
				password:'',
			}
		},
		methods: {
			authLogin() {
				var self = this
				var s = window.auths[0]
				if(!s.authResult) {
					s.login(function(e) {
						s.getUserInfo(function(e) {
							//后端保存用户信息
							self.$http.post(self.http + '/api/login', {
								type: "1",
								userInfo: JSON.stringify(s.userInfo)
							}).then((res) => {
								if(res.data.code == '200') {
									console.log(JSON.stringify(res.data))
									self.$vux.toast.show({
										text: res.data.data.message,
										type: 'success',
									})
									plus.storage.setItem("token", res.data.data.token);
									localStorage.setItem("token", res.data.data.token)
									plus.storage.setItem("unMessage", res.data.data.unMessage);
									self.$router.push({
										name: 'PersonCenter'
									})
								} else if(res.data.code == '201') {
									plus.storage.setItem('userInfo',JSON.stringify(s.userInfo))
									//去绑定手机号
									self.showConfirm = true

								} else {
									self.$vux.toast.show({
										text: res.data.error,
										type: 'warn',
									})
								}
							}, (err) => {
								console.log(JSON.stringify(err))
							})
						}, function(e) {
							self.$vux.toast.show({
								text: "获取用户信息失败！" + e.message + " - " + e.code,
								type: 'warn',
							})
						});
					}, function(e) {
					
					});
				} else {
					//后端保存用户信息
					self.$http.post(self.http + '/api/login', {
						type: "1",
						userInfo: JSON.stringify(s.userInfo)
					}).then((res) => {
						if(res.data.code == '200') {
							console.log(JSON.stringify(res.data))
							self.$vux.toast.show({
								text: res.data.data.message,
								type: 'success',
							})
							plus.storage.setItem("token", res.data.data.token);
							localStorage.setItem("token", res.data.data.token)
							plus.storage.setItem("unMessage", res.data.data.unMessage);
							self.$router.push({
								name: 'PersonCenter'
							})
						} else if(res.data.code == '201') {
							plus.storage.setItem('userInfo',JSON.stringify(s.userInfo))
							//去绑定手机号
							self.showConfirm = true

						} else {
							self.$vux.toast.show({
								text: res.data.error,
								type: 'warn',
							})
						}
					}, (err) => {
						alert(JSON.stringify(err))
						console.log(JSON.stringify(err))
					})
				}
			},
			onConfirm() {
				this.showConfirm = false
				//去绑定手机号
				this.$router.push({
					name: 'Accredit'
				})
			},
			Login: function() {
				this.$http.post(this.http + '/api/loginTest', {
					username:this.username,
					password:this.password
				}).then((res) => {
					if(res.data.code == '200') {
						console.log(JSON.stringify(res.data))
						this.login_type=res.data.data.login_type
									this.$vux.toast.show({
										text: res.data.data.message,
										type: 'success',
									})
									plus.storage.setItem("token", res.data.data.token);
									plus.storage.setItem("unMessage", res.data.data.unMessage);
									this.$router.push({
										name: 'PersonCenter'
									})
					} else{
						this.$vux.toast.show({
										text: res.data.error,
										type: 'warn',
									})
					}
				}, (err) => {
					this.$vux.toast.show({
							text: "登录失败！",
							type: 'warn',
						})
				})
			},
		},
		mounted: function() {

		},
		created: function() {
            this.type=this.$route.query.type
		},
		destroyed() {

		},
	}
</script>

<style scoped="scoped">
	.login {
		width: 100%;
	}
	
	.main {
		height: calc(100vh - .88rem);
		text-align: center;
		background: url("../../static/images/login/bd.png");
		background-size: 100%;
		background-repeat: no-repeat;
	}
	
	.main>img {
		width: 1.6rem;
		height: 1.6rem;
		border-radius: 50%;
		margin-top: 3rem;
	}
	
	.login-btn {
		width: 3.8rem;
		height: 1rem;
		border-radius: .5rem;
		color: #9a7bff;
		background: white;
		justify-content: center;
		margin: .8rem auto 0;
		box-shadow: 0rem 0.06rem 0.32rem 0 #e0dfdb;
	}
	
	.icon {
		width: .63rem;
		height: .59rem;
		margin-right: .3rem;
	}
	.input-info{
		font-size: .36rem;
		border: none;
		outline: none;
		-webkit-appearance: none;
		width: 80%;
		height: 1rem;
		line-height: 1rem;
		border-bottom: .02rem solid #dddddd;
	}
	.input-info:nth-child(1){
		margin-top: .4rem;
	}
	.input-info:nth-child(2){
		margin-bottom: .6rem;
	}
</style>