<template>
	<div>
		<div class="header">
			<p class="f24">押运财宝总值</p>
			<p style="font-size: .52rem;display: flex;justify-content: center;align-items: center;">{{data.acer}}<span style="font-size: .4rem;" v-show="data.type"><span v-show="data.type==1">铜币</span>
				<span v-show="data.type==2">银</span>
				<span v-show="data.type==3">金</span>
				<span v-show="data.type==4">钻</span>
				<span v-show="data.type==5">皇冠</span>
				</span>
			</p>
		</div>
		<tab :line-width=2 active-color='#9a7bff' v-model="index" custom-bar-width="1rem">
			<tab-item class="vux-center" v-for="(item, index) in list2" @on-item-click="change(item,index)" :key="index">{{item}}</tab-item>
		</tab>
		<scroller :on-infinite="infinite" :on-refresh="refresh" ref="myscroller" style="margin-top: 4.44rem;">
			<div class="tab-swiper" v-show="index==0">
				<div class="title">
					<span class="f30 c3">帮众贡献押运中财宝总计</span>
					<div class="header_list_num king" v-show="totalAcer.type==5">
						<img src="../../../static/images/personCenter/king.png" alt="" />{{totalAcer.acer}}
					</div>
					<div class="header_list_num jewel" v-show="totalAcer.type==4">
						<img src="../../../static/images/personCenter/jewel.png" alt="" />{{totalAcer.acer}}
					</div>
					<div class="header_list_num gold" v-show="totalAcer.type==3">
						<img src="../../../static/images/personCenter/gold_acer.png" alt="" /> {{totalAcer.acer}}
					</div>
					<div class="header_list_num silver" v-show="totalAcer.type==2">
						<img src="../../../static/images/personCenter/silver.png" alt="" /> {{totalAcer.acer}}
					</div>
					<div class="header_list_num coppers" v-show="totalAcer.type==1">
						<img src="../../../static/images/personCenter/coppers.png" alt="" />{{totalAcer.acer}}
					</div>
					<div class="header_list_num coppers" v-show="totalAcer.type==''">0</div>
				</div>
				<div>
					<div class="list" v-for="(item,index) in dataList" :key="index">
						<div style="margin-bottom: .1rem;">
							<span class="f22 c9">{{item.create_time}}</span>
						</div>
						<div class="f28 c6">
							<span style="font-family: arial;">帮众贡献一单，财宝收益正在镖局押运中。</span>
							<div class="header_list_num king" v-show="item.transport_acer.type==5">
								<img src="../../../static/images/personCenter/king.png" alt="" />{{item.transport_acer.acer}}
							</div>
							<div class="header_list_num jewel" v-show="item.transport_acer.type==4">
								<img src="../../../static/images/personCenter/jewel.png" alt="" />{{item.transport_acer.acer}}
							</div>
							<div class="header_list_num gold" v-show="item.transport_acer.type==3">
								<img src="../../../static/images/personCenter/gold_acer.png" alt="" /> {{item.transport_acer.acer}}
							</div>
							<div class="header_list_num silver" v-show="item.transport_acer.type==2">
								<img src="../../../static/images/personCenter/silver.png" alt="" /> {{item.transport_acer.acer}}
							</div>
							<div class="header_list_num coppers" v-show="item.transport_acer.type==1">
								<img src="../../../static/images/personCenter/coppers.png" alt="" />{{item.transport_acer.acer}}
							</div>
						</div>
						<p class="f22 c9">预计押运完成时间 <span style="font-family: arial;">{{item.income_time}}</span></p>
					</div>
				</div>

			</div>

			<div class="tab-swiper" v-show="index==1">
				<div class="title">
					<span class="f30 c3">京东订单押运中财宝总计</span>
					<div class="header_list_num king" v-show="totalAcer.type==5">
						<img src="../../../static/images/personCenter/king.png" alt="" />{{totalAcer.acer}}
					</div>
					<div class="header_list_num jewel" v-show="totalAcer.type==4">
						<img src="../../../static/images/personCenter/jewel.png" alt="" />{{totalAcer.acer}}
					</div>
					<div class="header_list_num gold" v-show="totalAcer.type==3">
						<img src="../../../static/images/personCenter/gold_acer.png" alt="" /> {{totalAcer.acer}}
					</div>
					<div class="header_list_num silver" v-show="totalAcer.type==2">
						<img src="../../../static/images/personCenter/silver.png" alt="" /> {{totalAcer.acer}}
					</div>
					<div class="header_list_num coppers" v-show="totalAcer.type==1">
						<img src="../../../static/images/personCenter/coppers.png" alt="" />{{totalAcer.acer}}
					</div>
				</div>
				<div>
					<div class="list" v-for="(item,index) in dataList" :key="index">
						<div style="margin-bottom: .1rem;">
							<span class="f22 c9">{{item.create_time}}</span>
						</div>
						<div class="f28 c6">
							<span style="font-family: arial;">订单号 <span style="font-family: arial;">{{item.order_sn}}</span>的财宝收益正在镖局押运中</span>
							<div class="header_list_num king" v-show="item.transport_acer.type==5">
								<img src="../../../static/images/personCenter/king.png" alt="" />{{item.transport_acer.acer}}
							</div>
							<div class="header_list_num jewel" v-show="item.transport_acer.type==4">
								<img src="../../../static/images/personCenter/jewel.png" alt="" />{{item.transport_acer.acer}}
							</div>
							<div class="header_list_num gold" v-show="item.transport_acer.type==3">
								<img src="../../../static/images/personCenter/gold_acer.png" alt="" /> {{item.transport_acer.acer}}
							</div>
							<div class="header_list_num silver" v-show="item.transport_acer.type==2">
								<img src="../../../static/images/personCenter/silver.png" alt="" /> {{item.transport_acer.acer}}
							</div>
							<div class="header_list_num coppers" v-show="item.transport_acer.type==1">
								<img src="../../../static/images/personCenter/coppers.png" alt="" />{{item.transport_acer.acer}}
							</div>
						</div>
						<p class="f22 c9">预计押运完成时间 <span style="font-family: arial;">02-01</span></p>
					</div>
				</div>
			</div>

			<div class="tab-swiper" v-show="index==2">
				<div class="title">
					<span class="f30 c3">蘑菇街订单押运中财宝总计</span>
					<div class="header_list_num king" v-show="totalAcer.type==5">
						<img src="../../../static/images/personCenter/king.png" alt="" />{{totalAcer.acer}}
					</div>
					<div class="header_list_num jewel" v-show="totalAcer.type==4">
						<img src="../../../static/images/personCenter/jewel.png" alt="" />{{totalAcer.acer}}
					</div>
					<div class="header_list_num gold" v-show="totalAcer.type==3">
						<img src="../../../static/images/personCenter/gold_acer.png" alt="" /> {{totalAcer.acer}}
					</div>
					<div class="header_list_num silver" v-show="totalAcer.type==2">
						<img src="../../../static/images/personCenter/silver.png" alt="" /> {{totalAcer.acer}}
					</div>
					<div class="header_list_num coppers" v-show="totalAcer.type==1">
						<img src="../../../static/images/personCenter/coppers.png" alt="" />{{totalAcer.acer}}
					</div>
				</div>
				<div>
					<div class="list" v-for="(item,index) in dataList" :key="index">
						<div style="margin-bottom: .1rem;">
							<span class="f22 c9">{{item.create_time}}</span>
						</div>
						<div class="f28 c6">
							<span style="font-family: arial;">订单号 <span style="font-family: arial;">{{item.order_sn}}</span>的财宝收益正在镖局押运中</span>
							<div class="header_list_num king" v-show="item.transport_acer.type==5">
								<img src="../../../static/images/personCenter/king.png" alt="" />{{item.transport_acer.acer}}
							</div>
							<div class="header_list_num jewel" v-show="item.transport_acer.type==4">
								<img src="../../../static/images/personCenter/jewel.png" alt="" />{{item.transport_acer.acer}}
							</div>
							<div class="header_list_num gold" v-show="item.transport_acer.type==3">
								<img src="../../../static/images/personCenter/gold_acer.png" alt="" /> {{item.transport_acer.acer}}
							</div>
							<div class="header_list_num silver" v-show="item.transport_acer.type==2">
								<img src="../../../static/images/personCenter/silver.png" alt="" /> {{item.transport_acer.acer}}
							</div>
							<div class="header_list_num coppers" v-show="item.transport_acer.type==1">
								<img src="../../../static/images/personCenter/coppers.png" alt="" />{{item.transport_acer.acer}}
							</div>
						</div>
						<p class="f22 c9">预计押运完成时间 <span style="font-family: arial;">02-01</span></p>
					</div>
				</div>
			</div>
		</scroller>
	</div>
</template>

<script>
	import { Tab, TabItem, } from 'vux'
	const list = () => ['帮众', '京东', '蘑菇街']
	const url = 'http://xlk.dxvke.com'
//	const url = ''
	export default {
		components: {
			Tab,
			TabItem,
		},
		data() {
			return {
				list2: list(),
				index: 0,
				page: 1,
				limit: 10,
				noData: false,
				type: 1,
				data: {
					type: 0,
					acer: 0
				},
				dataList:[],
				totalAcer:{
					acer:0,
					type:0
				}
			}
		},
		methods: {
			//      获取押运财宝总值
			getCountAcer: function() {
				this.$http({
					method: 'get',
					url: url + '/api/transportAcer'
				}).then((res) => {
					if(res.data.code == '200') {
						this.data = res.data.data
					}
				}, (err) => {
					console.log(err)
				})
			},
			//      获取押运列表
			getList: function() {
				this.$http({
					method: 'get',
					url: url + '/api/transportList',
					params: {
						page: this.page,
						limit: this.limit,
						type: this.type
					}
				}).then((res) => {
					if(res.data.code == '200') {
						this.totalAcer=res.data.data.totalAcer
						if(res.data.data.list.length == 0) {
							this.noData = true
							this.$refs.myscroller.finishInfinite(2);
						} else {
							this.dataList = this.dataList.concat(res.data.data.list)
							this.$refs.myscroller.finishPullToRefresh()
						}
					} else {
						this.noData = true
						this.$refs.myscroller.finishInfinite(2);
					}
				}, (err) => {
					this.noData = true
					this.$refs.myscroller.finishInfinite(2);
					console.log(err)
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
						self.getList()
						done()
					}, 1500)
				}
			},
			refresh(done) {
				var self = this
				this.page = 1
				this.dataList = {
					list: [],
					totalAcer: {
						type: 0,
						acer: 0
					}
				}
				this.getList()
				setTimeout(function() {
					self.top = self.top - 10;
					done()
				}, 1500)
			},
			change(item, index) {
				this.page=1
				this.showLoading = true
				this.type = index + 1
				this.dataList =[],
				this.totalAcer={}
				this.getList()
			},
		},
		created: function() {
			this.getCountAcer()
			this.getList()
		}
	}
</script>

<style scoped="scoped">
	.header {
		text-align: center;
		width: 100%;
		height: 2.68rem;
		background-image: url("../../../static/images/personCenter/underWay_bd.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		color: white;
		padding-top: .7rem;
		box-sizing: border-box;
	}
	
	.title {
		height: 1.14rem;
		background: white;
		display: flex;
		align-items: center;
		padding: 0 .26rem;
		margin: .1rem 0;
		border-bottom: .01rem solid #e5e5e5;
		border-top: .01rem solid #e5e5e5;
	}
	
	.header_list_num {
		font-size: .32rem;
		color: #FFB034;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.header_list_num>img {
		width: .22rem;
		height: .22rem;
		margin-right: .06rem;
		margin-left: .1rem;
	}
	
	.jewel {
		color: #35a8ed;
	}
	
	.gold {
		color: #fdc71b;
	}
	
	.silver {
		color: #999;
	}
	
	.coppers {
		color: #ffb034;
	}
	
	.list {
		background: white;
		padding: .26rem .26rem .2rem;
		border-bottom: .01rem solid #e5e5e5;
	}
	
	.list:nth-of-type(1) {
		border-top: .01rem solid #e5e5e5;
	}
	
	.list>div {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>