<template>
	<div>
		<div style="position: relative;margin-bottom: 1.5rem;">
			<div class="header">
				<p class="f30">帮众总人数</p>
			</div>
			<div class="header_main">
				<ul class="header_list c3">
					<router-link :to="{name:'Member',query:{type:0}}" tag="li">
						<p class="header_list_title">帮主</p>
						<p style="font-size: .36rem;">100<small class="f2 c6">人</small></p>
					</router-link>
					<router-link :to="{name:'Member',query:{type:1}}" tag="li">
						<p class="header_list_title">长老</p>
						<p style="font-size: .36rem;">100<small class="f2 c6">人</small></p>
					</router-link>
					<router-link :to="{name:'Member',query:{type:2}}" tag="li">
						<p class="header_list_title">帮众</p>
						<p style="font-size: .36rem;">100<small class="f2 c6">人</small></p>
					</router-link>
				</ul>
			</div>
		</div>
		<div class="main">
			<div class="list">
				<div class="list_left">
					<img src="../../../static/images/personCenter/pic.jpg" alt="" />
				</div>
				<div class="list_right">
					<p class="title">姓名<span class="leve f24">推荐人</span></p>
					<p class="name">身份（帮主,长老,帮众）</p>
				</div>
			</div>
			<p class="f24 c9 tip">最新帮众</p>
			<div>
				<div class="list">
				<div class="list_left">
					<img src="../../../static/images/acerStore.png" alt="" />
				</div>
				<div class="list_right">
					<p class="title">姓名</p>
					<p class="name">身份（帮主,长老,帮众）</p>
				</div>
			</div>
			<div class="list">
				<div class="list_left">
					<img src="../../../static/images/acerStore.png" alt="" />
				</div>
				<div class="list_right">
					<p class="title">姓名</p>
					<p class="name">身份（帮主,长老,帮众）</p>
				</div>
			</div>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style scoped="scoped">
	.header {
		text-align: center;
		width: 100%;
		height: 2.68rem;
		background-image: url("../../../static/images/personCenter/myWorld_bd.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		color: white;
		padding-top: .7rem;
		box-sizing: border-box;
	}
	
	.header_list {
		height: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	
	.header_list>li {
		width: calc(100%/3);
		width: -moz-calc(100%/3);
		width: -webkit-calc(100%/3);
	}
	
	.header_list>li>p {
		text-align: center;
	}
	
	.header_list_title {
		font-size: .3rem;
		color: #333;
	}
	
	.main {
		margin-top: .2rem;
	}
	
	.list {
		background: white;
		display: flex;
		align-items: center;
		padding: .33rem .26rem;
	}
	
	.list_right {
		width: calc(100% - 1.18rem);
		width: -moz-calc(100% - 1.18rem);
		width: -webkit-calc(100% - 1.18rem);
	}
	
	.list_left {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.list_left>img {
		width: 1rem;
		height: 1rem;
		margin-right: .18rem;
		border-radius: 50%;
	}
	
	.list .title {
		font-size: .32rem;
		color: #333;
	}
	
	.list .time {
		font-size: .24rem;
		color: #999;
	}
	
	.list .name {
		font-size: .26rem;
		color: #999;
	}
	
	.leve {
		color: #F51D46;
		border: .01rem solid #F51D46;
		border-radius: .06rem;
		width: .88rem;
		line-height: .28rem;
		text-align: center;
		display: inline-block;
		margin-left: .16rem;
	}
	.tip{
		line-height: .58rem;
		padding: 0 .26rem;
	}
	.list{
		border-top: .01rem solid #e5e5e5;
	}
	.list:nth-child(1){
		border-top:none;
	}
</style>