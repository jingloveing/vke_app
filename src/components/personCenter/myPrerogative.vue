<template>
	<div>
		<x-header :left-options="{backText: ''}" title="我的特权" class="header"></x-header>
		<div class="header-main">
			<div>
				<img src="../../../static/images/fans/leve1.png" alt="" class="user_order" />
			</div>
			<div style="position: relative;">
				<div class="pro">
					<div>
						<!--<img src="../../../static/images/fans/vip0_gray.png" alt="" class="icon"/>-->
						<img src="../../../static/images/fans/vip0.png" alt="" class="icon" />
					</div>
					<div>
						<img src="../../../static/images/fans/vip1_gray.png" alt="" class="icon" />
						<!--<img src="../../../static/images/fans/vip1.png" alt="" class="icon"/>-->
					</div>
					<div>
						<img src="../../../static/images/fans/vip2_gray.png" alt="" class="icon" />
						<!--<img src="../../../static/images/fans/vip2.png" alt="" class="icon"/>-->
					</div>

				</div>
				<div class="line_p">
					<div class="line"></div>
					<div class="line"></div>
				</div>
			</div>
			<div class="pro f24">
				<span class="active">帮众</span>
				<span class="">长老</span>
				<span class="">帮主</span>
			</div>
		</div>
	     <div class="main">
	     	<div class="tip">
	     		<span class="border"></span><p class="f30 c3">帮众特权</p>
	     	</div>
	     	<div class="des f26 c3">
	     		<p>1.是的四大</p>
	     		<p>1.是的四大</p>
	     		<p>1.是的四大</p>
	     	</div>
	     </div>
	     <div class="main">
	     	<div class="tip">
	     		<span class="border border2"></span><p class="f30 c3">帮众特权</p>
	     	</div>
	     	<div class="des des2 f26 c3">
	     		<p>1.是的四大</p>
	     		<p>1.是的四大</p>
	     		<p>1.是的四大</p>
	     	</div>
	     </div>
	     <div class="main">
	     	<div class="tip">
	     		<span class="border border3"></span><p class="f30 c3">帮众特权</p>
	     	</div>
	     	<div class="des des3 f26 c3">
	     		<p>1.是的四大</p>
	     		<p>1.是的四大</p>
	     		<p>1.是的四大</p>
	     	</div>
	     </div>
	</div>
</template>

<script>
	import { XHeader } from 'vux'
	export default {
		name: 'Search',
		components: {
			XHeader
		}
	}
</script>

<style scoped="scoped">
	.header {
		border: none;
		background: -webkit-linear-gradient(left, #8721b5, #db3283);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(left, #8721b5, #db3283);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(left, #8721b5, #db3283);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(left, #8721b5, #db3283);
		/* 标准的语法 */
	}
	
	.header-main {
		height: 2.84rem;
		margin-top: .88rem;
		text-align: center;
		background: -webkit-linear-gradient(left, #8721b5, #db3283);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(left, #8721b5, #db3283);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(left, #8721b5, #db3283);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(left, #8721b5, #db3283);
		/* 标准的语法 */
	}
	
	.user_order {
		width: 1.41rem;
		height: 1.5rem;
		margin-top: .14rem;
	}
	
	.pro {
		display: flex;
		justify-content: space-between;
		align-content: center;
		padding: 0rem 1.2rem;
		height: .46rem;
		color: #d9a4cd;
	}
	.line_p{
		width: calc(100% - 2.4rem);
		width: -moz-calc(100% - 2.4rem);
		width: -webkit-calc(100% - 2.4rem);
		height: .04rem;
		position: absolute;
		top: .21rem;
		margin: 0rem 1.2rem;
		display: flex;
	}
	.line{
		width: calc((100% - 1.38rem)/2);
		width: -moz-calc((100% - 1.38rem));
		width: -webkit-calc((100% - 1.38rem)/2);
		height: .04rem;
		background-color: #fd8ee2;
		
		
	}
	.line:nth-of-type(1){
		margin: 0 .23rem 0 .46rem;
	}
	.line:nth-of-type(2){
		margin: 0 .46rem 0 .23rem;
	}
	
	.icon {
		width: .46rem;
		height: .46rem;
	}
	.active{
		color: white;
	}
	.main{
		background: white;
		margin-bottom: .2rem;
		padding-bottom: .4rem;
	}
	.tip{
		height: 1rem;
		display: flex;
		align-items: center;
		padding: 0 .26rem;
	}
	.border{
		display: inline-block;
		width: .06rem;
		height: .32rem;
		background: #c0c0c0;
		margin-right: .12rem;
	}
	.border2{
		background: #84c1fd;
	}
	.border3{
		background: #f9c404;
	}
	.des{
		margin: .1rem .67rem;
		border-radius: .06rem;
		border: .01rem solid #c0c0c0;
		padding: .2rem;
		line-height: .4rem;
	}
	.des2{
		border: .01rem solid #84c1fd;
	}
	.des3{
		border: .01rem solid #f9c404;
	}
	
</style>