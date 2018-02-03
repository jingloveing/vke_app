<template>
	<div>
		<div class="helpCenter">
			<group class="cell">
				<cell title="什么是财宝值？" is-link :border-intent="false" :arrow-direction="show1 ? 'up' : 'down'" @click.native="show1 = !show1" class="f26 c6 title"></cell>

				<div class="slide f26 c6" :class="show1?'animate':''">
					<p style="padding-bottom: .5rem;">哈哈搜房第四季度上飞机抵达福建is多福多寿奇偶发的时间哦啊过的几个点那个第三</p>
				</div>

			</group>
			<group class="cell">
				<cell title="财宝值有何用？" is-link :border-intent="false" :arrow-direction="show2 ? 'up' : 'down'" @click.native="show2 = !show2" class="f26 c6 title"></cell>

				<div class="slide f26 c6" :class="show2?'animate':''">
					<p style="padding-bottom: .5rem;">哈哈搜房第四季度上飞机抵达福建is多福多寿奇偶发的时间哦啊过的几个点那个第三</p>
				</div>

			</group>
			<group class="cell">
				<cell title="如何获得财宝值？" is-link :border-intent="false" :arrow-direction="show3 ? 'up' : 'down'" @click.native="show3 = !show3" class="f26 c6 title"></cell>

				<div class="slide f26 c6" :class="show3?'animate':''">
					<p style="padding-bottom: .5rem;">哈哈搜房第四季度上飞机抵达福建is多福多寿奇偶发的时间哦啊过的几个点那个第三</p>
				</div>

			</group>
			<group class="cell">
				<cell title="结算方法？" is-link :border-intent="false" :arrow-direction="show4 ? 'up' : 'down'" @click.native="show4 = !show4" class="f26 c6 title"></cell>

				<div class="slide f26 c6" :class="show4?'animate':''">
					<p style="padding-bottom: .5rem;">哈哈搜房第四季度上飞机抵达福建is多福多寿奇偶发的时间哦啊过的几个点那个第三</p>
				</div>

			</group>
			<group class="cell">
				<cell title="其他规则说明？" is-link :border-intent="false" :arrow-direction="show5 ? 'up' : 'down'" @click.native="show5 = !show5" class="f26 c6 title"></cell>

				<div class="slide f26 c6" :class="show5?'animate':''">
					<p style="padding-bottom: .5rem;">哈哈搜房第四季度上飞机抵达福建is多福多寿奇偶发的时间哦啊过的几个点那个第三</p>
				</div>

			</group>
		</div>
	</div>
</template>

<script>
	import { Cell,Group} from 'vux'

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
	.cell{
		border-top: .01rem solid #e5e5e5;
	}
	.cell:nth-child(1){
		border:none;
	}
</style>
<style>
	.helpCenter .weui-cells:before{
		border-top:none;
		height: 0;
	}
	.helpCenter .weui-cells:after{
		height: 0;
        border-bottom: none;
	}
</style>