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
		<!--<img :src="image_url" style="margin: .2rem .35rem .58rem;width: 6.8rem;height: 9.73rem;"/>-->
		<div class="main" id="main">
			<div class="flex">
				<div class="main-top-left flex">
					<!--break_two break-->
					<p class="f28 c3" style="height: .84rem;width: 100%;overflow: hidden;">{{title}}</p>
					<div class="flex" style="justify-content: space-between;width: 100%;align-items: flex-end;">
						<div class="share-quan f28">
							<div style="padding: 0 .2rem;">
								<span>￥{{coupon_number}}</span>
								<span>券</span>
							</div>
							<img src="../../../static/images/shareRoom/round.png" alt="" class="left" />
							<img src="../../../static/images/shareRoom/round.png" alt="" class="right" />
						</div>
						<div>
							<div class="f24 c9">价格<span style="text-decoration: line-through;">￥{{reserve_price}}</span></div>
							<div class="f36 c_m" style="text-align: right;"><span class="f24">￥</span>{{zk_final_price}}</div>
						</div>
					</div>
				</div>
				<div class="main-top-right">
					<img :src="ewm" alt="" :onerror="defaultImg" crossOrigin='*' />
				</div>
			</div>
			<div class="main-bottom">
				<img :src="image_url" alt="" :onerror="defaultImg" crossOrigin='*' />
				<p class="f20 c9" style="text-align: right;">更多优惠，下载享利客APP</p>
			</div>
		</div>
		<div style="width: 100%;height: 100vh;background:black;opacity: .5;position: fixed;top: 0;" v-show="show" @click="show=!show">
		</div>
		<transition enter-active-class="fadeInUpBig" leave-active-class="fadeOutDownBig">
			<div v-show="show" class="share-main">
				<div class="share-main-content">
					<p class="f28 c6" style="text-align: center;line-height: .94rem;height: .94rem;">———分享至———</p>
					<div class="share-class flex">
						<div @click="shareAction('weixin','WXSceneTimeline')">
							<img src="../../../static/images/share/friendshare.png" alt="" />
						</div>
						<div @click="shareAction('qq','')">
							<img src="../../../static/images/share/QQshare.png" alt="" />
						</div>
						<div @click="shareAction('sinaweibo','')">
							<img src="../../../static/images/share/weiboshare.png" alt="" />
						</div>
						<div @click="shareAction('weixin','WXSceneSession')">
							<img src="../../../static/images/share/weixinshare.png" alt="" />
						</div>

					</div>
				</div>
				<div @click="show=!show" class="f32 c3" style="text-align: center;line-height: .96rem;border-top: .01rem solid #e5e5e5;">取消</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import html2canvas from 'html2canvas'
	import { XHeader } from 'vux'
	const url = 'http://xlk.dxvke.com'
	//		const url = ''
	export default {
		name: 'shareRoom',
		components: {
			XHeader
		},
		data() {
			return {
				msg: '',
				image_url: '',
				click_url: '',
				reserve_price: '',
				zk_final_price: '',
				coupon_number: '',
				title: '',
				ewm: '',
				show: false,
				defaultImg: 'this.src="' + require('../../../static/images/default_img.png') + '"',

			}
		},
		methods: {
			//      获取商品详情
			getDetail: function() {
				this.$http.post(url + '/api/shareProductInfo', {
					share_id: this.$route.query.id
				}).then((res) => {
					if(res.data.code == '200') {
						this.msg = res.data.data.msg
						this.image_url = res.data.data.image_url
						this.click_url = res.data.data.click_url
						this.reserve_price = res.data.data.reserve_price
						this.zk_final_price = res.data.data.zk_final_price
						this.coupon_number = res.data.data.coupon_number
						this.title = res.data.data.title
						this.ewm = res.data.data.ewm
					}
				}, (err) => {
					console.log(err)
				})
			},
			//分享操作
			shareAction(id, ex) {
				plus.nativeUI.showWaiting();
				console.log(id, ex)
				var self = this
				html2canvas(document.getElementById('main'), {
					useCORS: true,
					taintTest: true,
				}).then(function(canvas) {
					var dataUrl = canvas.toDataURL("image/png")
					var b = new plus.nativeObj.Bitmap();
					b.loadBase64Data(dataUrl, function() {
						b.save('_www/img1.png', {
							overwrite: true
						}, function() {
							plus.gallery.save('_www/img1.png', function() {
								plus.nativeUI.closeWaiting();
								plus.nativeUI.toast("图片保存成功");
								var s = window.shares[id]
								if(!id || !s) {
									plus.nativeUI.toast("分享失败");
									return;
								}
								if(s.authenticated) {
									self.shareMessage(s, ex);
								} else {
									s.authorize(self.shareMessage(s, ex), function(e) {
	
									});
								}
							}, function() {
								plus.nativeUI.toast("分享失败");

							});
						}, function() {
							plus.nativeUI.toast("分享失败");
						});
					}, function() {
						plus.nativeUI.toast("分享失败");
					});

				})

			},
			//发送分享消息
			shareMessage(s, ex) {
				var self = this
				s.send({
					//					title: '享利客',
					content: self.msg+ "                                                    长按图片识别或扫描二维码，即可复制淘口令打开手机淘宝，领取优惠券购买",
					pictures: ["_www/img1.png"],
					//					href: self.click_url,
					extra: {
						scene: ex
					}
				}, function() {
					plus.nativeUI.toast("分享成功！");
				}, function(e) {
					plus.nativeUI.toast("取消分享");
				});
			}
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
	
	.tip {
		line-height: .78rem;
		height: .78rem;
		padding: 0 .26rem;
	}
	
	.tip>span {
		color: #d13089;
	}
	
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