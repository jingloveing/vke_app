<template>
	<div class="login">
		<div class="main">
			<img src="/static/images/login/logo.png" alt="" />
			<div class="login-btn flex f32">
				<img src="../../static/images/login/icon.png" alt="" class="icon"/>微信登录
			</div>
		</div>
	</div>
</template>

<script>
	
</script>

<style scoped="scoped">
	.login{
		width:100%;
		height:100vh;
		background:url(/static/images/login/bd.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.main{
		text-align: center;
	}
	.main>img{
		width: 1.6rem;
		height: 1.6rem;
		border-radius: 50%;
		margin-top: 3rem;
	}
	.login-btn{
		width: 3.8rem;
		height: 1rem;
		border-radius: .5rem;
		color: #9a7bff;
		background:white;
		justify-content: center;
		margin: .8rem auto 0;
		box-shadow: 0rem 0.06rem 0.32rem 0 #e0dfdb;
	}
	.icon{
		width: .63rem;
		height: .59rem;
		margin-right: .3rem;
	}
</style>