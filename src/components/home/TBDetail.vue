<template>
	<div v-show="token">
		<div style="position: fixed;z-index: 99999;right: 0;top: .0rem;height: .88rem;line-height: .88rem;" @click="show=!show">
			<img src="../../../static/images/share_black_icon.png" alt="" style="width: .4rem;height: .4rem;vertical-align: middle;padding: .1rem .26rem;" />
		</div>
		<div>
			<div class="pic">
				<swiper auto loop :list="goodsDetail.pict_url" style="width:100%;" height="7.5rem" dots-class="custom-bottom" dots-position="center" :show-desc-mask="false" :onerror="defaultImg"></swiper>
			</div>
			<div class="detail">
				<p class="name">{{goodsDetail.product_name}}</p>
				<div class="flex" style="align-items: flex-end;">
					<span class="prices"><span class="f28">券后: </span><small>￥</small><span>{{goodsDetail.reserve_price.rmb}}</span><small v-show="goodsDetail.reserve_price.corner!=='00'">.{{goodsDetail.reserve_price.corner}}</small></span>
					<span class="f28" style="margin:0 0 .08rem .3rem;color: #fbac03;">分享预估赚：{{goodsDetail.share_commission}}元</span>
				</div>
				<div style="margin-left: .2rem;display: inline-block;">

				</div>
				<div class="flex">
					<span class="old_price">价格<del>￥{{goodsDetail.market_price.rmb}}<span
            v-show="goodsDetail.market_price.corner!=='00'">.{{goodsDetail.market_price.corner}}</span></del>
					</span>
					<span class="f24 c9">销量{{goodsDetail.volume}}件</span>
				</div>
			</div>
		</div>
		<div class="flex" style="background: white;margin-top: .16rem;height: .88rem;padding: 0 .3rem;justify-content: space-between;" @click="toquan()">
			<div class="flex">
				<div class="f24 tb-quan">
					<div>优惠券</div>
					<div>{{goodsDetail.coupon_number}}元</div>
				</div>
				<span class="f24 c9" style="margin-left: .2rem;">领取优惠券</span>
			</div>
			<div class="r-arrow"></div>
		</div>
		<cell title="商品图文详情(点击查看)" is-link :border-intent="false" :arrow-direction="showDetail ? 'up' : 'down'" @click.native="showDetail = !showDetail" class="pic_detail f28 c3" style="height: .88rem; box-sizing: border-box;"></cell>
		<div class="slide" :class="showDetail?'animate':''" style="font-size: 0;">
			<img :src="img" alt="" v-for="img in goodsDetail.small_images" :onerror="defaultImg">
		</div>
		<div style="height: .98rem;"></div>
		<div class="footer">
			<div class="f_1 f1_l" @click="toHome">
				<img src="../../../static/images/home.png" alt="">
				<span>首页</span>
			</div>
			<div class="f_1 " @click="toCollect()">
				<x-icon type="ios-heart" size="22" style="padding-top:.16rem ;fill: #ff5200;" v-show="goodsDetail.is_collect==1"></x-icon>
				<x-icon type="ios-heart-outline" size="22" style="padding-top:.16rem ;fill: #ff5200;" v-show="goodsDetail.is_collect==0||!goodsDetail.is_collect"></x-icon>
				<span v-text="goodsDetail.is_collect==1?'已收藏':'收藏'">收藏</span>
			</div>
			<div class="f_2 f2_l" @click="tobuy()">
				<span>去购买</span>
			</div>
		</div>
		<toast v-model="showToast" type="text" :time="800" is-show-mask position="middle">{{toast}}</toast>
		<div style="width: 100%;height: 100vh;background:black;opacity: .5;position: fixed;top: 0;" v-show="show" @click="show=!show">
		</div>
		<transition enter-active-class="fadeInUpBig" leave-active-class="fadeOutDownBig">
			<div v-show="show" class="share-main">
				<div class="share-main-content">
					<p class="f28 c6" style="text-align: center;line-height: .94rem;height: .94rem;">———分享至———</p>
					<div class="share-class flex">
						<div @click="shareAction('weixin','WXSceneSession')" class="flex share-btn">
							<img src="../../../static/images/share/weixinshare.png" alt="" />
							<span class="f28 c3">微信</span>
						</div>
						<div @click="shareAction('weixin','WXSceneTimeline')" class="flex share-btn">
							<img src="../../../static/images/share/friendshare.png" alt="" />
							<span class="f28 c3">朋友圈</span>
						</div>
						<div @click="shareAction('qq','')" class="flex share-btn">
							<img src="../../../static/images/share/QQshare.png" alt="" />
							<span class="f28 c3">QQ</span>
						</div>
						<div @click="shareAction('sinaweibo','')" class="flex share-btn">
							<img src="../../../static/images/share/weiboshare.png" alt="" />
							<span class="f28 c3">微博</span>
						</div>


					</div>
				</div>
				<div @click="show=!show" class="f32 c3" style="text-align: center;line-height: .96rem;border-top: .01rem solid #e5e5e5;">取消</div>
			</div>
		</transition>
		<!--ios领券-->
		<div v-show="show1" class="ios-tkl">
			<div class="ios-tkl-bd">
			</div>
			<div class="ios-tkl-main">
				<div class="ios-tkl-main-des">
					<p class="ios-tkl-main-title">淘口令购买</p>
					<input type="text" :value="command" class="ios-tkl-main-word" id="kouling">
					<p class="des">在点击复制后，打开淘宝APP购买</p>
					<p class="des">若一键复制失败，请长按虚线内文字</p>
					<button class="m_btn" data-clipboard-target="#kouling">
            一键复制
          </button>
				</div>
				<img src="../../../static/images/cancel_img.png" alt="" @click="cancel1">
			</div>
		</div>
	</div>
</template>
<script>
	import { XHeader, Cell, CellBox, CellFormPreview, Group, Badge, Loading, Swiper, Toast, XNumber } from 'vux'
	import Clipboard from 'clipboard'
	const url = 'http://xlk.dxvke.com/'
	//	const url = ""
	export default {
		components: {
			Group,
			Cell,
			CellFormPreview,
			CellBox,
			Badge,
			Loading,
			XHeader,
			Swiper,
			Toast,
			XNumber
		},
		data() {
			return {
				token: '',
				showDetail: false,
				showActionsheet: true,
				collect: true,
				showToast: false,
				toast: '',
				showLoading: false,
				show: false,
				show1: false,
				goodsDetail: {
					product_name: '',
					pict_url: [],
					small_images: [],
					reserve_price: {
						rmb: '',
						corner: ''
					},
					market_price: {
						rmb: '',
						corner: ''
					},
					volume: '',
				},
				defaultImg: 'this.src="' + require('../../../static/images/default_img.png') + '"',
				command: '',
			}
		},
		methods: {
			//      商品详情
			getDetail: function() {
				this.id = this.$route.query.id;
				this.$http({
					method: 'get',
					url: url + '/api/productInfo',
					params: {
						id: this.$route.query.id,
						type: this.$route.query.type
					}
				}).then((res) => {
					if(res.data.code == '200') {
						this.goodsDetail = res.data.data
					}
				}, (err) => {
					console.log(JSON.stringify(err))
				})
			},
			//     淘口令
			getCommand: function() {
				var data={
						coupon_url: this.goodsDetail.coupon_url,
						pict_url: this.goodsDetail.pict_url,
						product_name: this.goodsDetail.product_name
				}
				this.$http.post(url+'/api/productCreateCommand',data
				).then((res) => {
					if(res.data.code == '200') {
						this.command = res.data.data.command
					}
				}, (err) => {
					console.log(err)
				})
			},
			//      收藏----取消收藏
			toCollect() {
				var data = {
					id: this.$route.query.id,
					type: 4
				}
				console.log(JSON.stringify(data))
				this.$http.post(url + '/api/doCollect', data).then((res) => {
					if(res.data.code == '200') {
						this.toast = res.data.data.message
						this.showToast = true
						this.goodsDetail.is_collect = res.data.data.is_collect
					} else {
						this.toast = res.data.error
						this.showToast = true
					}
				}, (err) => {
					console.log(JSON.stringify(err))
				})
			},
			toHome() {
				this.$router.push({
					path: '/home'
				})
			},
			click(id) {
				//        this.id=id
				//        this.$router.push({name:'goodsDetail',query:{id:id}})
				location.href = 'http://www.dxvke.com/goodsDetail/?id=' + id
			},
			tobuy() {
				var u = navigator.userAgent;
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
				var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				if(isAndroid) {
					this.$router.push({
						name: 'TBQuan',
						query: {
							url: this.goodsDetail.click_url
						}
					})
				}
				if(isiOS) {
					this.show1 = true
					this.getCommand()
				}

			},
			toquan() {
				var u = navigator.userAgent;
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
				var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				if(isAndroid) {
					this.$router.push({
						name: 'TBQuan',
						query: {
							url: this.goodsDetail.coupon_url
						}
					})
				}
				if(isiOS) {
					this.show1 = true
					this.getCommand()
				}
			},
			//分享操作
			shareAction(id, ex) {
				plus.nativeUI.showWaiting();
				console.log(id, ex)
				var self = this
				var s = window.shares[id]
				self.$http.post(url + '/api/getShareImage', {
					type: 4,
					id: self.$route.query.id,
				}).then((res) => {
					if(res.data.code == '200') {
						var picUrl = res.data.data.url
						var dtask = plus.downloader.createDownload(picUrl, {}, function(d, status) {
							// 下载完成
							if(status == 200) {
								var s = window.shares[id]
								if(!id || !s) {
									plus.nativeUI.closeWaiting();
									plus.nativeUI.toast("分享失败");
									return;
								}
								if(s.authenticated) {
									plus.nativeUI.closeWaiting();
									self.shareMessage(s, ex, d.filename);
								} else {
									plus.nativeUI.closeWaiting();
									s.authorize(self.shareMessage(s, ex, d.filename), function(e) {

									});
								}
							} else {
								plus.nativeUI.closeWaiting();
								plus.nativeUI.toast("分享失败");
							}
						});
						dtask.start();

					} else {
						plus.nativeUI.closeWaiting();
						plus.nativeUI.toast("分享失败，请重试");
					}
				}, (err) => {
					plus.nativeUI.closeWaiting();
					plus.nativeUI.toast("分享失败，请重试");
				})

			},
			//发送分享消息
			shareMessage(s, ex, d) {
				var self = this
				s.send({
					//					title: '享利客——'+self.goodsDetail.product_name,
					content: self.goodsDetail.product_name,
					pictures: [d],
					//					href: self.goodsDetail.share_url,
					//					thumbs: self.goodsDetail.small_images, 
					extra: {
						scene: ex
					}
				}, function() {
					plus.nativeUI.toast("分享成功！");
				}, function(e) {
					plus.nativeUI.toast("取消分享");
				});
			},
			cancel1() {
				document.body.style.overflow = 'scroll';
				this.show1 = false
			},
		},
		created: function() {
			this.token = plus.storage.getItem("token")
			if(this.token) {
				this.getDetail()
			} else {
				plus.nativeUI.toast("请登录");
				this.$router.go(-1)
			}

		},
		mounted: function() {
			this.$nextTick(function() {
				let self = this
				const clipboard = new Clipboard('.m_btn')
				clipboard.on('success', function(e) {
					plus.nativeUI.toast("复制成功");
					e.clearSelection();
				});
				clipboard.on('error', function(e) {
					plus.nativeUI.toast("请选择“拷贝”进行复制");
				});
			})
		},
	}
</script>
<style scoped="">
	.pic {
		width: 100%;
		height: 7.5rem;
	}
	
	.pic img {
		width: 100%;
		height: 100%;
	}
	
	.detail {
		font-size: 0;
		background: white;
		padding: .22rem .22rem .3rem;
	}
	
	.detail .name {
		font-size: .32rem;
		color: #333333;
		line-height: .44rem;
	}
	
	.prices {
		font-size: .46rem;
		color: #ff5200;
	}
	
	.prices small {
		font-size: .32rem;
	}
	
	.juan {
		font-size: .2rem;
		color: #ff425f;
		border: .01rem solid #ff425f;
		border-radius: .05rem;
		margin-left: .2rem;
	}
	
	.juan_l {
		border-right: .01rem dotted #ff425f;
		padding: 0 .05rem;
	}
	
	.juan_r {
		padding: 0 .05rem;
	}
	
	.return_yuanBao {
		font-size: .2rem;
		color: #ff8a1e;
		padding: 0 .05rem;
		border: .01rem solid #ff8a1e;
		border-radius: .05rem;
		margin-left: .05rem;
	}
	
	.old_price {
		font-size: .28rem;
		color: #999999;
	}
	
	.old_price>del {
		margin: 0 .3rem 0 .05rem;
	}
	
	.sub-item {
		color: #888;
	}
	
	.slide {
		overflow: hidden;
		max-height: 0;
		transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
		background-color: white;
	}
	
	.slide img {
		width: 100%;
	}
	
	.animate {
		max-height: 9999px;
		transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
		transition-delay: 0s;
	}
	
	.pic_detail {
		background-color: white;
		margin-top: .16rem;
		border-bottom: .01rem solid #f4f4f4;
	}
	/*footer*/
	
	.footer {
		width: 100%;
		text-align: center;
		font-size: 0;
		background-color: white;
		height: .96rem;
		position: fixed;
		bottom: 0;
		border-top: .01rem solid #eeeeee;
	}
	
	.f_1 {
		width: 25%;
		font-size: .2rem;
		color: #444444;
	}
	
	.f_1 img {
		width: .4rem;
		height: .4rem;
		padding-top: .2rem;
	}
	
	.f_1 span {
		display: block;
		margin-top: -.1rem;
	}
	
	.f1_l {
		border-right: .01rem solid #eeeeee;
		box-sizing: border-box;
	}
	
	.f_2 {
		width: 50%;
		font-size: .28rem;
		color: white;
	}
	
	.f2_l {
		height: 100%;
		line-height: .98rem;
		background: #ff5200;
	}
	
	.footer>div {
		float: left;
	}
	/*选择商品尺码规格样式*/
	
	.main {
		width: 100%;
		height: 10rem;
		background: white;
		position: fixed;
		bottom: 0;
		z-index: 999999;
	}
	
	.main-content {
		width: 100%;
		height: 9.04rem;
		overflow-y: scroll;
	}
	
	.main-des {
		height: 1.38rem;
		width: 80%;
		padding-left: 2.3rem;
		padding-top: .2rem;
		box-sizing: border-box;
	}
	
	.main-size {
		margin: .4rem .3rem;
	}
	
	.main-size ul {
		flex-wrap: wrap;
	}
	
	.main-size ul li {
		line-height: .5rem;
		padding: 0 .2rem;
		border-radius: .5rem;
		border: .01rem solid #e5e5e5;
		font-size: .24rem;
		color: #666;
		margin-right: .2rem;
		margin-top: .3rem;
	}
	
	.main-footer {
		height: .96rem;
		width: 100%;
		position: absolute;
		bottom: 0;
		font-size: 0;
	}
	
	.main-footer div {
		width: 50%;
		line-height: .96rem;
		display: inline-block;
		color: white;
		text-align: center;
		vertical-align: middle;
	}
	
	.main-footer .sure {
		width: 100%;
		line-height: .96rem;
		display: inline-block;
		color: white;
		text-align: center;
		vertical-align: middle;
		background: #9A7BFF;
	}
	
	.main-footer div:nth-child(1) {
		background: -webkit-linear-gradient(left, #b8a2fe, #9a7bff);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(left, #b8a2fe, #9a7bff);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(left, #b8a2fe, #9a7bff);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(left, #b8a2fe, #9a7bff);
	}
	
	.main-footer div:nth-child(2) {
		background: -webkit-linear-gradient(left, #907af4, #8160ec);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(left, #907af4, #8160ec);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(left, #907af4, #8160ec);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(left, #907af4, #8160ec);
	}
	
	.s-pic {
		width: 1.78rem;
		height: 1.78rem;
		position: absolute;
		top: -.4rem;
		left: .3rem;
	}
	
	.s-cancel {
		width: .38rem;
		height: .38rem;
		right: .1rem;
		top: .1rem;
		position: absolute;
		padding: .1rem;
	}
	
	.tb-quan {
		line-height: .32rem;
		height: .32rem;
		border: .01rem solid #ff5200;
		display: flex;
		vertical-align: middle;
		color: #ff5200;
	}
	
	.tb-quan div {
		padding: 0 .04rem;
	}
	
	.tb-quan div:nth-child(1) {
		border-right: .01rem dashed #ff5200;
		box-sizing: border-box;
	}
	
	.r-arrow {
		display: inline-block;
		height: 6px;
		width: 6px;
		border-width: 2px 2px 0 0;
		border-color: #C8C8CD;
		border-style: solid;
		-webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
		transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
	}
	/*ios领券*/
	
	.ios-tkl-bd {
		width: 100%;
		height: 100%;
		opacity: .5;
		background-color: black;
		position: fixed;
		top: 0;
		z-index: 100;
	}
	
	.ios-tkl-main {
		z-index: 200;
		position: fixed;
		top: 0;
		left: 0;
		width: 5.98rem;
		height: 3.64rem;
		margin: 2.5rem calc((100% - 5.98rem) / 2);
		background-color: white;
		border-radius: .15rem;
	}
	
	.ios-tkl-main-des {
		position: absolute;
		text-align: center;
		width: 100%;
	}
	
	.ios-tkl-main-des>.des {
		font-size: .2rem;
		color: #666666;
		margin: 0 .16rem;
		line-height: .40rem;
		height: .40rem;
	}
	
	.m_btn {
		display: inline-block;
		font-size: .26rem;
		color: white;
		width: 4.64rem;
		line-height: .68rem;
		border-radius: .8rem;
		border: none;
		background: -webkit-linear-gradient(left, #ff526d, #f8214f);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(left, #ff526d, #f8214f);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(left, #ff526d, #f8214f);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(left, #ff526d, #f8214f);
		/* 标准的语法 */
		margin: .1rem 0;
	}
	
	.ios-tkl-main img {
		width: .5rem;
		height: .5rem;
		position: absolute;
		top: -.7rem;
		right: -.6rem;
	}
	
	.ios-tkl-main-title {
		color: white;
		font-size: .32rem;
		text-align: center;
		line-height: .72rem;
		border-radius: .15rem .15rem 0 0;
		background: -webkit-linear-gradient(left, #ff526d, #f8214f);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(left, #ff526d, #f8214f);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(left, #ff526d, #f8214f);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(left, #ff526d, #f8214f);
		/* 标准的语法 */
	}
	
	.ios-tkl-main-word {
		-webkit-appearance: none;
		-webkit-tap-highlight-color: rgba(255, 0, 0, 0);
		border: .01rem dotted #ff425f;
		text-align: center;
		background-color: #ffe7eb;
		font-size: .32rem;
		line-height: .88rem;
		color: #666666;
		margin: .10rem .16rem;
		border-radius: .1rem;
	}
	
	.cancel {
		width: .5rem;
		height: .5rem;
		position: fixed;
		right: calc(((100% - 3.2rem) / 2) - .5rem);
		top: calc(((100% - 3.2rem) / 2) - 3rem);
		z-index: 200;
	}
	.share-btn{
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>