<template>
	<div>
		<div class="nav-header">
				<!--<img src="../../../static/images/lt_white.png" alt="" />-->
				<x-icon type="ios-arrow-left" size="30" style="fill: #333;width: .91rem;" @click="goback()"></x-icon>
				<div class="search">
					<img src="../../../static/images/personCenter/search_img.png" alt="" class="search_icon" />
					<span>搜索店内商品</span>
				</div>
				<div class="nav-header-right">
					<router-link to="/brandSite/storeIndex/storeClassify" class="classify">
						<img src="../../../static/images/classify_black_icon.png" alt="" />
						<span style="font-size: .18rem;color: #333;">分类</span>
					</router-link>
					<router-link to="" class="share">
						<img src="../../../static/images/share_black_icon.png" alt="" />
						<span style="font-size: .18rem;color: #333;">分享</span>
					</router-link>
				</div>
			</div>
			<div>
				<tab :line-width=0 active-color='#9a7bff' v-model="index2" custom-bar-width="1.3rem">
							<tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
						</tab>
						<div>
							<div class="main_goods">
								<ul class="goods">
									<router-link tag="li" v-for="(goods,index) in goodsList" class="goods_list" to="" :key="index">
										<img :src="goods.pict_url" alt="" :onerror="defaultImg">
										<div class="content">
											<div class="des">{{goods.title}}</div>
											<div style="margin: .15rem 0rem;display: flex;align-items: center;">
												<div>
													<span class="juan_style">
                                                    <span class="juan_style_left">券</span>
													<span class="juan_style_right">{{goods.coupon_number}}元</span>
													</span>
													<span class="return_num_style" v-show="goods.fans_acer !==0">返{{goods.fans_acer}}元宝</span>
												</div>
												<img src="../../../static/images/personCenter/gold_acer.png" alt="" style="width: .22rem;height: .22rem;margin: 0 .1rem;" />
												<span style="color: #fdc71b;font-size: .22rem;">2.62</span>
											</div>
											<div class="des_b">
												<div>
													<span class="price"><span style="font-size: .2rem;">￥</span>{{goods.zk_final_price.rmb}}<span style="font-size: .20rem;" v-show="goods.zk_final_price.corner!=='00'">.{{goods.zk_final_price.corner}}</span></span>
													<!--<del style="font-size: .20rem;color: #999;" >￥{{goods.reserve_price.rmb}}<span v-show="goods.reserve_price.corner!=='00'">.{{goods.reserve_price.corner}}</span></del>-->
													<span class="num">{{goods.volume}}件已售</span>
												</div>
												<x-icon type="ios-heart" size="18" style="fill: #9a7cff;"></x-icon>
											</div>
										</div>
									</router-link>
								</ul>
							</div>
						</div>
			</div>
	</div>
</template>

<script>
	import { Tab, TabItem, Swiper, SwiperItem, PopupPicker, Divider, XSwitch } from 'vux'
	const list = () => ['首页', '全部商品', '品牌现场']
	export default {
		name: 'StoreIndex',
		components: {
			Tab,
			TabItem,
			Swiper,
			SwiperItem,
			PopupPicker,
			Divider,
			XSwitch
		},
		data() {
			return {
				demoList: [],
				defaultImg: 'this.src="' + require('../../../static/images/default_img.png') + '"',
				list1: list(),
				demo1: '首页',
				list2: ['综合', '热门', '新品', '价格'],
				demo2: '综合',
				index1: 0,
				index2: 0,
				getBarWidth: function(index) {
					return(index + 1) * 22 + 'px'
				},
				pageIndex: 1,
				limit: 9,
				goodsList: []
			}
		},
		methods: {
			getGoodsList: function() {
				const self = this
				this.$http({
					method: 'POST',
					url: this.http+'/api/index_goods',
					data: {
						page: this.pageIndex,
						limit: this.limit
					}
				}).then((res) => {
					if(res.data.code == '200') {
						if(res.data.data.goods.length == 0) {

						} else {
							this.goodsList = this.goodsList.concat(res.data.data.goods)
						}
					}
				}, (err) => {
					console.log(err)
				})
			},
			goback() {
				history.back(-1);
			}

		},
		mounted: function() {

		},
		created: function() {
			this.getGoodsList()
		}
	}
</script>

<style scoped="scoped">
	.nav-header {
		display: flex;
		align-items: center;
		height: .88rem;
		background: #f9f9f9;
	}
	
	.nav-header-right {
		width: 1.89rem;
		height: .64rem;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	
	.search {
		width: 4.70rem;
		height: .64rem;
		line-height: .64rem;
		font-size: .28rem;
		color: #c7c7c7;
		text-align: left;
		border-radius: .5rem;
		padding: 0 .2rem;
		box-sizing: content-box;
		background: #f2f2f2;
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
	
	.share {}
	
	.classify img,
	.share img {
		width: .34rem;
		height: .34rem;
	}
	
	
	.tab-swiper {
		font-size: 0;
	}
	
	.goods,{
		overflow: hidden;
	}
	.goods_list{
		font-size: 0;
		background-color: white;
		list-style: none;
		float: left;
		width: 50%;
		box-sizing: border-box;
		border-bottom: .1rem solid #f4f4f4;
	}
	.goods_list img {
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
</style>