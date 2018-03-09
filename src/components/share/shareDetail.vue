<template>
	<div>
		<x-header :left-options="{backText: ''}" title="分享商品" class="header">
			<a slot="right">
				<router-link to="">
					<img src="../../../static/images/share_icon.png" alt="" style="width: .4rem;height: .4rem;vertical-align: middle;" />
				</router-link>
			</a>
		</x-header>
		<div style="height: .88rem;"></div>
		<div class="tip f24 c9">商品图片已为朋友圈特别优化，建议将图片分享到<span>微信朋友圈</span></div>
		<div class="f28 c3" style="background: white;padding: .26rem .26rem .34rem;">
			<p>文案长按图片文案文案文案文案啊文案文案文案文案文案文案文案文案文案</p>
			<p>长按图片识别或扫描二维码，即可复制淘口令打开手机淘宝，领取优惠券购买</p>
		</div>
		<div class="main">
			<img src="../../../dist/static/images/default_img.png" alt="" />
		</div>
	</div>
</template>

<script>
	import { XHeader, Swiper, Scroller, } from 'vux'
	export default {
		name: 'shareRoom',
		components: {
			XHeader,
			Swiper,
			Scroller,
		},
		data() {
			return {
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

		},
		destroyed() {
			
		},
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
	.tip{
		line-height: .78rem;
		height: .78rem;
		padding: 0 .26rem;
	}
	.tip>span{
		color: #d13089;
	}
	.main{
		background: white;
		margin: .2rem .35rem 0;
		font-size: 0;
	}
	.main img{
		width: 100%;
	}
</style>