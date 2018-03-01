<template>
	<div>
		<x-header :left-options="{backText: ''}" title="商品详情">
			<a slot="right">
				<router-link to="">
					<img src="../../../static/images/share_black_icon.png" alt="" style="width: .4rem;height: .4rem;vertical-align: middle;" />
				</router-link>
			</a>
		</x-header>
		<div style="height: .88rem;"></div>
		<div>
			<div class="pic">
				<swiper auto loop :list="list" style="width:100%;" height="7.5rem" dots-class="custom-bottom" dots-position="center" :show-desc-mask="false" :onerror="defaultImg"></swiper>
				<!--<img :src="goodsDetail.pict_url" alt="" :onerror="defaultImg">-->
			</div>
			<div class="detail">
				<p class="name">{{goodsDetail.title}}</p>
				<div class="flex" style="align-items: flex-end;">
					<span class="prices"><small>￥</small><span>{{goodsDetail.zk_final_price.rmb}}</span><small v-show="goodsDetail.zk_final_price.corner!=='00'">.{{goodsDetail.zk_final_price.corner}}</small></span>
					<div class="f28 flex c9" style="margin:0 0 .08rem .3rem;">财宝价
						<div class="header_list_num jewel" style="margin-left: .1rem;">
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
				<div style="margin-left: .2rem;display: inline-block;">

				</div>
				<div class="flex">
					<span class="old_price">价格<del>￥{{goodsDetail.reserve_price.rmb}}<span
            v-show="goodsDetail.reserve_price.corner!=='00'">.{{goodsDetail.reserve_price.corner}}</span></del>
					</span>
					<span class="f24 c9">销量800件</span>
				</div>
			</div>
		</div>
		<div class="flex" style="background: white;margin-top: .16rem;height: .88rem;padding: 0 .3rem;justify-content: space-between;">
			<div class="flex">
				<div class="f24 tb-quan">
					<div>优惠券</div>
					<div>100元</div>
				</div>
				<span class="f24 c9" style="margin-left: .2rem;">领取优惠券</span>
			</div>
			<div class="r-arrow"></div>
		</div>
		<cell title="商品图文详情(点击查看)" is-link :border-intent="false" :arrow-direction="showDetail ? 'up' : 'down'" @click.native="showDetail = !showDetail" class="pic_detail f24 c3" style="height: .88rem; box-sizing: border-box;"></cell>
		<div class="slide" :class="showDetail?'animate':''" style="font-size: 0;">
			<img :src="img" alt="" v-for="img in goodsDetail.small_images" :onerror="defaultImg">
		</div>
		<div style="height: .98rem;"></div>
		<div class="footer">
			<div class="f_1 f1_l" @click="toHome">
				<img src="../../../static/images/home.png" alt="">
				<span>首页</span>
			</div>
			<div class="f_1 " @click="toCollect()">
				<x-icon type="ios-heart" size="22" style="padding-top:.16rem ;fill: #ff5200;" v-show="collect"></x-icon>
				<x-icon type="ios-heart-outline" size="22" style="padding-top:.16rem ;fill: #ff5200;" v-show="!collect"></x-icon>
				<span v-text="collect?'已收藏':'收藏'">收藏</span>
			</div>
			<div class="f_2 f2_l" @click="">
				<span>去购买</span>
			</div>
		</div>
		<toast v-model="showToast" type="text" :time="800" is-show-mask position="middle">{{toast}}</toast>
	</div>
</template>
<script>
	import { XHeader, Cell, CellBox, CellFormPreview, Group, Badge, Loading, Swiper, Toast, XNumber } from 'vux'
	import Clipboard from 'clipboard'

	export default {
		components: {
			Group,
			Cell,
			CellFormPreview,
			CellBox,
			Badge,
			Loading,
			XHeader,
			Swiper,
			Toast,
			XNumber
		},
		data() {
			return {
				showDetail: false,
				showActionsheet: true,
				collect: true,
				showToast: false,
				toast: '',
				showLoading: false,
				show: false,
				goodsDetail: {
					title: '',
					pict_url: '',
					small_images: [],
					reserve_price: {
						rmb: '',
						corner: ''
					},
					zk_final_price: {
						rmb: '',
						corner: ''
					},
					volume: '',
					category: ''
				},
				defaultImg: 'this.src="' + require('../../../static/images/default_img.png') + '"',
				command: '',
				//        click_url:''
				id: '',
				type: '',
				list: [{
					url: 'javascript:',
					img: 'https://static.vux.li/demo/1.jpg',
					title: '送你一朵fua'
				}, {
					url: 'javascript:',
					img: 'https://static.vux.li/demo/2.jpg',
					title: '送你一辆车'
				}, {
					url: 'javascript:',
					img: 'https://static.vux.li/demo/5.jpg',
					title: '送你一次旅行',
					fallbackImg: 'https://static.vux.li/demo/3.jpg'
				}]
			}
		},
		methods: {
			//      商品详情
			getGoodsDetail: function() {
				this.id = this.$route.query.id;
				this.type = this.$route.query.type
				this.$http({
					method: 'POST',
					url: '/api/goodsDetail',
					data: {
						goods_id: this.id,
						type: this.type
					}
				}).then((res) => {
					if(res.data.code == '200') {
						this.goodsDetail = res.data.data
						this.click_url = res.data.data.click_url
					}
				}, (err) => {
					console.log(err)
				})
			},
			toHome() {
				this.$router.push({
					path: '/home'
				})
			},
			click(id) {
				//        this.id=id
				//        this.$router.push({name:'goodsDetail',query:{id:id}})
				location.href = 'http://www.dxvke.com/goodsDetail/?id=' + id
				//        this.toTop()
				//        this.getGoodsDetail()
			},
			toCollect() {
				this.collect = !this.collect
				if(this.collect == false) {
					this.toast = "取消收藏成功"
					this.showToast = true
				} else {
					this.showToast = false
				}
			},
		},
		created: function() {
			this.id = this.$route.query.id
			this.type = this.$route.query.type
			this.getGoodsDetail()

		},
		mounted: function() {

		},
	}
</script>
<style scoped="">
	.pic {
		width: 100%;
		height: 7.5rem;
	}
	
	.pic img {
		width: 100%;
		height: 100%;
	}
	
	.detail {
		font-size: 0;
		background: white;
		padding: .22rem .22rem .3rem;
	}
	
	.detail .name {
		font-size: .32rem;
		color: #333333;
		line-height: .44rem;
	}
	
	.prices {
		font-size: .46rem;
		color: #ff5200;
	}
	
	.prices small {
		font-size: .32rem;
	}
	
	.juan {
		font-size: .2rem;
		color: #ff425f;
		border: .01rem solid #ff425f;
		border-radius: .05rem;
		margin-left: .2rem;
	}
	
	.juan_l {
		border-right: .01rem dotted #ff425f;
		padding: 0 .05rem;
	}
	
	.juan_r {
		padding: 0 .05rem;
	}
	
	.return_yuanBao {
		font-size: .2rem;
		color: #ff8a1e;
		padding: 0 .05rem;
		border: .01rem solid #ff8a1e;
		border-radius: .05rem;
		margin-left: .05rem;
	}
	
	.old_price {
		font-size: .28rem;
		color: #999999;
	}
	
	.old_price>del {
		margin: 0 .3rem 0 .05rem;
	}
	
	.sub-item {
		color: #888;
	}
	
	.slide {
		overflow: hidden;
		max-height: 0;
		transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
		background-color: white;
	}
	
	.slide img {
		width: 100%;
	}
	
	.animate {
		max-height: 9999px;
		transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
		transition-delay: 0s;
	}
	
	.pic_detail {
		background-color: white;
		margin-top: .16rem;
		border-bottom: .01rem solid #f4f4f4;
	}
	/*footer*/
	
	.footer {
		width: 100%;
		text-align: center;
		font-size: 0;
		background-color: white;
		height: .96rem;
		position: fixed;
		bottom: 0;
		border-top: .01rem solid #eeeeee;
	}
	
	.f_1 {
		width: 25%;
		font-size: .2rem;
		color: #444444;
	}
	
	.f_1 img {
		width: .4rem;
		height: .4rem;
		padding-top: .2rem;
	}
	
	.f_1 span {
		display: block;
		margin-top: -.1rem;
	}
	
	.f1_l {
		border-right: .01rem solid #eeeeee;
		box-sizing: border-box;
	}
	
	.f_2 {
		width: 50%;
		font-size: .28rem;
		color: white;
	}
	
	.f2_l {
		height: 100%;
		line-height: .98rem;
		background: #ff5200;
	}
	
	.footer>div {
		float: left;
	}
	/*选择商品尺码规格样式*/
	
	.main {
		width: 100%;
		height: 10rem;
		background: white;
		position: fixed;
		bottom: 0;
		z-index: 999999;
	}
	
	.main-content {
		width: 100%;
		height: 9.04rem;
		overflow-y: scroll;
	}
	
	.main-des {
		height: 1.38rem;
		width: 80%;
		padding-left: 2.3rem;
		padding-top: .2rem;
		box-sizing: border-box;
	}
	
	.main-size {
		margin: .4rem .3rem;
	}
	
	.main-size ul {
		flex-wrap: wrap;
	}
	
	.main-size ul li {
		line-height: .5rem;
		padding: 0 .2rem;
		border-radius: .5rem;
		border: .01rem solid #e5e5e5;
		font-size: .24rem;
		color: #666;
		margin-right: .2rem;
		margin-top: .3rem;
	}
	
	.main-footer {
		height: .96rem;
		width: 100%;
		position: absolute;
		bottom: 0;
		font-size: 0;
	}
	
	.main-footer div {
		width: 50%;
		line-height: .96rem;
		display: inline-block;
		color: white;
		text-align: center;
		vertical-align: middle;
	}
	
	.main-footer .sure {
		width: 100%;
		line-height: .96rem;
		display: inline-block;
		color: white;
		text-align: center;
		vertical-align: middle;
		background: #9A7BFF;
	}
	
	.main-footer div:nth-child(1) {
		background: -webkit-linear-gradient(left, #b8a2fe, #9a7bff);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(left, #b8a2fe, #9a7bff);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(left, #b8a2fe, #9a7bff);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(left, #b8a2fe, #9a7bff);
	}
	
	.main-footer div:nth-child(2) {
		background: -webkit-linear-gradient(left, #907af4, #8160ec);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(left, #907af4, #8160ec);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(left, #907af4, #8160ec);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(left, #907af4, #8160ec);
	}
	
	.s-pic {
		width: 1.78rem;
		height: 1.78rem;
		position: absolute;
		top: -.4rem;
		left: .3rem;
	}
	
	.s-cancel {
		width: .38rem;
		height: .38rem;
		right: .1rem;
		top: .1rem;
		position: absolute;
		padding: .1rem;
	}
	
	.tb-quan {
		line-height: .32rem;
		height: .32rem;
		border: .01rem solid #ff5200;
		display: flex;
		vertical-align: middle;
		color: #ff5200;
	}
	.tb-quan div{
		padding: 0 .04rem;
	}
	
	.tb-quan div:nth-child(1) {
		border-right: .01rem dashed #ff5200;
		box-sizing: border-box;
	}
	
	.r-arrow {
		display: inline-block;
		height: 6px;
		width: 6px;
		border-width: 2px 2px 0 0;
		border-color: #C8C8CD;
		border-style: solid;
		-webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
		transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
	}
</style>