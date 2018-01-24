<template>
	<div>
		<div class="searchDiv">
			<div class="left">
				<img src="static/images/logo.png" class="logo" alt="" />
			</div>
			<div>
				<div class="search">
					<img src="static/images/search_icon.png" alt="" class="search_icon" />
					<span>搜索商品</span>
				</div>
			</div>
			<div class="right">
				<img src="static/images/info.png" alt="" class="info" />
				<span class="info_num">12</span>
			</div>
		</div>
		<swiper auto :list="demoList" style="width:100%;" height="2.6rem" dots-class="custom-bottom" dots-position="center" :show-desc-mask="false" loop></swiper>
		<div style=" margin-top: -.3rem;z-index: 99999;position: relative;">
			<ul class="nav-small">
				<li>
					<img src="static/images/taoBao.png" :onerror="defaultImg">
					<span>淘宝</span>
				</li>
				<li>
					<img src="static/images/JD.png" :onerror="defaultImg">
					<span>京东</span>
				</li>
				<li>
					<img src="static/images/mogu.png" :onerror="defaultImg">
					<span>蘑菇街</span>
				</li>
				<li>
					<img src="static/images/vip.png" :onerror="defaultImg">
					<span>唯品会</span>
				</li>
				<li>
					<img src="static/images/vke.png" :onerror="defaultImg">
					<span>自营商城</span>
				</li>
			</ul>
		</div>
		<div class="news_main">
			<div class="news_left">
				<img src="static/images/vke_news.png" />
			</div>
			<div class="news_right">
				<swiper auto style="width:100%;" height="55px" loop direction="vertical" :interval=2000 :show-desc-mask="false" :show-dots="false">
					<swiper-item class="news" v-for="i in 5" :key="i">
						<div class="news_title">
							<p>新手购买必看</p>
							<p>这个冬天不太冷，冬装搭配</p>
						</div>
						<div class="news_pic">
							<img src="static/images/mogu.png" />
						</div>
					</swiper-item>
				</swiper>
			</div>
		</div>
		<div class="main">
			<div class="main_title">
				<img src="static/images/icon.png" alt="" />
				<span>店铺精选</span>
			</div>
			<div>
				<nav>
					<img src="static/images/goods.png" style="width: 100%;height: 100%;" :onerror="defaultImg">
					<div class="nav_name">
						<img src="static/images/mogu.png" class="nav_pic"/>
						<span class="break">店铺名称店铺名称店铺名称</span>
					</div>
					<div class="bd"></div>
				</nav>
				<scroller lock-y :scrollbar-x=false style="margin-top: .2rem;">
					<div class="box" ref="nav1">
						<!--<router-link :to="{name:'goodsDetail',query:{id:goods1.id}}" v-for="(goods1,index) in goods1" id="box1-item" style="width: 2.18rem;" class="box1-item" :key="index">-->
						<div class="box_content" v-for="i in 8" :key="i">
							<img src="static/images/goods.png" alt="" :onerror="defaultImg">
							<span class="dess">
            <p class="des_name break">产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍</p>
            <p class="des_price"><span class="new_price">￥11<span>.99</span></span>
							<span class="old_price">￥12<span>.12</span></span>
							</p>
							</span>
						</div>
						<div class="box_content more">
							<span>查看全部</span>
						</div>
						<!--</router-link>-->
					</div>
				</scroller>

				<!--<div class="toTop" @click="toTop()"><img src="/static/images/top.png" alt="" style="width: .35rem;height: .15rem;display: block;margin: .2rem auto .1rem;"><span>顶部</span></div>-->
			</div>
		</div>
		<loading v-model="showLoading" :text="loadText"></loading>

		<!--<div class="toTop" @click="toTop()">-->
		<!--<img src="/static/images/top.png" alt="" style="width: .35rem;height: .15rem;display: block;margin: .2rem auto .1rem;">-->
		<!--<span>顶部</span>-->
		<!--</div>-->
	</div>
</template>
<script>
	import { Swiper, SwiperItem, Scroller, Loading } from 'vux'
	export default {
		name: 'Home',
		components: {
			Swiper,
			SwiperItem,
			Scroller,
			Loading
		},
		data() {
			return {
				demoList: [],
				typeList: [],
				storeTypeList: [],
				goodsList: [],
				defaultImg: 'this.src="' + require('../../../static/images/default_img.png') + '"',
				pageIndex: 1,
				limit: 10,
				noData: false,

				showList1: true,
				scrollTop: 0,
				onFetching: false,
				bottomCount: 20,
				showLoading: false,
				loadText: '加载中...',
			}
		},
		methods: {
			//      获取首页轮播图
			getBannerList: function() {
				this.$http({
					method: 'POST',
					url: '/api/index_banner'
				}).then((res) => {
					if(res.data.code == '200') {
						const imgList = res.data.data.index_banner
						const demoList = imgList.map((item, index) => ({
							url: item.banner_url,
							img: item.banner_image
						}))
						this.demoList = demoList
						//          console.log(imgList)
					}
				}, (err) => {
					console.log(err)
				})
			},
			//      获取商品分类
			getTypeList: function() {
				this.$http({
					method: 'POST',
					url: '/api/index_type'
				}).then((res) => {
					if(res.data.code == '200') {
						const typeList = res.data.data.goods_type_up
						this.typeList = typeList
					}
				}, (err) => {
					console.log(err)
				})
			},
			//      获取商品列表
			getGoodsList: function() {
				const self = this
				this.$http({
					method: 'POST',
					url: '/api/index_goods',
					data: {
						page: this.pageIndex,
						limit: this.limit
					}
				}).then((res) => {
					if(res.data.code == '200') {
						if(res.data.data.goods.length == 0) {
							this.noData = true
							this.$refs.myscroller.finishInfinite(2);
							//             self.noData=false;
							//             self.$refs.myscroller.finishPullToRefresh();
						} else {
							this.goodsList = this.goodsList.concat(res.data.data.goods)
						}
					}
				}, (err) => {
					console.log(err)
				})
			},

			infinite(done) {
				if(this.noData) {
					setTimeout(() => {
						this.$refs.myscroller.finishInfinite(2);
					})
					return;
				} else {
					let self = this; //this指向问题
					setTimeout(() => {
						self.pageIndex += 1
						self.getGoodsList()
						done()
					}, 1500)
				}
			},
			refresh(done) {
				var self = this
				this.pageIndex = 1
				this.goodsList = []
				this.getBannerList()
				this.getTypeList()
				this.getGoodsList()
				setTimeout(function() {
					self.top = self.top - 10;
					done()
				}, 1500)
			},
			//      toTop(){
			//        document.documentElement.scrollTop = document.body.scrollTop =0;
			//      },
		},
		mounted: function() {
			this.$nextTick(function() {
				//        // 返回顶部
				//        let back_btn = document.getElementsByClassName('toTop')[0];
				//        window.onscroll=function () {
				//          let top = document.documentElement.scrollTop || document.body.scrollTop;
				////          console.log(top)
				//          if (top > 800) {
				//            back_btn.style.display = 'block';
				//          } else {
				//            back_btn.style.display = 'none';
				//          }
				//        }
			})
		},
		created: function() {
			this.getBannerList()
			//    this.getTypeList()
			//    this.getGoodsList()
		}
	}
</script>
<style scoped>
	.nav-small {
		overflow: hidden;
		padding: .38rem .2rem .1rem .2rem;
		background-color: white;
		border-top-left-radius: 50% .30rem;
		border-top-right-radius: 50% .30rem;
	}
	
	.nav-small li {
		margin-bottom: .25rem;
		width: 20%;
		float: left;
		list-style: none;
		text-align: center;
	}
	
	.nav-small li img {
		width: .8rem;
		height: .8rem;
		border-radius: 50%;
		margin: 0 auto;
		word-break: break-all;
	}
	
	.nav-small li span {
		font-size: .24rem;
		color: #333333;
		display: block;
	}
	
	.main {
		background: white;
	}
	
	.main_title {
		font-size: .3rem;
		color: #f51d46;
		text-align: center;
		vertical-align: middle;
		height: .92rem;
		line-height: .92rem;
	}
	
	.main_title>img {
		width: .38rem;
		height: .38rem;
		vertical-align: middle;
	}
	
	.searchDiv {
		height: .88rem;
		line-height: .88rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: -webkit-linear-gradient(left, #8721b5, #db3283);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(left, #8721b5, #db3283);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(left, #8721b5, #db3283);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(left, #8721b5, #db3283);
		/* 标准的语法 */
	}
	
	.searchDiv .left {
		width: 1.46rem;
		height: 100%;
		text-align: center;
		vertical-align: middle;
	}
	
	.searchDiv .search_icon {
		width: .28rem;
		height: .28rem;
		vertical-align: middle;
	}
	
	.logo {
		width: 1.06rem;
		height: .32rem;
	}
	
	.info {
		width: .4rem;
		height: .4rem;
		vertical-align: middle;
	}
	
	.search {
		width: 4.76rem;
		height: .56rem;
		line-height: .56rem;
		font-size: .28rem;
		color: #fff;
		text-align: left;
		border-radius: .5rem;
		padding: 0 .2rem;
		box-sizing: content-box;
		background: -webkit-linear-gradient(left, #a547ba, #db529a);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(left, #a547ba, #db529a);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(left, #a547ba, #db529a);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(left, #a547ba, #db529a);
		/* 标准的语法 */
	}
	
	.searchDiv .right {
		width: .88rem;
		text-align: center;
		line-height: 100%;
		position: relative;
	}
	
	.info_num {
		height: .32rem;
		line-height: .32rem;
		font-size: .2rem;
		color: white;
		background: #f51d46;
		border-radius: .5rem;
		display: inline-block;
		padding: 0 .05rem;
		text-align: center;
		position: absolute;
		right: .10rem;
		top: -.1rem;
	}
	
	.news_main {
		width: 100%;
		height: 1.1rem;
		background: white;
		border-top: .01rem solid #e5e5e5;
		border-bottom: .01rem solid #e5e5e5;
		margin-bottom: .2rem;
	}
	
	.news_left {
		width: 1.3rem;
		/*height: 100%;
  	line-height: 1.1rem;*/
		margin: .22rem 0;
		text-align: center;
		box-sizing: border-box;
		float: left;
		border-right: .01rem solid #e5e5e5;
	}
	
	.news_left>img {
		width: .74rem;
		height: .66rem;
		vertical-align: middle;
	}
	
	.news_right {
		float: right;
		width: calc(100% - 1.3rem);
		width: -moz-calc(100% - 1.3rem);
		width: -webkit-calc(100% - 1.3rem);
		height: 100%;
	}
	
	.news {
		font-size: .24rem;
		color: #666;
	}
	
	.news_title {
		float: left;
		padding: .2rem;
		box-sizing: border-box;
		width: 4.4rem;
	}
	
	.news_title>p {
		/*height: .55rem;
  	line-height: .55rem;*/
		word-wrap: break-word;
		-webkit-line-clamp: 1;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	
	.news_pic{
		width: 1.8rem;
		height: 1.1rem;
		float: right;
	}
	
	.news_pic>img {
		width: 100%;
		height: 100%;
	}
	
	nav {
		width: 100%;
		height: 3.58rem;
		position: relative;
	}
	.nav_name{
		font-size: .24rem;
		color: #fff;
		height: .5rem;
		position: absolute;
		background:rgba(255,255,255,0.3);
		border-radius: .5rem;
		top: .2rem;
		left: .2rem;
		box-sizing: border-box;
		z-index: 999;
		display: flex;
		align-items: center;
		padding: 0 0 0 .05rem;
	}
	.nav_name>span{
		max-width:2.38rem;
		float: right;
		white-space: nowrap;
		overflow: hidden;
		margin: 0 .2rem 0 .1rem;
	}
	.nav_pic{
		width: .42rem;
		height: .42rem;
		border-radius: 50%;
	}
	.bd{
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.3);
		position: absolute;
		top: 0;
		left: 0;
	}
	.box {
		height: 2.8rem;
		min-width: 21.3rem;
		position: relative;
		background-color: white;
		padding-bottom: .34rem;
		margin-bottom: .16rem;
	}
	
	.box_content {
		margin: 0 0 0 .18rem;
		width: 2.18rem;
		box-sizing: border-box;
    float: left;
	}
	
	.box_content img {
		width: 100%;
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
	}
	
	.old_price {
		color: #999;
		font-size: .2rem;
	}
	.more{
		display: table;
		font-size: .24rem;
		color: #333;
		background: #f2f2f2;
		height: 2rem;
		border-radius: .08rem;
	}
	.more>span{
		display: table-cell;
		text-align: center;
		vertical-align: middle;
	}
</style>
<style>
	.vux-slider>.vux-indicator>a>.vux-icon-dot.active {
		background-color: #db3283 !important;
	}
	
	.vux-slider>.vux-indicator>a>.vux-icon-dot {
		background-color: #dbdada !important;
	}
	
	.juan_style {
		border: .01rem solid #ff425f;
		display: inline-block;
		border-radius: .02rem;
	}
	
	.juan_style_left {
		font-size: .20rem;
		color: #ffeff2;
		background-color: #ff425f;
		height: 100%;
		display: inline-block;
		padding: 0 .05rem;
	}
	
	.juan_style_right {
		font-size: .20rem;
		color: #ff425f;
		background-color: #ffeff2;
		height: 100%;
		display: inline-block;
		padding: 0 .05rem;
	}
	
	.return_num_style {
		padding: 0 .05rem;
		color: #ff8a1e;
		font-size: .2rem;
		border-radius: .02rem;
		border: .01rem solid #ff8a1e;
		display: inline-block;
		margin-left: .1rem;
	}
	
	.vux-slider>.vux-indicator,
	.vux-slider .vux-indicator-right {
		bottom: .25rem!important;
	}
</style>