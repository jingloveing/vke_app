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
						<img src="../../../static/images/fans/vip0_gray.png" alt="" class="icon" v-show="userInfo.level_id!==1"/>
						<img src="../../../static/images/fans/vip0.png" alt="" class="icon" v-show="userInfo.level_id==1"/>
					</div>
					<div>
						<img src="../../../static/images/fans/vip1_gray.png" alt="" class="icon" v-show="userInfo.level_id!==2"/>
						<img src="../../../static/images/fans/vip1.png" alt="" class="icon" v-show="userInfo.level_id==2"/>
					</div>
					<div>
						<img src="../../../static/images/fans/vip2_gray.png" alt="" class="icon" v-show="userInfo.level_id!==3"/>
						<img src="../../../static/images/fans/vip2.png" alt="" class="icon" v-show="userInfo.level_id==3"/>
					</div>

				</div>
				<div class="line_p">
					<div class="line"></div>
					<div class="line"></div>
				</div>
			</div>
			<div class="pro f24">
				<span :class="userInfo.level_id==1?'active':''">帮众</span>
				<span :class="userInfo.level_id==2?'active':''">长老</span>
				<span :class="userInfo.level_id==3?'active':''">帮主</span>
			</div>
		</div>
	     <div class="main" v-show="userInfo.level_id==1">
	     	<div class="tip">
	     		<span class="border"></span><p class="f30 c3">帮众特权</p>
	     	</div>
	     	<div class="des f26 c3">
	     		<p>1. 自用40%的利润奖励</p>
	     		<p>2. 享受直属粉丝购物利润的20%奖励</p>
	     		<p>3. 享受不定期平台内各项奖励或免费活动（如：0元购等“包含但不限于”）</p>
	     	</div>
	     </div>
	     <div class="main" v-show="userInfo.level_id==2">
	     	<div class="tip">
	     		<span class="border border2"></span><p class="f30 c3">帮众特权</p>
	     	</div>
	     	<div class="des des2 f26 c3">
	     		<p>1. 自用50%的利润奖励</p>
	     		<p>2. 享受直属粉丝购物利润的20%奖励</p>
	     		<p>3. 享受直属粉丝自营商城购物利润的20%分销奖励</p>
	     		<p>4. 享受指定商品分销权限，6折进货每笔赚60元</p>
	     		<p>5. 享受申请成立帮派权限</p>
	     		<p>6. 享受不定期平台内各项奖励或免费活动（如：0元购等“包含但不限于”）</p>
	     	</div>
	     </div>
	     <div class="main" v-show="userInfo.level_id==3">
	     	<div class="tip">
	     		<span class="border border3"></span><p class="f30 c3">帮众特权</p>
	     	</div>
	     	<div class="des des3 f26 c3">
	     		<p>1. 自用90%的利润奖励</p>
	     		<p>2. 享受旗下长老帮众等帮派好友购物利润的20%奖励</p>
	     		<p>3. 享受2代好友购物利润20%奖励</p>
	     		<p>4. 享受直属粉丝自营商城购物利润的30%分销奖励</p>
	     		<p>5. 享受指定商品总代权限，成本进货直营推广赚120元/件</p>
	     		<p>6. 享受指定商品总代权限，帮内好友分销后总代分佣赚60元/件</p>
	     		<p>7. 享受平台营销类或市场运营类平台功能插件使用申请权</p>
	     		<p>8. 享受平台内不定期悬赏活动（官方补贴／激励活动）权限</p>
	     		<p>9. 享受不定期平台内各项奖励或免费活动（如；0元购等“包含但不限于”）</p>
	     	</div>
	     </div>
	     <router-link to="/upgrade" class="flex f28 c3 footer">
			<img src="../../../static/images/upgrade_icon.png" alt="" />
			<span>升级地位,获得更多特权</span>
		</router-link>
	</div>
</template>

<script>
	import { XHeader } from 'vux'
	export default {
		name: 'Search',
		components: {
			XHeader
		},
		data() {
			return {
				userInfo:{
					level_id:null,
				},
				defaultImg: 'this.src="' + require('../../../static/images/default_img.png') + '"',
			}
		},
		methods: {
			
		},
		mounted: function() {

		},
		created: function() {
			this.userInfo=JSON.parse(localStorage.getItem('userInfo'))
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
	.footer{
		line-height: .78rem;
		background: white;
		margin-top: .3rem;
		justify-content: center;
	}
	.footer img{
		width: .32rem;
		height: .32rem;
		margin-right: .14rem;
	}
</style>