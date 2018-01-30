<template>
	<div>
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
					<input type="radio" name="type" value="0" id="alipay" class="typeList" checked="checked"/>
					<label for="alipay" class="radio">
						<icon type="success" class="success"></icon>
					</label>
				</div>
			</div>
			<div class="list">
				<img src="../../../static/images/personCenter/wechat.png" alt="" class="icon" />
				<div class="up_img right">
					<div class="vue-uploader">
						<label for="file" class="add">
							<img :src="img" alt="" ondragstart="return false;" class="pic">
						</label>
						<input type="file" accept="image/*" @change="fileChanged" ref="file" id="file">
						<p class="f24 text">上传收款二维码，
							<a href="">如何查看？</a>
						</p>
					</div>
					<input type="radio" name="type" value="1" id="weChat" />
					<label for="weChat" class="radio">
							<icon type="success" class="success"></icon>
					</label>
				</div>

			</div>
			<div class="list">
				<img src="../../../static/images/personCenter/card.png" alt="" class="icon" />
				<div class="right">
					<div>
						<group class="input">
							<x-input title="" v-model="alipay" class="same f30 c3" placeholder="请输入正确的支付宝账号" style="margin-bottom: .2rem;"></x-input>
							<x-input title="" v-model="alipay" class="same f30 c3" placeholder="请输入对账手机号"></x-input>
						</group>
					</div>
					<input type="radio" name="type" value="2" id="card" />
					<label for="card" class="radio">
							<icon type="success" class="success checked"></icon>
					</label>
				</div>

			</div>
		</div>
		<div style="margin:.6rem .26rem 0;">
			<x-button action-type="button">确认选择</x-button>
		</div>
	</div>
</template>

<script>
	import { Group, XInput, XButton, Icon } from 'vux'
	export default {
		name: 'selectAccount',
		components: {
			Group,
			XInput,
			XButton,
			Icon
		},
		data() {
			return {
				alipay: '',
				img: '',
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
			change(){
		
//				var radio = document.getElementsByClassName('typeList')
//			var success = document.getElementsByClassName('success')
//			for(var i = 0; i < radio.length; i++) {
//				if(radio[i].checked) {
//					success[i].style.display = "block"
//				}
//			}
			}
		},
		created: function() {

		},
		mounted: function() {
			var radio = document.getElementsByClassName('typeList')
			var success = document.getElementsByClassName('success')
			for(var i = 0; i < radio.length; i++) {
				if(radio[i].checked) {
					success[i].style.display = "block"
				}else{
					success[i].style.display = "none"
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.main {
		margin-top: .2rem;
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
		border-bottom: .01rem solid #e5e5e5;
		/*justify-content: space-between;*/
	}
	
	.list:nth-child(3) {
		border: none;
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
		display: inline-block;
		width: 1.28rem;
		height: 1.28rem;
		background-image: url("/static/images/upload.png");
		background-size: 100% 100%;
		border: 1px dashed #ececec;
	}
	
	.vue-uploader {
		display: flex;
		align-items: flex-end;
	}
	
	.vue-uploader>input[type="file"] {
		display: none;
	}
	
	/*input[type="radio"] {
		display: none;
	}
	*/
	.radio {
		width: .4rem;
		height: .4rem;
		border-radius: 50%;
		border: .01rem solid #e5e5e5;
		display: inline-block;
		position: relative;
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
		font-size: .4rem;
		color: #9a7bff;
		position: absolute;
		right: -.07rem;
		display: none;
	}
	.success.checked{
		display: block;
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