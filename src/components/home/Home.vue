<template>
	<div>
		<scroller :on-infinite="infinite" :on-refresh="refresh" ref="myscroller">
			<div style="position: relative;">
				<swiper auto :list="bannerList" style="width:100%;" height="3.88rem" dots-class="custom-bottom" dots-position="center" :show-desc-mask="false" loop class="index-swiper"></swiper>
				<div class="searchDiv">
					<router-link to="/taobao/newHand">
						<div class="left">
							<img src="../../../static/images/newhand_icon.png" class="logo" alt="" />
						</div>
					</router-link>
					<router-link to="/home/indexSearch" style="width: calc((100% - 1.94rem));">
						<div class="search">
							<img src="static/images/search_gray.png" alt="" class="search_icon" /> 搜索商品名/关键字 领券实惠购
						</div>
					</router-link>
					<router-link class="right" to="/personCenter/info">
						<img src="../../../static/images/news_icon.png" alt="" class="info" />
						<span class="info_num" v-show="unMessage && unMessage !=='0'">{{unMessage}}</span>
					</router-link>
				</div>
			</div>
			<div style=" margin-top: -.3rem;z-index: 99999;position: relative;">
				<ul class="nav-small">
					<router-link tag="li" to="/home/taobao">
						<img src="static/images/taoBao.png" :onerror="defaultImg">
						<span>淘宝</span>
					</router-link>
					<li @click="toJD()">
						<img src="static/images/JD.png" :onerror="defaultImg">
						<span>京东</span>
					</li>
					<li @click="toMogu()">
						<img src="static/images/mogu.png" :onerror="defaultImg">
						<span>蘑菇街</span>
					</li>
					<router-link tag="li" to="/newVip">
						<img src="static/images/vip.png" :onerror="defaultImg">
						<span>唯品会</span>
					</router-link>
					<router-link tag="li" to="/pinduo">
						<img src="static/images/vke_icon.png" :onerror="defaultImg">
						<span>拼多多</span>
					</router-link>
				</ul>
			</div>
			<div class="news_main">
				<div class="news_left">
					<img src="static/images/vke_news.png" />
				</div>
				<div class="news_right">
					<swiper auto style="width:100%;" height="25px" loop direction="vertical" :interval=2000 :show-desc-mask="false" :show-dots="false">
						<swiper-item class="news" v-for="(item,index) in news" :key="index">
							<div style="margin-left: .26rem;">
								<p style="line-height: 25px;vertical-align: middle;">{{item.title}}</p>
							</div>
						</swiper-item>
					</swiper>
				</div>
			</div>
			<div class="main">
				<div class="main_title">
					<img src="static/images/icon.png" alt="" />
					<span>品牌精选</span>
				</div>
				<div v-for="(item,index) in merchant" :key="index" style="margin-bottom: .2rem;">
					<router-link class="nav" :to="{name:'StoreIndex',query:{id:item.id}}">
						<img :src="item.image" style="width: 100%;height: 100%;" :onerror="defaultImg">
						<div class="nav_name">
							<img :src="item.logo" class="nav_pic" />
							<span class="break">{{item.name}}</span>
						</div>
						<!--<div class="bd"></div>-->
					</router-link>
					<swipers :options="swiperOptionB" style="padding-top: .2rem;height: 3.07rem;background: white;">
						<swiper-slide v-for="(list,index) in item.product_list" :key="index" class="box_content">
							<router-link :to="{name:'BrandDetail',query:{id:list.id,store_id:item.id}}">
								<img :src="list.thumb_url" alt="" :onerror="defaultImg">
								<span class="dess">
                                <p class="des_name break">{{list.product_name}}</p>
                                <p class="des_price">
                                	<span class="new_price">
                                		<span class="f20">￥</span>{{list.reserve_price}}
								</span>

								</p>
								</span>
								<div class="ticket">券{{list.coupon_number}}元</div>
							</router-link>
						</swiper-slide>
						<swiper-slide>
							<router-link class="box_content more" :to="{name:'StoreIndex',query:{id:item.id}}">
								<span>查看全部</span>
							</router-link>
						</swiper-slide>
					</swipers>
				</div>
			</div>
		</scroller>
		<loading v-model="showLoading" :text="loadText"></loading>
		<div style="width: 100%;height: 100vh;background:black;opacity: .5;position: fixed;top: 0;z-index: 9999999;" v-show="upgrade==1||showInfo==1">
		</div>
		<transition enter-active-class="fadeInUpBig" leave-active-class="fadeOutDownBig">
			<div v-show="upgrade==1" class="update-main">
				<span style="display: inline-block;width: .6rem;height: .6rem;right:calc(((100% - 5.37rem)/2) + .14rem);position: fixed;" @click="cancel()"></span>
				<div class="update-main-content">
					<p class="f28">最新版本：{{app_version}}</p>
					<p class="f28">新版本大小：{{app_size}}</p>
					<p class="f26 c6" style="margin: .2rem 0 .1rem;">更新内容:</p>
					<div class="f26 c6" style="height: 1.3rem;overflow-y: scroll;padding-bottom: .3rem;">
						<p v-for="(i,index) in upgrade_msg" :key="index">{{i}}</p>
					</div>
				</div>
				<div style="margin: .3rem .5rem 0;">
					<x-button type="default" class="f30 c3" @click.native="toUpdate()" style="line-height: .7rem;">立即更新</x-button>
				</div>

			</div>
		</transition>
		<transition enter-active-class="fadeInUpBig" leave-active-class="fadeOutDownBig">
			<div v-show="showInfo==1" class="update-main update-main2">
				<span style="display: inline-block;width: .6rem;height: .6rem;right:calc(((100% - 5.37rem)/2) + .14rem);position: fixed;" @click="cancel2()"></span>
				<div class="update-main-content update-main-content2 c6 f26">
					<p v-for="(i,index) in info_msg" :key="index">{{i}}</p>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
	import { Swiper, SwiperItem, Loading, XButton } from 'vux'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		name: 'Home',
		components: {
			Swiper,
			SwiperItem,
			Loading,
			swipers: swiper,
			swiperSlide,
			XButton
		},
		data() {
			return {
				bannerList: [],
				merchant: [],
				defaultImg: 'this.src="' + require('../../../static/images/default_img.png') + '"',
				pageIndex: 1,
				limit: 10,
				noData: false,
				showList1: true,
				scrollTop: 0,
				onFetching: false,
				bottomCount: 20,
				showLoading: false,
				loadText: '加载中...',
				news: [],
				swiperOptionB: {
					// 如果需要滚动条
					slidesPerView: 3,
					preventClicksPropagation: true,
				},
				unMessage: null,
				app_size: '',
				app_version: '',
				updateUrl: '',
				upgrade: 0,
				upgrade_msg: [],
				info_msg: [],
				showInfo: 0,
			}
		},
		methods: {
			//      获取首页轮播图
			getBannerList: function() {
				this.$http({
					method: 'get',
					url: this.http + '/api/indexBanner'
				}).then((res) => {
					if(res.data.code == '200') {
						const imgList = res.data.data
						const bannerList = imgList.map((item, index) => ({
							url: item.click_url,
							img: item.image
						}))
						this.bannerList = bannerList
						plus.storage.setItem("bannerList", JSON.stringify(this.bannerList))

					}
				}, (err) => {
					this.bannerList = JSON.parse(plus.storage.getItem("bannerList"))
					console.log(JSON.stringify(err))
				})
			},
			//      获取享利快报
			getNews: function() {
				this.$http({
					method: 'get',
					url: this.http + '/api/indexNews'
				}).then((res) => {
					if(res.data.code == '200') {
						this.news = res.data.data
						plus.storage.setItem("news", JSON.stringify(this.news))
					}
				}, (err) => {
					this.news = JSON.parse(plus.storage.getItem("news"))
					console.log(JSON.stringify(err))
				})
			},
			//      获取商品分类
			getMerchantList: function() {
				this.$http({
					method: 'get',
					url: this.http + '/api/indexMerchant',
					params: {
						page: this.pageIndex,
						limit: this.limit
					}
				}).then((res) => {
					if(res.data.code == '200') {
						if(res.data.data.list.length == 0) {
							//							this.noData = true
							this.$refs.myscroller.finishInfinite(2);
						} else {
							this.merchant = this.merchant.concat(res.data.data.list)
							if(this.$refs.myscroller) {
								this.$refs.myscroller.finishPullToRefresh()
							}
							plus.storage.setItem("merchant", JSON.stringify(this.merchant))
						}
					} else {
						//						this.noData = true
						this.$refs.myscroller.finishInfinite(2);
					}
				}, (err) => {
					this.merchant = JSON.parse(plus.storage.getItem("merchant"))
					this.noData = true
					this.$refs.myscroller.finishInfinite(2);
					console.log(JSON.stringify(err))
				})
			},
			//是否有新版本号
			getUpdate() {
				this.$http.get(this.http + '/api/checkAppUpgrade', {
					params: {
						version: '1.5.1'
					}
				}).then((res) => {
					if(res.data.code == '200') {
						this.upgrade = res.data.data.upgrade
						this.updateUrl = res.data.data.url
						this.app_version = res.data.data.app_version
						this.app_size = res.data.data.app_size
						var upgrade_msg = res.data.data.upgrade_msg
						this.upgrade_msg = upgrade_msg.split("\n")
						for(var i = 0; i < this.upgrade_msg.length; i++) {
							if(this.upgrade_msg[i] == "") {
								this.upgrade_msg.splice(i, 1)
							}
						}
					}
				}, (err) => {
					console.log(JSON.stringify(err))
				})
			},
			//新消息通知
			getInfoMsg() {
				this.$http.get(this.http + '/api/getAppIndexMsg').then((res) => {
					if(res.data.code == '200') {
						this.showInfo = res.data.data.show
						var info_msg = res.data.data.msg
						this.info_msg = info_msg.split("\n")
						for(var i = 0; i < this.info_msg.length; i++) {
							if(this.info_msg[i] == "") {
								this.info_msg.splice(i, 1)
							}
						}
					}
				}, (err) => {
					console.log(JSON.stringify(err))
				})
			},
			infinite(done) {
				if(this.noData) {
					setTimeout(() => {
						this.$refs.myscroller.finishInfinite(2);
					})
					return;
				} else {
					let self = this; //this指向问题
					
					setTimeout(() => {
						self.pageIndex += 1
						self.getMerchantList()
						done()
					}, 1500)
				}
			},
			refresh(done) {
				var self = this
				this.pageIndex = 1
				this.merchant = []
				this.getBannerList()
				this.getMerchantList()
				this.getNews()
				setTimeout(function() {
					self.top = self.top - 10;
					done()
				}, 1500)
			},
			toJD() {
				var self = this
				this.$http.post(this.http + '/api/getBuyUrl', {
					type: 2,
				}).then((res) => {
					if(res.data.code == '200') {
						console.log(JSON.stringify(res.data.data))
						this.$router.push({
							name: 'NewJD',
							query: {
								url: res.data.data.url
							}
						})
					} else if(res.data.code == '601') {
						plus.nativeUI.toast(res.data.error);
					}
				}, (err) => {
					console.log(JSON.stringify(err))
				})
			},
			toMogu() {
				var self = this
				this.$http.post(this.http + '/api/getBuyUrl', {
					type: 3,
				}).then((res) => {
					if(res.data.code == '200') {
						this.$router.push({
							name: 'NewMogu',
							query: {
								url: res.data.data.url
							}
						})
					} else if(res.data.code == '601') {
						plus.nativeUI.toast(res.data.error);
					}
				}, (err) => {
					console.log(JSON.stringify(err))
				})
			},
			toUpdate() {
				var self = this
					plus.runtime.openURL(self.updateUrl, function(err) {

					});
//				if(plus.os.name == "Android") {
//					var self = this
//					plus.runtime.openURL(self.updateUrl, function(err) {
//
//					});
//				} else if(plus.os.name == "iOS") {
//					var self = this
//					plus.runtime.openURL(self.updateUrl, function(err) {
//
//					});
//				}

			},
			cancel() {
				this.upgrade = 0
			},
			cancel2() {
				this.showInfo = 0
			},
			
			
		},
		mounted: function() {
			setTimeout(this.getInfoMsg(), 3000)
			setTimeout(this.getUpdate(), 3000)
		},
		created: function() {
			this.getBannerList()
			this.getNews()
			this.getMerchantList()
			this.unMessage = plus.storage.getItem("unMessage")
		}
	}
</script>
<style scoped>
	.nav-small {
		background-image: url("../../../static/images/index_bd.png");
		overflow: hidden;
		padding: .38rem .2rem .1rem .2rem;
		background-size: 100% 100%;
		width: 100%;
		height: 1.94rem;
		box-sizing: border-box;
	}
	
	.nav-small li {
		margin-bottom: .25rem;
		width: 20%;
		float: left;
		list-style: none;
		text-align: center;
	}
	
	.nav-small li img {
		width: .8rem;
		height: .8rem;
		border-radius: 50%;
		margin: 0 auto;
		word-break: break-all;
	}
	
	.nav-small li span {
		font-size: .24rem;
		color: #333333;
		display: block;
	}
	
	.main {
		font-size: 0;
	}
	
	.main_title {
		font-size: .3rem;
		color: #f51d46;
		text-align: center;
		vertical-align: middle;
		height: .92rem;
		line-height: .92rem;
		background: white;
	}
	
	.main_title>img {
		width: .38rem;
		height: .38rem;
		vertical-align: middle;
	}
	
	.searchDiv {
		width: 100%;
		position: absolute;
		top: .44rem;
		z-index: 9999999;
		height: .88rem;
		line-height: .88rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.searchDiv .left {
		height: 100%;
		text-align: center;
		vertical-align: middle;
	}
	
	.searchDiv .search_icon {
		width: .28rem;
		height: .28rem;
		vertical-align: middle;
	}
	
	.logo {
		width: .92rem;
		height: .6rem;
		vertical-align: middle;
	}
	
	.info {
		width: .92rem;
		height: .6rem;
		vertical-align: middle;
	}
	
	.search {
		color: #999;
		background: rgba(255, 255, 255, .8);
	}
	
	.searchDiv .right {
		text-align: center;
		line-height: 100%;
		position: relative;
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
		right: .10rem;
		top: -.1rem;
	}
	
	.news_main {
		width: 100%;
		height: .82rem;
		background: white;
		border-top: .01rem solid #e5e5e5;
		border-bottom: .01rem solid #e5e5e5;
		margin-bottom: .2rem;
		display: flex;
		align-items: center;
	}
	
	.news_left {
		width: 1.44rem;
		/*height: 100%;
  	line-height: 1.1rem;*/
		text-align: center;
		box-sizing: border-box;
		border-right: .01rem solid #e5e5e5;
	}
	
	.news_left>img {
		width: 1.06rem;
		height: .22rem;
		vertical-align: middle;
	}
	
	.news_right {
		width: calc(100% - 1.44rem);
		width: -moz-calc(100% - 1.44rem);
		width: -webkit-calc(100% - 1.44rem);
		height: 25px;
	}
	
	.news {
		font-size: .24rem;
		color: #666;
	}
	
	.news>p {
		/*height: .55rem;
  	line-height: .55rem;*/
		word-wrap: break-word;
		-webkit-line-clamp: 1;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	
	.nav {
		width: 100%;
		height: 3.58rem;
		position: relative;
		display: inline-block;
	}
	
	.nav_name {
		font-size: .24rem;
		color: #fff;
		height: .5rem;
		position: absolute;
		background: rgba(0, 0, 0, 0.3);
		border-radius: .5rem;
		top: .2rem;
		left: .2rem;
		box-sizing: border-box;
		z-index: 999;
		display: flex;
		align-items: center;
		padding: 0 0 0 .05rem;
	}
	
	.nav_name>span {
		max-width: 2.38rem;
		float: right;
		white-space: nowrap;
		overflow: hidden;
		margin: 0 .2rem 0 .1rem;
	}
	
	.nav_pic {
		width: .42rem;
		height: .42rem;
		border-radius: 50%;
	}
	
	.bd {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .3);
		position: absolute;
		top: 0;
		left: 0;
	}
	/*.box {
		height: 2.8rem;
		position: relative;
		background-color: white;
		padding-bottom: .34rem;
		margin-bottom: .16rem;
	}*/
	
	.box_content {
		margin: 0 0 0 .18rem;
		width: 2rem!important;
		box-sizing: border-box;
		position: relative;
	}
	
	.box_content img {
		width: 2rem;
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
	
	.old_price {
		color: #999;
		font-size: .2rem;
	}
	
	.more {
		display: table;
		font-size: .24rem;
		color: #333;
		background: #f2f2f2;
		height: 2rem;
		border-radius: .08rem;
	}
	
	.more span {
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
	
	.update-main {
		width: 5.38rem;
		height: 8rem;
		background: url(../../../static/images/update.png);
		background-size: 100%;
		background-repeat: no-repeat;
		z-index: 9999999;
		position: fixed;
		top: 2rem;
		left: calc((100% - 5.37rem)/2);
	}
	
	.update-main2 {
		background: url(../../../static/images/info_icon.png);
		background-size: 100%;
		background-repeat: no-repeat;
	}
	
	.update-main-content {
		margin-top: 3.5rem;
		line-height: .42rem;
		padding: .1rem .5rem 0 .5rem;
	}
	
	.update-main-content2 {
		margin-top: 3.84rem;
		height: 3.7rem;
		overflow-y: scroll;
	}
</style>
<style>
	.vux-slider>.vux-indicator>a>.vux-icon-dot.active {
		background-color: white !important;
	}
	
	.vux-slider>.vux-indicator>a>.vux-icon-dot {
		background-color: rgba(255, 255, 255, 0) !important;
		border: .02rem solid white;
		box-sizing: border-box;
	}
	
	.index-swiper.vux-slider>.vux-indicator,
	.index-swiper.vux-slider .vux-indicator-right {
		bottom: .25rem!important;
	}
</style>