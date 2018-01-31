<template>
	<div>
		<div class="share">
			<div class="qr-main">
				<img src="../../../dist/static/images/default_img.png" alt="" class="qr"/>
			</div>
			<div style="display: flex;justify-content: space-between;align-items: center;margin: 1.5rem .98rem 0;">
				 <x-button :gradients="['#20fdb9', '#b5fca3']" class="share-btn">分享</x-button>
				 <x-button :gradients="['#20fdb9', '#b5fca3']" class="share-btn">保存图片</x-button>
			</div>
		</div>
	</div>
</template>

<script>
	import { XButton, } from 'vux'
	export default {
		name: 'share',
		components: {
			XButton
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		created: function() {
			
		},
		mounted: function() {

		}
	}
</script>

<style scoped="scoped">
	.share{
		width: 100%;
		height: 16.04rem;
		background-image: url(../../../static/images/personCenter/share_bd.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.qr-main{
		text-align: center;
	}
	.qr{
		width: 1.8rem;
		height: 1.8rem;
		margin-top: 4.85rem;
	}
	.share .share-btn{
		width: 2.42rem;
		line-height: .66rem;
		border-radius: .5rem;
		font-size: .28rem;
		vertical-align: middle;
		
	}
</style>
<style type="text/css">
	.share-btn.weui-btn + .weui-btn {
    margin-top: 0;
}
</style>