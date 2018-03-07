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
						<p>提取方式：在个人中心——小金库内您现有的财宝值——点击挂单——选择您的首款账户（支付宝／微信／网银）——输入您要提现的金额—---选择确认挂单，钱庄系统在收到您的挂单回收申请后会进入自动排队处理，把挂单变卖的财宝值兑换成货币划到您挂单时指定的收款账户内</p>
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
			<group class="cell">
				<cell title="挂单有无最低要求？" is-link :border-intent="false" :arrow-direction="show6 ? 'up' : 'down'" @click.native="show6 = !show6" class="f26 c3 title"></cell>

				<div class="slide f26 c6" :class="show6?'animate':''">
					<div style="padding-bottom: .5rem;line-height: .42rem;">
						<p>挂单回收官方无最低限度要求，纵使1铜板也可挂单；挂单成交后，对应财宝值由系统回收，小金库内库存栏会减少对应数量财宝值</p>
					</div>
				</div>

			</group>
			<group class="cell">
				<cell title="如果一段时间不提现财宝值会消失么？" is-link :border-intent="false" :arrow-direction="show7 ? 'up' : 'down'" @click.native="show7 = !show7" class="f26 c3 title"></cell>

				<div class="slide f26 c6" :class="show7?'animate':''">
					<div style="padding-bottom: .5rem;line-height: .42rem;">
						<p>您好：每个月的22日以后小金库内库存里的财富值您都可以挂单，如果财富值不提现或消费会一直在您的账户里，永远不会消失的哦</p>
					</div>
				</div>

			</group>
			<group class="cell">
				<cell title="什么是镖局押运？" is-link :border-intent="false" :arrow-direction="show8 ? 'up' : 'down'" @click.native="show8 = !show8" class="f26 c3 title"></cell>

				<div class="slide f26 c6" :class="show8?'animate':''">
					<div style="padding-bottom: .5rem;line-height: .42rem;">
						<p>您本人购物或粉丝购物后如有返佣的订单，但未签收等预估收入则显示在镖局押运栏目中；而小金库内为已结算数据</p>
					</div>
				</div>

			</group>
			<group class="cell">
				<cell title="镖局押送到我的小金库需要多久？" is-link :border-intent="false" :arrow-direction="show9 ? 'up' : 'down'" @click.native="show9 = !show9" class="f26 c3 title"></cell>

				<div class="slide f26 c6" :class="show9?'animate':''">
					<div style="padding-bottom: .5rem;line-height: .42rem;">
						<p>1.通过享利客平台领券到全网各大电商平台购物／粉丝购物等订单成立后 </p>
						<p>2. 通过享利客自营商城购物且付款订单成立后</p>
						<p>3. 通过分销／代理指定享利客特供商品订单成立后</p>
						<p>以上三种形式镖局押送最慢为23天时间
结算公式：购物后收到宝贝确认签收后7天结算，自动签收为23天结算
</p>
                        <p>结算核对日期：每月22日结算上月数据（需数据库进行数据复审匹配核对）注：如收货后不满意走7天无理由退货为无效订单则不获得对应财宝值奖励
</p>
					</div>
				</div>

			</group>
			<group class="cell">
				<cell title="通过享利客买的东西有保障吗？" is-link :border-intent="false" :arrow-direction="show10 ? 'up' : 'down'" @click.native="show10 = !show10" class="f26 c3 title"></cell>

				<div class="slide f26 c6" :class="show10?'animate':''">
					<div style="padding-bottom: .5rem;line-height: .42rem;">
						<p>1. 通过享利客平台领券购物：该购物方式为，享利客与全网各平台内商家合作由淘宝／天猫／京东／唯品会／蘑菇街／方面商家提供的隐私优惠券让利等动作，而从购买——付款——发货——收获——售后均由各平台上完成且获得对应保障，享利客仅提供导购与代表平台全体用户洽谈商家让利等作用；享利客不介入购物详尽事宜</p>
						<p>2. 通过享利客官方自营精选平台购物（货币购买／财宝值兑换）：均支持7天无理由，详见【退换货规则】享利客官方精选商品均由正规厂家或正品授权供货商进行上游供货，对每一个入驻开放供货平台的商品都进行了严格正规性／是否具备授权／厂家实地考察／抽样检测／仓储／物流等途径的严选提供给我们的客户，确保产品的正品与质量等保障</p>
						
					</div>
				</div>

			</group>
			<group class="cell">
				<cell title="通过享利客购物会不会被商家调包廉价产品以次充好？" is-link :border-intent="false" :arrow-direction="show10 ? 'up' : 'down'" @click.native="show10 = !show10" class="f26 c3 title"></cell>

				<div class="slide f26 c6" :class="show10?'animate':''">
					<div style="padding-bottom: .5rem;line-height: .42rem;">
						<p>不会出现该类情况的，您通过享利客领券购买的任何第三方平台或商家的产品一定是您在该购物平台看中的同一个宝贝（例如：天猫某商家内看中的某款宝贝）</p>
						<p>通过享利客购买全网各大平台均支持该平台的7天无理由退换货等售后保障，如发现产品不好或者不喜欢，请第一时间联系购买商家客服</p>
						
					</div>
				</div>

			</group>
			<group class="cell">
				<cell title="关于淘宝天猫平台购物返利问题公告？" is-link :border-intent="false" :arrow-direction="show11 ? 'up' : 'down'" @click.native="show11 = !show11" class="f26 c3 title"></cell>

				<div class="slide f26 c6" :class="show11?'animate':''">
					<div style="padding-bottom: .5rem;line-height: .42rem;">
						<p>由于阿里方面反对做返利，所以在享利客平台内领券淘宝／天猫购物均无法获得任何现金或非现金的返佣；仅能通过领券抵现等形式进行优惠服务</p>
						<p>通过享利客进行其他第三方平台购物可享受优惠券+返佣等奖励政策</p>
						<p>后续随着招商团队的洽谈陆续会有更多知名平台或商家给予享利客一定赞助，享利客也会通过对应的平台内活动等形式进行用户激励；让我们共同期待</p>
						
					</div>
				</div>

			</group>
			<group class="cell">
				<cell title="代理长老与正式长老的区别？" is-link :border-intent="false" :arrow-direction="show11 ? 'up' : 'down'" @click.native="show11 = !show11" class="f26 c3 title"></cell>

				<div class="slide f26 c6" :class="show11?'animate':''">
					<div style="padding-bottom: .5rem;line-height: .42rem;">
						<p>代理长老与正式长老享受同等尊享权益
代理长老：转入正式长老须有3个月的考核期；详见【代理长老考核规则】
正式长老：终身有效，无考核机制
</p>			
					</div>
				</div>
			</group>
			<group class="cell">
				<cell title="代理长老考核规则？" is-link :border-intent="false" :arrow-direction="show12 ? 'up' : 'down'" @click.native="show12 = !show12" class="f26 c3 title"></cell>

				<div class="slide f26 c6" :class="show12?'animate':''">
					<div style="padding-bottom: .5rem;line-height: .42rem;">
						<p>权益获取：旗下拥有150位直属江湖好友（帮众）即可申请成为长老，享受长老高佣等一切权益</p>	
						<p>代理转正式考核标准：</p>
						<p>1. 每个自然月作为一个考核期</p>
						<p>2. 转正考核期为三个月满足后终身享受正式长老权益</p>
						<p>3. 代理长老考核期内一个自然月内须满足</p>
						<p>a 自购或旗下好友通过享利客在各大平台购物累积15比（含）以上</p>
						<p>b 拉新或旗下好友活性度达累积达到100次以上（活性度：即一个自然周期内通过您的推荐进入享利客或通过推广后进入到享利客合作个大平台上架店铺的人数）</p>
						<p>c 活性度不是点击数，每个用户每日仅算1次活性度</p>
						<p>4. 当月达成目标次月继续享受代理长老权益</p>
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
				show6: false,
				show7: false,
				show8: false,
				show9: false,
				show10: false,
				show11: false,
				show12: false,
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