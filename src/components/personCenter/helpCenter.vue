<template>
	<div>
		<div class="helpCenter">
			<group class="cell">
				<cell title="什么是财宝值？" is-link :border-intent="false" :arrow-direction="show1 ? 'up' : 'down'" @click.native="show1 = !show1" class="f26 c3 title"></cell>

				<div class="slide f26 c6" :class="show1?'animate':''">
					<div style="padding-bottom: .5rem;line-height: .42rem;">
						<p>财宝值是指您在享利客平台内财富（电子货币）的一种表现形式；具体作用参考【财宝值的作用】</p>
						<p>查看方法：个人中心—小金库内查看精确：展示形式精确到角，数据精确到分</p>
						<p>比率：1:1</p>
						<p>进制方式：10进制</p>
						<p>表现形式：铜币／银元宝／金元宝／钻石／皇冠等形式</p>
					</div>
				</div>

			</group>
			<group class="cell">
				<cell title="财宝值有何用？" is-link :border-intent="false" :arrow-direction="show2 ? 'up' : 'down'" @click.native="show2 = !show2" class="f26 c3 title"></cell>

				<div class="slide f26 c6" :class="show2?'animate':''">
					<div style="padding-bottom: .5rem;line-height: .42rem;">
						<p>财宝值具备如下几个价值作用：</p>
						<p>1. 可以用来优惠购买享利客官方平台的自营精选商品</p>
						<p>2. 可以参与享利客官方的夺宝等限时活动。</p>
						<p>3. 可以选择挂单由享利客官方回收兑换现金形式进行提现；具体挂单提现参考【挂单规则】</p>
					</div>
				</div>

			</group>
			<group class="cell">
				<cell title="如何获得财宝值？" is-link :border-intent="false" :arrow-direction="show3 ? 'up' : 'down'" @click.native="show3 = !show3" class="f26 c3 title"></cell>

				<div class="slide f26 c6" :class="show3?'animate':''">
					<div style="padding-bottom: .5rem;line-height: .42rem;">
						<p>财宝值获取可通过如下几种方式：</p>
						<p>1. 通过享利客平台到全网各大电商平台购物后获得对应财宝值奖励</p>
						<p>2. a推广夺宝中当您的江湖好友（粉丝）通过您的推广后到享利客平台进行领券购买</p>
						<p>&nbsp;&nbsp;&nbsp;b在享利客自营精选当中购买等动作后获得对应财宝值奖励，且该江湖好友（粉丝）终身在享利客平台领券购物后您均可获得对应财富值的奖励</p>
					    <p>3. 通过使用现金购买享利客官方自营精选商品获得对应的财富值（通过财宝值兑换则不享受该奖励）</p>
					    <p>4. 长老／帮主旗下粉丝在特供商品内购买后获得60元/120元现金等对应分销奖励（现金提现前以财报值形式进行计算并展示）</p>
					    <p>注：财宝值暂不支持充值途径进行获取</p>
					</div>
				</div>

			</group>
			<group class="cell">
				<cell title="财宝值如何挂单？" is-link :border-intent="false" :arrow-direction="show4 ? 'up' : 'down'" @click.native="show4 = !show4" class="f26 c3 title"></cell>

				<div class="slide f26 c6" :class="show4?'animate':''">
					<div style="padding-bottom: .5rem;line-height: .42rem;">
						<p>提现结算时间为每月22日之后可以随时提取</p>
						<p>提取方式：在个人中心——小金库内您现有的财宝值——点击挂单——选择您的首款账户（支付宝／微信／网银）——输入您要提现的金额—---选择确认挂单，钱庄系统在收到您的挂单回收申请后会进入自动排队处理，把挂单变卖的财宝值兑换成货币划到您挂单时指定的收款账户内。</p>
					</div>
				</div>

			</group>
			<group class="cell">
				<cell title="财宝值挂单后多久到账？" is-link :border-intent="false" :arrow-direction="show5 ? 'up' : 'down'" @click.native="show5 = !show5" class="f26 c3 title"></cell>

				<div class="slide f26 c6" :class="show5?'animate':''">
					<div style="padding-bottom: .5rem;line-height: .42rem;">
						<p>一般情况下24小时内（如遇特殊情况48小时内）</p>
					</div>
				</div>

			</group>
		</div>
	</div>
</template>

<script>
	import { Cell, Group } from 'vux'

	export default {
		mounted() {
			setTimeout(() => {
				this.money = -1024
			}, 2000)
		},
		components: {
			Group,
			Cell
		},
		methods: {
			onClick() {
				console.log('on click')
			}
		},
		data() {
			return {
				show1: false,
				show2: false,
				show3: false,
				show4: false,
				show5: false,
			}
		}
	}
</script>

</script>

<style scoped="scoped">
	.title {
		height: .9rem;
		padding: 0 .26rem;
		box-sizing: border-box;
	}
	
	.slide {
		padding: 0 .4rem;
		overflow: hidden;
		max-height: 0;
		transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
		box-shadow: border-box;
	}
	
	.animate {
		max-height: 9999px;
		transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
		transition-delay: 0s;
	}
	
	.cell {
		border-top: .01rem solid #e5e5e5;
	}
	
	.cell:nth-child(1) {
		border: none;
	}
</style>
<style>
	.helpCenter .weui-cells:before {
		border-top: none;
		height: 0;
	}
	
	.helpCenter .weui-cells:after {
		height: 0;
		border-bottom: none;
	}
</style>