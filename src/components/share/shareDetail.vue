<template>
	<div>
		<x-header :left-options="{backText: ''}" title="分享商品" class="header"></x-header>
		<div style="position: fixed;z-index: 99999;right: 0;top: .0rem;height: .88rem;line-height: .88rem;" @click="show=!show">
			<img src="../../../static/images/share_icon.png" alt="" style="width: .4rem;height: .4rem;vertical-align: middle;padding: .1rem .26rem;" />
		</div>
		<div style="height: .88rem;"></div>
		<div class="tip f24 c9">商品图片已为朋友圈特别优化，建议将图片分享到<span>微信朋友圈</span></div>
		<div class="f28 c3" style="background: white;padding: .26rem .26rem .34rem;">
			<p>{{goods.msg}}</p>
			<p>长按图片识别或扫描二维码，即可复制淘口令打开手机淘宝，领取优惠券购买</p>
		</div>
		<ul class="quan-list flex">
			<li v-for="(item,index) in goods.share_list" :key="index" @click="showDetail(item.image)">
				<img :src="item.image" alt="" />
				<span v-show="index!=4" class="price">￥{{item.price}}</span>
			</li>
		</ul>
		<div style="width: 100%;height: 100vh;background:black;opacity: .5;position: fixed;top: 0;" v-show="show || showPicture" @click="show=!show">
		</div>
		<div v-show="showPicture" class="big-pic" @click="showPicture=!showPicture">
			<img :src="image" alt="" />
		</div>
		<transition enter-active-class="fadeInUpBig" leave-active-class="fadeOutDownBig">
			<div v-show="show" class="share-main">
				<div class="share-main-content">
					<p class="f28 c6" style="text-align: center;line-height: .94rem;height: .94rem;">———分享至———</p>
					<div class="share-class flex">
						<div @click="shareMessage('com.tencent.mm','com.tencent.mm.ui.tools.ShareToTimeLineUI')">
							<img src="../../../static/images/share/friendshare.png" alt="" />
						</div>
						<div @click="shareMessage('com.tencent.mobileqq','com.tencent.mobileqq.activity.JumpActivity')">
							<img src="../../../static/images/share/QQshare.png" alt="" />
						</div>
						<div @click="shareMessage('com.sina.weibo','com.sina.weibo.composerinde.ComposerDispatchActivity')">
							<img src="../../../static/images/share/weiboshare.png" alt="" />
						</div>
						<div @click="shareMessage('com.tencent.mm','com.tencent.mm.ui.tools.ShareImgUI')">
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
	const msg={
		content:'',
		pictures:[]
	}
	const pictures=[]
	//			const url = ''
	export default {
		name: 'shareRoom',
		components: {
			XHeader
		},
		data() {
			return {
				goods: {},
				show: false,
				showPicture: false,
				defaultImg: 'this.src="' + require('../../../static/images/default_img.png') + '"',
				token: null,
				image: '',
			}
		},
		methods: {
			//分享操作
			shareAction(id, ex) {
				plus.nativeUI.showWaiting();
				var self = this
				var s = window.shares[id]
				var pic_unloaded = 9;
				plus.nativeUI.toast("下载图片中，即将打开分享...");
            this.goods.share_list.forEach(function(val,index,arr){
                // 创建下载任务
                var dtask = plus.downloader.createDownload(val.image);
                dtask.addEventListener( "statechanged", function(d,status){
                	switch(d.state){
                    case 4:
                        if(status == 200){
                            console.log("图片下载完成：" + d.filename);
                            pictures.push( plus.io.convertLocalFileSystemURL(d.filename) );
                            pic_unloaded --;
                            if(pic_unloaded == 0){
                                if(!id || !s) {
									plus.nativeUI.closeWaiting();
									plus.nativeUI.toast("分享失败");
									return;
								}
								if(s.authenticated) {
									plus.nativeUI.closeWaiting();
									self.shareMessages(s, ex);
								} else {
									plus.nativeUI.closeWaiting();
									s.authorize(self.shareMessages(s, ex), function(e) {
									});
								}
                                
                                
                                
                            }
                        } else {
                            plus.nativeUI.toast("下载图片失败");
                        }
                        break;
                    case 1:
                        console.log("下载开始");
                        break;
                    case 2:
                        console.log("请求已响应"); 
                        break;
                    case 3:
                        console.log("下载进行中");
                        break;
                    default:
                        console.log("state: " + d.state);
                        break;
                }
                }, false );
                dtask.start();
            });
			},
			// 5+share发送分享消息
			shareMessages(s, ex) {
				var self = this
				s.send({
					content:self.goods.msg+"             长按图片识别或扫描二维码，即可复制淘口令打开手机淘宝，领取优惠券购买",
					pictures: pictures,
					extra: {
						scene: ex
					}
				}, function() {
					plus.nativeUI.toast("分享成功！");
				}, function(e) {
					plus.nativeUI.toast("取消分享");
				});
			},
			showDetail(image) {
				this.image = image
				this.showPicture = !this.showPicture

			},
			
			
			 
//        安卓一键分享9张图片
        shareMessage(ev,ex) {
        	var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
             if(isAndroid){
               	      	var self = this
            var pictures = [];
            var pic_unloaded = 9;
            plus.nativeUI.toast("下载图片中，即将开始分享...");
            this.goods.share_list.forEach(function(val,index,arr){
            	plus.nativeUI.showWaiting();
                // 创建下载任务
                var dtask = plus.downloader.createDownload(val.image);
                dtask.addEventListener( "statechanged", function(d,status){
                	switch(d.state){
                    case 4:
                        if(status == 200){
                            console.log("图片下载完成：" + d.filename);
                            pictures.push( plus.io.convertLocalFileSystemURL(d.filename) );
                            pic_unloaded --;
                            if(pic_unloaded == 0){
                            	plus.nativeUI.closeWaiting();
                            	msg.content=self.goods.msg+"             长按图片识别或扫描二维码，即可复制淘口令打开手机淘宝，领取优惠券购买"
                                self.test_weixin_share_mul_pic(ev,ex, pictures);
                            }
                        } else {
                            plus.nativeUI.toast("下载图片失败");
                        }
                        break;
                    case 1:
                        console.log("下载开始");
                        break;
                    case 2:
                        console.log("请求已响应"); 
                        break;
                    case 3:
                        console.log("下载进行中");
                        break;
                    default:
                        console.log("state: " + d.state);
                        break;
                }
                }, false );
                dtask.start();
            });
             }
             if(isiOS){
             	plus.nativeUI.toast("正在开发中")
             }

        },
        test_weixin_share_mul_pic(ev,ex, pics){
        	console.log(ev)
            var Intent = plus.android.importClass('android.content.Intent');
            var ComponentName = plus.android.importClass('android.content.ComponentName');
            var ArrayList = plus.android.importClass('java.util.ArrayList');
            var Uri = plus.android.importClass('android.net.Uri');
            var Environment = plus.android.importClass('android.os.Environment');
            var File = plus.android.importClass('java.io.File');
            var intent = new Intent();
            var localComponentName = new ComponentName(ev, ex);
            intent.setComponent(localComponentName);
            intent.setAction("android.intent.action.SEND_MULTIPLE");
            intent.setType("image/*");
            var localArrayList = new ArrayList();
            for(var i =0;i< pics.length;i++){
                var filePath = pics[i];  
                localArrayList.add(Uri.fromFile(new File(filePath)));
            }
            intent.putParcelableArrayListExtra("android.intent.extra.STREAM", localArrayList);
            intent.putExtra('Kdescription', msg.content);   
            var act = plus.android.runtimeMainActivity();
            act.startActivity(intent);
        }
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		},
		mounted: function() {

		},
		created: function() {
			var self = this
			this.token = plus.storage.getItem("token")
			if(this.token) {
				this.goods = JSON.parse(this.$route.query.item)

			} else {
				plus.nativeUI.toast("请登录");
				this.$router.go(-1)

			}
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
	
	.quan-list {
		width: 100%;
		line-height: 0;
		justify-content: space-between;
		flex-wrap: wrap;
		background: white;
		padding: .26rem;
		box-sizing: border-box;
	}
	
	.quan-list li {
		width: calc((100% - .2rem) / 3);
		height: 2.3rem;
		overflow: hidden;
		margin-top: .1rem;
		position: relative;
	}
	
	.quan-list li img {
		width: 100%;
		height: auto;
		margin: -1rem 0;
	}
	
	.big-pic {
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 99999;
		overflow: hidden;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.big-pic img {
		width: 6.7rem;
		height: 12.74rem;
		border-radius: .4rem;
	}
	
	.price {
		border-radius: .15rem;
		font-size: .2rem;
		display: inline-block;
		position: absolute;
		text-align: center;
		height: .3rem;
		line-height: .3rem;
		color: white;
		padding: 0 .12rem;
		right: .1rem;
		bottom: .1rem;
		background: -webkit-linear-gradient(left, #8721b5, #db3283);
		background: -o-linear-gradient(left, #8721b5, #db3283);
		background: -moz-linear-gradient(left, #8721b5, #db3283);
		background: linear-gradient(left, #8721b5, #db3283);
	}
</style>