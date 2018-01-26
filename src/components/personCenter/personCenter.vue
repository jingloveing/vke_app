<template>
	<div>
		<div>
			<div class="header">
				<router-link to="/personCenter/setting">
					<img src="static/images/personCenter/setting_icon.png" class="setting" />
				</router-link>
				<div>
					<router-link to="/personCenter/userInfo">
						<div class="user_pic">
							<img src="static/images/personCenter/pic.jpg" class="user_icon" />
							<img src="../../../static/images/personCenter/leve1.png" alt="" class="user_order" />
						</div>
					</router-link>
					<p class="user_name">名称</p>
					<div class="uper_btn">升级地位</div>
				</div>
				<router-link to="/personCenter/info">
					<div class="right">
						<img src="static/images/info.png" alt="" class="info" />
						<span class="info_num">12</span>
					</div>
				</router-link>
				<router-link to="/personCenter/myPrerogative">
				<div class="level_btn">
					<img src="static/images/personCenter/vip0.png" alt="" class="level" />
					<span>享有特权</span>
				</div>
				</router-link>
			</div>
			<div class="header_list">
				<ul>
					<router-link tag='li' to="/personCenter/bill">
						<p class="header_list_title">消费账单</p>
						<p class="header_list_num"><small>￥</small>688.23</p>
					</router-link>
					<router-link tag="li" to="/personCenter/goldStore">
						<p class="header_list_title">小金库</p>
						<div class="header_list_num jewel">
							<img src="../../../static/images/personCenter/jewel.png" alt="" /> 8.86
						</div>
						<!--<div class="header_list_num gold">
                	   	   <img src="../../../static/images/personCenter/gold_acer.png" alt="" />
                	       8.86
                	     </div>
                	     <div class="header_list_num silver">
                	   	   <img src="../../../static/images/personCenter/silver.png" alt="" />
                	       8.86
                	     </div>
                	     <div class="header_list_num coppers">
                	   	   <img src="../../../static/images/personCenter/coppers.png" alt="" />
                	       8.86
                	     </div>-->
					</router-link>
					<li>
						<p class="header_list_title">镖局押运</p>
						<!--<div class="header_list_num jewel">
                	   	   <img src="../../../static/images/personCenter/jewel.png" alt="" />
                	       8.86
                	     </div>-->
						<div class="header_list_num gold">
							<img src="../../../static/images/personCenter/gold_acer.png" alt="" /> 8.86
						</div>
						<!--<div class="header_list_num silver">
                	   	   <img src="../../../static/images/personCenter/silver.png" alt="" />
                	       8.86
                	     </p>
                	     <div class="header_list_num coppers">
                	   	   <img src="../../../static/images/personCenter/coppers.png" alt="" />
                	       8.86
                	     </div>-->
					</li>
				</ul>
			</div>
		</div>
		<div class="sort">
			<h4>我的享利</h4>
			<div style="border-top:.01rem solid #f4f4f4;">
				<figure class="list1">
					<img src="../../../static/images/personCenter/share.png" alt="" />
					<figcaption>分享夺宝</figcaption>
				</figure>
				<router-link to="/personCenter/myOrder">
					<figure class="list1">
						<img src="../../../static/images/personCenter/myOrder.png" alt="" />
						<figcaption>我的订单</figcaption>
					</figure>
				</router-link>
				<router-link to="">
					<figure class="list1">
						<img src="../../../static/images/personCenter/myWorld.png" alt="" />
						<figcaption>我的江湖</figcaption>
					</figure>
				</router-link>
				<figure class="list1">
					<img src="../../../static/images/personCenter/server.png" alt="" />
					<figcaption>官方小二</figcaption>
				</figure>
			</div>
		</div>
		<div class="sort">
			<h4>其它工具</h4>
			<div style="border-top:.01rem solid #f4f4f4;">
				<figure class="list1 list2">
					<img src="../../../static/images/personCenter/cart.png" alt="" />
					<figcaption>购物车</figcaption>
				</figure>
				<figure class="list1 list2">
					<img src="../../../static/images/personCenter/express.png" alt="" />
					<figcaption>快递查询</figcaption>
				</figure>
				<figure class="list1 list2">
					<img src="../../../static/images/personCenter/liveTV.png" alt="" />
					<figcaption>视频直播</figcaption>
				</figure>
				<figure class="list1 list2">
					<img src="../../../static/images/personCenter/college.png" alt="" />
					<figcaption>白鹭书院</figcaption>
				</figure>
			</div>
			<div style="border-top:.01rem solid #f4f4f4;">
				<figure class="list1 list2">
					<img src="../../../static/images/personCenter/code.png" alt="" />
					<figcaption>启蒙码</figcaption>
				</figure>
				<figure class="list1 list2">
					<img src="../../../static/images/personCenter/listen.png" alt="" />
					<figcaption>包打听</figcaption>
				</figure>
				<figure class="list1 list2">
					<img src="../../../static/images/personCenter/collect.png" alt="" />
					<figcaption>藏宝阁</figcaption>
				</figure>
				<figure class="list1 list2">
					<img src="../../../static/images/personCenter/address.png" alt="" />
					<figcaption>总坛位置</figcaption>
				</figure>
			</div>
			<div style="border-top:.01rem solid #f4f4f4;">
				<figure class="list1 list2">
					<img src="../../../static/images/personCenter/exchange.png" alt="" />
					<figcaption>宝物退换</figcaption>
				</figure>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style scoped="scoped">
	.header {
		width: 100%;
		height: 3.5rem;
		background: -webkit-linear-gradient(left, #8721b5, #db3283);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(left, #8721b5, #db3283);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(left, #8721b5, #db3283);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(left, #8721b5, #db3283);
		/* 标准的语法 */
		padding: .24rem;
		box-sizing: border-box;
		text-align: center;
		position: relative;
	}
	
	.header .right {
		text-align: center;
		line-height: 100%;
		position: absolute;
		right: 0rem;
		top: 0rem;
	}
	
	.info {
		width: .4rem;
		height: .4rem;
		vertical-align: middle;
		padding: .24rem;
	}
	
	.info_num {
		height: .32rem;
		line-height: .32rem;
		font-size: .2rem;
		color: white;
		background: #f51d46;
		border-radius: .5rem;
		display: inline-block;
		padding: 0 .05rem;
		text-align: center;
		position: absolute;
		right: .1rem;
		top: .1rem;
	}
	
	.setting {
		width: .4rem;
		height: .4rem;
		position: absolute;
		left: .24rem;
		top: .24rem;
	}
	
	.user_icon {
		width: 1.48rem;
		height: 1.48rem;
		border-radius: 50%;
		border: .01rem solid white;
	}
	
	.user_pic {
		position: relative;
		width: 2rem;
		margin: .23rem auto 0;
	}
	
	.user_order {
		width: .62rem;
		height: .66rem;
		position: absolute;
		bottom: .1rem;
		right: 0rem;
	}
	
	.user_name {
		font-size: .32rem;
		color: white;
	}
	
	.uper_btn {
		width: 1.2rem;
		border-radius: .5rem;
		border: .01rem solid #ffb034;
		color: #ffb034;
		font-size: .24rem;
		text-align: center;
		vertical-align: middle;
		margin: .1rem auto 0;
	}
	
	.level_btn {
		width: 1.62rem;
		height: .6rem;
		font-size: .24rem;
		color: white;
		position: absolute;
		right: 0;
		bottom: .97rem;
		background: rgba(255, 255, 255, 0.3);
		border-top-left-radius: .5rem;
		border-bottom-left-radius: .5rem;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	
	.level {
		width: .36rem;
		height: .36rem;
		border-radius: 50%;
	}
	
	.header_list {
		background: white;
	}
	
	.header_list>ul {
		list-style: none;
		display: flex;
		justify-content: space-around;
	}
	
	.header_list>ul>li {
		width: calc(100%/3);
		width: -moz-calc(100%/3);
		width: -webkit-calc(100%/3);
		text-align: center;
		margin: .17rem 0;
	}
	
	.header_list>ul>li:nth-of-type(2) {
		border-left: .01rem solid #e5e5e5;
		border-right: .01rem solid #e5e5e5;
		box-sizing: border-box;
	}
	
	.header_list_title {
		font-size: .24rem;
		color: #666;
	}
	
	.header_list_num {
		font-size: .32rem;
		color: #FFB034;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.header_list_num>img {
		width: .22rem;
		height: .22rem;
		margin-right: .06rem;
	}
	
	.header_list_num>small {
		font-size: .24rem;
	}
	
	.jewel {
		color: #35a8ed;
	}
	
	.gold {
		color: #fdc71b;
	}
	
	.silver {
		color: #999;
	}
	
	.coppers {
		color: #ffb034;
	}
	
	.sort {
		background: white;
		margin-top: .2rem;
		overflow: hidden;
	}
	
	.sort>h4 {
		font-size: .3rem;
		color: #333;
		font-weight: normal;
		padding-left: .24rem;
		line-height: .88rem;
	}
	
	.list1 {
		width: 25%;
		text-align: center;
		float: left;
		padding: .46rem 0;
	}
	
	.list1>img {
		width: .44rem;
		height: .44rem;
	}
	
	.list1>figcaption {
		font-size: .24rem;
		color: #666;
	}
	
	.list2>img {
		width: .48rem;
		height: .48rem;
	}
</style>