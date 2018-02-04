<template>
	<div>
		<x-header :left-options="{showBack: false}" title="淘宝领券" class="header">
			<a slot="right">
				<router-link to="/personCenter/info">
					<div class="right">
						<img src="static/images/info.png" alt="" class="info" />
						<span class="info_num">12</span>
					</div>
				</router-link>

			</a>
		</x-header>
		<div style="height: .88rem;"></div>
		<swiper auto loop :list="demoList" style="width:100%;" height="2.6rem" dots-class="custom-bottom" dots-position="center" :show-desc-mask="false"></swiper>
		<div style="background: white;">
			<div class="main_title">
				<img src="../../../static/images/brandSite_icon.png" alt="" />
				<span>入驻品牌</span>
			</div>
			<scroller lock-y :scrollbar-x=false style="height: 1.92rem;">
				<div class="store" ref="nav1">
					<div class="store_content" v-for="i in 8" :key="i">
						<img src="../../../static/images/goods.png" alt="" :onerror="defaultImg">
						<p class="f24 c3" style="    white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">某某商家某某商家某某商家</p>
					</div>
					<div class="store_content more">
						<span class="f24 c3">全部</span>
					</div>
					<!--</router-link>-->
				</div>
			</scroller>
		</div>
		<div class="main">
			<div class="list" v-for="i in 3">
				<div class="list-title">
					<div class="list-title-left">
						<img src="../../../dist/static/images/default_img.png" alt="" class="small-icon" />
						<span class="f28 c3">某某商家</span>
					</div>
					<router-link class="f24 c3 store-btn" to="/brandSite/storeIndex">进店逛逛</router-link>
				</div>
				<video id="myVideo" width="100%" controls style="height: 4.2rem;background: black;" poster="../../../static/images/default_img.png">
					<source src="../../../static/example.mp4" type="video/mp4">
					<source src="/i/movie.ogg" type="video/ogg">
				</video>
				<scroller lock-y :scrollbar-x=false style="margin-top: .1rem;">
					<div class="box" ref="nav1">
						<!--<router-link :to="{name:'goodsDetail',query:{id:goods1.id}}" v-for="(goods1,index) in goods1" id="box1-item" style="width: 2.18rem;" class="box1-item" :key="index">-->
						<div class="box_content" v-for="i in 8" :key="i">
							<img src="static/images/goods.png" alt="" :onerror="defaultImg">
							<span class="dess">
            <p class="des_name break">产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍</p>
            <p class="des_price"><span class="new_price"><span class="f20">￥</span>11<span>.99</span></span>
							<!--<span class="old_price">￥12<span>.12</span></span>-->
							</p>
							</span>
							<div class="ticket">券100元</div>
						</div>
						<div class="box_content more">
							<span>查看全部</span>
						</div>
						<!--</router-link>-->
					</div>
				</scroller>
			</div>
		</div>
	</div>
</template>

<script>
	import { XHeader, Swiper, Scroller, } from 'vux'
	export default {
		name: 'Home',
		components: {
			XHeader,
			Swiper,
			Scroller,
		},
		data() {
			return {
				demoList: [],
				defaultImg: 'this.src="' + require('../../../static/images/default_img.png') + '"',
			}
		},
		methods: {
			//      获取首页轮播图
			getBannerList: function() {
				this.$http({
					method: 'POST',
					url: '/api/index_banner'
				}).then((res) => {
					if(res.data.code == '200') {
						const imgList = res.data.data.index_banner
						const demoList = imgList.map((item, index) => ({
							url: item.banner_url,
							img: item.banner_image
						}))
						this.demoList = demoList
						//          console.log(imgList)
					}
				}, (err) => {
					console.log(err)
				})
			},
		},
		mounted: function() {

		},
		created: function() {
			this.getBannerList()
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
	
	.right {
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
	
	.main_title {
		font-size: .3rem;
		color: #ffb034;
		text-align: center;
		vertical-align: middle;
		height: .92rem;
		line-height: .92rem;
	}
	
	.main_title>img {
		width: .38rem;
		height: .38rem;
		vertical-align: middle;
	}
	
	.box {
		height: 2.8rem;
		min-width: 21.3rem;
		position: relative;
		background-color: white;
		padding-bottom: .34rem;
		margin-bottom: .16rem;
	}
	
	.store {
		height: 1.92rem;
		min-width: 21.3rem;
		position: relative;
		background-color: white;
		display: flex;
		align-items: center;
		padding: 0 .26rem;
	}
	
	.store_content {
		width: 1.64rem;
		padding: 0 .1rem;
		box-sizing: border-box;
		float: left;
		position: relative;
		text-align: center;
	}
	
	.store_content img {
		width: .9rem;
		height: .9rem;
		border-radius: 50%;
	}
	
	.store_content.more {
		height: 1.4rem;
		background: white;
	}
	
	.store_content.more span {
		width: .9rem;
		height: .9rem;
		line-height: .9rem;
		border-radius: 50%;
		display: inline-block;
		background: #f2f2f2;
		vertical-align: middle;
	}
	
	.box_content {
		margin: 0 0 0 .18rem;
		width: 2.18rem;
		box-sizing: border-box;
		float: left;
		position: relative;
	}
	
	.box_content img {
		width: 100%;
		height: 2rem;
		border-radius: .08rem;
	}
	
	.dess {
		text-align: center;
		font-size: .24rem;
	}
	
	.des_name {
		height: .3rem;
		color: #333;
		padding: 0 .1rem .1rem;
	}
	
	.des_price {
		margin: .05rem 0 .1rem;
	}
	
	.new_price {
		color: #ff425f;
		margin-right: .1rem;
		font-size: .26rem;
	}
	
	.more {
		display: table;
		font-size: .24rem;
		color: #333;
		background: #f2f2f2;
		height: 2rem;
		border-radius: .08rem;
	}
	
	.more>span {
		display: table-cell;
		text-align: center;
		vertical-align: middle;
	}
	
	.ticket {
		position: absolute;
		display: inline-block;
		padding: 0 .2rem;
		line-height: .32rem;
		height: .32rem;
		background: #f51d46;
		font-size: .2rem;
		color: white;
		border-top-right-radius: .5rem;
		border-bottom-right-radius: .5rem;
		bottom: .95rem;
		left: -.1rem;
	}
	
	.small-icon {
		width: .64rem;
		height: .64rem;
		border-radius: 50%;
	}
	
	.store-btn {
		display: inline-block;
		width: 1.28rem;
		line-height: .48rem;
		border: .01rem solid #e5e5e5;
		border-radius: .06rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.main {
		
	}
	
	.list {
		margin-top: .2rem;
		background: white;
	}
	
	.list-title {
		height: 1.12rem;
		padding: 0 .26rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.list-title-left {
		display: flex;
		align-items: center;
	}
	/*去掉右下角的下载按钮*/
	
	video::-internal-media-controls-download-button {
		display: none;
	}
	
	video::-webkit-media-controls-enclosure {
		overflow: hidden;
	}
	
	video::-webkit-media-controls-panel {
		width: calc(100% + 30px);
	}
</style>