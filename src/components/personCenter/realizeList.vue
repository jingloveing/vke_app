<template>
	<div>
		<div style="position: relative;">
			<div class="select">
				<div style="display: flex;align-items: center;" v-on:click="showMenu=!showMenu">
					<span class="f32 c3">{{type}}</span><img src="../../../static/images/down.png" alt="" class="down_icon" />
				</div>
				<div @click="selectDate()" style="line-height: .92rem;width: .5rem;padding-right: .26rem;text-align: right;vertical-align: middle;">
					<img src="../../../static/images/personCenter/date_icon.png" alt="" class="date" />
				</div>
			</div>
			<div class="down-menu" v-show="showMenu">
				<ul>
					<li v-for="item in list" @click="select(item)">{{item}}</li>
				</ul>
			</div>
		</div>
		<div class="list" v-for="i in 5">
			<div>
				<span>支付宝挂单</span>
				<div class="header_list_num jewel">
					<img src="../../../static/images/personCenter/jewel.png" alt="" /> 8.86
				</div>
				<!--<div class="header_list_num gold">
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
                	     </div>-->
			</div>
			<div class="f28 c9">
				<span style="font-family: arial;">01-08 14:00</span>
				<div>
					<span>挂单中</span>
					<!--<span>已成交</span>
               	   <span>挂单失败</span>-->
				</div>
			</div>
		</div>
		<div style="background: white;" class="bottom" v-if="show">
			<p class="f32 title"><span @click="cancel()">取消</span><span style="color: #333;" class="f32">选择时间</span><span @click="done()">完成</span></p>
			<div style="text-align: center;">
				<div class="botton" @click="day=!day">
					<span v-text="day?'按日选择':'按月选择'"></span>
					<img src="../../../static/images/two_icon.png" alt="" class="icon" />
				</div>
			</div>
			<div>
				<p class="f32 dateValue2" v-show="day">
					<input class="dates" v-model="value1"/>
					<span class="c9">至</span>
					<input class="dates" v-model="value1">
				</p>
				<p class="f32 dateValue1" v-show="!day">{{value1}}</p>
			</div>
			<datetime-view :max-year="maxYear" v-model="value1" ref="datetime" :format="day?'YYYY-MM-DD':'YYYY-MM'"></datetime-view>
			<!--<datetime-view :max-year="maxYear" v-model="value2" ref="datetime" :format="day?'YYYY-MM-DD':'YYYY-MM'"></datetime-view>-->
		</div>
	</div>
</template>

<script>
	var list = ["全部", "支付宝", "微信", "银行卡"]
	import { DatetimeView, } from 'vux'
	export default {
		name: 'Realize',
		components: {
			DatetimeView
		},
		data() {
			return {
				list: list,
				type: list[0],
				showMenu: false,
				value: '',
				show:false,
				day:false,
				maxYear:'',
				maxMonth:'',
				value1:'',
				value2:''
			}
		},
		methods: {
			select(item) {
				this.type = item
				this.showMenu = !this.showMenu
			},
			setToday(value) {
				let now = new Date()
				let cmonth = now.getMonth() + 1
				let day = now.getDate()
				if(cmonth < 10) cmonth = '0' + cmonth
				if(day < 10) day = '0' + day
				this.value = now.getFullYear() + '-' + cmonth
				this.maxYear = now.getFullYear()
			},
			selectDate(){
				this.show=true
			},
			cancel(){
				this.show=false
			},
			done(){
				this.show=false
			},
			change(){
				
			}
		},
		created: function() {
			this.setToday()
		},
		mounted: function() {

		}
	}
</script>

<style scoped="scoped">
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
	.title{
		line-height: .88rem;
		color: #9a7bff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 .26rem;
	}
	.bottom{
		height: 13.4rem;
		width: 100%;
		position: absolute;
		bottom: 0;
		z-index: 9999999;
	}
	.dateValue1{
		line-height: .6rem; 
		margin:.26rem; 
		text-align: center;
		color: #927bff;
		border-bottom: .01rem solid #927bff;
	}
	.dateValue2{
		line-height: .6rem; 
		margin:.26rem; 
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.dates{
		outline:none;
		border: none;
		width: 2.2rem;
		height: .6rem;
		border-bottom: .01rem solid #e5e5e5;
		padding: 0 .25rem;
		font-size: .32rem;
		text-align: center;
	}
</style>