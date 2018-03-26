<template>
	<div>
		<!--<iframe src="https://m.jd.com/?cu=true&utm_source=kong&utm_medium=tuiguang&utm_campaign=t_1000379762_&utm_term=1ddc6418e42347398c152c4dbbe036ab&abt=3" id="Iframe" frameborder="0" scrolling="" style="border:0px;" width="100%" height=""></iframe>-->
		<div class="return flex" @click="goHome()">
			<img src="../../../static/images/return_icon.png" alt="" />
			<span class="f28">返回</span>
		</div>
	</div>
</template>

<script>
	var webview = null;	
	export default {
		components: {

		},
		data() {
			return {

			}
		},
		methods: {
			goHome() {
				this.$router.push({
					name: 'Home',
					query: {}
				})
			},
		   JDclick() {
				var webview = plus.webview.create('https://m.jd.com/?cu=true&utm_source=kong&utm_medium=tuiguang&utm_campaign=t_1000379762_&utm_term=1ddc6418e42347398c152c4dbbe036ab&abt=3', 'new', {
//					'titleNView': {
//						'backgroundcolor': '#f9f9f9',
//						'titletext': '京东',
//						'titlecolor': '333',
//						autoBackButton: true
//					},
                    top:"65px"
				});
				webview.addEventListener('close', function() {
					webview = null;
				});
				webview.addEventListener('titleUpdate', function() {
					webview.show();
				});
				webview.show();
				this.loadHtmlData()
			},
			loadHtmlData() {
				webview.loadData('<html><body>Hello! loadData!</body></html>');
			}
        
        },

		created: function() {
             this.JDclick()
		},

		mounted: function() {
//			var Iframe = document.getElementById("Iframe")
//			Iframe.height = document.documentElement.clientHeight - 64;
//			Iframe.onload=function(event){
//				console.log('onloadsss',event)
//			}
//			
			
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