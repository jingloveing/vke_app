<template>
	<div>
		<x-header title="唯品会" :left-options="{showBack: false}">
		</x-header>
		<x-icon type="ios-arrow-left" size="30" style="fill: white;width: .91rem;position: fixed;left: 0;top: .6rem;z-index: 9999;" @click="goHome()"></x-icon>
		<!--<iframe src="https://m.vip.com/index.html?f=CPS#!hash" id="Iframe" frameborder="0" scrolling="" style="border:0px;" width="100%" height=""></iframe>-->
		<div class="return flex" @click="goHome()">
			<img src="../../../static/images/return_icon.png" alt="" />
			<span class="f28">返回</span>
		</div>
	</div>
</template>

<script>
	import { XHeader,Loading } from 'vux'
	export default {
		components: {
            XHeader,Loading
		},
		data() {
			return {
                webview: null,
			}
		},
		methods: {
			goHome() {
				plus.webview.close(this.webview)
				this.$router.push({
					name: 'Home',
					query: {}
				})
			},
			vipClick() {
				plus.nativeUI.showWaiting();
				var self = this
				this.webview = plus.webview.create("https://m.vip.com/index.html?f=CPS#!hash", 'new', {
					top: "65px",
					bottom: "0",
				});
				this.webview.addEventListener('close', function() {
					this.webview = null;
				});
                plus.nativeUI.closeWaiting();
				this.webview.show();
				
			},
		},
		created: function() {
			this.vipClick()
		},
		mounted:function(){
//			var Iframe = document.getElementById("Iframe")
//			Iframe.height = document.documentElement.clientHeight - 64;
//			Iframe.onload=function(event){
//				console.log(document.getElementById('directorderBtm'))
//				console.log('onloadsss',event)
//			}
		},
	}
</script>

<style scoped="scoped">
	.return {
		width: 1.34rem;
		line-height: .56rem;
		height: .56rem;
		border-top-right-radius: .28rem;
		border-bottom-right-radius: .28rem;
		color: white;
		background: rgba(154, 123, 255, .8);
		position: fixed;
		left: 0;
		bottom: 3.28rem;
		z-index: 99999;
	}
	
	.return img {
		width: .28rem;
		height: .28rem;
		margin: 0 .05rem 0 .1rem;
	}
</style>