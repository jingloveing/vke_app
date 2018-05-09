<template>
	<div>
		<tab :line-width=2 active-color='#9a7bff' v-model="index" custom-bar-width="1.5rem" style="position: fixed;top: 1.28rem;width: 100%;background: white;z-index: 9999999;">
			<tab-item class="vux-center" v-for="(item, index) in list2" :key="index" @on-item-click="change(item,index)">{{item}}</tab-item>
		</tab>
		<scroller :on-infinite="infinite" :on-refresh="refresh" ref="myscroller" style="padding-top: 2.16rem;box-sizing: border-box;">
		<div class="tab-swiper" v-show="index==0">
			<p class="tip f28 c9">目前您的消费总计为{{total_pay}}元</p>
			<div class="list" v-for="(item,index) in dataList" :key="index">
				<h5 class="f32 c3 list-title">
					<span v-show="item.bill==1">淘宝订单</span>
					<span v-show="item.bill==2">京东</span>
					<span v-show="item.bill==3">蘑菇街</span>
					<span v-show="item.bill==4">唯品会</span>
					<span v-show="item.bill==5">享利客商城</span>
					<span v-show="item.bill==6">拼多多</span>
					<span><span class="f24">￥</span>{{item.money}}</span></h5>
				<p class="f24 c9">{{item.create_time}}</p>
			</div>
		</div>
			<div class="tab-swiper" v-show="index==1">
				<p class="tip f28 c9">目前您领券节省总计为{{total_pay}}元</p>
				<div class="list" v-for="(item,index) in dataList" :key="index">
					<h5 class="f32 c3 list-title">
					<span v-show="item.bill==1">淘宝订单</span>
					<span v-show="item.bill==2">京东</span>
					<span v-show="item.bill==3">蘑菇街</span>
					<span v-show="item.bill==4">唯品会</span>
					<span v-show="item.bill==5">享利客商城</span>
					<span v-show="item.bill==6">拼多多</span>
						<span><span class="f24">￥</span>{{item.money}}</span></h5>
					<p class="f24 c9">{{item.create_time}}</p>
				</div>
			</div>
		</scroller>
		<loading v-model="showLoading" :text="loadText"></loading>
	</div>
</template>

<script>
	import { Tab, TabItem,Loading} from 'vux'
	const list = () => ['累计消费', '累计节省']
	export default {
		components: {
			Tab,
			TabItem,
			Loading
		},
		data() {
			return {
				list2: list(),
				index: 0,
				page: 1,
				limit: 20,
				noData: false,
				dataList:[],
				total_pay:0,
				showLoading: false,
				loadText: '加载中...',
			}
		},
		methods: {
			//      获取商品分类
			getBillList: function() {
				this.$http({
					method: 'get',
					url: this.http+'/api/billList',
					params:{page:this.page,limit:this.limit,type:this.index + 1}
				}).then((res) => {
					this.showLoading = false
					if(res.data.code == '200') {
						if(res.data.data.list.length == 0) {
							this.noData = true
							this.$refs.myscroller.finishInfinite(2);
							this.total_pay=res.data.data.total_pay
						} else {
							this.dataList = this.dataList.concat(res.data.data.list)
							this.total_pay=res.data.data.total_pay
							if(this.$refs.myscroller){
								this.$refs.myscroller.finishPullToRefresh()
							}
						}
					}else{
						this.noData = true
						this.$refs.myscroller.finishInfinite(2);
						plus.nativeUI.toast("加载失败");
					}
				}, (err) => {
					this.showLoading = false
					this.noData = true
					this.$refs.myscroller.finishInfinite(2);
					plus.nativeUI.toast("加载失败");
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
						self.getBillList()
						done()
					}, 1500)
				}
			},
			refresh(done) {
				var self = this
				this.page = 1
				this.dataList=[]
				this.getBillList()
				setTimeout(function() {
					self.top = self.top - 10;
					done()
				}, 1500)
			},
			change(item, index) {
				this.showLoading = true
				this.dataList = []
				this.page=1
				this.index=index
				this.getBillList()
			},
		},
		created:function(){
			this.getBillList()
		},
		activated:function(){
//			this.getBillList()
		}
	}
</script>

<style scoped="scoped">
	.tip {
		/*height: .88rem;*/
		line-height: .88rem;
		padding: 0 .26rem;
	}
	
	.list {
		background: white;
		padding: .15rem .26rem;
		border-bottom: .01rem solid #e5e5e5;
	}
	
	.list:nth-of-type(1) {
		border-top: .01rem solid #e5e5e5;
	}
	
	.list-title {
		font-weight: normal;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: .1rem;
	}
</style>