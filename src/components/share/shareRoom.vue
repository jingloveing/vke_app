<template>
	<div>
		<x-header :left-options="{showBack: false}" title="一键分享" class="header"></x-header>
		<scroller :on-infinite="infinite" :on-refresh="refresh" ref="myscroller" style="margin-top: 1.28rem;">
		<div class="tip tip1" id="tip1" v-show="today.length!==0">今/日/更/新</div>
		<div class="main">
			<div class="list" v-for="(item,index) in today" :key="index">
				<div class="left">
					<img src="../../../static/images/vke.png" alt="" class="icon" />
				</div>
				<div class="right">
					<div class="right-title flex">
						<div>
							<p class="f28 c3">每日优选</p>
							<p class="f20" style="color: #d1d1d1;">{{item.create_time}}</p>
						</div>
						<router-link class="flex" :to="{name:'ShareDetail',query:{id:item.id}}">
							<img src="../../../static/images/shareRoom/share.png" alt="" style="width: .28rem;height: .28rem;" />
							<span class="f24 c_f" style="margin-left: .08rem;">分享</span>
						</router-link>
					</div>
					<div>
						<p class="f28 c3" style="line-height: .32rem;margin-top: .1rem;">{{item.msg}}</p>
						<div class="pic">
							<router-link :to="{name:'ShareDetail',query:{id:item.id}}">
								<img :src="item.image_url" alt="" />
							</router-link>
							<div class="quan flex">
								<img src="../../../static/images/shareRoom/quan_r.png" alt="" />
								<div class="quan-right">
									<span class="f20">￥</span><span class="f28">{{item.reserve_price}}</span>
								</div>
							</div>
						</div>
						<router-link class="f20 c6 detail-btn" :to="{name:'ShareDetail',query:{id:item.id}}">查看详情</router-link>
					</div>
				</div>
			</div>
		</div>
		<div class="tip tip2" id="tip2" v-show="before.length!==0">往/日/更/新</div>
		<div class="main">
			<div class="list" v-for="(item,index) in before">
				<div class="left">
					<img src="../../../static/images/vke.png" alt="" class="icon" />
				</div>
				<div class="right">
					<div class="right-title flex">
						<div>
							<p class="f28 c3">每日优选</p>
							<p class="f20" style="color: #d1d1d1;">{{item.create_time}}</p>
						</div>
						<router-link :to="{name:'ShareDetail',query:{id:item.id}}" class="flex">
							<img src="../../../static/images/shareRoom/share.png" alt="" style="width: .28rem;height: .28rem;" />
							<span class="f24 c_f" style="margin-left: .08rem;">分享</span>
						</router-link>
					</div>
					<div>
						<p class="f28 c3" style="line-height: .32rem;margin-top: .1rem;">{{item.msg}}</p>
						<div class="pic">
							<router-link :to="{name:'ShareDetail',query:{id:item.id}}">
								<img :src="item.image_url" alt="" />
							</router-link>
							<div class="quan flex">
								<img src="../../../static/images/shareRoom/quan_r.png" alt="" />
								<div class="quan-right">
									<span class="f20">￥</span><span class="f28">{{item.reserve_price}}</span>
								</div>
							</div>
						</div>
						<router-link class="f20 c6 detail-btn" :to="{name:'ShareDetail',query:{id:item.id}}">查看详情</router-link>
					</div>
				</div>
			</div>
		</div>
		</scroller>
	</div>
</template>

<script>
	import { XHeader, Swiper, } from 'vux'
	const url='http://xlk.dxvke.com'
//  const url=''
	export default {
		name: 'shareRoom',
		components: {
			XHeader,
			Swiper,
		},
		data() {
			return {
				tipFixed1: false,
				tipFixed2: false,
				offsetTop1:'',
				offsetTop2:'',
				defaultImg: 'this.src="' + require('../../../static/images/default_img.png') + '"',
				page:1,
				limit:20,
				noData: false,
				today:[],
				before:[]
			}
		},
		methods: {
			//      商品列表
			getList: function() {
				this.$http({
					method: 'get',
					url: url+'/api/shareList',
					params:{
						page:this.page,
						limit:this.limit
					}
				}).then((res) => {
					if(res.data.code == '200') {
						if(res.data.data.today== 0 && res.data.data.before==0) {
							this.noData = true
							this.$refs.myscroller.finishInfinite(2);
						} else {
							this.today = this.today.concat(res.data.data.today)
							this.before = this.before.concat(res.data.data.before)
							this.$refs.myscroller.finishPullToRefresh()
						}
						plus.storage.setItem("today",JSON.stringify(this.today))
						plus.storage.setItem("before",JSON.stringify(this.before))
					}else{
						this.noData = true
						this.$refs.myscroller.finishInfinite(2);
					}
				}, (err) => {
					this.today=JSON.parse(plus.storage.getItem("today"))
					this.before=JSON.parse(plus.storage.getItem("before"))
					this.noData = true
					this.$refs.myscroller.finishInfinite(2);
					console.log(err)
				})
			},
//			handleScroll() {
//				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
//				
//				if(scrollTop >this.offsetTop1) {
//					this.tipFixed1 = true
//				} else {
//					this.tipFixed1 = false
//				}
//				
//				if(scrollTop >this.offsetTop2) {
//					this.tipFixed2 = true
//				} else {
//					this.tipFixed2 = false
//				}
//				
//				
//			},
			infinite(done) {
				if(this.noData) {
					setTimeout(() => {
						this.$refs.myscroller.finishInfinite(2);
					})
					return;
				} else {
					let self = this; //this指向问题
					setTimeout(() => {
						self.page += 1
						self.getList()
						done()
					}, 1500)
				}
			},
			refresh(done) {
				var self = this
				this.page = 1
				this.today=[]
				this.before=[]
				this.getList()
				setTimeout(function() {
					self.top = self.top - 10;
					done()
				}, 1500)
			},
			
		},
		mounted: function() {
//			this.offsetTop1 = document.getElementById('tip1').offsetTop
//			this.offsetTop2 = document.getElementById('tip2').offsetTop
//			window.addEventListener('scroll', this.handleScroll)

		},
		created: function() {
           this.getList()
		},
		destroyed() {
//			window.removeEventListener('scroll', this.handleScroll)
		},
	}
</script>

<style scoped="scoped">
	.header {
		border: none;
		background: -webkit-linear-gradient(left, #8721b5, #db3283);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(left, #8721b5, #db3283);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(left, #8721b5, #db3283);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(left, #8721b5, #db3283);
		/* 标准的语法 */
	}
	
	.tip {
		line-height: .8rem;
		height: .8rem;
		text-align: center;
		font-size: .28rem;
	}
	
	.tip1 {
		color: #9e26a7;
		background: url(../../../static/images/shareRoom/today_bg.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	
	.tip2 {
		color: #50a0fe;
		background: url(../../../static/images/shareRoom/yesterday_bg.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	
	.list {
		background: white;
		padding: .2rem .26rem;
		display: flex;
		margin-bottom: .1rem;
	}
	
	.list .icon {
		width: .88rem;
		height: .88rem;
		border-radius: 50%;
	}
	
	.right {
		width: calc(100% - .88rem);
		padding-left: .14rem;
	}
	
	.right-title {
		justify-content: space-between;
	}
	
	.pic {
		width: 4.8rem;
		height: 4.8rem;
		margin: .2rem 0;
		position: relative;
	}
	
	.pic img {
		width: 100%;
		height: 100%;
	}
	
	.quan>img {
		width: .22rem;
		height: .4rem;
	}
	
	.pic .quan {
		height: .4rem;
		position: absolute;
		right: .16rem;
		bottom: .32rem;
	}
	
	.quan-right {
		padding-right: .1rem;
		line-height: .4rem;
		height: .4rem;
		color: white;
		background-color: rgba(154, 123, 255, 0.8);
	}
	
	.detail-btn {
		width: 1.21rem;
		height: .4rem;
		line-height: .4rem;
		border-radius: .2rem;
		border: .01rem solid #9a9a9a;
		text-align: center;
		float: right;
	}
	.isFixed{
		width: 100%;
		position: fixed;
		top:.88rem;
		z-index: 99999;
	}
</style>