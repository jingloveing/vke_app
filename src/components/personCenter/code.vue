<template>
	<div>
		<div class="header">
			<div style="overflow: hidden;">
				<group class="weui-cells_form">
					<x-input class="weui-vcode code" placeholder="请输入启蒙码" novalidate :show-clear="false">
						<x-button slot="right" type="primary" mini class="f28" style="width: 1.2rem;padding: 0 0;" v-show="show" @click.native="show=!show">确定</x-button>
						<x-button slot="right" mini class="f28" disabled style="margin-top:0;background-color: #999;color: white;width: 1.2rem;padding: 0 0;" v-show="!show">已开启</x-button>
					</x-input>
				</group>
			</div>
			<div class="header_main">
				<div style="text-align: center;">
					<p class="c3" style="font-size: .4rem;text-align: center;">您的启蒙码</p>
					<input class="f36" id="kouling" :value="code">
					<x-button slot="right" type="primary" mini class="f36 m_btn" data-clipboard-target="#kouling">一键复制</x-button>
				</div>
			</div>
		</div>
		<toast v-model="showPositionValue" type="text" :time="800" is-show-mask :text="text" :position="position"></toast>
	</div>
</template>

<script>
	import { Group, XButton, XInput ,Toast} from 'vux'
	import Clipboard from 'clipboard'
	export default {
		name: 'Code',
		components: {
			Group,
			XButton,
			XInput,
			Toast
		},
		data() {
			return {
				show: true,
				code:'12234',
				position: 'middle',
                showPositionValue: false,
                text:''
			}
		},
		mounted: function() {
				this.$nextTick(function() {
						let self = this
						const clipboard = new Clipboard('.m_btn')
						clipboard.on('success', function(e) {
                             self.text="复制成功"
                             self.showPositionValue = true
							e.clearSelection();
						});
						clipboard.on('error', function(e) {
                             self.text="请重新复制"
                             self.showPositionValue = true
						});
				})
			}
	}
</script>
<style scoped="scoped">
	.weui-cells_form {
		width: 5.46rem;
		margin: 1.54rem auto 0;
	}
	
	.header {
		position: relative;
		width: 100%;
		height: 4.16rem;
		background-image: url(../../../static/images/personCenter/code_bd.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	
	.code {
		padding: 0 0 0 .26rem;
		height: .66rem;
		line-height: .66rem;
		font-size: .28rem;
		color: #333;
	}
	
	.header_main {
		width: calc(100% - 1.04rem);
		bottom: -2.57rem;
		height: 3.77rem;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 .52rem;
	}
	#kouling{
		color: #9A7BFF;text-align: center;margin: .3rem 0;border: none;outline: none;
		width: 100%;
	}
</style>
<style>
	.code .weui-cell__primary {
		display: flex;
		align-items: center;
	}
	
	.header .vux-no-group-title {
		border-radius: .06rem;
	}
	.weui-toast__content{
		font-size: .26rem;
	}
</style>