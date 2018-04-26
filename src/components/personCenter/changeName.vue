<template>
	<div>
		<group class="myOrder" style="margin-top:.2rem;border-top: .01rem solid #e5e5e5;">
			<x-input title="" required placeholder="昵称" :show-clear="true" autocapitalize="characters" v-model="userInfo.nickname"></x-input>
		</group>
		<p class="tip f24 c9">请注意昵称长度，5-24个字</p>
		<div style="margin:0 .26rem;">
			<x-button action-type="button" class='f32' @click.native="editInfo()">保存</x-button>
		</div>
		<toast v-model="showToast" type="text" :time="800" is-show-mask position="middle">{{toast}}</toast>
	</div>
</template>

<script>
	import { XInput, Group,XButton,Toast} from 'vux'
	const url='http://xlk.dxvke.com/'
	export default {
		components: {
			XInput,
			Group,
			XButton,
			Toast
		},
		data() {
			return {
               userInfo:{
               	nickname:''
               },
               showToast:false,
               toast:''
			}
		},
		methods: {
            	//      修改用户信息
			editInfo: function() {
				this.$http.post(url+'/api/updateInfo',{nickname:this.userInfo.nickname}).then((res) => {
					if(res.data.code == '200') {
						this.toast = res.data.data.message
					    this.showToast = true
					    
					    plus.storage.setItem('userInfo',JSON.stringify(this.userInfo))
					} else{
						this.toast = res.data.error
					    this.showToast = true
					}
				}, (err) => {
					console.log(JSON.stringify(err))
				})
			},
		},
		created:function(){
			this.userInfo=JSON.parse(plus.storage.getItem('userInfo'))
		},
		mounted() {
			
		},
	}
</script>

<style scoped="scoped">
   .tip{
   	height: .87rem;
   	line-height: .87rem;
   	padding: 0 .26rem;
   }
</style>