<template>
	<div class="login">
		<div class="main">
			<img src="../../static/images/login/logo.png" alt="" />
			<div class="login-btn flex f32" @click="authLogin()">
				<img src="../../static/images/login/icon.png" alt="" class="icon" />微信登录
			</div>
		</div>
		<loading v-model="showLoading" :text="loadText"></loading>
	</div>
</template>

<script>
	import { Loading } from 'vux'
	const url = 'http://xlk.dxvke.com/'
	export default {
		components: {
			Loading
		},
		data() {
			return {
				showLoading: false,
				loadText: ''
			}
		},
		methods: {
			authLogin() {
				var self = this
				var s = window.auths[0]
				console.log(JSON.stringify(s));
				if(!s.authResult) {
					s.login(function(e) {
						s.getUserInfo(function(e) {
							//后端保存用户信息
							self.$http.post(url + '/api/login', {
								type: "1",
								userInfo: JSON.stringify(s.userInfo)
							}).then((res) => {
								if(res.data.code == '200') {
									self.$vux.toast.show({
										text: res.data.data.message,
										type: 'success',
									})
									plus.storage.setItem("token", res.data.data.token);
									plus.storage.setItem("unMessage", res.data.data.unMessage);
									self.$router.push({
										name: 'PersonCenter'
									})
								} else {
									self.$vux.toast.show({
										text: res.data.error,
										type: 'warn',
									})
								}
							}, (err) => {
								console.log(err)
							})
						}, function(e) {
							self.$vux.toast.show({
								text: "获取用户信息失败！" + e.message + " - " + e.code,
								type: 'warn',
							})
						});
					}, function(e) {
						self.$vux.toast.show({
							text: "获取用户信息失败！",
							type: 'warn',
						})
					});
				} else {
					//后端保存用户信息
					self.$http.post(url + '/api/login', {
						type: "1",
						userInfo: JSON.stringify(s.userInfo)
					}).then((res) => {
						if(res.data.code == '200') {
							self.$vux.toast.show({
								text: res.data.data.message,
								type: 'success',
							})
							plus.storage.setItem("token", res.data.data.token);
							plus.storage.setItem("unMessage", res.data.data.unMessage);
							self.$router.push({
								name: 'PersonCenter'
							})
						} else {
							self.$vux.toast.show({
								text: res.data.error,
								type: 'warn',
							})
						}
					}, (err) => {
						console.log(err)
					})
				}
			},
		},
		mounted: function() {

		},
		created: function() {

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
</style>