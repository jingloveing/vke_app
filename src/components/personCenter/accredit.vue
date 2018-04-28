<template>
	<div>
		<!--<p class="f28 c9" style="line-height: 1rem;padding-left: .26rem;">淘宝、京东账号授权登录仅供购物方便，授权可解除</p>
		<div class="myOrders">
			<p class="flex f32 c3">
				<span v-text="tb_auth?'淘宝账号已授权':'淘宝账号未授权'"></span>
				<span class="f28 c9" @click="getAccredit(1)" v-text="tb_auth?'退出授权':'授权登录'"></span>
			</p>
		</div>
		<div class="myOrders">
			<p class="flex f32 c3">
				<span v-text="jd_auth?'京东账号已授权':'京东账号未授权'"></span>
				<span class="f28 c9" @click="getAccredit(2)" v-text="jd_auth?'退出授权':'授权登录'">授权登录</span>
			</p>
		</div>-->
		<group class="myOrder" style="margin-bottom: .2rem;">
			<cell :link="{path:'/personCenter/setting/bindTel',query:{type:type,tel:telephone}}" title="手机绑定" :value="type=='4'?telephone:''" style="border-top: .01rem solid #e5e5e5;" is-link></cell>
		</group>
	</div>
</template>

<script>
	import { Group, Cell, XButton, XSwitch } from 'vux'
	export default {
		components: {
			Group,
			Cell,
			XButton,
			XSwitch
		},
		data() {
			return {
				value: '',
				type: null,
				jd_auth: 0,
				tb_auth: 0,
				telephone:null,
				telephone_status:''
			}
		},
		methods: {
			//初始化获取页面信息
			getStart: function(type) {
				this.$http({
					method: 'get',
					url: this.http+'/api/accreditInfo',
					//					params:{type:type}
				}).then((res) => {
					if(res.data.code == '200') {
						this.jd_auth = res.data.data.jd_auth
						this.tb_auth = res.data.data.tb_auth
						this.telephone=res.data.data.telephone
						this.telephone_status=res.data.data.telephone_status
						if(this.telephone_status=='1'){
							this.type=4
						}else if(this.telephone_status=='2'){
							this.type=3
						}else{
							this.type=1
						}
					} else {

					}
				}, (err) => {
					console.log(JSON.stringify(err))
				})
			},
			getAccredit(type){
				this.$router.push({name:'DoAccredit',query:{type:type}})
			}
		},
		created: function() {
			this.getStart()
		}
	}
</script>
<style type="text/css">
	.myOrders {
		height: .9rem;
		line-height: .9rem;
		border-top: 0.01rem solid rgb(229, 229, 229);
		border-bottom: 0.01rem solid rgb(229, 229, 229);
		background: white;
		margin-bottom: .18rem;
	}
	
	.myOrders p {
		justify-content: space-between;
		padding: 0 .15rem;
	}
</style>
<style>
	.weui-cell__ft {
		font-size: .28rem;
	}
</style>