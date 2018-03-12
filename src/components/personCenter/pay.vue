<template>
	<div>
		<router-link class="user-info" to="/personCenter/myOrder/selectAddress">
			<div class="user-left">
				<img src="../../../static/images/address_icon.png" alt="" class="icon" />
			</div>
			<div class="user-des">
				<div>
					<p class="user-info1"><span class="name">{{address.consignee}}</span><span>{{address.telephone}}</span></p>
					<p class="user-address">{{address.province}}{{address.city}}{{address.country}}{{address.address}}</p>
				</div>
				<img src="../../../static/images/gt_white.png" alt="" class="gt-icon" />
			</div>
		</router-link>
		<div class="list">
			<router-link class="order_des" to="">
				<img :src="data.small_images" alt="" class="order_pic" />
				<div class="order_des_m flex">
					<p class="break break_two order_name">{{data.product_name}}</p>
					<p class="price">
						<span>￥<span class="rmb">{{data.reserve_price.rmb}}</span><span class="corner" v-show="data.reserve_price.corner!=='00'">.{{data.reserve_price.corner}}</span></span>
						<span class="c3 f28">x{{data.number}}</span>
					</p>
				</div>
			</router-link>
			<!--<x-number :min="0" v-model="num" fillable :title="'请输入兑换数量'" class="num f28 c3"></x-number>
			<p class="f28 c3" style="line-height: .9rem;margin: 0 .26rem;border-bottom: .01rem solid #e5e5e5;">运费：￥10.00</p>-->
			<p class="f24 c3" style="line-height: .9rem;margin: 0 .26rem;text-align: right;">共{{data.number}}件商品 小计：<span style="color: #F51D46;">￥<span class="rmb">{{total.rmb}}</span><span class="corner" v-show="total.corner!=='00'">.{{total.corner}}</span></span>
			</p>
		</div>
		<div style="height: 1.2rem;"></div>
		<div class="bottom">
			<div class="f32 c3">合计：<span style="color: #F51D46;">￥<span class="rmb">{{total.rmb}}</span><span class="corner" v-show="total.corner!=='00'">.{{total.corner}}</span></span>
			</div>
			<div class="f32 pay-btn" @click="creatOrder()">
				提交订单
			</div>
		</div>
		<loading v-model="showLoading" :text="loadText"></loading>
	</div>
</template>

<script>
	import { XNumber, XSwitch, Loading } from 'vux'
	export default {
		components: {
			XNumber,
			XSwitch,
			Loading
		},
		data() {
			return {
				showLoading: false,
				loadText: '',
				type: 0,
				data: {
					reserve_price: {
						rmb: '',
						corner: ''
					},
					number: 1,
				},
				total: {
					rmb: null,
					corner: null,
				},
				address: {}

			}
		},
		methods: {
			//      默认收货地址
			getAddress: function() {
				this.$http({
					method: 'get',
					url: '/api/defaultAddress',
				}).then((res) => {
					if(res.data.code == '200') {
						this.address = res.data.data
					}
				}, (err) => {
					console.log(err)
				})
			},
			//      创建订单
			creatOrder: function() {
				this.showLoading = true
				this.$http.post('/api/createOrder', {
					type: 1,
					address_id: this.address.id,
					product_list:[{product_id:this.$route.query.id,number:this.data.number}]
				}).then((res) => {
					
					if(res.data.code == '200') {
						this.showLoading = false
						this.$router.push({
							name: 'ToPay',
							query: {
								order: JSON.stringify(res.data.data)
							}
						})
					}else{
						this.$vux.toast.show({
							text: res.data.error,
							type: 'cancel'
						})
						this.showLoading = false
					}
				}, (err) => {
					this.showLoading = false
					console.log(err)
				})
			},
		},
		created: function() {
			console.log(this.$route.query.id)
			this.data = JSON.parse(this.$route.query.data)
			this.data.number = this.$route.query.count
			var price = this.data.reserve_price.rmb + '.' + this.data.reserve_price.corner
			var total = price * this.data.number;
			this.total.rmb = Math.floor(total)
			this.total.corner = total.toFixed(2).split('.')[1]
			if(localStorage.getItem('address')) {
				this.address = JSON.parse(localStorage.getItem('address'))
			} else {
				this.getAddress()
			}
		},
		mounted: function() {

		},
		destroyed: function() {
			localStorage.removeItem('address')
		}
	}
</script>

<style scoped="scoped">
	.user-info {
		height: 1.8rem;
		background: white;
		display: flex;
		align-content: center;
		padding: .4rem .26rem .4rem 0;
		border-bottom: .14rem solid transparent;
		border-image: url(../../../static/images/personCenter/bottom_line.png) 14 round;
		box-sizing: border-box;
	}
	
	.user-left {
		width: .82rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	
	.icon {
		width: .28rem;
		height: .35rem;
	}
	
	.user-info1 {
		font-size: .28rem;
		color: #333;
		margin-bottom: .1rem;
	}
	
	.name {
		margin-right: .3rem;
	}
	
	.user-address {
		font-size: .24rem;
		color: #999;
		line-height: .32rem;
	}
	
	.gt-icon {
		width: .13rem;
		height: .24rem;
		margin-left: .26rem;
	}
	
	.user-des {
		width: calc(100% - .41rem);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.order_pic {
		width: 1.5rem;
		height: 1.5rem;
		margin-right: .2rem;
	}
	
	.order_des {
		padding: .15rem .26rem;
		background: #f5f5f5;
		display: flex;
		align-items: center;
	}
	
	.order_des_m {
		width: calc(100% - 1.6rem);
		width: -moz-calc(100% - 1.6rem);
		width: -webkit-calc(100% - 1.6rem);
		height: 1.5rem;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
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
	
	.price {
		width: 100%;
		font-size: .24rem;
		color: #F51D46;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.rmb {
		font-size: .32rem;
	}
	
	.list {
		padding-top: .16rem;
		background: white;
		margin-top: .2rem;
	}
	
	.bottom {
		width: 100%;
		position: fixed;
		bottom: 0;
		height: .96rem;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		background: white;
		border-top: .01rem solid #e5e5e5;
	}
	
	.bottom .pay-btn {
		background-color: #9A7BFF;
		color: white;
		width: 2.26rem;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: .26rem;
	}
</style>
<style type="text/css">
	.num .vux-number-selector svg {
		fill: #a3a3a3!important;
	}
	
	.num.weui-cell {
		padding: 0;
	}
	
	.num.weui-cell:before {
		border-top: none!important;
	}
	
	.num .vux-number-input {
		font-size: .32rem;
		color: #333;
	}
</style>