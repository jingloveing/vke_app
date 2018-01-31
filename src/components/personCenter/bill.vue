<template>
	<div>
		<tab :line-width=2 active-color='#9a7bff' v-model="index" custom-bar-width="1.5rem">
				<tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
		</tab>
		<swiper v-model="index" height="1000px" :show-dots="false">
				<swiper-item>
					<div class="tab-swiper">
						<p class="tip f28 c9">目前您领券节省总计为xxx元</p>
						<div class="list">
							<h5 class="f32 c3 list-title">淘宝订单 <span><span class="f24">￥</span>34<span>.00</span></span></h5>
							<p class="f24 c9">2013-02-11 12:22</p>
						</div>
					</div>
				</swiper-item>
				<swiper-item>
					<div class="tab-swiper">
						<p class="tip f28 c9">目前您的消费总计为xxx元</p>
						<div class="list">
							<h5 class="f32 c3 list-title">淘宝优惠券<span><span class="f24">￥</span>34<span>.00</span></span></h5>
							<p class="f24 c9">2013-02-11 12:22</p>
						</div>
						<div class="list">
							<h5 class="f32 c3 list-title">淘宝优惠券<span><span class="f24">￥</span>34<span>.00</span></span></h5>
							<p class="f24 c9">2013-02-11 12:22</p>
						</div>
						<div class="list">
							<h5 class="f32 c3 list-title">蘑菇街优惠券<span><span class="f24">￥</span>34<span>.00</span></span></h5>
							<p class="f24 c9">2013-02-11 12:22</p>
						</div>
						<div class="list">
							<h5 class="f32 c3 list-title">唯品会优惠券<span><span class="f24">￥</span>34<span>.00</span></span></h5>
							<p class="f24 c9">2013-02-11 12:22</p>
						</div>
					</div>
				</swiper-item>
			</swiper>
	</div>
</template>

<script>
	import { Tab, TabItem, Swiper, SwiperItem} from 'vux'
	const list = () => ['累计消费', '累计节省']
	export default {
		components: {
			Tab,
			TabItem,
			Swiper,
			SwiperItem
		},
		data() {
			return {
				list2: list(),
				demo2: '累计消费',
				index: 0,
			}
		},
		methods: {
			switchTabItem(index) {
				console.log('on-before-index-change', index)
				this.$vux.loading.show({
					text: 'loading'
				})
				setTimeout(() => {
					this.$vux.loading.hide()
					this.index01 = index
				}, 1000)
			},
			onItemClick(index) {
				console.log('on item click:', index)
			},
			addTab() {
				if(this.list2.length < 5) {
					this.list2 = list().slice(0, this.list2.length + 1)
				}
			},
			removeTab() {
				if(this.list2.length > 1) {
					this.list2 = list().slice(0, this.list2.length - 1)
				}
			},
			next() {
				if(this.index === this.list2.length - 1) {
					this.index = 0
				} else {
					++this.index
				}
			},
			prev() {
				if(this.index === 0) {
					this.index = this.list2.length - 1
				} else {
					--this.index
				}
			},
			change(value) {
				console.log('new Value', value)
			},
		}
	}
</script>

<style scoped="scoped">
	.tip{
		/*height: .88rem;*/
		line-height: .88rem;
		padding: 0 .26rem;
	}
	.list{
		background: white;
		padding: .15rem .26rem;
		border-bottom: .01rem solid #e5e5e5;
		
	}
	.list:nth-of-type(1){
		border-top: .01rem solid #e5e5e5;
	}
	.list-title{
		font-weight: normal;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: .1rem;
	}
</style>