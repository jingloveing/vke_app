<template>
	<div>
		<router-link class="right" to="/personCenter/info">
			<img src="../../../static/images/info_black.png" alt="" class="info" />
			<span class="info_num">12</span>
		</router-link>
		<div>
			<tab :line-width=2 active-color='#9a7bff' v-model="index">
				<tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
			</tab>
			<swiper v-model="index" height="1000px" :show-dots="false">
				<swiper-item v-for="(item, index) in list2" :key="index">
					<div class="tab-swiper">
						<div class="list">
							<p class="order_num">订单号：1224324325432543
								<span class="order_class" v-if="value.length==0">待付款</span>
								<span v-if="value.length!==0" class="order_class">交易关闭</span>
							    <!--<span>已发货</span>
							    <span>交易成功</span>
							    <span>待发货</span>-->
							</p>
							<router-link class="order_des" to="/personCenter/myOrder/orderDeatail">
								<img src="../../../dist/static/images/default_img.png" alt="" class="order_pic" />
								<div class="order_des_m">
									<p class="break break_two order_name">商品名称商品名称商品名称商品名称商品是的法商品名称商品名称商品名称商品名称商品是的法商品名称商品名称商品名称商品名称商品是的法律上都没佛打扫地方撒是地方撒地方撒</p>
									<p class="order_des_num">规格：24包 <span>x1</span></p>
									<p class="order_price">
										<span>￥<span class="rmb">22</span><span class="corner">.90</span></span>
										<span class="refund">退款成功</span>
									</p>
								</div>
							</router-link>
							<p class="order_total">共1件商品(含运费￥10.00)小计：<span style="font-size: .24rem;color: #F51D46;">￥<span class="rmb">22</span><span class="corner">.90</span></span>
							</p>
							<div class="order_btns">
								<span class="btn" @click="showPopupPicker=true" v-if="value.length==0">取消订单</span>
								<span class="btn" @click="showPopupPicker=true" v-if="value.length!==0">删除订单</span>
								<router-link to='/personCenter/myOrder/pay'>
									<span class="btn btn1" v-if="value.length==0">去付款</span>
								</router-link>
							</div>
							<popup-picker :data="reason" v-model="value" :show.sync="showPopupPicker" :show-cell="false" ></popup-picker>
						</div>
					</div>
				</swiper-item>
			</swiper>
		</div>
	</div>
</template>

<script>
	import { Tab, TabItem, Swiper, SwiperItem, PopupPicker,Divider, XSwitch} from 'vux'
	const list = () => ['全部', '待付款', '待发货', '待收货', '已完成']
	export default {
		components: {
			Tab,
			TabItem,
			Swiper,
			SwiperItem,
			PopupPicker,
			Divider, XSwitch
		},
		data() {
			return {
				reason:[['第一','第二','第三']],
				value:[],
				showPopupPicker: false,
				index01: 0,
				list2: list(),
				demo2: '美食',
				index: 0,
				getBarWidth: function(index) {
					return(index + 1) * 22 + 'px'
				}
			}
		},
		methods: {
			switchTabItem(index) {
				console.log('on-before-index-change', index)
				this.$vux.loading.show({
					text: 'loading'
				})
				setTimeout(() => {
					this.$vux.loading.hide()
					this.index01 = index
				}, 1000)
			},
			onItemClick(index) {
				console.log('on item click:', index)
			},
			addTab() {
				if(this.list2.length < 5) {
					this.list2 = list().slice(0, this.list2.length + 1)
				}
			},
			removeTab() {
				if(this.list2.length > 1) {
					this.list2 = list().slice(0, this.list2.length - 1)
				}
			},
			next() {
				if(this.index === this.list2.length - 1) {
					this.index = 0
				} else {
					++this.index
				}
			},
			prev() {
				if(this.index === 0) {
					this.index = this.list2.length - 1
				} else {
					--this.index
				}
			},
			change(value) {
				console.log('new Value', value)
			},
		}
	}
</script>

<style lang="less" scoped="scoped">
	@import '~vux/src/styles/1px.less';
	@import '~vux/src/styles/center.less';
	.right {
		text-align: center;
		line-height: 100%;
		position: fixed;
		right: 0rem;
		top: 0rem;
		z-index: 9999;
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
	
	.tab-swiper {
		background: white;
	}
	
	
	.order_num {
		font-size: .26rem;
		color: #333;
		display: flex;
		align-items: center;
		justify-content: space-between;
		line-height: .78rem;
		padding: 0 .26rem;
	}
	
	.order_class {
		color: #f51d46;
	}
	
	.order_des {
		padding: .15rem .26rem;
		background: #f5f5f5;
		display: flex;
		align-items: center;
	}
	
	.order_pic {
		width: 1.5rem;
		height: 1.5rem;
		margin-right: .2rem;
	}
	
	.order_des_m {
		width: calc(100% - 1.6rem);
		width: -moz-calc(100% - 1.6rem);
		width: -webkit-calc(100% - 1.6rem);
	}
	
	.order_name {
		font-size: .26rem;
		color: #333;
		line-height: .35rem;
	}
	
	.order_des_num {
		font-size: .24rem;
		color: #999;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.order_des_num>span {
		font-size: .28rem;
		color: #333;
	}
	
	.order_price {
		font-size: .24rem;color: #F51D46;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.rmb {
		font-size: .32rem;
	}
	
	.refund {
		font-size: .26rem;
		color: #F51D46;
	}
	
	.order_total {
		font-size: .24rem;
		color: #333;
		text-align: right;
		padding: 0 .26rem;
		line-height: .9rem;
	}
	
	.order_btns {
		border-top: .01rem solid #e5e5e5;
		font-size: .26rem;
		padding: 0 .26rem;
		height: .9rem;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
</style>