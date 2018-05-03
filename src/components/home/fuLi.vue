<template>
	<div>
		<x-header :left-options="{backText: ''}" :title="title" style="background-color: #f9f9f9;">
		</x-header>
		<scroller :on-infinite="infinite" :on-refresh="refresh" ref="myscroller" style="margin-top: .88rem;">
			<div style="width: 100%;">
			<div style="height: 1.8rem;">
				<img :src="image" alt="" style="width: 100%;height: 100%;" :onerror="defaultImg"/>
			</div>
		</div>
		<div style="font-size: 0;width: 100%;">
			<tab :line-width=3 active-color='#f51d46' v-model="index" custom-bar-width="1.2rem" bar-active-color="#f51d46">
				<tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @on-item-click="change(list2,index)" :key="index">{{item}}
				</tab-item>
			</tab>
		</div>
			<div class="main_goods">
				<div>
					<ul class="goods">
						<router-link class="goods_list" v-for="(goodList1,index) in goodList1" :to="{name:'TBDetail',query:{id:goodList1.id,type:4}}" :key="index">
							<img :src="goodList1.pict_url" alt="" :onerror="defaultImg">
							<div class="content">
								<div class="des" v-text="goodList1.title">产品介绍产品介绍产品介绍产品介绍产品介绍</div>
								<!--<p style="position: relative;margin-top: .2rem;"><span class="left">送{{goodList1.volume}}元宝</span>
								<span class="right">剩余<span style="color: #ffb205;">
								{{goodList1.volume}}</span>件</span>
								</p>-->
								<div style="margin: .15rem 0rem;">
                      <span class="juan_style" style="margin-right: .04rem;">
                      <span class="juan_style_left">券</span>
                      <span class="juan_style_right">{{goodList1.coupon_number}}元</span>
                    </span>
               <div class="f20 income" v-show="goodList1.share_commission!=0">最高分享赚：{{goodList1.share_commission}}元</div>
              </div>
								<p class="des_b" style="position: relative;margin-top: .1rem;">
									<span class="price"><span style="font-size: .2rem;">￥</span>{{goodList1.zk_final_price.rmb}}<span v-show="goodList1.zk_final_price.corner!=='00'" style="font-size: .2rem;">.{{goodList1.zk_final_price.corner}}</span></span>
									<span class="num">{{goodList1.volume}}件已售</span>
								</p>
							</div>
						</router-link>
					</ul>
				</div>
			</div>
		</scroller>

		<loading v-model="showLoading" :text="loadText"></loading>

	</div>
</template>
<script>
	import { Tab, TabItem, Swiper, XHeader, Loading } from 'vux'
//  const url = ''
	const list = () => ['价格优先', '销量优先', '券额优先', '最新商品']
	export default {
		name: 'Exchange',
		components: {
			Tab,
			TabItem,
			Swiper,
			Loading,
			XHeader
		},
		data() {
			return {
                image:'',
				goodList1: [],
				defaultImg: 'this.src="' + require('../../../static/images/default_img.png') + '"',
				list2: list(),
				demo2: '全部',
				index: 0,
				showLoading: false,
				loadText: '加载中...',
				getBarWidth: function(index) {
					return(index + 1) * 22 + 'px'
				},
				title: '',
				order: 1,
				page: 1,
				limit: 20,
				noData: false,
				type:'',
			}
		},
		methods: {
			//      获取轮播图
			getBannerList: function() {
				this.$http({
					method: 'get',
					url: this.http+'/api/indexBanner',
					params:{type:this.type}
				}).then((res) => {
					if(res.data.code == '200') {
						this.image = res.data.data.image
					}
				}, (err) => {
					console.log(JSON.stringify(err))
				})
			},
			//      获取粉丝福利商品列表====价格
			getList1: function() {
//				this.showLoading = true
				this.$http({
					method: 'get',
					url: this.http+'/api/tbStoreList',
					params: {
						type: this.$route.query.type,
						order: this.order,
						page: this.page,
						limit: this.limit
					}
				}).then((res) => {
					this.showLoading = false
					if(res.data.code == '200') {
						if(res.data.data.list.length == 0) {
							this.noData = true
							this.$refs.myscroller.finishInfinite(2);
						} else {
							this.goodList1=this.goodList1.concat(res.data.data.list)
							if(this.$refs.myscroller){
								this.$refs.myscroller.finishPullToRefresh()
							}
						}
					} else {
						
					}
				}, (err) => {
					this.showLoading = false
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
						self.page += 1
						self.getList1()
						done()
					}, 1500)
				}
			},
			refresh(done) {
				var self = this
				this.page = 1
				this.goodList1 = []
				self.getList1()
				setTimeout(function() {
					self.top = self.top - 10;
					done()
				}, 1500)
			},
			change(list2, index) {
				this.showLoading = true
				this.goodList1 = []
				this.page=1
				this.order=index+1
				this.getList1()
			},

		},
		mounted() {

		},
		created: function() {
			if(this.$route.query.type == 1) {
				this.title = "9.9特价"
				this.type=5
			} else if(this.$route.query.type == 2) {
				this.title = '大券额'
				this.type=6
			} else {
				this.title = '聚划算'
				this.type=7
			}
			this.getList1();
			this.getBannerList()
			//      this.getList2();
			//      this.getList3();
			//      this.getList4();
		}
	}
</script>
<style lang="less" scoped>
	@import '~vux/src/styles/1px.less';
	@import '~vux/src/styles/center.less';
	ul {
		font-size: 0;
		overflow: hidden;
	}
	
	.tab-swiper {
		background-color: #fff;
		height: 100px;
	}
	
	.main {
		margin-bottom: 1.06rem;
	}
	
	.goods {
		overflow: hidden;
	}
	
	.goods_list {
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
		padding: .15rem;
	}
	
	.des {
		font-size: .28rem;
		color: #333;
		line-height: .4rem;
		word-wrap: break-word;
		-webkit-line-clamp: 1;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	
	.left {
		font-size: .20rem;
		color: #f51d46;
		border: 1px solid #f51d46;
		padding: 0 3px;
		border-radius: .05rem;
	}
	
	.price {
		font-size: .32rem;
		color: #f51d46;
	}
	
	.num {
		font-size: .24rem;
		color: #999;
		position: absolute;
		right: 0;
		bottom: 0;
	}
	
	.right {
		position: absolute;
		right: 0;
		font-size: .24rem;
		color: #999999;
	}
	.income {
		height: .32rem;
		/*line-height: .32rem;*/
		display: inline-block;
		padding: 0 .12rem;
		border-radius: 1rem;
		color: white;
		background: -webkit-linear-gradient(left, #f51d46, #fe6d13);
		background: -o-linear-gradient(left, #f51d46, #fe6d13);
		background: -moz-linear-gradient(left, #f51d46, #fe6d13);
		background: linear-gradient(left, #f51d46, #fe6d13);
	}
</style>