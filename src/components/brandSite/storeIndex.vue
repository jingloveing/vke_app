<template>
	<div>
		<scroller :on-infinite="infinite" :on-refresh="refresh" ref="myscroller">
		<div class="header">
			<div class="nav-header">
				<!--<img src="../../../static/images/lt_white.png" alt="" />-->
				<x-icon type="ios-arrow-left" size="30" style="fill: white;width: .91rem;" @click="goback()"></x-icon>
				<router-link class="serach_p" :to="{name:'searchPage',query:{type:2,id:info.info.id}}">
					<div class="search" style="width: 6rem;">
						<img src="../../../static/images/personCenter/search_img.png" alt="" class="search_icon" />
						<span>搜索店内商品</span>
					</div>
				</router-link>
				<!--<div class="nav-header-right">
					<router-link to="/brandSite/storeIndex/storeClassify" class="classify">
						<img src="../../../static/images/classify_icon.png" alt="" />
						<span style="font-size: .18rem;color: white;">分类</span>
					</router-link>
					<div class="share" @click="show=!show">
						<img src="../../../static/images/share_icon.png" alt="" />
						<span style="font-size: .18rem;color: white;">分享</span>
					</div>
				</div>-->
			</div>
			<div class="shop">
				<div class="shop-info">
					<img :src="info.info.logo" alt="" :onerror="defaultImg" />
					<div class="shop-des">
						<p class="f28">{{info.info.name}}</p>
						<p class="f20">商品{{info.pro_count}}件 收藏{{info.coll_count}}人</p>
					</div>
				</div>
				<div class="collect" @click="doCollect(2,info.info.id)">
					<x-icon type="ios-heart-outline" size="15" style="fill: white;" v-show="info.is_collect==0"></x-icon>
					<x-icon type="ios-heart" size="15" style="fill: white;" v-show="info.is_collect==1"></x-icon>
					<span style="margin-left: .1rem;">收藏</span>
				</div>
			</div>
		</div>
		<div>
			<tab :line-width=2 active-color='#9a7bff' v-model="index1" custom-bar-width="1.3rem" class="storeTab">
				<tab-item class="vux-center" v-for="(item, index) in list1" @on-item-click="tabclick1(item,index)" :key="index">{{item}}</tab-item>
			</tab>
			<!--<swiper-slide>
					<div class="tab-swiper">
						<video id="myVideo" width="100%" controls style="height: 4.2rem;background: black;" poster="../../../static/images/default_img.png">
							<source src="" type="video/mp4">
							<source src="" type="video/ogg">
						</video>
						<swiper auto loop :list="demoList" style="width:100%;margin: .14rem 0;" height="2.6rem" dots-class="custom-bottom" dots-position="center" :show-desc-mask="false"></swiper>
						<img src="../../../static/images/store_bd.jpeg" class="img" />
					</div>
				</swiper-slide>-->
				<div>
					<div class="tab-swiper" v-show="index1==0">
						<tab :line-width=0 active-color='#9a7bff' v-model="index2" custom-bar-width="1.3rem">
							<tab-item class="vux-center" v-for="(item, index) in list2" @on-item-click="tabclick2(item,index)" :key="index">{{item}}</tab-item>
							<tab-item class="vux-center" @on-item-click="tabclick2('价格',3)">价格 <div style="display: inline-block;">
				<img src="../../../static/images/sort_price.png" style="width: .12rem;height: .19rem;" v-show="defaultsort"/>
				<img src="../../../static/images/sort_price_asc.png" style="width: .12rem;height: .19rem;" v-show="!asc && !defaultsort"/>
				<img src="../../../static/images/sort_price_desc.png" style="width: .12rem;height: .19rem;" v-show="asc && !defaultsort"/>
			</div>
							</tab-item>
						</tab>
						<div>
							<div class="main_goods">
								<ul class="goods">
									<router-link tag="li" v-for="(goods,index) in goodsList" class="goods_list" :to="{name:'BrandDetail',query:{id:goods.id,store_id:info.info.id}}" :key="index">
										<img :src="goods.thumb_url" alt="" :onerror="defaultImg">
										<div class="content">
											<div class="des">{{goods.product_name}}</div>
											<div style="margin: .15rem 0;" class="flex">
												<span class="juan_style" style="margin-right: .2rem;">
                                                    <span class="juan_style_left">券</span>
												<span class="juan_style_right">{{goods.coupon_number}}元</span>
												</span>
												<!--<div class="header_list_num jewel f22">
												<img src="../../../static/images/personCenter/jewel.png" alt="" style="width: .22rem;height: .22rem;margin: 0 .1rem;" /> 8.86
											</div>
											<div class="header_list_num gold">
                	   	   <img src="../../../static/images/personCenter/gold_acer.png" alt="" style="width: .22rem;height: .22rem;margin: 0 .1rem;" />
                	       8.86
                	     </div>
                	     <div class="header_list_num silver">
                	   	   <img src="../../../static/images/personCenter/silver.png" alt="" style="width: .22rem;height: .22rem;margin: 0 .1rem;" />
                	       8.86
                	     </div>
                	     <div class="header_list_num coppers">
                	   	   <img src="../../../static/images/personCenter/coppers.png" alt="" style="width: .22rem;height: .22rem;margin: 0 .1rem;" />
                	       8.86
                	     </div>-->
											</div>
											<div class="des_b">
												<span class="price"><span style="font-size: .2rem;">￥</span>{{goods.reserve_price.rmb}}<span style="font-size: .20rem;" v-show="goods.reserve_price.corner!=='00'">.{{goods.reserve_price.corner}}</span></span>
												<span class="num">{{goods.volume}}件已售</span>
											</div>
										</div>
									</router-link>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div class="tab-swiper" v-show="index1==1">
						<div>
							<ul class="video">
								<li v-for="(item,index) in viewList" class="video_list" :key="index" @click="toVedioPage(item)">
									<img :src="item.image" alt="" :onerror="defaultImg">
									<p>{{item.view_name}}</p>
								</li>
							</ul>
						</div>
						<div class="empty" v-show="viewList.length==0"><img src="../../../static/images/empty/no_video.png" /></div>
					</div>
				</div>
			
			<!--<div style="width: 100%;height: 100vh;background:black;opacity: .5;position: fixed;top: 0;" v-show="show">
		</div>
		<transition enter-active-class="fadeInUpBig" leave-active-class="fadeOutDownBig">
			<div v-show="show" class="main">
				<div class="main-content">
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
		</transition>-->

		</div>
		</scroller>
        <loading v-model="showLoading" :text="loadText"></loading>
		<toast v-model="showToast" type="text" :time="800" is-show-mask position="middle">{{toast}}</toast>
	</div>
</template>

<script>
	import { Tab, TabItem, Swiper, SwiperItem, PopupPicker, Divider, XSwitch, Toast,Loading } from 'vux'
	const list = () => ['全部商品', '品牌现场']
	export default {
		name: 'StoreIndex',
		components: {
			Tab,
			TabItem,
			Swiper,
			SwiperItem,
			PopupPicker,
			Divider,
			XSwitch,
			Toast,
			Loading
		},
		data() {
			return {
				info: {
					coll_count: null,
					info: {
						logo: '',
						name: null,
					},
					is_collect: null,
					pro_count: null
				},
				viewList: [],
				order: 1,
				sort: '',
				defaultImg: 'this.src="' + require('../../../static/images/default_img.png') + '"',
				list1: list(),
				list2: ['综合', '销量', '新品'],
				index1: 0,
				index2: 0,
				goodsList: [],
				show: false,
				showToast: false,
				toast: '',
				noData: false,
				page1: 1,
				page2: 1,
				limit: 20,
				type: 0,
				showLoading:false,
				loadText:'',
				defaultsort:true,
				asc:true,
			}
		},
		methods: {
			//      获取店铺信息
			getMerchantInfo: function() {
				this.$http({
					method: 'get',
					url: this.http+'/api/merchantInfo',
					params: {
						id: this.$route.query.id
					}
				}).then((res) => {
					if(res.data.code == '200') {
						this.info = res.data.data
					}
				}, (err) => {
					console.log(err)
				})
			},
			//获取店铺视频列表
			getViewList: function() {
				const self = this
				this.$http({
					method: 'get',
					url: this.http+'/api/viewList',
					params: {
						page: this.page2,
						limit: this.limit,
						id: this.$route.query.id
					}
				}).then((res) => {
					if(res.data.code == '200') {
						if(res.data.data.list.length == 0) {
							this.noData = true
							this.$refs.myscroller.finishInfinite(2);
						} else {
							this.viewList = this.viewList.concat(res.data.data.list)
							this.$refs.myscroller.finishPullToRefresh(2)
						}
					} else {
						this.noData = true
						this.$refs.myscroller.finishInfinite(2);
					}
				}, (err) => {
					this.$refs.myscroller.finishInfinite(2);
					console.log(err)
				})
			},
			//获取店铺商品列表
			getGoodsList: function() {
				const self = this
				if(this.asc==true){
					this.sort='desc'
				}else if(this.asc==false){
					this.sort='asc'
				}else{
					this.sort=''
				}
				this.$http({
					method: 'get',
					url: this.http+'/api/merProList',
					params: {
						page: this.page1,
						limit: this.limit,
						id: this.$route.query.id,
						order: this.order,
						sort: this.sort
					}
				}).then((res) => {
					this.showLoading = false
					if(res.data.code == '200') {
						if(res.data.data.list.length == 0) {
							this.noData = true
							this.$refs.myscroller.finishInfinite(2);
						} else {
							this.goodsList = this.goodsList.concat(res.data.data.list)
							this.$refs.myscroller.finishPullToRefresh(2)
						}
					} else {
						this.noData = true
						this.$refs.myscroller.finishInfinite(2);
					}
				}, (err) => {
					this.showLoading = false
					console.log(err)
					this.$refs.myscroller.finishInfinite(2);
				})
			},
			doCollect(type, id) {
				this.$http.post(this.http+'/api/doCollect', {
					type: type,
					id: id,
				}).then((res) => {
					if(res.data.code == '200') {
						this.toast = res.data.data.message
						this.showToast = true
						this.info.is_collect = res.data.data.is_collect
					} else {
						this.toast = res.data.error
						this.showToast = true
					}
				}, (err) => {
					console.log(err)
				})
			},
			goback() {
				history.back(-1);
			},
			infinite(done) {
				if(this.noData) {
					setTimeout(() => {
						this.$refs.myscroller.finishInfinite(2);
					})
					return;
				} else {
					let self = this; //this指向问题
					if(self.type == 0) {
						setTimeout(() => {
							self.page1 += 1
							self.getGoodsList()
							done()
						}, 1500)
					} else {
						setTimeout(() => {
							self.page2 += 1
							self.getViewList()
							done()
						}, 1500)
					}
				}
			},
			refresh(done) {
				var self = this
				if(self.type == 0) {
					this.page1 = 1
					this.goodsList = []
					this.getGoodsList()
					setTimeout(function() {
						self.top = self.top - 10;
						done()
					}, 1500)
				} else {
					this.page2 = 1
					this.viewList = []
					this.getViewList()
					setTimeout(function() {
						self.top = self.top - 10;
						done()
					}, 1500)
				}

			},
			tabclick1(item, index) {
				this.type = index
			},
			tabclick2(item, index) {
				if(index==3){
					this.defaultsort=false
					this.asc=!this.asc
				}else{
					this.defaultsort=true
					this.asc=true
				}
				this.showLoading = true
				this.order = index+1
				this.page1 = 1
				this.goodsList = []
				this.getGoodsList()
				
			},
			toVedioPage(item){
				var items=JSON.stringify(item)
				this.$router.push({name:'Vedio',query:{item:items}})
			}
		},
		mounted: function() {

		},
		created: function() {
			this.getMerchantInfo()
			this.getViewList()
			this.getGoodsList()
		}
	}
</script>

<style scoped="scoped">
	.header {
		/*padding-top: .4rem;*/
		height: 2.18rem;
		background-image: url(../../../static/images/store_bd.jpg);
		background-size: 100% 100%;
		color: white;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.nav-header {
		display: flex;
		align-items: center;
		/*margin-top: .2rem;*/
		height: .88rem;
	}
	
	.nav-header-right {
		width: 1.89rem;
		height: .64rem;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	
	.search {
		color: #c7c7c7;
		background: #F4F4F4;
	}
	
	.search_icon {
		width: .28rem;
		height: .28rem;
		vertical-align: middle;
	}
	
	.classify,
	.share {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: .05rem;
	}
	
	.share {
		padding-right: .2rem;
	}
	
	.classify img,
	.share img {
		width: .34rem;
		height: .34rem;
		/*padding: .2rem .22rem .2rem .44rem;*/
	}
	
	.shop {
		margin: .25rem .26rem;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}
	
	.shop .shop-info {
		display: flex;
		align-items: center;
	}
	
	.shop .shop-info img {
		width: .8rem;
		height: .8rem;
		margin-right: .27rem;
	}
	
	.shop .shop-des {
		display: flex;
		flex-direction: column;
	}
	
	.shop .shop-des p {
		max-width: 4rem;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	
	.shop .collect {
		width: 1.2rem;
		height: .5rem;
		font-size: .24rem;
		background: #9a7cff;
		color: white;
		border-radius: .06rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.tab-swiper {
		font-size: 0;
	}
	
	.goods,
	.video {
		overflow: hidden;
	}
	
	.video {
		padding: .2rem .2rem 0;
		background: white;
		border-top: .01rem solid #e5e5e5;
	}
	
	.goods_list,
	.video_list {
		font-size: 0;
		background-color: white;
		list-style: none;
		float: left;
		width: 50%;
		box-sizing: border-box;
		border-bottom: .1rem solid #f4f4f4;
	}
	
	.video_list {
		border-bottom: .06rem solid white;
		height: 2.81rem;
	}
	
	.video_list img {
		width: 100%;
		height: 1.98rem;
	}
	
	.video_list p {
		line-height: .77rem;
		font-size: .28rem;
		color: #333;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	
	.goods_list img {
		width: 100%;
		height: 3.6rem;
	}
	
	.goods_list:nth-of-type(odd) {
		border-right: .05rem solid #f4f4f4;
	}
	
	.video_list:nth-of-type(odd) {
		border-right: .03rem solid white;
		;
	}
	
	.goods_list:nth-of-type(even) {
		border-left: .05rem solid #f4f4f4;
	}
	
	.video_list:nth-of-type(even) {
		border-left: .03rem solid white;
	}
	
	.content {
		padding: .1rem;
	}
	
	.des_b {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.des {
		font-size: .28rem;
		color: #333;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	
	.price {
		font-size: .32rem;
		color: #ff425f;
		margin-right: .2rem;
	}
	
	.num {
		font-size: .24rem;
		color: #999;
		margin-top: .1rem;
		margin-right: .15rem;
	}
	
	.img {
		width: 100%;
	}
	/*分享样式*/
	
	.main {
		width: 100%;
		height: 4.17rem;
		background: white;
		position: fixed;
		bottom: 0;
		z-index: 999999;
	}
	
	.main-content {
		width: 100%;
		height: 3.21rem;
		overflow-y: scroll;
	}
	
	.s-cancel {
		width: .38rem;
		height: .38rem;
		right: .1rem;
		top: .1rem;
		position: absolute;
		padding: .1rem;
	}
	
	.share-class {
		justify-content: space-around;
		height: 2.27rem;
	}
	
	.share-class img {
		width: 1rem;
		height: 1rem;
	}
	.storeTab{
		font-size:0;
	}
</style>
<style>
	.storeTab.vux-tab .vux-tab-item {
		background-size: 0;
	}
</style>