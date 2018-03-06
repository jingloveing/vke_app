<template>
	<div>
		<p class="f28 c9" style="line-height: 1rem;padding-left: .26rem;">淘宝、京东账号授权登录仅供购物方便，授权可解除</p>
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
		</div>
		<group class="myOrder" style="margin-bottom: .2rem;">
			<cell link="/personCenter/setting/bindTel" title="手机绑定" :value="tel" style="border-top: .01rem solid #e5e5e5;" is-link></cell>
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
				tel: '1243254435',
				type: '1',
				jd_auth: 0,
				tb_auth: 0,
			}
		},
		methods: {
			//初始化获取页面信息
			getStart: function(type) {
				this.$http({
					method: 'get',
					url: '/api/accreditInfo',
					//					params:{type:type}
				}).then((res) => {
					if(res.data.code == '200') {
						this.jd_auth = res.data.data.data.jd_auth
						this.tb_auth = res.data.data.data.tb_auth
					} else {

					}
				}, (err) => {
					console.log(err)
				})
			},
			//      获取淘宝、京东授权
			getAccredit: function(type) {
				if(type == 1) {
					if(this.tb_auth == 0) {
						this.$http({
							method: 'get',
							url: '/api/doAccredit',
							params: {
								type: type
							}
						}).then((res) => {
							if(res.data.code == '200') {
								this.url = res.data.data.data.url
								window.location.href = this.url
							} else {

							}
						}, (err) => {
							console.log(err)
						})
					} else {
						this.$http({
							method: 'get',
							url: '/api/exitAccredit',
							params: {
								type: type
							}
						}).then((res) => {
							if(res.data.code == '200') {
								this.url = res.data.data.data.url
								window.location.href = this.url
							} else {

							}
						}, (err) => {
							console.log(err)
						})
					}
				} else {
					if(this.jd_auth == 0) {
						this.$http({
							method: 'get',
							url: '/api/doAccredit',
							params: {
								type: type
							}
						}).then((res) => {
							if(res.data.code == '200') {
								this.url = res.data.data.data.url
								window.location.href = this.url
							} else {

							}
						}, (err) => {
							console.log(err)
						})
					} else {
						this.$http({
							method: 'get',
							url: '/api/exitAccredit',
							params: {
								type: type
							}
						}).then((res) => {
							if(res.data.code == '200') {
								this.url = res.data.data.data.url
								window.location.href = this.url
							} else {

							}
						}, (err) => {
							console.log(err)
						})
					}
				}

			},
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