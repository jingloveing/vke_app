<template>
	<div>
		<div class="header">
			<p class="f24">押运财宝总值</p>
			<p style="font-size: .52rem;display: flex;justify-content: center;align-items: center;">1.081<span style="font-size: .4rem;">钻</span></p>
		</div>
		<tab :line-width=2 active-color='#9a7bff' v-model="index" custom-bar-width="1rem">
			<tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
		</tab>
		<swiper v-model="index" height="1000px" :show-dots="false">
			<swiper-item>
				<div class="tab-swiper">
					<div class="title">
						<span class="f30 c3">帮众贡献押运中财宝总计</span>
						<div class="header_list_num jewel">
							<img src="../../../static/images/personCenter/jewel.png" alt="" /> 8.86
						</div>
						<!--<div class="header_list_num gold">
                	   	   <img src="../../../static/images/personCenter/gold_acer.png" alt="" />
                	       8.86
                	     </div>
                	     <div class="header_list_num silver">
                	   	   <img src="../../../static/images/personCenter/silver.png" alt="" />
                	       8.86
                	     </div>
                	     <div class="header_list_num coppers">
                	   	   <img src="../../../static/images/personCenter/coppers.png" alt="" />
                	       8.86
                	     </div>-->
					</div>
					<div>
						<div class="list" v-for="i in 5">
							<div>
								<span>01-08 14:00</span>
							</div>
							<div class="f28 c9">
								<span style="font-family: arial;">帮众贡献一单，正在镖局押运中</span>
								<div class="header_list_num jewel">
									<img src="../../../static/images/personCenter/jewel.png" alt="" /> 8.86
								</div>
								<!--<div class="header_list_num gold">
                	   	   <img src="../../../static/images/personCenter/gold_acer.png" alt="" />
                	       8.86
                	     </div>
                	     <div class="header_list_num silver">
                	   	   <img src="../../../static/images/personCenter/silver.png" alt="" />
                	       8.86
                	     </div>
                	     <div class="header_list_num coppers">
                	   	   <img src="../../../static/images/personCenter/coppers.png" alt="" />
                	       8.86
                	     </div>-->
							</div>
						</div>
					</div>
				</div>
			</swiper-item>
			<swiper-item>
				<div class="tab-swiper">

				</div>
			</swiper-item>
			<swiper-item>
				<div class="tab-swiper">

				</div>
			</swiper-item>
			<swiper-item>
				<div class="tab-swiper">

				</div>
			</swiper-item>
			<swiper-item>
				<div class="tab-swiper">

				</div>
			</swiper-item>
		</swiper>
	</div>
</template>

<script>
	import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
	const list = () => ['帮众', '淘宝', '京东', '蘑菇街', '唯品会']
	const url='http://xlk.dxvke.com/'
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
				demo2: '美食',
				index: 0
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
				if(this.list2.length < 6) {
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
	.header {
		text-align: center;
		width: 100%;
		height: 2.68rem;
		background-image: url("../../../static/images/personCenter/underWay_bd.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		color: white;
		padding-top: .7rem;
		box-sizing: border-box;
	}
	
	.title {
		height: 1.14rem;
		background: white;
		display: flex;
		align-items: center;
		padding: 0 .26rem;
		margin: .1rem 0;
		border-bottom: .01rem solid #e5e5e5;
		border-top:.01rem solid #e5e5e5;
	}
	
	.header_list_num {
		font-size: .32rem;
		color: #FFB034;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.header_list_num>img {
		width: .22rem;
		height: .22rem;
		margin-right: .06rem;
		margin-left: .1rem;
	}
	
	.jewel {
		color: #35a8ed;
	}
	
	.gold {
		color: #fdc71b;
	}
	
	.silver {
		color: #999;
	}
	
	.coppers {
		color: #ffb034;
	}
	.list {
		background: white;
		padding: .26rem .26rem;
		border-bottom: .01rem solid #e5e5e5;
	}
	
	.list>div {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>