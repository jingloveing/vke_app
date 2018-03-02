<template>
	<div>
		<x-header :left-options="{backText: ''}" title="享利客专区" class="header"></x-header>
		<div style="height: .88rem;"></div>
		<div class="header-right">
			<router-link to="/home/assortment/searchPage">
				<img src="../../../static/images/search_icon.png" alt="" />
			</router-link>
			
			<router-link to="/personCenter/shoppingCart">
				<img src="../../../static/images/cart_white.png" alt="" />
			</router-link>
		</div>
		<div style="background: white;height: .88rem;line-height: .88rem;" class="f28 c3">
			<swiper :options="swiperOptionB">
				<swiper-slide v-for="(list,index) in list" >
					<div @click="click(index)" class="tabs">{{list}}</div>
				</swiper-slide>
				
			</swiper>
		</div>
		<div class="main_goods">
					<ul class="goods">
						<router-link tag="li" v-for="(goods,index) in goodsList" class="goods_list" :to="{name:'GoodsDetail',query:{id:goods.id}}" :key="index">
							<img :src="goods.pict_url" alt="" :onerror="defaultImg" class="goods-pic">
							<div class="content">
								<div class="des">{{goods.title}}</div>
								<div class="des_b">
									<span class="price"><span style="font-size: .2rem;">￥</span>{{goods.zk_final_price.rmb}}<span style="font-size: .20rem;" v-show="goods.zk_final_price.corner!=='00'">.{{goods.zk_final_price.corner}}</span></span>
									<!--<del style="font-size: .20rem;color: #999;" >￥{{goods.reserve_price.rmb}}<span v-show="goods.reserve_price.corner!=='00'">.{{goods.reserve_price.corner}}</span></del>-->
									<span class="num">{{goods.volume}}件已售</span>
								</div>
							</div>
						</router-link>
					</ul>
				</div>
				<toast v-model="showToast" type="text" :time="800" is-show-mask position="middle">{{toast}}</toast>
	</div>
</template>

<script>
	import { XHeader ,Toast,} from 'vux'
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
				swiperOptionB: {
					// 如果需要滚动条
					slidesPerView: 5,
					preventClicksPropagation:true,
				},
				list:['消耗品','日用百货','厨房用品','收纳整理','洗护清洁','化妆品'],
				goodsList: [],
				defaultImg: 'this.src="' + require('../../../static/images/default_img.png') + '"',
				pageIndex: 1,
				limit: 10,
				noData: false,
				showToast:false,
				toast:'',
			}
		},
		methods: {
			//      获取商品列表
			getGoodsList: function() {
				const self = this
				this.$http({
					method: 'POST',
					url: '/api/index_goods',
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
            click(index){
            	var tabs=document.getElementsByClassName('tabs')
            	for(var i=0;i<tabs.length;i++){
            		if(i==index){
            			tabs[i].classList.add('c_f')
            		}else{
            			tabs[i].classList.remove(('c_f'))
            		}
            	}
            	
            },
		},
		created: function() {
            this.getGoodsList()
		},
		mounted: function() {
			var tabs=document.getElementsByClassName('tabs')
			tabs[0].classList.add('c_f')
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
	.swiper-slide{
		text-align: center;
		
	}
	.tabs.c_f{
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