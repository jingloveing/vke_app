<template>
	<div>
		<div class="share">
			<div style="padding-top: 1.26rem;height: 7.56rem;">
				<swiper :options="swiperOptionB" ref="mySwiper">
					<swiper-slide v-for="(list,index) in list" :key="index">
						<div class="tabs">
							<img :src="list.image" alt="" />
						</div>
					</swiper-slide>

				</swiper>
			</div>
			<div style="display: flex;justify-content: space-between;align-items: center;margin: .64rem .98rem 0;">
				<x-button class="share-btn">分享</x-button>
				<x-button class="share-btn" @click.native="save()">保存图片</x-button>
			</div>
		</div>
	</div>
</template>

<script>
	import { XButton, } from 'vux'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
		var activeIndex=0
		const url='http://xlk.dxvke.com/'
	export default {
		name: 'share',
		components: {
			XButton,
			swiper,
			swiperSlide
		},
		data() {
			return {
				swiperOptionB: {
					effect: 'coverflow',
					slidesPerView: 1.5,
					centeredSlides: true,
					coverflowEffect: {
						rotate: 30,
						stretch: 10,
						depth: 60,
						modifier: 2,
						slideShadows: true
					},
					on: {
						//获取当前活slide的索引值
						slideChange: function() {
							activeIndex = this.activeIndex
						}
					},
				},
				list: [],
			}
		},
		methods: {
			//      图片列表
			getList: function() {
				this.$http({
					method: 'get',
					url: url+'/api/shareImage'
				}).then((res) => {
					if(res.data.code == '200') {
						this.list = res.data.data.url
					}
				}, (err) => {
					console.log(err)
				})
			},
			save() {
				var img = this.list[activeIndex].image
				console.log(img)
			}
		},
		created: function() {
			this.getList()
		},
		mounted: function() {

		},
		computed: {

		}
	}
</script>

<style scoped="scoped">
	.share {
		width: 100%;
		height: 16.04rem;
		background-image: url(../../../static/images/personCenter/share_bd.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	
	.share .share-btn {
		width: 2.42rem;
		line-height: .66rem;
		border-radius: .5rem;
		font-size: .28rem;
		vertical-align: middle;
		background: #fdd75b;
		color: #ef4848;
	}
	
	.tabs img {
		width: 5.04rem;
		height: 7.56rem;
	}
</style>
<style type="text/css">
	.share-btn.weui-btn+.weui-btn {
		margin-top: 0;
	}
</style>