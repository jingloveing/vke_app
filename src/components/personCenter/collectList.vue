<template>
	<div>
		<!--<x-header :left-options="{backText: ''}" style="padding: 2px 0 ;background-color: white;border-bottom: 1px solid #e1e1e1;position: fixed;z-index: 10;width: 100%;top: 0;">9.9专区</x-header>-->
		<!--<div style="height: .88rem;"></div>-->
		<tab :line-width=2 active-color='#9a7bff' v-model="index" custom-bar-width=".8rem">
			<tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list" @click="demo2 = item" :key="index">{{item}}</tab-item>
		</tab>
		<scroller :on-infinite="infinite" :on-refresh="refresh" ref="myscroller" style="margin-top: 88px;">
			<div class="goods_list" v-show="index==0">
				<ul class="goods">
					<li v-for="list in goodsList">
						<router-link to="">
							<img :src="list.pict_url" alt="" class="pic" :onerror="defaultImg">
						</router-link>
						<div class="content">
							<p class="title" v-text="list.title">产品标题产品标题</p>
							<div>
								<div style="margin-bottom: .1rem;">
									<span class="type taobao">淘宝</span>
									<!--<span class="type JD">京东</span>
                <span class="type mogujie">蘑菇街</span>
                <span class="type vipshop">唯品会</span>
                <span class="type self">自营</span>-->
								</div>
								<div style="display: flex;justify-content: space-between;align-items: center;">
									<div>
										<span class="new_num f28"><span class="f24">￥</span>{{list.zk_final_price.rmb}}<span v-show="list.zk_final_price.corner!=='00'" class="f24">.{{list.zk_final_price.corner}}</span></span>
										<del class="old_num f24">￥{{list.reserve_price.rmb}}<span v-show="list.reserve_price.corner!=='00'">.{{list.reserve_price.corner}}</span></del>
									</div>
									<div @click="del">
										<img src="../../../static/images/collect_del.png" alt="" style="width: .32rem;height: .32rem;" />
									</div>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div v-show="index==1" style="background: white;">
				<ul class="brand">
					<li v-for="i in 4">
						<img src="../../../dist/static/images/default_img.png" alt="" :onerror="defaultImg" class="brand-pic"/>
						<div class="brand-main">
							<div class="brand-main-left">
									<p class="f32 c3" style="margin-bottom: .2rem;width:5rem;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">品牌名称品牌名称品牌名称品牌名称名称品牌名称品牌名称</p>
									<span class="type taobao">淘宝</span>
									<!--<span class="type JD">京东</span>
                <span class="type mogujie">蘑菇街</span>
                <span class="type vipshop">唯品会</span>
                <span class="type self">自营</span>-->
							</div>
							<div style="line-height: 1rem;padding:0 .26rem;" @click="del">
								<img src="../../../static/images/collect_del.png" alt="" style="width: .32rem;height: .32rem;vertical-align: middle;" />
							</div>
						</div>
					</li>
				</ul>
			</div>
		</scroller>
		<loading v-model="showLoading" :text="loadText"></loading>
		<toast v-model="showPositionValue" type="text" :time="800" is-show-mask :text="text" :position="position"></toast>
		<!--<div class="toTop" @click="toTop()"><img src="/static/images/top.png" alt="" style="width: .35rem;height: .15rem;display: block;margin: .2rem auto .1rem;"><span>顶部</span></div>-->

	</div>
</template>
<script>
	import { Tab, TabItem, Loading, Toast } from 'vux'
	const list = () => ['宝贝', '品牌']

	export default {
		name: 'subject',
		components: {
			Tab,
			TabItem,
			Loading,
			Toast
		},
		data() {
			return {
				list: list(),
				demo2: '宝贝',
				sortsType: [],
				goodsList: [],
				type_id: '',
				index: 0,
				sorts: '',
				showLoading: false,
				loadText: '加载中...',
				getBarWidth: function(index) {
					return(index + 1) * 22 + 'px'
				},
				pageIndex: 1,
				limit: 10,
				noData: false,
				defaultImg: 'this.src="' + require('../../../static/images/default_img.png') + '"',
				position: 'middle',
				showPositionValue: false,
				text: ''

			}
		},
		methods: {
			//      9.9专区商品====19.9专区商品
			getGoods: function() {
				this.$http({
					method: 'POST',
					url: '/api/nine',
					data: {
						sort: this.sort,
						type_id: this.type_id,
						page: this.pageIndex,
						limit: this.limit
					}
				}).then((res) => {
					if(res.data.code == '200') {
						if(res.data.data.nine_products.length == 0) {
							this.noData = true
							this.$refs.myscroller.finishInfinite(2);
						} else {
							this.goodsList = this.goodsList.concat(res.data.data.nine_products)
							this.$refs.myscroller.finishPullToRefresh()
						}
					} else if(res.data.code == '400') {
						//            this.$vux.toast.show({
						//              type:"cancel",
						//              text:res.data.message
						//            })
					}
				}, (err) => {
					console.log(err)
				})
			},
			//      toTop(){
			//        document.documentElement.scrollTop = document.body.scrollTop =0;
			//      },
			infinite(done) {
				if(this.index==0){
					if(this.noData) {
					setTimeout(() => {
						this.$refs.myscroller.finishInfinite(2);
					})
					return;
				} else {
					let self = this; //this指向问题
					setTimeout(() => {
						self.pageIndex += 1
						self.getGoods()
						done()
					}, 1500)
				}
				}else{
					this.$refs.myscroller.finishInfinite(2);
				}
				
			},
			refresh(done) {
				var self = this
				this.pageIndex = 1
				this.goodsList = []
				this.getGoods()
				setTimeout(function() {
					self.top = self.top - 10;
					done()
				}, 1500)
			},
			del() {
				this.text = "取消收藏成功"
				this.showPositionValue = true
			}
		},
		mounted() {

		},
		created: function() {
			this.type_id = this.$route.query.type_id
			this.getGoods()
		}
	}
</script>
<style scoped>
	ul {
		font-size: 0;
		overflow: hidden;
	}
	
	.goods {
		background-color: white;
	}
	
	.goods li {
		height: 2.4rem;
		border-bottom: 1px solid #f4f4f4;
		display: flex;
		padding: 0 .26rem 0 0;
		margin-left: .26rem;
		align-items: center;
	}
	
	.pic {
		width: 1.88rem;
		height: 1.88rem;
		float: left;
	}
	
	.content {
		height: 1.88rem;
		width: calc(100% - 1.88rem - .22rem);
		padding-left: .22rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.title {
		font-size: .3rem;
		color: #333333;
		height: .8rem;
		line-height: .4rem;
		word-wrap: break-word;
		-webkit-line-clamp: 2;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	
	.des {
		height: .38rem;
		overflow: hidden;
		font-size: .24rem;
		color: #ff425f;
	}
	
	.new_num {
		color: #F51D46;
	}
	
	.old_num {
		color: #999999;
		margin-left: .1rem;
	}
	
	.type {
		font-size: .22rem;
		border-radius: .06rem;
		display: inline-block;
		line-height: .28rem;
		height: .28rem;
		text-align: center;
		padding: 0 .1rem;
	}
	
	.taobao {
		color: #ff8000;
		border: .01rem solid #ff8000;
	}
	
	.JD {
		color: #f73515;
		border: .01rem solid #f73515;
	}
	
	.mogujie {
		color: #ff0077;
		border: .01rem solid #ff0077;
	}
	
	.vipshop {
		color: #e2007e;
		border: .01rem solid #e2007e;
	}
	
	.self {
		color: #9a7bff;
		border: .01rem solid #9a7bff;
	}
	.brand{
		margin-left: .26rem;
	}
	.brand li{
		border-top: .01rem solid #e5e5e5;
		height: 1.5rem;
		display: flex;
		align-items: center;
	}
	.brand li:nth-child(1){
		border: none;
	}
	.brand-pic{
		width: 1rem;
		height: 1rem;
	}
	.brand-main{
		width: calc(100% - 1rem - .22rem);
    padding-left: .22rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
	}
</style>