<template>
	<div>
		<x-header :left-options="{backText: ''}" title="库存挂单" style="background-color: #f9f9f9;">
			<a slot="right" style="color: #9A7BFF;font-size: .32rem;" href="/personCenter/goldStore/realizeList">挂单记录</a>
		</x-header>
		<div style="height: .88rem;"></div>
		<div class="header" style="position: relative;">
			<router-link to="/cashRule" class="f24 flex" style="position: absolute;right: .26rem;top: .26rem;z-index: 888;color: white;">
				<img src="../../../static/images/rule_icon.png" alt=""  style="width: .28rem;height: .28rem;margin-right: .1rem;"/>
				<span>挂单规则</span>
			</router-link>
			<p class="f24">可挂单财宝</p>
			<p style="font-size: .52rem;display: flex;justify-content: center;align-items: center;">1.081<span style="font-size: .4rem;">钻</span></p>
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
								<x-input title="" v-model="alipay" class="same f30 c3" placeholder="请输入对账手机号"></x-input>
							</group>
						</div>
						<input type="radio" name="type" value="0" id="alipay" class="typeList" checked="checked" v-model="type"/>
						<div class="all">
							<img class="success" v-show="type==0" src="../../../static/images/checked.png">
							<label for="alipay" class="radio"></label>
						</div>
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
			<x-input placeholder="请输入挂单财宝数" novalidate :show-clear="false" style="font-size: .36rem;color:#333;"></x-input>
		</div>
		<div style="height: .96rem;"></div>
		<div style="position:fixed;bottom: 0;width: 100%;height: .96rem;">
			<x-button type="primary" action-type="button" style="width: 100%;height: 100%;border-radius: 0;" class="f32">确认挂单</x-button>
		</div>
	</div>
</template>

<script>
	import { XHeader, XInput, XButton, Group} from 'vux'
	export default {
		name: 'Realize',
		components: {
			XHeader,
			XInput,
			XButton,
			Group
		},
		data() {
			return {
				alipay: '',
				img: '',
				type:0,
			}
		},
		methods: {
			add() {
				this.$refs.file.click()
			},
			uploadPic(formData) {
				this.$http({
					method: 'POST',
					url: '/api/upload',
					dataType: 'formData',
					data: formData
				}).then((res) => {
					if(res.data.code == '200') {
						this.img = res.data.data.image_url[0].image_url
						this.files = []
					}
				}, (err) => {})
			},

			fileChanged(e) {
				var file = e.target.files[0]
				var self = this
				var imgSize = file.size
				const formData = new FormData();
				if(imgSize < 256 * 1024) {
					formData.append('images[]', file);
					self.uploadPic(formData);
				} else { // 图片压缩处理
					var reader = new FileReader(),
						maxWidth = 400,
						maxHeight = 400,
						suffix = file.name.substring(file.name.lastIndexOf('.') + 1);

					if(imgSize > 2 * 1024 * 1024) {
						maxWidth = 800;
						maxHeight = 800;
					}

					reader.onload = function(e) {
						var base64Img = e.target.result;
						//--执行resize。
						var _ir = ImageResizer({
							resizeMode: "auto",
							dataSource: base64Img,
							dataSourceType: "base64",
							maxWidth: maxWidth, //允许的最大宽度
							maxHeight: maxHeight, //允许的最大高度。
							onTmpImgGenerate: function(img) {},
							success: function(resizeImgBase64, canvas) {
								var blob = dataURLtoBlob(resizeImgBase64);
								console.log(blob)
								formData.append('images[]', blob);
								self.uploadPic(formData);
							}
						});
					};
					reader.readAsDataURL(file);
				}
			},
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
		height: 2.16rem;
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
		border: 1px dashed #ececec;
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
</style>
<style>
	.input .weui-cell:before {
		border: none;
	}
	
	.input .weui-cells:after {
		border: none;
	}
</style>