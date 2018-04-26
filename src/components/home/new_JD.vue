<template>
	<div>
		<x-header title="京东" :left-options="{showBack: false}">
		</x-header>
		<x-icon type="ios-arrow-left" size="30" style="fill: #666;width: .91rem;position: fixed;left: 0;top: .2rem;z-index: 9999;" @click="goHome()"></x-icon>
		<!--<iframe src="https://m.jd.com/?cu=true&utm_source=kong&utm_medium=tuiguang&utm_campaign=t_1000379762_&utm_term=1ddc6418e42347398c152c4dbbe036ab&abt=3" id="Iframe" frameborder="0" scrolling="" style="border:0px;" width="100%" height=""></iframe>-->

		<div class="return flex" @click="goHome()">
			<img src="../../../static/images/return_icon.png" alt="" />
			<span class="f28">返回</span>
		</div>
		<loading v-model="showLoading" :text="loadText"></loading>
	</div>
</template>

<script>
	import { XHeader,Loading } from 'vux'
	const url = 'http://xlk.dxvke.com/'
	export default {
		components: {
			XHeader,
			Loading
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
			JDclick() {
				plus.nativeUI.showWaiting();
				var self = this
				this.webview = plus.webview.create(self.$route.query.url, 'new', {
					top: "45px",
					bottom: "0",
				});
				this.webview.addEventListener('close', function() {
					this.webview = null;
				});
				this.webview.addEventListener('loaded', function(e) {
					console.log('Loaded: ' + self.webview.getURL());
					self.getProductAcer(self.webview.getURL())
				}, false);
                plus.nativeUI.closeWaiting();
				this.webview.show();
				
			},
			// 创建原生View控件
			createView() {
				var self = this
				if(this.status == 1) {
					this.view = new plus.nativeObj.View('test', {
					bottom: '0',
					left: '0px',
					height: '50px',
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
						width: "50%",
						height: "50px"
					},

				}, {
					tag: 'font',
					id: 'font2',
					text: '去购买',
					textStyles: {
						size: '16px',
						align: 'center',
						color: "#ffffff",
					},
					position: {
						bottom: "0",
						right: "0",
						width: "50%",
						height: "50px",
					},
				}]);
					console.log("显示",JSON.stringify(self.view))
					self.view.show();
					this.view.addEventListener('click', function(e) {
						self.toBuy() 
				})
				} else {
//					self.view.hide()
//					self.view.close()
					self.view.clear()
				}
			},
			//      获取商品返利信息
			getProductAcer(urls) {
				this.$http.post(url + '/api/getProductAcer', {
					type: 2,
					product: urls
				}).then((res) => {
					if(res.data.code == '200') {
						console.log(JSON.stringify(res.data.data))
						this.acer = res.data.data.acer
						this.product_url = res.data.data.url
						this.product_id = res.data.data.product_id
						this.status = res.data.data.status
                        this.createView()
					}
				}, (err) => {
					console.log(JSON.stringify(err))
				})
			},
			//      够买给后台传参
			toBuy() {
				var self = this
				this.$http.post(url + '/api/toBuy', {
					type: 2,
					id: self.product_id
				}).then((res) => {
					if(res.data.code == '200') {
						self.view.clear()
						plus.webview.close(this.webview)
						this.webview = plus.webview.open(self.product_url, 'new', {
						top: "45px",
					    bottom: "0",
					});
					}else{
						console.log('失败')
					}
				}, (err) => {
					console.log(JSON.stringify(err))
				})
			},
		},
		created: function() {
			this.JDclick()
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