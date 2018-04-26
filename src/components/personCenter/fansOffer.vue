<template>
	<div>
		<scroller :on-infinite="infinite" :on-refresh="refresh" ref="myscroller" style="margin-top: .88rem;">
			<div class="header">
				<p class="f24">帮众贡献财宝总值</p>
				<p style="font-size: .52rem;display: flex;justify-content: center;align-items: center;">{{totalAcer.acer}}<span style="font-size: .4rem;">
					<span v-show="totalAcer.type==1">铜币</span>
					<span v-show="totalAcer.type==2">银</span>
					<span v-show="totalAcer.type==3">金</span>
					<span v-show="totalAcer.type==4">钻石</span>
					<span v-show="totalAcer.type==5">皇冠</span>
				</span></p>
				<p class="f20" style="color: #fdfbe9;">帮众：{{fansCount}}人</p>
			</div>
			<div style="position: relative;">
				<div class="select">
					<div style="display: flex;align-items: center;" v-on:click="showMenu=!showMenu">
						<span class="f32 c3">{{date}}</span><img src="../../../static/images/down.png" alt="" class="down_icon" />
					</div>
					<!--<div @click="selectDate()" style="line-height: .92rem;width: .5rem;padding-right: .26rem;text-align: right;vertical-align: middle;">
					<img src="../../../static/images/personCenter/date_icon.png" alt="" class="date" />
				</div>-->
				</div>
				<div class="down-menu" v-show="showMenu">
					<ul>
						<li v-for="(item,index) in list" @click="select(item,index)" :key="index">{{item}}</li>
					</ul>
				</div>
			</div>

			<div class="list" v-for="(item,index) in dataList" :key="index">
				<div>
					<span>{{item.update_time}}</span>
				</div>
				<div class="f28 c9">
					<span style="font-family: arial;">帮众贡献押运完成，财宝已入小金库</span>
					<div class="header_list_num king" v-show="item.transport_acer.type==5">
						<img src="../../../static/images/personCenter/king.png" alt="" /> {{item.transport_acer.acer}}
					</div>
					<div class="header_list_num jewel" v-show="item.transport_acer.type==4">
						<img src="../../../static/images/personCenter/jewel.png" alt="" /> {{item.transport_acer.acer}}
					</div>
					<div class="header_list_num gold" v-show="item.transport_acer.type==3">
						<img src="../../../static/images/personCenter/gold_acer.png" alt="" /> {{item.transport_acer.acer}}
					</div>
					<div class="header_list_num silver" v-show="item.transport_acer.type==2">
						<img src="../../../static/images/personCenter/silver.png" alt="" /> {{item.transport_acer.acer}}
					</div>
					<div class="header_list_num coppers" v-show="item.transport_acer.type==1">
						<img src="../../../static/images/personCenter/coppers.png" alt="" /> {{item.transport_acer.acer}}
					</div>
				</div>
			</div>
			<div class="empty" v-show="dataList.length==0"><img src="../../../static/images/empty/no_list.png" /></div>
		</scroller>
		<!--<div style="background: white;" class="bottom" v-if="show">
			<p class="f32 title"><span @click="cancel()">取消</span><span style="color: #333;" class="f32">选择时间</span><span @click="done()">完成</span></p>
			<div style="text-align: center;">
				<div class="botton" @click="day=!day">
					<span v-text="day?'按日选择':'按月选择'"></span>
					<img src="../../../static/images/two_icon.png" alt="" class="icon" />
				</div>
			</div>
			<div>
				<p class="f32 dateValue2" v-show="day">
					<span class="dates">{{value1}}</span>
					<span class="c9">至</span>
					<span class="dates">{{value2}}</span>
				</p>
				<p class="f32 dateValue1" v-show="!day">{{value1}}</p>
			</div>
			<datetime-view :max-year="maxYear" v-model="value1" ref="datetime" :format="day?'YYYY-MM-DD':'YYYY-MM'"></datetime-view>
		</div>-->
	</div>
</template>

<script>
	var list = ["今日", "昨日", "本月", "全部"]
	import { DatetimeView, } from 'vux'
		const url='http://xlk.dxvke.com'
//	const url = ""
	export default {
		name: 'Realize',
		components: {
			DatetimeView
		},
		data() {
			return {
				list: list,
				type: 1,
				date:list[0],
				showMenu: false,
				value: '',
				show: false,
				day: false,
				//				maxYear:'',
				//				maxMonth:'',
				//				value1:'',
				//				value2:'',
				page: 1,
				limit: 10,
				noData: false,
				dataList: [],
				fansCount:0,
				totalAcer:{
					type:0,
					acer:0
				}
			}
		},
		methods: {
			//获取帮众贡献列表
			getList() {
				this.$http({
					mothed: 'get',
					url: url + '/api/getFansAcerList',
					params: {
						type: this.type,
						page:this.page,
						limit:this.limit
					}
				}).then((res) => {
					if(res.data.code == '200') {
						if(res.data.data.list.length == 0) {
							this.noData = true
							this.$refs.myscroller.finishInfinite(2);
						} else {
							this.dataList = this.dataList.concat(res.data.data.list)
							this.fansCount=res.data.data.fansCount
							this.totalAcer=res.data.data.totalAcer
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
			select(item,index) {
				this.date=item
				this.type = index+1
				this.showMenu = !this.showMenu
				this.dataList=[]
				this.page=1
				this.getList()
			},
			//			setToday(value) {
			//				let now = new Date()
			//				let cmonth = now.getMonth() + 1
			//				let day = now.getDate()
			//				if(cmonth < 10) cmonth = '0' + cmonth
			//				if(day < 10) day = '0' + day
			//				this.value = now.getFullYear() + '-' + cmonth
			//				this.maxYear = now.getFullYear()
			//			},
			selectDate() {
				this.show = true
			},
			cancel() {
				this.show = false
			},
			done() {
				this.show = false
			},
			change() {

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
				this.dataList = []
				this.fansCount=0,
				this.totalAcer={
					type:0,
					acer:0
				}
				this.getList()
				setTimeout(function() {
					self.top = self.top - 10;
					done()
				}, 1500)
			},
		},
		created: function() {
			//			this.setToday()
			this.getList()
		},
		mounted: function() {

		},
		activated: function () {
			this.getList()
		}
	}
</script>

<style scoped="scoped">
	.header {
		text-align: center;
		width: 100%;
		height: 2.68rem;
		background-image: url("../../../static/images/personCenter/goldStore_bd.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		color: white;
		padding-top: .7rem;
		box-sizing: border-box;
	}
	
	.down-menu {
		font-size: .28rem;
		width: 1.64rem;
		line-height: .66rem;
		position: absolute;
		background: white;
		border: .01rem solid #e5e5e5;
		text-align: center;
		border-radius: .06rem;
		top: .8rem;
		left: .12rem;
		z-index: 999999;
	}
	
	.select {
		height: .92rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: .01rem solid #e5e5e5;
		padding: 0 0rem 0 .26rem;
	}
	
	.down_icon {
		width: .18rem;
		height: .1rem;
		margin-left: .1rem;
	}
	
	.date {
		width: .34rem;
		height: .32rem;
		vertical-align: middle;
	}
	
	.list {
		background: white;
		padding: .26rem .26rem;
		border-bottom: .01rem solid #e5e5e5;
	}
	
	.list>div {
		display: flex;
		align-items: center;
		justify-content: space-between;
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
	
	.selectDate {
		height: 100vh;
		background: white;
	}
	
	.botton {
		line-height: .52rem;
		width: 2.12rem;
		text-align: center;
		display: inline-block;
		background: #F5F5F5;
		color: #333;
		font-size: .28rem;
		border: .01rem solid #bbb;
		border-radius: .5rem;
		margin: .46rem auto;
	}
	
	.icon {
		width: .25rem;
		height: .22rem;
		margin-left: .1rem;
	}
	
	.title {
		line-height: .88rem;
		color: #9a7bff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 .26rem;
	}
	
	.bottom {
		height: 13.4rem;
		width: 100%;
		position: absolute;
		bottom: 0;
		z-index: 9999999;
	}
	
	.dateValue1 {
		line-height: .6rem;
		margin: .26rem;
		text-align: center;
		color: #927bff;
		border-bottom: .01rem solid #927bff;
	}
	
	.dateValue2 {
		line-height: .6rem;
		margin: .26rem;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	
	.dates {
		border-bottom: .01rem solid #e5e5e5;
		padding: 0 .25rem;
	}
</style>