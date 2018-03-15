<template>
	<div>
		<div class="order_des">
			<img src="../../../static/images/default_img.png" alt="" class="order_pic" />
			<div class="order_des_m">
				<p class="break break_two order_name">商品名称商品名称商品名称商品名称商品是的法商品名称商品名称商品名称商品名称商品是的法商品名称商品名称商品名称商品名称商品是的法律上都没佛打扫地方撒是地方撒地方撒</p>
				<p class="order_des_num">规格：24包</p>
			</div>
		</div>
		<div class="reason">
			<popup-picker class="f28 c3" placeholder="请选择" v-if="!switch1" title="退款原因" :data="reason" v-model="value" confirm-text="确定" style="padding: .08rem 0;"></popup-picker>
		</div>
		<div style="background: white;margin-bottom: .2rem;">
			<p class="f28 c3 same">退款金额：<span class="c_m">￥99<span>.99</span></span><span class="f24">（含运费：￥0<span>.00</span>）</span>
			</p>
			<p class="f28 c3 same">退款说明：<input type="text" placeholder="选填" class="input" value="" /></p>
		</div>
		<div style="background: white;margin-bottom: .2rem;">
			<p class="f28 c3 same">退货物流：<input type="text" placeholder="物流公司" class="input" value="" /></p>
			<p class="f28 c3 same">物流单号：<input type="number" placeholder="单号" class="input" value="" /></p>
		</div>
		<div style="background: white;">
			<p class="f28 c3 same" style="border-bottom: none;">上传凭证：</p>
			<div class="up_img">
				<!--<uploader v-model="evaluate_url"></uploader>-->
				<div class="vue-uploader">
					<div class="file-list">
						<section v-for="(file, index) in imgList" class="file-item draggable-item">
							<img :src="file.image_url" alt="" ondragstart="return false;">
							<!--<p class="file-name">{{file.name}}</p>-->
							<span class="file-remove" @click="remove(index)">+</span>
						</section>
						<section class="file-item">
							<!--<div @click="add" class="add">-->

							<!--</div>-->
							<label for="file" class="add"></label>
						</section>
					</div>
					<input type="file" accept="image/*" @change="fileChanged" ref="file" id="file">
				</div>
			</div>
		</div>
		<x-button @click.native="click()" class="xbtn">提交</x-button>
	</div>
</template>

<script>
	import { PopupPicker, XSwitch,XButton} from 'vux'
    const url='http://xlk.dxvke.com/'
	export default {
		components: {
			PopupPicker,
			XSwitch,
			XButton
		},
		methods: {
			onChange(val) {
				console.log('val change', val)
			},
			//      晒单说明
			getShareBrief: function() {
				this.showLoading = true
				this.$http({
					method: 'POST',
					url: url+'/api/shareBrief'
				}).then((res) => {
					this.showLoading = false
					if(res.data.code == '200') {
						this.brief = res.data.data.brief
					} else if(res.data.code == '400') {
						//            this.$vux.toast.show({
						//              type:"cancel",
						//              text:res.data.message
						//            })
					}
				}, (err) => {
					console.log(err)
				})
			},
			//      晒单发布
			submit: function() {
				if(this.evaluate == '') {
					this.$vux.toast.show({
						type: 'cancel',
						text: '内容不能为空！'
					})
					return
				}
				if(this.imgList.length == 0) {
					this.$vux.toast.show({
						type: 'cancel',
						text: '请上传晒单图片！'
					})
					return
				}
				if(!this.order_num) {
					this.$vux.toast.show({
						type: 'cancel',
						text: '订单号不能为空'
					})
					return
				} else {}
				this.showLoading = true
				this.$http({
					method: 'POST',
					url: url+'/api/shareOrder_front',
					data: {
						evaluate: this.evaluate,
						order_num: this.order_num,
						evaluate_url: JSON.stringify(this.imgList)
					}
				}).then((res) => {
					this.showLoading = false
					if(res.data.code == '200') {
						this.$vux.toast.show({
							text: res.data.data.message
						})
						history.go(-1)
					} else if(res.data.code == '400') {
						this.$vux.toast.show({
							text: res.data.error,
							type: 'cancel'
						})
					}
				}, (err) => {
					console.log(err)
				})
			},
			add() {
				this.$refs.file.click()
			},
			remove(index) {
				this.imgList.splice(index, 1)
			},
			uploadPic(formData) {
				this.$http({
					method: 'POST',
					url: url+'/api/upload',
					dataType: 'formData',
					data: formData
				}).then((res) => {
					if(res.data.code == '200') {
						let j
						for(j in res.data.data.image_url) {
							this.imgList.push(res.data.data.image_url[j])
							this.files = []
						}
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
			click:function(){
				this.$router.push({
					path: '/refundDetail'
				})
             
			}
		},
		data() {
			return {
				switch1: false,
				reason: [
					['原因一', '原因二', '原因三', '原因四']
				],
				value: [],
				imgList: [],
			}
		}
	}
</script>

<style scoped="scoped">
	.order_des {
		padding: .15rem .26rem;
		background: white;
		display: flex;
		border-bottom: .01rem solid #e5e5e5;
		margin-bottom: .2rem;
	}
	
	.order_pic {
		width: 1.5rem;
		height: 1.5rem;
		margin-right: .2rem;
	}
	
	.order_des_m {
		width: calc(100% - 1.6rem);
		width: -moz-calc(100% - 1.6rem);
		width: -webkit-calc(100% - 1.6rem);
	}
	
	.order_name {
		font-size: .26rem;
		color: #333;
		line-height: .35rem;
	}
	
	.order_des_num {
		font-size: .24rem;
		color: #999;
	}
	
	.order_des_num>span {
		font-size: .28rem;
		color: #333;
	}
	
	.reason {
		background: white;
		margin-bottom: .2rem;
		border-bottom: .01rem solid #e5e5e5;
		border-top: .01rem solid #e5e5e5;
	}
	
	.same {
		line-height: 1rem;
		height: 1rem;
		border-bottom: .01rem solid #e5e5e5;
		padding: 0 .26rem;
		overflow: hidden;
	}
	
	.same:nth-of-type(1) {
		border-top: .01rem solid #e5e5e5;
	}
	
	.input {
		height: 90%;
		width: 76%;
		border: none;
		-webkit-appearance: none;
		outline: none;
		font-size: .28rem;
		color: #333;
	}
	.xbtn{
		background-color: #9a7bff;color: white;font-size: .32rem;width: 100%;line-height: .96rem;
		position: fixed;
		bottom: 0;
		border-radius: 0;
	}
	
	/*上传图片样式*/
	
	.up_img {
		width: 100%;
	}
	
	.vue-uploader .file-list {
		padding: 10px 0px;
	}
	
	.vue-uploader .file-list:after {
		content: '';
		display: block;
		clear: both;
		visibility: hidden;
		line-height: 0;
		height: 0;
		font-size: 0;
	}
	
	.vue-uploader .file-list .file-item {
		float: left;
		position: relative;
		width: 2rem;
		text-align: center;
		margin-left: .3rem;
	}
	
	.vue-uploader .file-list .file-item img {
		width: 2rem;
		height: 2rem;
		border: 1px solid #ececec;
	}
	
	.vue-uploader .file-list .file-item .file-remove {
		position: absolute;
		right: 0;
		display: none;
		top: 0;
		width: .4rem;
		height: .4rem;
		color: white;
		cursor: pointer;
		line-height: .35rem;
		border-radius: 100%;
		transform: rotate(45deg);
		background: rgba(0, 0, 0, 0.5);
	}
	
	.vue-uploader .file-list .file-item:hover .file-remove {
		display: inline;
	}
	
	.vue-uploader .file-list .file-item .file-name {
		margin: 0;
		height: 40px;
		word-break: break-all;
		font-size: 14px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.vue-uploader .add {
		width: 2rem;
		height: 2rem;
		margin-right: .1rem;
		float: left;
		text-align: center;
		line-height: 2rem;
		border: 1px dashed #ececec;
		font-size: 30px;
		cursor: pointer;
		background-image: url("/static/images/upload.png");
		background-size: 100% 100%;
	}
	
	.vue-uploader .upload-func {
		display: flex;
		padding: 10px;
		margin: 0px;
		background: #f8f8f8;
		border-top: 1px solid #ececec;
	}
	
	.vue-uploader .upload-func .progress-bar {
		flex-grow: 1;
	}
	
	.vue-uploader .upload-func .progress-bar section {
		margin-top: 5px;
		background: #00b4aa;
		border-radius: 3px;
		text-align: center;
		color: #fff;
		font-size: 12px;
		transition: all .5s ease;
	}
	
	.vue-uploader .upload-func .operation-box {
		flex-grow: 0;
		padding-left: 10px;
	}
	
	.vue-uploader .upload-func .operation-box button {
		padding: 4px 12px;
		color: #fff;
		background: #007ACC;
		border: none;
		border-radius: 2px;
		cursor: pointer;
	}
	
	.vue-uploader>input[type="file"] {
		display: none;
	}
	
</style>
<style type="text/css">
	.weui-cell {
		padding: .2rem .26rem;
	}
</style>