<template>
	<div>
		<div class="list" v-for="i in 15">
			<h5 class="f32 c3">消息标题<small class="f24 c9">12:22</small></h5>
			<p class="f26 c9">您的享利客订单1224325435已发货~，请注意查收顺丰快递，单号：2425345646</p>
		</div>
	</div>
</template>

<script>
</script>

<style scoped="scoped">
	.list{
		background: white;
		border-radius: .06rem;
		margin: .3rem .26rem;
		padding: .27rem .29rem;
	}
	.list h5{
		font-weight: normal;
		margin-bottom: .1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	

</style>