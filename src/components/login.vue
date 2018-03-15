<template>
	<div class="login">
		<div class="main">
			<img src="../../static/images/login/logo.png" alt="" />
			<div class="login-btn flex f32" @click="authLogin()">
				<img src="../../static/images/login/icon.png" alt="" class="icon" />微信登录
			</div>
		</div>
	</div>
</template>

<script>
//	export default {
//		components: {
//
//		},
//		data() {
//			return {
//				auths: null,
//			}
//		},
//		methods: {
//			// 登录操作
//			authLogin() {
//				console.log(this.auths)
//				var s = this.auths[0];
//				console.log(s)
//				if(!s.authResult) {
//					s.login(function(e) {
//						alert("登录认证成功！");
//					}, function(e) {
//						alert("登录认证失败！");
//					});
//				} else {
//					alert("已经登录认证！");
//				}
//			}
//		},
//		mounted: function() {
//          // 监听plusready事件  
//			document.addEventListener("plusready", function() {
//				console.log('aaaa')
//				// 扩展API加载完毕，现在可以正常调用扩展API
//				plus.oauth.getServices(function(services) {
//					this.auths = services;
//				}, function(e) {
//					alert("获取分享服务列表失败：" + e.message + " - " + e.code);
//				});
//			}, false);
//		},
//		created: function() {
//			
//		},
//		destroyed() {
//
//		},
//	}
       var oauth=null
	 // 监听plusready事件  
			document.addEventListener("plusready", function() {
				console.log('aaaa')
				// 扩展API加载完毕，现在可以正常调用扩展API
				plus.oauth.getServices(function(services) {
					auths = services;
				}, function(e) {
					alert("获取分享服务列表失败：" + e.message + " - " + e.code);
				});
			}, false);
			// 登录操作
			function authLogin() {
				console.log(auths)
				var s = auths[0];
				console.log(s)
				if(!s.authResult) {
					s.login(function(e) {
						alert("登录认证成功！");
					}, function(e) {
						alert("登录认证失败！");
					});
				} else {
					alert("已经登录认证！");
				}
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