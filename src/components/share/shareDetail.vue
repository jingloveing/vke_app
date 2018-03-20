<template>
	<div>
		<x-header :left-options="{backText: ''}" title="分享商品" class="header"></x-header>
		<div style="position: fixed;z-index: 99999;right: 0;top: .4rem;height: .88rem;line-height: .88rem;" @click="show=!show">
			<img src="../../../static/images/share_icon.png" alt="" style="width: .4rem;height: .4rem;vertical-align: middle;padding: .1rem .26rem;" />
		</div>
		<div style="height: 1.28rem;"></div>
		<div class="tip f24 c9">商品图片已为朋友圈特别优化，建议将图片分享到<span>微信朋友圈</span></div>
		<div class="f28 c3" style="background: white;padding: .26rem .26rem .34rem;">
			<p>{{msg}}</p>
			<p>长按图片识别或扫描二维码，即可复制淘口令打开手机淘宝，领取优惠券购买</p>
		</div>
		<div class="main">
			<img src="../../../static/images/default_img.png" alt="" />
		</div>
		<div style="width: 100%;height: 100vh;background:black;opacity: .5;position: fixed;top: 0;" v-show="show">
		</div>
		<transition enter-active-class="fadeInUpBig" leave-active-class="fadeOutDownBig">
			<div v-show="show" class="share-main">
				<div class="share-main-content">
					<p class="f28 c6" style="text-align: center;line-height: .94rem;height: .94rem;">———分享至———</p>
					<div class="share-class flex">
						<img src="../../../static/images/share/friendshare.png" alt="" />
						<img src="../../../static/images/share/QQshare.png" alt="" />
						<img src="../../../static/images/share/QQzoneshare.png" alt="" />
						<img src="../../../static/images/share/weiboshare.png" alt="" />
						<img src="../../../static/images/share/weixinshare.png" alt="" />
					</div>
				</div>
				<div @click="show=!show" class="f32 c3" style="text-align: center;line-height: .96rem;border-top: .01rem solid #e5e5e5;">取消</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import { XHeader } from 'vux'
	const url='http://xlk.dxvke.com'
//  const url =''
	export default {
		name: 'shareRoom',
		components: {
			XHeader
		},
		data() {
			return {
				msg:'',
				show:false,
				defaultImg: 'this.src="' + require('../../../static/images/default_img.png') + '"',
			}
		},
		methods: {
			//      获取商品详情
			getDetail: function() {
				this.$http.post(url+'/api/shareProductInfo',{
					share_id:this.$route.query.id
				}).then((res) => {
					if(res.data.code == '200') {
						this.msg=res.data.data.msg
					}
				}, (err) => {
					console.log(err)
				})
			},
		},
		mounted: function() {
			

		},
		created: function() {
            this.getDetail()
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