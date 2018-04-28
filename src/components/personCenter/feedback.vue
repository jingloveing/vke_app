<template>
	<div class="feedback">
		<p class="tip">反馈内容<span>*</span></p>
		<group>
			<x-textarea name="detail" placeholder="请填写您的建议" show-counter style="height: 3.76rem; font-size: .28rem;" v-model="msg"></x-textarea>
		</group>
		<p class="tip">手机号码<span>*</span></p>
		<group class="tel">
			<x-input name="mobile" placeholder="请填写您的手机号" keyboard="number" is-type="china-mobile" style="font-size: .28rem;color: #333;" v-model="telephone"></x-input>
		</group>
		<div style="position:fixed;bottom: 0;width: 100%;height: .96rem;">
			<x-button @click.native="feedback()" type="default" action-type="button" style="width: 100%;height: 100%;border-radius: 0;" class="f32">提交</x-button>
		</div>
		<loading v-model="showLoading" :text="loadText"></loading>
	</div>
</template>

<script>
	import {Group, XTextarea, XInput, Loading,XButton} from 'vux'
	export default {
		name: 'Home',
		components: {
			Group,
			XTextarea,
			XInput,
			Loading,
			XButton
		},
		data() {
			return {
				msg: '',
				telephone: '',
				showLoading: false,
				loadText: ''
			}
		},
		methods: {
             //提交意见反馈
			feedback(){
				this.$http.post(this.http+'/api/feedback', {
					msg: this.msg,
					telephone: this.telephone
				}).then((res) => {
					if(res.data.code == '200') {
						this.$vux.toast.show({
							text: res.data.data.message,
							type: 'success',
						})
						this.msg=''
						this.telephone=''
					} else {
						this.$vux.toast.show({
							text: res.data.error,
							type: 'warn',
						})
					}
				}, (err) => {
					console.log(JSON.stringify(err))
				})
			},
		},
		created: function() {
			
		},
		mounted: function() {

		}
	}
</script>

<style scoped="scoped">
	.tip {
		font-size: .28rem;
		color: #333;
		line-height: 1rem;
		padding: 0 .26rem;
	}
	
	.tip>span {
		color: #F51D46;
	}
</style>
<style>
	.weui-cells {
		margin-top: 0!important;
	}
	
	.tel .vux-x-input {
		height: .88rem;
		box-sizing: border-box;
	}
</style>