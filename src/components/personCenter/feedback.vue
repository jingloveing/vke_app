<template>
	<div class="feedback">
		<x-header :left-options="{backText: ''}" title="意见反馈" style="background-color: #f9f9f9;">
			<a slot="right" style="color: #9A7BFF;font-size: .32rem;">提交</a></x-header>
			<div style="height: .88rem;"></div>
		<p class="tip">反馈内容<span>*</span></p>
		<group>
      <x-textarea name="detail" placeholder="请填写您的建议" show-counter style="height: 3.76rem; font-size: .28rem;color: #c7c7c7;"></x-textarea>
    </group>
    <p class="tip">手机号码<span>*</span></p>
    <group class="tel">
      <x-input name="mobile" placeholder="请填写您的手机号" keyboard="number" is-type="china-mobile" style="font-size: .28rem;color:#c7c7c7;"></x-input>
    </group>
	</div>
</template>

<script>
	import {XHeader,Group,XTextarea,XInput} from 'vux'
	export default {
    name: 'Home',
    components: {
    	XHeader,
    	Group,XTextarea,
    	XInput
    },
   }
	
</script>

<style scoped="scoped">
	.tip{
		font-size: .28rem;
		color: #333;
		line-height: 1rem;
		padding: 0 .26rem;
	}
	.tip>span{
		color: #F51D46;
	}
</style>
<style>
	.weui-cells{
		margin-top: 0!important;
	}
	.tel .vux-x-input{
		height: .88rem;
		box-sizing: border-box;
	}
</style>
