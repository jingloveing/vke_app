<template>
	<div>
		<group class="myOrder" style="margin-top:.2rem;border-top: .01rem solid #e5e5e5;">
			<x-input title="" required placeholder="昵称" :show-clear="true" autocapitalize="characters"></x-input>
		</group>
		<p class="tip f24 c9">请注意昵称长度，5-24个字</p>
		<div style="margin:0 .26rem;">
			<x-button type="primary" action-type="button" class='f32'>保存</x-button>
		</div>
	</div>
</template>

<script>
	import { XInput, Group,XButton} from 'vux'
	export default {
		components: {
			XInput,
			Group,
			XButton
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style scoped="scoped">
   .tip{
   	height: .87rem;
   	line-height: .87rem;
   	padding: 0 .26rem;
   }
</style>