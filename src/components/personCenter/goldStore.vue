<template>
	<div>
		<div style="position: relative;">
			<div class="header">
				<p class="f24">财宝总值</p>
				<p style="font-size: .52rem;">1.081 <span style="font-size: .4rem;">钻</span></p>
			</div>
			<div class="header_main">

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
		background-image: url("../../../static/images/personCenter/goldStore_bd.png");
		background-size:100% 100% ;
		background-repeat: no-repeat;
		color: white;
		padding-top: .7rem;
		box-sizing: border-box;
	}
	
	.header_main {
		width: calc(100% - .52rem);
		width: -moz-calc(100% - .52rem);
		width: -webkit-calc(100% - .52rem);
		position: absolute;
		bottom: -1.06rem;
		height: 1.77rem;
		background: white;
		margin: 0 .26rem;
		border-radius: .06rem;
		-moz-box-shadow:0 .06rem .32rem 0 #e0dfdb; 
		-webkit-box-shadow:0 .06rem .32rem 0 #e0dfdb; 
		box-shadow:0rem .06rem .32rem 0 #e0dfdb;
	}
</style>