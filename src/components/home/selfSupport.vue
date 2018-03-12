<template>
	<div>
		<x-header :left-options="{backText: ''}" title="特供商品区" class="header"></x-header>
		<div style="height: .88rem;"></div>
			<!--<div class="header-right">
			<router-link to="/home/assortment/searchPage">
				<img src="../../../static/images/search_icon.png" alt="" />
			</router-link>
			
			<router-link to="/personCenter/shoppingCart">
				<img src="../../../static/images/cart_white.png" alt="" />
			</router-link>
		</div>-->
			<!--<div style="background: white;height: .88rem;line-height: .88rem;" class="f28 c3">
			<swiper :options="swiperOptionB">
				<swiper-slide v-for="(item,index) in cate" :key="index">
					<div @click="click(index)" class="tabs" :class="indexs==index?'c_f':''">{{item.cate_name}}</div>
				</swiper-slide>
				
			</swiper>
		</div>-->
			<div class="main_goods">
				<ul class="goods">
					<router-link tag="li" v-for="(goods,index) in goodsList" class="goods_list" :to="{name:'GoodsDetail',query:{id:goods.id,type:5}}" :key="index">
						<img :src="goods.thumb_url" alt="" :onerror="defaultImg" class="goods-pic">
						<div class="content">
							<div class="des">{{goods.product_name}}</div>
							<div class="des_b">
								<span class="price">
										<span style="font-size: .2rem;">￥</span>{{goods.reserve_price.rmb}}
								<span style="font-size: .2rem;" v-show="goods.reserve_price.corner!=='00'">.{{goods.reserve_price.corner}}</span>
								</span>
								<!--<span class="num">{{goods.volume}}件已售</span>-->
							</div>
						</div>
					</router-link>
				</ul>
			</div>
		<toast v-model="showToast" type="text" :time="800" is-show-mask position="middle">{{toast}}</toast>
	</div>
</template>

<script>
	import { XHeader, Toast, } from 'vux'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		components: {
			XHeader,
			swiper,
			swiperSlide,
			Toast,
		},
		data() {
			return {
				//				swiperOptionB: {
				//					// 如果需要滚动条
				//					slidesPerView: 5,
				//					preventClicksPropagation:true,
				//				},
				//				cate:[{
				//					id:'',
				//					cate_name:''
				//				}],
				//				indexs:0,
				goodsList: [],
				defaultImg: 'this.src="' + require('../../../static/images/default_img.png') + '"',
				page: 1,
				limit: 20,
				noData: false,
				showToast: false,
				toast: '',
			}
		},
		methods: {
			//      获取商品列表
			getGoodsList: function() {
				const self = this
				this.$http({
					method: 'get',
					url: '/api/teList',
				}).then((res) => {
					if(res.data.code == '200') {
						this.goodsList = res.data.data
					}
				}, (err) => {
					console.log(err)
				})
			},
			//			//      获取商品分类
			//			getCate: function() {
			//				this.$http({
			//					method: 'get',
			//					url: '/api/xlkCate'
			//				}).then((res) => {
			//					if(res.data.code == '200') {
			//						this.cate = res.data.data
			//					}
			//				}, (err) => {
			//					console.log(err)
			//				})
			//			},
			//          click(index){
			//          	var tabs=document.getElementsByClassName('tabs')
			//          	var self = this
			//          	for(var i=0;i<tabs.length;i++){
			//          		if(i==index){
			//          			tabs[i].classList.add('c_f')
			//          			self.indexs=i
			//          			self.cate_id=self.cate[self.indexs].id
			//          			this.getGoodsList()
			//          		}else{
			//          			tabs[i].classList.remove(('c_f'))
			//          		}
			//          	}
			//          	
			//          },
		},
		created: function() {
			this.getGoodsList()
			//          this.getCate()
		},
		mounted: function() {

		},
		computed: {

		}
	}
</script>

<style scoped="scoped">
	.header {
		background: #9A7BFF;
		border: none;
	}
	
	.header-right {
		position: fixed;
		top: 0;
		right: .25rem;
		z-index: 999999;
	}
	
	.header-right img {
		width: .4rem;
		height: .4rem;
		padding: .2rem .1rem;
	}
	
	.swiper-slide {
		text-align: center;
	}
	
	.tabs.c_f {
		height: .88rem;
		border-bottom: .05rem solid #9A7BFF;
		box-sizing: border-box;
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