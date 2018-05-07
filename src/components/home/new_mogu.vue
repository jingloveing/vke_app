<!--<template>
	<div>
		<iframe src="https://g.mogujie.com/132Lxl9s" id="Iframe" frameborder="0" scrolling="" style="border:0px;" width="100%" height=""></iframe>
		<div class="return flex" @click="goHome()">
			<img src="../../../static/images/return_icon.png" alt="" />
			<span class="f28">返回</span>
		</div>
	</div>
</template>

<script>
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

		},
		created: function() {
			
		},
		mounted() {
			var Iframe = document.getElementById("Iframe")
			Iframe.height = document.documentElement.clientHeight - 64;
			Iframe.onload = function(event) {
				console.log(document.getElementById('directorderBtm'))
				console.log('onloadsss', event)
			}

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
</style>-->
	
<template>
	<div>
		<x-header title="蘑菇街" :left-options="{showBack: false}">
		</x-header>
		<x-icon type="ios-arrow-left" size="30" style="fill: white;width: .91rem;position: fixed;left: 0;top: .6rem;z-index: 9999;" @click="goHome()"></x-icon>
		<!--<iframe src="https://m.jd.com/?cu=true&utm_source=kong&utm_medium=tuiguang&utm_campaign=t_1000379762_&utm_term=1ddc6418e42347398c152c4dbbe036ab&abt=3" id="Iframe" frameborder="0" scrolling="" style="border:0px;" width="100%" height=""></iframe>-->

		<div class="return flex" @click="goHome()">
			<img src="../../../static/images/return_icon.png" alt="" />
			<span class="f28">返回</span>
		</div>
		<loading v-model="showLoading" :text="loadText"></loading>
	</div>
</template>

<script>
	import { XHeader,Loading} from 'vux'
	export default {
		components: {
			XHeader,
		},
		data() {
			return {
				webview: null,
				view: null,
				acer: 0,
				product_url: '',
				product_id: '',
				status: 0,
				showLoading:false,
				loadText:'加载中'
			}
		},
		methods: {
			goHome() {
				plus.webview.close(this.webview)
				if(this.view){
					console.log(JSON.stringify(this.view))
					this.view.clear()
				}else{
					console.log(JSON.stringify(this.view))
				}
				
				this.$router.push({
					name: 'Home',
					query: {}
				})
			},
			mgjclick() {
				this.showLoading=true
				var self = this
				this.webview = plus.webview.create(self.$route.query.url, 'new', {
					top: "65px",
					bottom: "0",
				});
				this.webview.addEventListener('close', function() {
					this.webview = null;
				});
				this.webview.addEventListener('loaded', function(e) {
					console.log('Loaded: ' + self.webview.getURL());
					self.getProductAcer(self.webview.getURL())
				}, false);
                this.showLoading=false
				this.webview.show();
				
			},
			// 创建原生View控件
			createView() {
				var self = this
				if(this.status == 1) {
					this.view = new plus.nativeObj.View('test', {
					bottom: '0',
					left: '0px',
					height: '25px',
					width: '100%',
					backgroundColor: '#9a7bff'
				}, [{
					tag: 'font',
					id: 'font1',
					text: '可返财宝:' + self.acer + '铜币',
					textStyles: {
						size: '16px',
						align: 'center',
						color: "#ffffff",

					},
					position: {
						bottom: "0",
						left: "0",
						width: "100%",
						height: "25px"
					},

				}]);
					console.log("显示",JSON.stringify(self.view))
					self.webview.setStyle({top:"65px",bottom:"25px"});
					self.view.show();
				} else {
					self.webview.setStyle({top:"65px",bottom:"0"});
					self.view.clear()
				}
			},
			//      获取商品返利信息
			getProductAcer(urls) {
				this.$http.post(this.http + '/api/getProductAcer', {
					type: 3,
					product: urls
				}).then((res) => {
					if(res.data.code == '200') {
						console.log(JSON.stringify(res.data.data))
						this.acer = res.data.data.acer
						this.product_url = res.data.data.url
						this.product_id = res.data.data.product_is
						this.status = res.data.data.status
                        this.createView()
					}
				}, (err) => {
					console.log(JSON.stringify(err))
				})
			},
		},
		created: function() {
			this.mgjclick()
		},
		mounted: function() {

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
