<template>
	<div>
		<x-header :left-options="{backText: ''}" :title="title" style="background-color: #f9f9f9;">
		</x-header>
		<div style="font-size: 0;position: fixed;z-index: 9999;top:.88rem;width: 100%;">
			<tab :line-width=3 active-color='#ff526d' v-model="index" custom-bar-width="1.2rem" bar-active-color="#ff526d">
				<tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @on-item-click="change(list2,index)" :key="index">{{item}}
				</tab-item>
			</tab>
		</div>
		<scroller :on-infinite="infinite" :on-refresh="refresh" ref="myscroller" style="margin-top: 1.76rem;">
			<div class="main_goods">
				<div>
					<ul class="goods">
						<router-link class="goods_list" v-for="(goodList1,index) in goodList1" :to="{name:'TBDetail',query:{id:goodList1.id}}" :key="index">
							<img :src="goodList1.pict_url" alt="" :onerror="defaultImg">
							<div class="content">
								<div class="des" v-text="goodList1.title">产品介绍产品介绍产品介绍产品介绍产品介绍</div>
								<!--<p style="position: relative;margin-top: .2rem;"><span class="left">送{{goodList1.volume}}元宝</span>-->
								<!--&lt;!&ndash;<span class="right">剩余<span style="color: #ffb205;">&ndash;&gt;-->
								<!--&lt;!&ndash;{{goodList1.volume}}</span>件</span>&ndash;&gt;-->
								<!--</p>-->
								<!--<div style="margin: .15rem 0rem;">
                      <span class="juan_style">
                      <span class="juan_style_left">券</span>
                      <span class="juan_style_right">{{goodList1.coupon_number}}元</span>
                    </span>
                <span class="return_num_style"  v-show="goodList1.fans_acer !==0">返{{goodList1.fans_acer}}元宝</span>
              </div>-->
								<p class="des_b" style="position: relative;margin-top: .1rem;">
									<span class="price"><span style="font-size: .2rem;">￥</span>{{goodList1.zk_final_price.rmb}}<span v-show="goodList1.zk_final_price.corner!=='00'" style="font-size: .2rem;">.{{goodList1.zk_final_price.corner}}</span></span>
									<span class="num">{{goodList1.volume}}件已售</span>
								</p>
							</div>
						</router-link>
					</ul>
				</div>
				<!--<div v-show="index==1">-->
				<!--<ul class="goods" v-for="goodList2 in goodList2">-->
				<!--<li class="goods_list">-->
				<!--<img :src="goodList2.small_images" alt="" :onerror="defaultImg">-->
				<!--<div class="content">-->
				<!--<div class="des" v-text="goodList2.title">产品介绍产品介绍产品介绍产品介绍产品介绍</div>-->
				<!--<p style="position: relative;margin-top: .2rem;"><span class="left">送{{goodList2.volume}}元宝</span>-->
				<!--&lt;!&ndash;<span class="right">剩余<span&ndash;&gt;-->
				<!--&lt;!&ndash;style="color: #ffb205;">{{goodList2.volume}}</span>件</span>&ndash;&gt;-->
				<!--</p>-->
				<!--<p class="des_b" style="position: relative;margin-top: .1rem;">-->
				<!--<span class="price"><span style="font-size: .2rem;">￥</span>{{goodList2.zk_final_price.rmb}}<span v-show="goodList2.zk_final_price.corner!=='00'" style="font-size: .2rem;">.{{goodList2.zk_final_price.corner}}</span></span>-->
				<!--<span class="num">{{goodList2.volume}}件已售</span>-->
				<!--</p>-->
				<!--</div>-->
				<!--</li>-->
				<!--</ul>-->
				<!--</div>-->
				<!--<div v-show="index==2">-->
				<!--<ul class="goods" v-for="goodList3 in goodList3">-->
				<!--<li class="goods_list">-->
				<!--<img :src="goodList3.small_images" alt="" :onerror="defaultImg">-->
				<!--<div class="content">-->
				<!--<div class="des" v-text="goodList3.title">产品介绍产品介绍产品介绍产品介绍产品介绍</div>-->
				<!--<p style="position: relative;margin-top: .2rem;"><span class="left">送{{goodList3.volume}}元宝</span>-->
				<!--&lt;!&ndash;<span class="right">剩余<span&ndash;&gt;-->
				<!--&lt;!&ndash;style="color: #ffb205;">{{goodList3.volume}}</span>件</span>&ndash;&gt;-->
				<!--</p>-->
				<!--<p class="des_b" style="position: relative;margin-top: .1rem;">-->
				<!--<span class="price"><span style="font-size: .2rem;">￥</span>{{goodList3.zk_final_price.rmb}}<span v-show="goodList3.zk_final_price.corner!=='00'" style="font-size: .2rem;">.{{goodList3.zk_final_price.corner}}</span></span>-->
				<!--<span class="num">{{goodList3.volume}}件已售</span>-->
				<!--</p>-->
				<!--</div>-->
				<!--</li>-->
				<!--</ul>-->
				<!--</div>-->
				<!--<div v-show="index==3">-->
				<!--<ul class="goods" v-for="goodList4 in goodList4">-->
				<!--<li class="goods_list">-->
				<!--<img :src="goodList4.small_images" alt="" :onerror="defaultImg">-->
				<!--<div class="content">-->
				<!--<div class="des" v-text="goodList4.title">产品介绍产品介绍产品介绍产品介绍产品介绍</div>-->
				<!--<p style="position: relative;margin-top: .2rem;"><span class="left">送{{goodList4.volume}}元宝</span>-->
				<!--&lt;!&ndash;<span class="right">剩余<span&ndash;&gt;-->
				<!--&lt;!&ndash;style="color: #ffb205;">{{goodList4.volume}}</span>件</span>&ndash;&gt;-->
				<!--</p>-->
				<!--<p class="des_b" style="position: relative;margin-top: .1rem;">-->
				<!--<span class="price"><span style="font-size: .2rem;">￥</span>{{goodList4.zk_final_price.rmb}}<span v-show="goodList4.zk_final_price.corner!=='00'" style="font-size: .2rem;">.{{goodList4.zk_final_price.corner}}</span></span>-->
				<!--<span class="num">{{goodList4.volume}}件已售</span>-->
				<!--</p>-->
				<!--</div>-->
				<!--</li>-->
				<!--</ul>-->
				<!--</div>-->
			</div>
		</scroller>

		<loading v-model="showLoading" :text="loadText"></loading>

	</div>
</template>
<script>
	import { Tab, TabItem, Swiper, SwiperItem, XHeader, Loading } from 'vux'

	const list = () => ['价格优先', '销量优先', '券额优先', '最新商品']
	export default {
		name: 'Exchange',
		components: {
			Tab,
			TabItem,
			Swiper,
			SwiperItem,
			Loading,
			XHeader
		},
		data() {
			return {

				goodList1: [],
				//        goodList2:[],
				//        goodList3:[],
				//        goodList4:[],
				defaultImg: 'this.src="' + require('../../../static/images/default_img.png') + '"',
				banner: '',
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
			}
		},
		methods: {
			//      获取粉丝福利商品列表====价格
			getList1: function(e) {
//				this.showLoading = true
				this.$http({
					method: 'get',
					url: '/api/tbStoreList',
					params: {
						type: this.$route.query.type,
						order: e,
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
							this.$refs.myscroller.finishPullToRefresh()
						}
					} else {
						
					}
				}, (err) => {
					this.showLoading = false
					console.log(err)
				})
			},
			//      //      获取粉丝福利商品列表====销量
			//      getList2:function(){
			//        this.showLoading=true
			//        this.$http({
			//          method:'POST',
			//          url:'/api/fanswelfare',
			//          data:{sorts_type:6}
			//        }).then((res)=>{
			//         if(res.data.code=='200'){
			//           this.showLoading=false
			//           const goodList2 = res.data.data.goods_list
			//           this.goodList2= goodList2
			//         }else{
			//           this.showLoading=false
			//         }
			////          console.log(priceList)
			//        },(err)=>{
			//          console.log(err)
			//        })
			//      },
			//      //      获取粉丝福利商品列表====元宝
			//      getList3:function(){
			//        this.showLoading=true
			//        this.$http({
			//          method:'POST',
			//          url:'/api/fanswelfare',
			//          data:{sorts_type:7}
			//        }).then((res)=>{
			//          if(res.data.code=='200'){
			//            this.showLoading=false
			//            const goodList3 = res.data.data.goods_list
			//            this.goodList3 = goodList3
			//          }else{
			//            this.showLoading=false
			//          }
			////          console.log(priceList)
			//        },(err)=>{
			//          console.log(err)
			//        })
			//      },
			//      //      获取粉丝福利商品列表====时间
			//      getList4:function(){
			//        this.showLoading=true
			//        this.$http({
			//          method:'POST',
			//          url:'/api/fanswelfare',
			//          data:{sorts_type:8}
			//        }).then((res)=>{
			//          const goodList4 = res.data.data.goods_list
			//          this.goodList4 = goodList4
			////          console.log(priceList)
			//        },(err)=>{
			//          console.log(err)
			//        })
			//      },
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
						self.getList1(1)
						done()
					}, 1500)
				}
			},
			refresh(done) {
				var self = this
				this.page = 1
				this.goodList1 = []
				this.getList1(1)
				setTimeout(function() {
					self.top = self.top - 10;
					done()
				}, 1500)
			},
			change(list2, index) {
				this.showLoading = true
				this.goodList1 = []
				this.page=1
				if(index == 0) {
					this.getList1(1)
				} else if(index == 1) {
					this.getList1(2)
				} else if(index == 2) {
					this.getList1(3)
				} else if(index == 3) {
					this.getList1(4)
				}
			},

		},
		mounted() {

		},
		created: function() {
			if(this.$route.query.type == 1) {
				this.title = "9.9特价"
			} else if(this.$route.query.type == 2) {
				this.title = '大券额'
			} else {
				this.title = '聚划算'
			}
			this.getList1(1);
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
		color: #ff526d;
		border: 1px solid #ff526d;
		padding: 0 3px;
		border-radius: .05rem;
	}
	
	.price {
		font-size: .32rem;
		color: #ff7171;
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
</style>