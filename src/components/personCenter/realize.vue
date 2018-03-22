<template>
	<div>
		<x-header :left-options="{backText: ''}" title="库存挂单" style="background-color: #f9f9f9;">
			<a slot="right">
				<router-link to="/personCenter/goldStore/realizeList" style="color: #9A7BFF;font-size: .32rem;padding-top: .4rem;">
					挂单记录
				</router-link>	
			</a>
		</x-header>
		<div style="height: 1.28rem;"></div>
		<div class="header" style="position: relative;">
			<router-link to="/cashRule" class="f24 flex" style="position: absolute;right: .26rem;top: .26rem;z-index: 888;color: white;">
				<img src="../../../static/images/rule_icon.png" alt=""  style="width: .28rem;height: .28rem;margin-right: .1rem;"/>
				<span>挂单规则</span>
			</router-link>
			<p class="f24">可挂单财宝</p>
			<p style="font-size: .52rem;display: flex;justify-content: center;align-items: center;">{{this.$route.query.acer}}<span style="font-size: .4rem;">
				<span v-show="this.$route.query.type==1">铜币</span>
					<span v-show="this.$route.query.type==2">银</span>
					<span v-show="this.$route.query.type==3">金</span>
					<span v-show="this.$route.query.type==4">钻石</span>
					<span v-show="this.$route.query.type==5">皇冠</span>
			</span></p>
		</div>
		<div class="account">
			<p class="tip f30 c3">挂单账户选择</p>
			<!--<router-link class="account-main" to="/personCenter/goldStore/selectAccount">
         		<img src="../../../static/images/personCenter/alipay.png" alt="" class="icon"/>
         		<div class="account-main-right">
         			<div style="width: 100%;">
         				<p class="f30 c3">账号：13242142543</p>
         				<p class="f28" style="color: #c7c7c7;">对账手机号：13224354325</p>
         			</div>
         			<img src="../../../static/images/gt_white.png" alt="" class="enjoy-icon"/>
         		</div>
         	</router-link>-->
			<div class="main">
				<div class="list">
					<img src="../../../static/images/personCenter/alipay.png" alt="" class="icon" />
					<div class="right">
						<div>
							<group class="input">
								<x-input title="" v-model="alipay" class="same f30 c3" placeholder="请输入正确的支付宝账号" style="margin-bottom: .2rem;"></x-input>
								<x-input title="" v-model="tel" class="same f30 c3" placeholder="请输入对账手机号" style="margin-bottom: .2rem;"></x-input>
								<x-input title="" v-model="name" class="same f30 c3" placeholder="请输入真实姓名" style="margin-bottom: .2rem;"></x-input>
								<div class="flex">
									<x-input title="" v-model="code" class="same f30 c3" placeholder="请输入验证码" style="width: 3rem;"></x-input>
									<button class="f26"id="get-code" @click="getCode()">{{texts}}</button>
								</div>
							</group>
						</div>
						<!--<input type="radio" name="type" value="0" id="alipay" class="typeList" checked="checked" v-model="type"/>
						<div class="all">
							<img class="success" v-show="type==0" src="../../../static/images/checked.png">
							<label for="alipay" class="radio"></label>
						</div>-->
					</div>
				</div>
				<!--<div class="list">
					<img src="../../../static/images/personCenter/wechat.png" alt="" class="icon" />
					<div class="up_img right">
						<div class="vue-uploader">
							<div class="add">
								<img :src="img" alt="" ondragstart="return false;" class="pic">
								<label for="file"></label>
							</div>
							<input type="file" accept="image/*" @change="fileChanged" ref="file" id="file">
							<p class="f24 text">上传收款二维码，
								<a href="/personCenter/goldStore/introduce">如何查看？</a>
							</p>
						</div>
						<input type="radio" name="type" value="1" id="weChat" v-model="type"/>
						<div class="all">
							<img class="success" v-show="type==1" src="../../../static/images/checked.png">
							<label for="weChat" class="radio"></label>
						</div>
					</div>

				</div>-->
				<!--<div class="list">
					<img src="../../../static/images/personCenter/card.png" alt="" class="icon" />
					<div class="right">
						<div>
							<group class="input">
								<x-input title="" v-model="alipay" class="same f30 c3" placeholder="请输入正确的银行卡号" style="margin-bottom: .2rem;"></x-input>
								<x-input title="" v-model="alipay" class="same f30 c3" placeholder="请输入对账手机号"></x-input>
							</group>
						</div>
						<input type="radio" name="type" value="2" id="card" v-model="type"/>
						<div class="all">
							<img class="success" v-show="type==2" src="../../../static/images/checked.png">
							<label for="card" class="radio"></label>
						</div>
					</div>

				</div>-->
			</div>
		</div>
		<div class="des">
			<p class="tip f30 c3">财宝(单位：铜币)</p>
			<x-input placeholder="请输入挂单财宝数" novalidate :show-clear="false" v-model="acer"></x-input>
		</div>
		<div style="height: .96rem;"></div>
		<div style="position:fixed;bottom: 0;width: 100%;height: .96rem;">
			<x-button type="primary" action-type="button" style="width: 100%;height: 100%;border-radius: 0;" class="f32" @click.native="doWithdraw()">确认挂单</x-button>
		</div>
		<toast v-model="showToast" type="text" :time="800" is-show-mask position="middle">{{toast}}</toast>
	</div>
</template>

<script>
	import { XHeader, XInput, XButton, Group,Toast} from 'vux'
	const url='http://xlk.dxvke.com/'
//  const url =''
	export default {
		name: 'Realize',
		components: {
			XHeader,
			XInput,
			XButton,
			Group,
			Toast
		},
		data() {
			return {
				alipay: '',
				name:'',
				tel:'',
				code:'',
				img: '',
				type:1,
				acer:'',
				texts:'获取验证码',
				showToast: false,
				toast: '',
				countdown:60,
			}
		},
		methods: {
//			add() {
//				this.$refs.file.click()
//			},
//			uploadPic(formData) {
//				this.$http({
//					method: 'POST',
//					url: url+'/api/upload',
//					dataType: 'formData',
//					data: formData
//				}).then((res) => {
//					if(res.data.code == '200') {
//						this.img = res.data.data.image_url[0].image_url
//						this.files = []
//					}
//				}, (err) => {})
//			},
//
//			fileChanged(e) {
//				var file = e.target.files[0]
//				var self = this
//				var imgSize = file.size
//				const formData = new FormData();
//				if(imgSize < 256 * 1024) {
//					formData.append('images[]', file);
//					self.uploadPic(formData);
//				} else { // 图片压缩处理
//					var reader = new FileReader(),
//						maxWidth = 400,
//						maxHeight = 400,
//						suffix = file.name.substring(file.name.lastIndexOf('.') + 1);
//
//					if(imgSize > 2 * 1024 * 1024) {
//						maxWidth = 800;
//						maxHeight = 800;
//					}
//
//					reader.onload = function(e) {
//						var base64Img = e.target.result;
//						//--执行resize。
//						var _ir = ImageResizer({
//							resizeMode: "auto",
//							dataSource: base64Img,
//							dataSourceType: "base64",
//							maxWidth: maxWidth, //允许的最大宽度
//							maxHeight: maxHeight, //允许的最大高度。
//							onTmpImgGenerate: function(img) {},
//							success: function(resizeImgBase64, canvas) {
//								var blob = dataURLtoBlob(resizeImgBase64);
//								console.log(blob)
//								formData.append('images[]', blob);
//								self.uploadPic(formData);
//							}
//						});
//					};
//					reader.readAsDataURL(file);
//				}
//			},
             //执行挂单
			doWithdraw() {
				this.$http.post(url+'/api/doWithdraw', {
					type:this.type,
					acer:this.acer,
					account:this.alipay,
					telephone:this.tel,
					code:this.code,
					real_name:this.name
				}).then((res) => {
					if(res.data.code == '200') {
						this.toast=res.data.data.message
						this.showToast=true
						this.acer='',
						this.alipay='',
						this.tel='',
						this.code='',
						this.name=''
						
					} else {
                        this.toast=res.data.error
						this.showToast=true
					}
				}, (err) => {
					console.log(err)
					this.toast=err.statusText
					this.showToast=true
				})
			},
			getCode() {
				this.$http.post(url + '/api/sendCode', {
					telephone: this.tel,
					type: 2
				}).then((res) => {
					if(res.data.code == '200') {
                         this.invokeSettime()
					} else {
                        this.toast=res.data.error
						this.showToast=true
					}
				}, (err) => {
					this.toast=err.statusText
					this.showToast=true
				})
			},
				 //定时器
        invokeSettime(){
            this.settime()
            
           },
         settime(){
         	var self =this
            	if (this.countdown == 0) {
                    document.getElementById('get-code').disabled=false
                    this.texts="获取验证码";
                    this.countdown = 60;
                    return
                } else {
                    document.getElementById('get-code').disabled=true
                    this.texts= "重新发送"+"(" + this.countdown + ")";
                    this.countdown--;
                } 
                setTimeout(function() {
                   self.settime()
                },1000)
            } 
		},
		created: function() {
           
		},
		mounted: function() {
			
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
		margin-bottom: .2rem;
	}
	
	.account {
		background: white;
		border-bottom: .01rem solid #e5e5e5;
		border-top: .01rem solid #e5e5e5;
		margin-bottom: .2rem;
	}
	
	.tip {
		margin: 0 .26rem;
		line-height: .88rem;
	}
	
	.account-main {
		display: flex;
		align-items: center;
		margin-left: .26rem;
		height: 2rem;
		border-top: .01rem solid #e5e5e5;
	}
	
	.icon {
		width: .52rem;
		height: .52rem;
		margin-right: .45rem;
	}
	
	.enjoy-icon {
		width: .13rem;
		height: .24rem;
		margin-left: .05rem;
	}
	
	.account-main-right {
		width: calc(100% - 1.49rem);
		display: flex;
		align-items: center;
	}
	
	.des {
		background: white;
		padding-bottom: .15rem;
		border-bottom: .01rem solid #e5e5e5;
		border-top: .01rem solid #e5e5e5;
		margin-bottom: .45rem;
	}
	
	.des .weui-cell:before {
		border: none;
	}
	
	.des .weui-cell:after {
		content: " ";
		position: absolute;
		left: 0;
		bottom: .1rem;
		right: 0;
		height: 1px;
		border-bottom: 1px solid #D9D9D9;
		color: #D9D9D9;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		left: 15px;
	}
	
	.main {
		background: white;
	}
	
	.icon {
		width: .52rem;
		height: .52rem;
		margin-right: .3rem;
	}
	
	.list {
		margin: 0 .26rem;
		/*height: 2.16rem;*/
		height: 3.9rem;
		display: flex;
		align-items: center;
		border-top: .01rem solid #e5e5e5;
		/*justify-content: space-between;*/
	}
	
	.same {
		background: #f9f9f9;
		border: none;
		height: .68rem;
		box-sizing: border-box;
		width: 5rem;
	}
	
	.pic {
		width: 100%;
		height: 100%;
	}
	
	.add {
		width: 1.28rem;
		height: 1.28rem;
		background-image: url("/static/images/upload.png");
		background-size: 100% 100%;
		border: .01rem dashed #ececec;
		position: relative;
	}
	
	.add label {
		display: inline-block;
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}
	
	.vue-uploader {
		display: flex;
		align-items: flex-end;
	}
	
	.vue-uploader>input[type="file"] {
		display: none;
	}
	input[type="radio"] {
		display: none;
	}
	
	
	.all {
		position: relative;
		width: .36rem;
		height: .36rem;
		border-radius: 50%;
		border: .01rem solid #e5e5e5;
	}
	
	.radio {
		width: 100%;
		height: 100%;
		display: inline-block;
		position: absolute;
		top: 0;
		left: 0;
	}
	
	.right {
		width: calc(100% - .82rem);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.text {
		color: #c7c7c7;
		margin-left: .18rem;
	}
	
	.text>a {
		color: #9a7bff;
	}
	
	.success {
		width: .36rem;
		height: .36rem;
		position: absolute;
	}
	#get-code{
		display: inline-block;width: 2rem;text-align: center;background: #9A7BFF;color: white;height: .68rem;line-height: .68rem;border: none;outline: none;
	}
</style>
<style>
	.input .weui-cell:before {
		border: none;
	}
	
	.input .weui-cells:after {
		border: none;
	}
	.des .weui-cell:after {
		left: 0!important;
		bottom: -.04rem!important;
	}
	.des .weui-input{
		font-size: .36rem;
		color: #333;
		
	}
	.des .weui-cell{
		margin: .1rem .26rem;
		padding: 0;
	}
</style>