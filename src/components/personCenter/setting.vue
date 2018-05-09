<template>
	<div>
		<group class="myOrder" style="margin: .2rem 0;border-top: .02rem solid #e5e5e5;">
			<cell title="宝库设防" is-link link="/personCenter/setting/accredit"></cell>
		</group>
		<group class="myOrder" style="margin-bottom: .2rem;border-top: .02rem solid #e5e5e5;">
			<div @click="clear()">
				<cell title="清理缓存" is-link></cell>
			</div>
			<!--<x-switch title="非wifi网络不自动播放" :value-map="['0', '1']" v-model="value"></x-switch>-->
		</group>
		<group class="myOrder" style="margin-bottom: .4rem;border-top: .02rem solid #e5e5e5;">
			<cell title="上书弹劾" is-link link="/personCenter/setting/feedback"></cell>
			<cell title="江湖规矩" is-link link="/rule"></cell>
			<cell title="自报家门" is-link link="/aboutUs"></cell>
		</group>
		<div style="margin: 0 .26rem;">
			<x-button type="default" class="f32 c3" @click.native="authLogout()">退出登录</x-button>
		</div>
		<loading v-model="showLoading" :text="loadText"></loading>
	</div>
</template>

<script>
	import { Group, Cell, XButton, XSwitch, Loading } from 'vux'
	export default {
		components: {
			Group,
			Cell,
			XButton,
			XSwitch,
			Loading
		},
		data() {
			return {
				value: '',
				showLoading: false,
				loadText: ''
			}
		},
		methods: {
			clear() {
				var token=localStorage.getItem("token")
				plus.cache.clear(function() {
					plus.nativeUI.toast("缓存清理成功");
					localStorage.setItem("token",token)
				});
			},
			// 注销所有登录授权认证服务
			authLogout() {
				var s = window.auths[0];
				var slef = this
				if(s.authResult) {
					s.logout(function(e) {
						slef.$router.go(-1)
						plus.storage.removeItem('token')
						plus.storage.removeItem('userInfo')
						localStorage.removeItem("token")
					}, function(e) {
						slef.$vux.toast.show({
							text: "退出失败",
							type: 'warn',
						})
					});

				} else {
					slef.$router.go(-1)
					plus.storage.removeItem('token')
					plus.storage.removeItem('userInfo')
					localStorage.removeItem("token")
				}

			}
		},
		created: function() {

		},
		mounted: function() {

		}
	}
</script>

<style scoped="scoped">

</style>