<template>
	<div class="selectDate">
		<x-header :left-options="{backText: ''}" title="意见反馈" style="background-color: #f9f9f9;">
			<a slot="right" style="color: #9A7BFF;font-size: .32rem;" href="/personCenter/goldStore/realizeList">完成</a>
		</x-header>
		<div style="height: .88rem;"></div>
		<p class="f32 title"><span>取消</span><span>完成</span></p>
		<div style="text-align: center;">
			<div class="botton">按月选择<img src="../../../static/images/two_icon.png" alt="" class="icon" /></div>
		</div>
		<div>
			<!--<p style="line-height: .6rem; margin:.26rem; text-align: center;color: #927bff;border-bottom: .01rem solid #927bff;" class="f32">{{value}}</p>-->
			<p style="line-height: .6rem; margin:.26rem; text-align: center;color: #927bff;border-bottom: .01rem solid #927bff;" class="f32">{{value}}</p>
		</div>
		<datetime-view v-model="value" ref="datetime" format="YYYY-MM"></datetime-view>
	</div>
</template>

<script>
	import { XHeader, XInput, XButton, DatetimeView, } from 'vux'
	export default {
		name: 'Realize',
		components: {
			XHeader,
			XInput,
			XButton,
			DatetimeView,
		},
		data() {
			return {
				value: ''
			}
		},
		methods: {
			setToday(value) {
				let now = new Date()
				let cmonth = now.getMonth() + 1
				let day = now.getDate()
				if(cmonth < 10) cmonth = '0' + cmonth
				if(day < 10) day = '0' + day
				this.value = now.getFullYear() + '-' + cmonth
				console.log(this.value)
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
	.title{
		line-height: .88rem;
		color: #9a7bff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 .26rem;
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
</style>