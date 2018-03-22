<template>
	<div>
		<div class="top">
			<!--<div class="f24 c3 time flex">支付剩余时间 <span style="margin-left: .2rem;">20</span>分钟 <span>20</span>秒</div>-->
			<div class="price flex">
				<span class="f32 c3">订单总金额</span><span class="f28 c_m" style="margin: 0 .1rem;">￥{{order.pay_money}}</span>
				<!--<span class="f28 c9" style="display: flex;">（财宝价
				<div class="header_list_num jewel">
							<img src="../../../static/images/personCenter/jewel.png" alt="" /> 8.86
						</div>
						<div class="header_list_num gold">
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
                	     </div>）
			</span>-->
			</div>
		</div>
		<div class="main">
			<div class="list">
				<div class="flex">
					<img src="../../../static/images/personCenter/alipay.png" alt="" class="icon" />
					<p class="f28 c3">支付宝支付</p>
				</div>
				<div class="right">
					<input type="radio" name="type" value="1" id="alipay" class="typeList" checked="checked" v-model="type" />
					<div class="all">
						<img class="success" v-show="type==1" src="../../../static/images/checked.png">
						<label for="alipay" class="radio"></label>
					</div>
				</div>
			</div>
			<!--<div class="list">
				<div class="flex">
					<img src="../../../static/images/personCenter/wechat.png" alt="" class="icon" />
					<p class="f28 c3">微信支付</p>

				</div>
				<div class="up_img right">
					<input type="radio" name="type" value="2" id="weChat" v-model="type" />
					<div class="all">
						<img class="success" v-show="type==2" src="../../../static/images/checked.png">
						<label for="weChat" class="radio"></label>
					</div>
				</div>

			</div>-->
			<!--<div class="list">
				<div class="flex">
					<img src="../../../static/images/personCenter/share.png" alt="" class="icon" />
					<p class="f28 c3 flex">财宝支付
						<span class="f28 c9" style="display: flex;">（账户余额
				<div class="header_list_num jewel">
							<img src="../../../static/images/personCenter/jewel.png" alt="" /> 8.86
						</div>
						<div class="header_list_num gold">
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
                	     </div>）
			</span>
					</p>
				</div>
				<div class="right">

					<input type="radio" name="type" value="2" id="card" v-model="type" />
					<div class="all">
						<img class="success" v-show="type==2" src="../../../static/images/checked.png">
						<label for="card" class="radio"></label>
					</div>
				</div>

			</div>-->
		</div>
		<div style="margin:.4rem .26rem 0;">
			<x-button type="primary" action-type="button" class='f32' @click.native="pay()">确认支付</x-button>
		</div>
		<loading v-model="showLoading" :text="loadText"></loading>
	</div>
</template>

<script>
	import { XHeader, XInput, XButton, Group ,Loading} from 'vux'
	export default {
		name: 'Realize',
		components: {
			XHeader,
			XInput,
			XButton,
			Group,
			Loading
		},
		data() {
			return {
				alipay: '',
				type: 1,
				order:{},
				showLoading:false,
			}
		},
		methods: {
			//      支付订单
			pay() {
				this.$router.push({name:'PaySuccess',query:{}})
//				this.showLoading = true
//				this.$http.post('/api/pay',{order_id:this.order.order_id,pay_type:this.type}
//				).then((res) => {
//					if(res.data.code == '200') {
//						this.showLoading = false
//						this.$router.push({name:'PaySuccess',query:{}})
//					}else{
//						this.$vux.toast.show({
//							text: res.data.error,
//							type: 'cancel'
//						})
//						this.showLoading = false
//					}
//				}, (err) => {
//					this.showLoading = false
//					console.log(err)
//				})
			},
            
		},
		created: function() {
            this.order=JSON.parse(this.$route.query.order)
            console.log(this.order)
		},
		mounted: function() {

		}
	}
</script>

<style scoped="scoped">
	.top {
		background: white;
		margin-bottom: .2rem;
	}
	
	.time,
	.price {
		border-bottom: .01rem solid #e5e5e5;
		justify-content: center;
	}
	
	.time {
		margin: 0 .26rem;
		height: 1.06rem;
	}
	
	.price {
		height: 1.82rem;
		line-height: 1.82rem;
	}
	
	.header_list_num {
		margin: 0 .1rem;
	}
	
	.main {
		background: white;
		border-bottom: .01rem solid #e5e5e5;
	}
	
	.icon {
		width: .52rem;
		height: .52rem;
		margin-right: .3rem;
	}
	
	.list {
		padding: 0 .4rem;
		height: 1rem;
		display: flex;
		align-items: center;
		border-top: .01rem solid #e5e5e5;
		justify-content: space-between;
	}
	
	.same {
		background: #f9f9f9;
		border: none;
		height: .68rem;
		box-sizing: border-box;
		width: 5rem;
	}
	
	.pic {
		width: 100%;
		height: 100%;
	}
	
	.add {
		width: 1.28rem;
		height: 1.28rem;
		background-image: url("/static/images/upload.png");
		background-size: 100% 100%;
		border: 1px dashed #ececec;
		position: relative;
	}
	
	.add label {
		display: inline-block;
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}
	
	.vue-uploader {
		display: flex;
		align-items: flex-end;
	}
	
	.vue-uploader>input[type="file"] {
		display: none;
	}
	
	input[type="radio"] {
		display: none;
	}
	
	.all {
		position: relative;
		width: .36rem;
		height: .36rem;
		border-radius: 50%;
		border: .01rem solid #e5e5e5;
	}
	
	.radio {
		width: 100%;
		height: 100%;
		display: inline-block;
		position: absolute;
		top: 0;
		left: 0;
	}
	
	.right {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.success {
		width: .36rem;
		height: .36rem;
		position: absolute;
	}
</style>