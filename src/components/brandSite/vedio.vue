<template>
	<div>
			<div style="position: relative;width: 100%;font-size: 0;" @click="plays()">
				<!--controls---video的控制条-->
				<video controls id="myVideo" width="100%" style="height: 4.2rem;background: black;" :poster="viewDes.image
">
					<source :src="viewDes.view" type="video/mp4">
					<source src="/i/movie.ogg" type="video/ogg">
				</video>
				<div class="pause">
					<img src="/static/images/play.png" alt="" />
				</div>
			</div>
		<div class="f28 c3" style="padding: .3rem .26rem;background: white;">{{viewDes.view_name}}</div>
		<div style="background: white;margin-top: .2rem;">
			<p class="f28 c3" style="line-height: .88rem;height: .88rem;padding: 0 .26rem;">商品链接</p>
			<div>
				<swipers :options="swiperOptionB" style="height: 3.07rem;">
					<swiper-slide v-for="(list,index) in list" :key="index" class="box_content">
						<router-link :to="{name:'BrandDetail',query:{id:list.id,store_id:store_id}}">
							<img :src="list.thumb_url" alt="" :onerror="defaultImg">
							<span class="dess">
                                <p class="des_name break">{{list.product_name}}</p>
                                <p class="des_price">
                                	<span class="new_price">
                                		<span class="f20">￥</span>{{list.reserve_price}}
							</span>

							</p>
							</span>
							<div class="ticket">券{{list.coupon_number}}元</div>
						</router-link>
					</swiper-slide>
					<swiper-slide>
						<div class="box_content more" @click="goBack()">
							<span>查看全部</span>
						</div>
					</swiper-slide>
				</swipers>
				<!--<div class="toTop" @click="toTop()"><img src="/static/images/top.png" alt="" style="width: .35rem;height: .15rem;display: block;margin: .2rem auto .1rem;"><span>顶部</span></div>-->
			</div>
		</div>
	</div>
</template>

<script>
	import {} from 'vux'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		name: 'shareRoom',
		components: {
			swipers: swiper,
			swiperSlide,
		},
		data() {
			return {
				store_id: '',
				viewDes: {
					view: null,
					view_name: null,
				},
				list: [{
					id: null,
					thumb_url: null,
					coupon_number: null,
					product_name: null,
					reserve_price: null
				}],
				swiperOptionB: {
					// 如果需要滚动条
					slidesPerView: 3,
					preventClicksPropagation: true,
				},
				//				showShare:false,
				defaultImg: 'this.src="' + require('../../../static/images/default_img.png') + '"',
			}
		},
		methods: {
			//      获取商品信息
			getMerViewPro: function() {
				this.$http({
					method: 'get',
					url: this.http + '/api/merViewPro',
					params: {
						id: this.viewDes.id
					}
				}).then((res) => {
					if(res.data.code == '200') {
						this.list = res.data.data.list
						
					}
				}, (err) => {
					console.log(err)
				})
			},
			plays() {
				var video = document.getElementById('myVideo')
				if(video.paused) {
					video.play()
					video.parentNode.children[1].style.display = "none"
				} else {
					video.pause();
					video.parentNode.children[1].style.display = "inline-block"
				}
			},
			goBack() {
				this.$router.go(-1)
			}
		},
		mounted: function() {

		},
		created: function() {
			this.viewDes = JSON.parse(this.$route.query.item)
			this.getMerViewPro()
		},
		destroyed() {

		},
	}
</script>

<style scoped="scoped">
	/*.share {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding:.2rem .2rem 0 0;
		color: #333;
		position: fixed;
		z-index: 99999;
		top: 0;
		right: 0;
	}
	.share img {
		width: .4rem;
		height: .4rem;
	}*/
	/*去掉右下角的下载按钮*/
	
	video::-internal-media-controls-download-button {
		display: none;
	}
	
	video::-webkit-media-controls-enclosure {
		overflow: hidden;
	}
	
	video::-webkit-media-controls-panel {
		width: calc(100% + 30px);
	}
	
	.box_content {
		margin: 0 0 0 .18rem;
		width: 2rem!important;
		box-sizing: border-box;
		position: relative;
	}
	
	.box_content img {
		width: 2rem;
		height: 2rem;
		border-radius: .08rem;
	}
	
	.dess {
		text-align: center;
		font-size: .24rem;
	}
	
	.des_name {
		height: .3rem;
		color: #333;
		padding: 0 .1rem .1rem;
	}
	
	.des_price {
		margin: .05rem 0 .1rem;
	}
	
	.new_price {
		color: #ff425f;
		margin-right: .1rem;
		font-size: .26rem;
	}
	
	.old_price {
		color: #999;
		font-size: .2rem;
	}
	
	.more {
		display: table;
		font-size: .24rem;
		color: #333;
		background: #f2f2f2;
		height: 2rem;
		border-radius: .08rem;
	}
	
	.more span {
		display: table-cell;
		text-align: center;
		vertical-align: middle;
	}
	
	.ticket {
		position: absolute;
		display: inline-block;
		padding: 0 .2rem;
		line-height: .32rem;
		height: .32rem;
		background: #f51d46;
		font-size: .2rem;
		color: white;
		border-top-right-radius: .5rem;
		border-bottom-right-radius: .5rem;
		bottom: .95rem;
		left: -.1rem;
	}
</style>