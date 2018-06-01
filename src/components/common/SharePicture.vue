<template>
	<div>
		<div class="main" id="main">
			<div class="flex">
				<div class="main-top-left flex">
					<p class="f28 c3" style="height: .84rem;width: 100%;overflow: hidden;">{{goods.title}}</p>
					<div class="flex" style="justify-content: space-between;width: 100%;align-items: flex-end;">
						<div class="share-quan f28">
							<div style="padding: 0 .2rem;">
								<span>￥{{goods.coupon_number}}</span>
								<span>券</span>
							</div>
							<img src="../../../static/images/shareRoom/round.png" alt="" class="left" />
							<img src="../../../static/images/shareRoom/round.png" alt="" class="right" />
						</div>
						<div>
							<div class="f24 c9">价格<span style="text-decoration: line-through;">￥{{goods.reserve_price}}</span></div>
							<div class="f36 c_m" style="text-align: right;"><span class="f24">￥</span>{{goods.zk_final_price}}</div>
						</div>
					</div>
				</div>
				<div class="main-top-right">
					<img :src="goods.ewm" alt="" :onerror="defaultImg" crossOrigin='*' />
				</div>
			</div>
			<div class="main-bottom">
				<img :src="goods.image_url" alt="" :onerror="defaultImg" crossOrigin='*' />
				<p class="f20 c9" style="text-align: right;">更多优惠，下载享利客APP</p>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'SharePicture',
		data(){
			return{
				
			}
		},
		props:['goods']
	}
	
</script>

<style scoped="scoped">
	.main {
		background: white;
		margin: .2rem .35rem 0;
		font-size: 0;
		padding: .34rem .3rem;
	}
	
	.main-top-left {
		width: calc(100% - 2.3rem);
		height: 2rem;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
	}
	
	.main-top-right img {
		width: 2rem;
		height: 2rem;
		margin-left: .3rem;
	}
	
	.share-quan {
		background: #F51D46;
		position: relative;
		color: white;
		height: .5rem;
		line-height: .5rem;
	}
	
	.share-quan .left,
	.share-quan .right {
		position: absolute;
		top: .18rem;
		width: .14rem;
		height: .14rem;
	}
	
	.share-quan .left {
		left: -.07rem;
	}
	
	.share-quan .right {
		right: -.07rem;
	}
	
	.main-bottom img {
		width: 100%;
		height: 5.7rem;
		margin: .24rem 0;
	}
</style>