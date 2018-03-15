<template>
	<div>
		<!--<x-header :left-options="{backText: ''}" title="淘宝领券" class="header">
			<a slot="right">
				<router-link to="/home/assortment/search">
					<img src="../../../static/images/search_icon.png" alt="" style="width: .4rem;height: .4rem;vertical-align: middle;" />
				</router-link>
			</a>
		</x-header>-->
		<div class="nav-header">
				<x-icon type="ios-arrow-left" size="30" style="fill: white;width: .86rem;" @click="goback()"></x-icon>
				<router-link class="serach_p" to="/home/assortment/searchPage">
					<div class="search">
						<img src="../../../static/images/search_icon.png" alt="" class="search_icon" />
						<span>输入商品名/关键字</span>
					</div>
				</router-link>
				<router-link class="nav-header-right" to="/home/assortment/searchPage">
					<img src="../../../static/images/JD_logo.png" alt="" style="width: .7rem; height: .5rem;"/>
				</router-link>
			</div>
		<scroller :on-infinite="infinite" :on-refresh="refresh" ref="myscroller" style="margin-top: .88rem;">
			<swiper auto loop :list="demoList" style="width:100%;" height="2.6rem" dots-class="custom-bottom" dots-position="center" :show-desc-mask="false"></swiper>
			<div>
				<ul class="nav-small">
					<router-link tag="li" v-for="(type,index) in typeList" :to="{name:'Classify',query:{id:type.id}}" :key="index">
						<img :src="type.image_url" :onerror="defaultImg">
						<span>{{type.cate_name}}</span>
					</router-link>
				</ul>
			</div>
			<div class="main">
				<div class="nav-bigger">
					<router-link to="">
						<img class="same" src="../../../static/images/yuanbaoShop_img.png">
					</router-link>
					<router-link to="">
						<img class="same" src="../../../static/images/xianbao_img.png">
					</router-link>
					<router-link to="">
						<img class="same" src="../../../static/images/zhinan_img.png">
					</router-link>
					<router-link to="">
						<img class="same" src="../../../static/images/fuli_img.png">
					</router-link>
				</div>
				<div class="main_goods">
					<ul class="goods">
						<router-link tag="li" v-for="(goods,index) in goodsList" class="goods_list" :to="{name:'JDDetail',query:{id:goods.id}}" :key="index">
							<img :src="goods.pict_url" alt="" :onerror="defaultImg" class="goods-pic">
							<div class="content">
								<div class="des">{{goods.title}}</div>
								<div style="margin: .15rem 0;" class="flex">
									<span class="juan_style" style="margin-right: .2rem;">
                      <span class="juan_style_left">券</span>
									<span class="juan_style_right">{{goods.coupon_number}}元</span>
									</span>
									<div class="header_list_num jewel f22">
										<img src="../../../static/images/personCenter/jewel.png" alt="" /> 8.86
									</div>
									<!--<div class="header_list_num gold">
                	   	   <img src="../../../static/images/personCenter/gold_acer.png" alt="" />
                	       8.86
                	     </div>
                	     <div class="header_list_num silver">
                	   	   <img src="../../../static/images/personCenter/silver.png" alt="" />
                	       8.86
                	     </div>
                	     <div class="header_list_num coppers">
                	   	   <img src="../../../static/images/personCenter/coppers.png" alt="" />
                	       8.86
                	     </div>-->
								</div>
								<div class="des_b">
									<span class="price"><span style="font-size: .2rem;">￥</span>{{goods.zk_final_price.rmb}}<span style="font-size: .20rem;" v-show="goods.zk_final_price.corner!=='00'">.{{goods.zk_final_price.corner}}</span></span>
									<!--<del style="font-size: .20rem;color: #999;" >￥{{goods.reserve_price.rmb}}<span v-show="goods.reserve_price.corner!=='00'">.{{goods.reserve_price.corner}}</span></del>-->
									<span class="num">{{goods.volume}}件已售</span>
								</div>
							</div>
						</router-link>
					</ul>
				</div>
			</div>
		</scroller>
		<!--<div class="toTop" @click="toTop()">-->
		<!--<img src="/static/images/top.png" alt="" style="width: .35rem;height: .15rem;display: block;margin: .2rem auto .1rem;">-->
		<!--<span>顶部</span>-->
		<!--</div>-->
	</div>
</template>
<script>
	import { XHeader, Swiper } from 'vux'
	const url='http://xlk.dxvke.com/'
	export default {
		name: 'Home',
		components: {
			XHeader,
			Swiper,
		},
		data() {
			return {
				demoList: [],
				typeList: [],
				storeTypeList: [],
				goodsList: [],
				defaultImg: 'this.src="' + require('../../../static/images/default_img.png') + '"',
				pageIndex: 1,
				limit: 10,
				noData: false,
			}
		},
		methods: {
			//      获取首页轮播图
			getBannerList: function() {
				this.$http({
					method: 'POST',
					url: url+'/api/index_banner'
				}).then((res) => {
					if(res.data.code == '200') {
						const imgList = res.data.data.index_banner
						const demoList = imgList.map((item, index) => ({
							url: item.banner_url,
							img: item.banner_image
						}))
						this.demoList = demoList
						console.log(imgList)
					}
				}, (err) => {
					console.log(err)
				})
			},
			//      获取商品分类
			getTypeList: function() {
				this.$http({
					method: 'POST',
					url: url+'/api/index_type'
				}).then((res) => {
					if(res.data.code == '200') {
						const typeList = res.data.data.goods_type_up
						this.typeList = typeList
					}
				}, (err) => {
					console.log(err)
				})
			},
			//      获取商品列表
			getGoodsList: function() {
				const self = this
				this.$http({
					method: 'POST',
					url: url+'/api/index_goods',
					data: {
						page: this.pageIndex,
						limit: this.limit
					}
				}).then((res) => {
					if(res.data.code == '200') {
						if(res.data.data.goods.length == 0) {
							this.noData = true
							this.$refs.myscroller.finishInfinite(2);
							//             self.noData=false;
							//             self.$refs.myscroller.finishPullToRefresh();
						} else {
							this.goodsList = this.goodsList.concat(res.data.data.goods)
						}
					}
				}, (err) => {
					console.log(err)
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
						self.getGoodsList()
						done()
					}, 1500)
				}
			},
			refresh(done) {
				var self = this
				this.pageIndex = 1
				this.goodsList = []
				this.getBannerList()
				this.getTypeList()
				this.getGoodsList()
				setTimeout(function() {
					self.top = self.top - 10;
					done()
				}, 1500)
			},
			//      toTop(){
			//        document.documentElement.scrollTop = document.body.scrollTop =0;
			//      },
			goback() {
				history.back(-1);
			}

		},
		mounted: function() {
			this.$nextTick(function() {
				//        // 返回顶部
				//        let back_btn = document.getElementsByClassName('toTop')[0];
				//        window.onscroll=function () {
				//          let top = document.documentElement.scrollTop || document.body.scrollTop;
				////          console.log(top)
				//          if (top > 800) {
				//            back_btn.style.display = 'block';
				//          } else {
				//            back_btn.style.display = 'none';
				//          }
				//        }
			})
		},
		created: function() {
			this.getBannerList()
			this.getTypeList()
			this.getGoodsList()
		}
	}
</script>
<style scoped>
	.header {
		border: none;
		
	}
	.nav-header {
		width: 100%;
		display: flex;
		align-items: center;
		/*margin-top: .2rem;*/
		height: .88rem;
		background: #f23030;
		position: fixed;
		top: 0;
		z-index: 9999;
	}
	
	.nav-header-right {
		width: 1.1rem;
		text-align: center;
		height: .64rem;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	
	.search {
		width: 5.48rem;
		color: white;
		background: rgba(255,255,255,0.2);
	}
	
	.search_icon {
		width: .28rem;
		height: .28rem;
		vertical-align: middle;
	}
	
	.nav-small {
		overflow: hidden;
		padding: .38rem .2rem .1rem .2rem;
		background-color: white;
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
	
	.nav-bigger {
		width: 100%;
		background-color: white;
		font-size: 0;
		margin: .16rem 0;
	}
	
	.same:nth-child(odd) {
		width: 50%;
		height: 1.52rem;
		display: inline-block;
		border-right: .01rem solid #f4f4f4;
		box-sizing: border-box;
	}
	
	.same:nth-child(1),
	.same:nth-child(1) {
		border-bottom: .01rem solid #f4f4f4;
	}
	
	.main {
		margin-bottom: 1.06rem;
	}
	
	.goods {
		overflow: hidden;
	}
	
	.goods_list {
		font-size: 0;
		background-color: white;
		list-style: none;
		float: left;
		width: 50%;
		box-sizing: border-box;
		border-bottom: .1rem solid #f4f4f4;
	}
	
	.goods-pic {
		width: 100%;
		height: 3.6rem;
	}
	
	.goods_list:nth-of-type(odd) {
		border-right: .05rem solid #f4f4f4;
	}
	
	.goods_list:nth-of-type(even) {
		border-left: .05rem solid #f4f4f4;
	}
	
	.content {
		padding: .1rem;
	}
	
	.des {
		height: .8rem;
		font-size: .28rem;
		color: #333;
		line-height: .4rem;
		word-wrap: break-word;
		-webkit-line-clamp: 2;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	
	.price {
		font-size: .32rem;
		color: #ff425f;
	}
	
	.num {
		font-size: .24rem;
		color: #999;
		float: right;
		margin-top: .1rem;
		margin-right: .15rem;
	}
</style>