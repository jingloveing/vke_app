<template>
	<div>
		<x-header :left-options="{showBack: false}" title="品牌现场" class="header">
			<a slot="right">
				<router-link to="/personCenter/info">
					<div class="right">
						<img src="static/images/info.png" alt="" class="info" />
						<span class="info_num" v-show="unMessage && unMessage !=='0'">{{unMessage}}</span>
					</div>
				</router-link>
			</a>
		</x-header>
		<scroller :on-infinite="infinite" :on-refresh="refresh" ref="myscroller" style="margin-top: .88rem;">
		<swiper auto loop :list="demoList" style="width:100%;" height="2.6rem" dots-class="custom-bottom" dots-position="center" :show-desc-mask="false"></swiper>
		<div style="background: white;">
			<div class="main_title">
				<img src="../../../static/images/brandSite_icon.png" alt="" />
				<span>品牌直达</span>
			</div>
			<div style="height: 1.92rem;" class="f28 c3">
				<swipers :options="swiperOptionA" class="store">
					<swiper-slide class="store_content" v-for="(item,index) in merchantList" :key="index">
						<router-link :to="{name:'StoreIndex',query:{id:item.id}}">
							<img :src="item.logo" alt="" :onerror="defaultImg">
							<p class="f24 c3" style="    white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{item.name}}</p>
						</router-link>
					</swiper-slide>
					<!--<swiper-slide class="store_content more">
						<span class="f24 c3">全部</span>
					</swiper-slide>-->
				</swipers>
			</div>
		</div>
		<div class="main">
			<div class="list" v-for="(item,index) in merchantView" :key="index">
				<div class="list-title">
					<div class="list-title-left">
						<img :src="item.logo" alt="" class="small-icon" :onerror="defaultImg"/>
						<span class="f28 c3" style="margin-left: .1rem;">{{item.name}}</span>
					</div>
					<router-link class="f24 c3 store-btn" :to="{name:'StoreIndex',query:{id:item.id}}">进店逛逛</router-link>
				</div>
				<div style="position: relative;" @click="play(item.id)">
					<!--controls---video的控制条-->
					<video controls :id="'myVideo'+item.id" width="100%" style="height: 4.2rem;background: black;" :poster="item.image
">
						<source :src="item.view" type="video/mp4">
						<source src="/i/movie.ogg" type="video/ogg">
					</video>
					<div class="pause">
						<img src="/static/images/play.png" alt=""/>
					</div>
				</div>
				<swipers :options="swiperOptionB" style="margin-top: .1rem;height: 3.07rem;">
					<swiper-slide v-for="(list,index) in item.product_list" :key="index" class="box_content">
						<router-link :to="{name:'BrandDetail',query:{id:list.id,store_id:item.id}}">
							<img :src="list.thumb_url" alt="" :onerror="defaultImg">
							<span class="dess">
                            <p class="des_name break">{{list.product_name}}</p>
                            <p class="des_price">
                            	<span class="new_price">
                            		<span class="f20">￥</span>{{list.reserve_price}}
							<!--11<span>.99</span>-->
							</span>
							<!--<span class="old_price">￥12<span>.12</span></span>-->
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
	</div>
</template>

<script>
	import { XHeader, Swiper } from 'vux'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		name: 'BrandSite',
		components: {
			XHeader,
			Swiper,
			swipers: swiper,
			swiperSlide,
		},
		data() {
			return {
				demoList: [],
				merchantList: [],
				merchantView: [],
				defaultImg: 'this.src="' + require('../../../static/images/default_img.png') + '"',
				swiperOptionA: {
					// 如果需要滚动条
					slidesPerView: 5,
					preventClicksPropagation: true,
				},
				swiperOptionB: {
					// 如果需要滚动条
					slidesPerView: 3,
					preventClicksPropagation: true,
				},
				noData: false,
				page:1,
				limit:20,
				unMessage:null,
				poster:[]
			}
		},
		methods: {
			//      获取品牌现场轮播图
			getBannerList: function() {
				this.$http({
					method: 'get',
					url: this.http+'/api/merchantIndexBanner'
				}).then((res) => {
					if(res.data.code == '200') {
						const imgList = res.data.data
						const demoList = imgList.map((item, index) => ({
							url: item.click_url,
							img: item.image
						}))
						this.demoList = demoList
						plus.storage.setItem("demoList",JSON.stringify(this.demoList))
					}
				}, (err) => {
					this.demoList=JSON.parse(plus.storage.getItem("demoList"))
					console.log(err)
				})
			},
			//      获取入驻品牌列表
			getMerchantList: function() {
				this.$http({
					method: 'get',
					url: this.http+'/api/merchantList'
				}).then((res) => {
					if(res.data.code == '200') {
						this.merchantList = res.data.data
						plus.storage.setItem("merchantList",JSON.stringify(this.merchantList))
					}
				}, (err) => {
					this.merchantList=JSON.parse(plus.storage.getItem("merchantList"))
					console.log(err)
				})
			},
			//      获取入驻品牌列表---带视频
			getMerchantView: function() {
				this.$http({
					method: 'get',
					url: this.http+'/api/merchantView',
					params:{
						page:this.page,
						limit:this.limit
					}
				}).then((res) => {
					if(res.data.code == '200') {
						if(res.data.data.list.length == 0) {
							this.noData = true
							this.$refs.myscroller.finishInfinite(2);
						} else {
							this.merchantView = this.merchantView.concat(res.data.data.list)
							this.$refs.myscroller.finishPullToRefresh()
						}
						plus.storage.setItem("merchantView",JSON.stringify(this.merchantView))
					}else{
						this.noData = true
							this.$refs.myscroller.finishInfinite(2);
					}
				}, (err) => {
					this.merchantView=JSON.parse(plus.storage.getItem("merchantView"))
					this.noData = true
					this.$refs.myscroller.finishInfinite(2);
					console.log(err)
				})
			},
			play(e){
				var video = document.getElementById('myVideo' + e)
				if(video.paused) {
					video.play()
					video.parentNode.children[1].style.display="none"
				} else {
					video.pause();
					video.parentNode.children[1].style.display="inline-block"
				}
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
						self.page += 1
						self.getMerchantView()
						done()
					}, 1500)
				}
			},
			refresh(done) {
				var self = this
				this.page = 1
				this.merchantView=[]
				this.getBannerList()
			this.getMerchantList()
			this.getMerchantView()
				setTimeout(function() {
					self.top = self.top - 10;
					done()
				}, 1500)
			},
		},
		mounted: function() {
           
		},
		created: function() {
			this.getBannerList()
			this.getMerchantList()
			this.getMerchantView()
			this.unMessage = plus.storage.getItem("unMessage")
			
		},
		activated:function(){
			
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
		right: -.2rem;
		top: .0rem;
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
		position: relative;
		background-color: white;
		padding-bottom: .34rem;
		margin-bottom: .16rem;
	}
	
	.store {
		height: 1.92rem;
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
		text-align: center;
		margin-top: .2rem;
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
		margin: 0 0 0 .2rem;
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
	
	.main {}
	
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