<template>
	<div>
		<div style="background: white;height: calc(100vh - .88rem);">
			<div class="upgrade-banner">
				<x-icon type="ios-arrow-left" size="30" style="fill: white;width: .86rem;position: absolute;top: .4rem;left: 0;" @click="goback()"></x-icon>
				<img src="../../../static/images/personCenter/upgrade-banner.jpg" alt="" class="banner" v-show="userInfo.level_id==1"/>
				<img src="../../../static/images/personCenter/upgrade-banner2.jpg" alt="" class="banner" v-show="(userInfo.level_id==2)||(userInfo.level_id==3)"/>
				<router-link class="banner-btn" to="/personCenter/myPrerogative">我的特权 > </router-link>
			</div>
			<div style="padding: .28rem .5rem 0 0;" v-show="userInfo.level_id==1">
				<div>
					<div class="tip flex">
						<img src="../../../static/images/personCenter/icon-1.png" alt="" class="tip-icon" />
						<h5 class="f28 c3">长老特权</h5>
					</div>
					<div style="padding-left: .68rem;line-height: .48rem;" class="f26 c6">
						<p>1. 自用50%利润返佣（限京东、蘑菇街）</p>
						<p>2. 享受直属粉丝购物利润的20%</p>
						<p>3. 享受直属粉丝指定商品分销权限，每单净赚50元</p>
						<p>4. 享受申请成立帮派权限</p>
						<p>5. 解锁推广佣金或粉丝贡献奖励佣金</p>
						<p>6. 享受不定期平台内各项奖励或免费活动</p>
					</div>
				</div>
			</div>
			<div style="padding: .28rem .5rem 0 0;" v-show="(userInfo.level_id==2)||(userInfo.level_id==3)">
				<div>
					<div class="tip flex">
						<img src="../../../static/images/personCenter/icon-1.png" alt="" class="tip-icon" />
						<h5 class="f28 c3">帮主特权</h5>
					</div>
					<div style="padding-left: .68rem;line-height: .48rem;" class="f26 c6">
						<p>1. 自用90%的利润奖励（限京东、蘑菇街）</p>
						<p>2. 享受旗下长老帮众等帮派好友购物利润的20%奖励</p>
						<p>3. 享受2代好友购物利润20%奖励</p>
						<p>4. 享受直属粉丝自营商城购物利润的30%分销奖励</p>
						<p>5. 享受指定商品总代权限，成本进货直营推广赚100元/件</p>
						<p>6. 享受指定商品总代权限，帮内好友分销后总代分佣赚50
元/件</p>
						<p>7. 享受平台营销类或市场运营类平台功能插件使用申请权</p>
						<p>8. 享受直属会员升任帮主的培训奖励每人/200元</p>
						<p>9. 享受不定期平台内各项奖励或免费活动</p>
					</div>
				</div>
			</div>
			<div style="padding: .28rem .5rem 0 0;" v-show="userInfo.level_id==1">
				<div>
					<div class="tip flex">
						<img src="../../../static/images/personCenter/icon-2.png" alt="" class="tip-icon" />
						<h5 class="f28 c3">升级规则</h5>
					</div>
					<div style="padding-left: .68rem;line-height: .48rem;" class="f26 c6">
						<p>1. 免费升级：旗下拥有150位帮众或20名注册会员可免费申请为长老</p>
						<p>2. 立即升级：购买188元特供商品立即获得代理权限免费享受长老权益</p>
					</div>
				</div>
			</div>
			<div style="padding: .28rem .5rem 0 0;" v-show="(userInfo.level_id==2)||(userInfo.level_id==3)">
				<div>
					<div class="tip flex">
						<img src="../../../static/images/personCenter/icon-2.png" alt="" class="tip-icon" />
						<h5 class="f28 c3">升级规则</h5>
					</div>
					<div style="padding-left: .68rem;line-height: .48rem;" class="f26 c6">
						<p>旗下拥有10位正式长老助阵即可申请成立帮派升任帮主；升任帮主具体事宜敬请联系官方客服</p>
					</div>
				</div>
			</div>
			<div v-show="userInfo.level_id==1">
				<div style="margin: .2rem .5rem 0">
				<x-button class="f32 free" @click.native="free()">免费申请</x-button>
			</div>
			<div style="margin: .2rem .5rem .36rem;">
				<x-button type="default" class="f32 c3" @click.native="toUpgrate()">立即升级</x-button>
			</div>
			</div>

		</div>
		<toast v-model="showToast" type="text" :time="800" is-show-mask position="middle">{{toast}}</toast>
	</div>
</template>

<script>
	import { Toast,XButton} from 'vux'
	export default {
		components: {
			Toast,XButton
		},
		data() {
			return {
				userInfo: {
					level_id: null
				},
				showToast: false,
				toast: ''
			}
		},
		methods: {
			free(){
				var self=this
				this.$http.post(this.http + '/api/applyUpgrade').then((res) => {
					if(res.data.code == '200') {
						this.$vux.confirm.show({
								title: res.data.data.message,
								onCancel() {
                                     self.userInfo.level_id=2
								},
								onConfirm() {
									self.$router.push({
										path: '/shareRoom'
									})
								}
							})
					} else {
						this.$vux.confirm.show({
								title: res.data.error,
								onCancel() {
                                        
								},
								onConfirm() {
									self.$router.push({
										name: 'Share'
									})
								}
							})
					}
				}, (err) => {

				})
			},
			toUpgrate() {
				this.$router.push({
					name: 'GoodsDetail'
				})
			},
			goback() {
				history.back(-1);
			}
		},
		created: function() {
//			this.userInfo = JSON.parse(plus.storage.getItem('userInfo'))
		},
		mounted() {

		},
		activated: function () {
			this.userInfo = JSON.parse(plus.storage.getItem('userInfo'))
		}
	}
</script>

<style scoped="scoped">
	.upgrade-banner {
		font-size: 0;
		position: relative;
	}
	
	.banner {
		width: 100%;
		height: 3.64rem;
	}
	
	.banner-btn {
		position: absolute;
		font-size: .24rem;
		color: rgba(255, 255, 255, .7);
		right: 0rem;
		top: .4rem;
		padding: .22rem .26rem;
	}
	
	.tip>h5 {
		line-height: .66rem;
	}
	
	.tip-icon {
		width: .28rem;
		height: .28rem;
		padding: 0 .2rem;
	}
	.free{
		background: white;
		color: #9A7BFF;
	}
</style>
<style type="text/css">
	.free.weui-btn:after{
		border: .02rem solid #9A7BFF;
	}
</style>