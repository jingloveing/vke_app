<template>
	<div>
		<div class="share">
			<div style="padding-top: 1.26rem;height: 7.56rem;">
				<swiper :options="swiperOptionB" ref="mySwiper">
					<swiper-slide v-for="(list,index) in list" :key="index">
						<div class="tabs">
							<img :src="list.image" alt="" />
						</div>
					</swiper-slide>

				</swiper>
			</div>
			<div style="display: flex;justify-content: space-between;align-items: center;margin: .64rem .98rem 0;">
				<x-button class="share-btn" @click.native="show=!show">分享</x-button>
				<x-button class="share-btn" @click.native="save()">保存图片</x-button>
			</div>
		</div>
		<div style="width: 100%;height: 100vh;background:black;opacity: .5;position: fixed;top: 0;" v-show="show" @click="show=!show">
		</div>
		<transition enter-active-class="fadeInUpBig" leave-active-class="fadeOutDownBig">
			<div v-show="show" class="share-main">
				<div class="share-main-content">
					<p class="f28 c6" style="text-align: center;line-height: .94rem;height: .94rem;">———分享至———</p>
					<div class="share-class flex">
						<div @click="shareAction('weixin','WXSceneSession')" class="flex share-btns">
							<img src="../../../static/images/share/weixinshare.png" alt="" />
							<span class="f28 c3">微信</span>
						</div>
						<div @click="shareAction('weixin','WXSceneTimeline')" class="flex share-btns">
							<img src="../../../static/images/share/friendshare.png" alt="" />
							<span class="f28 c3">朋友圈</span>
						</div>
						<div @click="shareAction('qq','')" class="flex share-btns">
							<img src="../../../static/images/share/QQshare.png" alt="" />
							<span class="f28 c3">QQ</span>
						</div>
						<div @click="shareAction('sinaweibo','')" class="flex share-btns">
							<img src="../../../static/images/share/weiboshare.png" alt="" />
							<span class="f28 c3">微博</span>
						</div>

					</div>
				</div>
				<div @click="show=!show" class="f32 c3" style="text-align: center;line-height: .96rem;border-top: .01rem solid #e5e5e5;">取消</div>
			</div>
		</transition>
		<toast v-model="showToast" type="text" :time="800" is-show-mask position="middle">{{toast}}</toast>
	</div>
</template>

<script>
	import { XButton, Toast, } from 'vux'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	var activeIndex = 0
	const url = 'http://xlk.dxvke.com/'
	//		const url = ''
	export default {
		name: 'share',
		components: {
			XButton,
			swiper,
			swiperSlide,
			Toast,
		},
		data() {
			return {
				swiperOptionB: {
					effect: 'coverflow',
					slidesPerView: 1.5,
					centeredSlides: true,
					coverflowEffect: {
						rotate: 30,
						stretch: 10,
						depth: 60,
						modifier: 2,
						slideShadows: true
					},
					on: {
						//获取当前活slide的索引值
						slideChange: function() {
							activeIndex = this.activeIndex
						}
					},
				},
				list: [],
				showToast: false,
				toast: '',
				show: false,
			}
		},
		methods: {
			//      图片列表
			getList: function() {
				this.$http({
					method: 'get',
					url: url + '/api/shareImage'
				}).then((res) => {
					if(res.data.code == '200') {
						this.list = res.data.data.url
					}
				}, (err) => {
					console.log(err)
				})
			},
			save() {
				var self = this
				var img = this.list[activeIndex].image
				console.log(img)
				plus.gallery.save(img, function() {
					plus.nativeUI.toast("保存成功");
				}, function() {
					plus.nativeUI.toast("保存失败");
				})
			},
			//分享操作
			shareAction(id, ex) {
				plus.nativeUI.showWaiting();
				var self = this
				var picUrl = this.list[activeIndex].image
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
								self.shareMessage(s,ex,d.filename);
							} else {
								plus.nativeUI.closeWaiting();
								s.authorize(self.shareMessage(s, ex,d.filename), function(e) {

								});
							}
					} else {
						plus.nativeUI.closeWaiting();
						plus.nativeUI.toast("分享失败");
					}
				});
				dtask.start();
			},
			//发送分享消息
			shareMessage(s,ex,d) {
				var self = this
				s.send({
					content: "精打细算不如能省会赚，享利客APP一款能赚钱的购物APP",
					pictures: [d],
					extra: {
						scene: ex
					}
				}, function() {
					self.show=false
					plus.nativeUI.toast("分享成功！");
				}, function(e) {
					self.show=false
					plus.nativeUI.toast("取消分享");
				});
			}
		},
		created: function() {
			this.getList()
		},
		mounted: function() {

		},
		activated: function () {
              this.show=false
		}
	}
</script>

<style scoped="scoped">
	.share {
		width: 100%;
		height: 16.04rem;
		background-image: url(../../../static/images/personCenter/share_bd.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	
	.share .share-btn {
		width: 2.42rem;
		line-height: .66rem;
		border-radius: .5rem;
		font-size: .28rem;
		vertical-align: middle;
		background: #fdd75b;
		color: #ef4848;
	}
	
	.tabs img {
		width: 5.04rem;
		height: 7.56rem;
	}
	.share-btns{
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
<style type="text/css">
	.share-btn.weui-btn+.weui-btn {
		margin-top: 0;
	}
</style>