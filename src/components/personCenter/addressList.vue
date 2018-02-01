<template>
	<div>
		<div>
			<div class="list" v-for="i in 3">
				<div>
					<h5 class="f28 c3">姓名<span style="font-family: arial;">1321432453</span></h5>
				    <p class="f26 c9">您的享利客订单1224325435已发货~，请注意查收顺丰快递，单号：2425345646</p>
				</div>
				<div class="operate f24 c3">
					<span style="color: #927BFF;">默认地址</span>
					<div class="operate-right">
						<router-link class="operate-right" to="/personCenter/myOrder/addAddress">
							<img src="../../../static/images/personCenter/edit_icon.png" alt="" class="icon"/>编辑
						</router-link>
						<div class="operate-right">
							<img src="../../../static/images/personCenter/del_icon.png" alt="" class="icon"/>删除
						</div>
					</div>
				</div>
			</div>
		</div>
		<div style="height: .96rem;"></div>
		<div style="position:fixed;bottom: 0;width: 100%;height: .96rem;">
			<x-button @click.native="click()" type="primary" action-type="button" style="width: 100%;height: 100%;border-radius: 0;" class="f32">添加新地址</x-button>
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
				type:0,
			}
		},
		methods: {
			click(){
            	this.$router.replace({name: 'AddAddress'})
            }
			
		},
		created: function() {

		},
		mounted: function() {
			
		}
	}
</script>

<style scoped="scoped">
	.list {
		background: white;
		border-radius: .06rem;
		margin: .3rem .26rem;
		padding: .27rem .29rem 0;
	}
	
	.list h5 {
		font-weight: normal;
		margin-bottom: .1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.list p{
		line-height: .34rem;
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
		margin-right: .1rem;
	}
	
	.radio {
		width: 100%;
		height: 100%;
		display: inline-block;
		position: absolute;
		top: 0;
		left: 0;
	}
	.success {
		width: .36rem;
		height: .36rem;
		position: absolute;
	}
	.operate{
		border-top:.01rem solid #e5e5e5;
		margin-top: .27rem;
		display: flex;
		align-items: center;
        justify-content: space-between;
        height: .94rem;
	}
	.icon{
		width: .28rem;
		height: .28rem;
		margin-right: .1rem;
	}
	.operate-right{
		display: flex;
		align-items: center;
		height: 100%;
		margin-left: .2rem;
		color: #333;
	}
</style>