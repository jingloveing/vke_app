<template>
	<div>
		<!--<x-header :left-options="{backText: ''}" title="购物车" style="background-color: #f9f9f9;">
			<a slot="right" style="color: #9A7BFF;font-size: .32rem;" href="/personCenter/shoppingCart/editShoppingCart">编辑</a>
		</x-header>-->
		<span class="f32 c_f done-btn" @click="status=!status" v-text="status==true?'编辑':'完成'">编辑</span>
		<!--<div style="height: .88rem;"></div>-->
<!--		
				<tr v-for="(item,index) in list">
					<td><input type="checkbox" v-model="selectList" :id="item.id" :value="index" name="selectList"></td>
					<td>{{ item.name }}</td>
					<td>{{ item.price }}</td>
					<td>
						<button @click="handleReduce(index)" :disabled="item.count === 1">-</button> {{ item.count }}
						<button @click="handleAdd(index)">+</button>
					</td>
					<td><button @click="handleRemove(index)">移除</button></td>
				</tr>
		<div>总价：￥ {{ totalPrice }}</div>-->
		
		
		<div class="main">
			<figure class="empty" v-show="list.lenght==0">
					<img src="../../../static/images/empty/shop.png" alt="" />
					<figcaption class="f28">您的购物车空空如也</figcaption>
			</figure>
			<div class="goods_list" v-for="(item,index) in list">
				<div class="left">
				<input type="checkbox" v-model="selectList" :id="item.id" :value="index" name="selectList">
				</div>
				<div class="right">
					<img src="../../../dist/static/images/default_img.png" alt=""  class="pic"/>
					<div class="des">
						<p class="name f26 c3" v-show="status">商品名称 名称名称商品名称 名称名称商品名称 名称名称商品名称 名称名称商品名称 名称名称</p>
						<p class="f24 c9" v-show="status">标签型号颜色等</p>
						<div class="num" v-show="!status">
							<x-number :min="0" v-model="item.count" fillable class="num f28 c3"></x-number>
							<img src="../../../static/images/cart_del.png" alt="" class="del"/>
						</div>
						<div class="num">
							<span class="f28 c_m">
								<span class="f24">￥</span><span>88</span><span>.3</span>
								<span class="f24 c9" style="text-decoration: line-through;">￥198</span>
							</span>
							<span v-show="status">
								<span class="f28 c3">x1</span>
							</span>
						</div>
					</div>
				</div>
			</div>
			<div class="footer" v-show="list.lenght!==0">
				<div class="f24 c3" style="display: flex;">
					<input type="checkbox" v-on:click="swapCheck" v-model="checked" style="margin:0 .1rem 0 .26rem;">全选
				</div>
				<div style="display: flex;align-items: center;" v-show="status">
					<div style="margin-right: .34rem;">
					  <span class="f28 c3">总计：</span>
					  <span class="f28 c_m">
								<span class="f24">￥</span>{{ totalPrice }}</span>
							</span>
					</div>
					<router-link class="goods-btn f32" to="/personCenter/myOrder/pay">
						结算({{selectList.length}})
					</router-link>
				</div>
				<div style="display: flex;align-items: center;" v-show="!status">
					<span class="f28 c9 edit-btn">收入藏宝阁</span>
					<span class="f28 edit-btn">删除商品</span>
				</div>
			</div>
			
		</div>		
	</div>
</template>

<script>
	import { XHeader, XNumber,} from 'vux'
	export default {
		name: 'Realize',
		components: {
			XHeader,
			 XNumber,
		},
		data() {
			return {
				list: [{
						id: 1,
						name: 'iPhone 8',
						price: 1.1,
						count: 1
					},
					{
						id: 2,
						name: 'Huwei Mate10',
						price: 2.2,
						count: 1
					},
					{
						id: 3,
						name: 'Lenovo',
						price: 3.3,
						count: 1
					}
				],
				selectList: [],
				checked: false,
				status:true,
			}
		},
		methods: {
			//数量--
			handleReduce: function(index) {
				var item = this.list[index];
				if(item.count < 2) {
					return;
				}
				item.count--;
			},
			//数量++
			handleAdd: function(index) {
				var item = this.list[index];
				item.count++;
			},
			//删除商品
			handleRemove: function(index) {
				this.list.splice(index, 1);
			},
			//全选，反选
			swapCheck: function() {
				var selectList = document.getElementsByName('selectList');
				var len = selectList.length;
				if(this.checked) {
					for(var i = 0; i < len; i++) {
						var item = selectList[i];
						item.checked = false;
					}
					this.checked = false;
					this.selectList = [];
				} else {
					for(i = 0; i < len; i++) {
						item = selectList[i];
						if(item.checked === false) {
							item.checked = true;
							this.selectList.push(selectList[i].value);
						}
					}
					this.checked = true;

				}
				},
			},
			created: function() {

			},
			computed:{
				//动态计算商品总价
				totalPrice: function() {
					var total = 0;
					for(var i = 0, len = this.selectList.length; i < len; i++) {
						var index = this.selectList[i];
						var item = this.list[index];
						if(item) {
							total += item.price * item.count;
						} else {
							continue;
						}

					}
					return total.toFixed(2).replace(/\B(?=(\d{3})+$)/g, ',');
				}
			}
		}
</script>

<style scoped="scoped">
	.done-btn{
		position: fixed;
		top: .2rem;
		right: .26rem;
		z-index: 999999;
	}
	.goods_list{
		height: 2.28rem;
		display: flex;
		align-items: center;
		background: white;
		border-top: .01rem solid #e5e5e5;
	}
	.goods_list .left{
		width: .94rem;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.goods_list .right{
		width: calc(100% - .94rem);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-right: .46rem;
		box-sizing: border-box;
	}
	.goods_list .right .name{
		word-wrap: break-word;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
	}
  .goods_list .pic{
  	width: 1.6rem;
  	height: 1.6rem;
  	margin-right: .2rem;
  }
  .des{
  	line-height: .35rem;
  	width: calc(100% - 1.86rem);
  	height: 1.6rem;
  	display: flex;
  	flex-direction: column;
  	justify-content: space-between;
  }
  .des .num{
  	display: flex;
  	align-items: center;
  	justify-content: space-between;
  }
  .footer{
  	position: fixed;
  	bottom: 0;
  	width: 100%;
  	height: .96rem;
  	background: white;
  	border-top: .01rem solid #E5E5E5;
  	display: flex;
  	align-items: center;
  	justify-content: space-between;
  }
  .goods-btn{
  	width: 2.26rem;
  	height: .96rem;
  	color: white;
  	background: #9A7BFF;
  	display: flex;align-items: center;
  	justify-content: center;
  }
  input[type="checkbox"] {
  -webkit-appearance: none;  /*清除复选框默认样式*/
  background: url(../../../static/images/no_checked.png) no-repeat;   /*复选框的背景图，就是上图*/
  background-size: 100% 100%;
  height: .36rem;   /*高度*/
  vertical-align: middle;
  width: .36rem;
}
input[type="checkbox"]:checked {
  background: url(../../../static/images/checked.png) no-repeat; 
   background-size: 100% 100%;
}
.del{
	width: .38rem;
	height: .34rem;
}
.edit-btn{
	display: inline-block;
	width: 2.04rem;
	height: .7rem;
	border: .01rem solid #e5e5e5;
	border-radius: .06rem;
	display: flex;
	align-items: center;
	justify-content: center;
}
.edit-btn:nth-child(2){
	margin: 0 .4rem 0 .2rem;
	background-color: #F51D46;
	color: white;
}
</style>