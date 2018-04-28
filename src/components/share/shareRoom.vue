<template>
	<div>
		<scroller :on-infinite="infinite" :on-refresh="refresh" ref="myscroller" v-show="level">
			<swiper auto loop :list="shareBanner" style="width:100%;" height="3.28rem" dots-class="custom-bottom" dots-position="center" :show-desc-mask="false"></swiper>
			<div class="tab1 flex c6" id="tab1">
				<div class="flex tab1-tab active">
					<img src="../../../static/images/share/hot.png" alt="" v-show="active" />
					<img src="../../../static/images/share/hot_gray.png" alt="" v-show="!active" /> 发单酷
				</div>
				<div class="flex tab1-tab">
					<img src="../../../static/images/share/quan.png" alt="" v-show="!active" />
					<img src="../../../static/images/share/quan_gray.png" alt="" v-show="active" /> 话题圈
				</div>
			</div>
			<div v-show="active">
				<div class="searchDiv" style="background: white;">
					<img src="../../../static/images/personCenter/search_img.png" alt="">
					<form action="">
						<input type="text" placeholder="输入商品名称/关键字" v-model="keywords">
						<span class="to-search f24 flex" @click="toSearch()">搜索</span>
					</form>

				</div>
				<tab :line-width=3 active-color='#333' v-model="type" custom-bar-width="1.2rem" bar-active-color="#333" id="tip1">
					<tab-item class="vux-center" v-for="(item, index) in list1" @on-item-click="change(item,index)" :key="index">{{item}}
					</tab-item>
				</tab>
				<ul class="goods" style="background: white;">
					<router-link :to="{name:'TBDetail',query:{type:3,id:list.id}}" v-for="(list,index) in goodsList" :key="index" class="flex" tag="li">
						<!--<router-link :to="{name:'TBDetail',query:{type:3,id:list.id}}">-->
						<img :src="list.pict_url" alt="" class="pic" :onerror="defaultImg">
						<!--</router-link>-->
						<div class="content">
							<p class="title" v-text="list.title"></p>
							<div class="flex">
								<span class="juan_style">
                      <span class="juan_style_left">券</span>
								<span class="juan_style_right">{{list.coupon_number}}元</span>
								</span>
							</div>
							<div class="flex" style="justify-content: space-between;align-items: flex-end;">
								<div>
									<div class="f20 income">预估赚：{{list.commission}}元</div>
									<div>
										<span class="new_num"><span style="font-size: .24rem;">￥</span>{{list.zk_final_price.rmb}}<span style="font-size: .24rem;" v-show="list.zk_final_price.corner!=='00'">.{{list.zk_final_price.corner}}</span></span>
										<del class="old_num">￥{{list.reserve_price.rmb}}<span v-show="list.reserve_price.corner!=='00'">.{{list.reserve_price.corner}}</span></del>
									</div>
								</div>
								<div class="to-share" @click.stop="toSingleShare(list.id)">立即分享</div>
							</div>
						</div>
					</router-link>
				</ul>
				<div class="empty" v-show="goodsList.length==0"><img src="../../../static/images/empty/nothing.png" />
				</div>
			</div>
			<div v-show="!active">
				<tab :line-width=3 active-color='#333' v-model="type2" custom-bar-width="1.2rem" bar-active-color="#333" id="tip2">
					<tab-item class="vux-center" v-for="(item, index) in list2" @on-item-click="change2(item,index)" :key="index">{{item}}
					</tab-item>
				</tab>
				<div class="main" style="background: white;">
					<div class="list" v-for="(item,index) in circleList" :key="index">
						<div style="display: flex;">
							<div class="left">
								<img src="../../../static/images/vke.png" alt="" class="icon" />
							</div>
							<div class="right">
								<div class="right-title flex">
									<div>
										<p class="f28 c3">享利客优选</p>
										<p class="f20" style="color: #d1d1d1;">{{item.update_time}}</p>
									</div>
									<span class="flex" @click="toShareDetail(item)">
										<img src="../../../static/images/shareRoom/share.png" alt="" style="width: .28rem;height: .28rem;" />
										<span class="f24 c_f" style="margin-left: .08rem;">分享</span>
									</span>
								</div>
							</div>
						</div>
						<div style="overflow: hidden;">
							<p class="f28" style="line-height: .46rem;color: #28a6ef;">#{{item.title}}#</p>
							<p class="f28 c3" style="line-height: .46rem;">{{item.msg}}</p>
							<ul class="quan-list flex">
								<li v-for="(item,index) in item.share_list" :key="index" @click="toDetail(item.id,index)">
									<img :src="item.image" alt="" />
									<span v-show="index!=4" class="price">￥{{item.price}}</span>
								</li>
							</ul>
							<!--<router-link class="f20 c6 detail-btn" :to="{name:'ShareDetail',query:{id:1}}">查看详情</router-link>-->
						</div>
					</div>
				</div>
				<div class="empty" v-show="circleList.length==0"><img src="../../../static/images/empty/list.png" />
					</div>
			</div>
		</scroller>
		<div style="width: 100%;height: 100vh;background:black;opacity: .5;position: fixed;top: 0;" v-show="show" @click="show=!show">
		</div>
		<transition enter-active-class="fadeInUpBig" leave-active-class="fadeOutDownBig">
			<div v-show="show" class="share-main">
				<div class="share-main-content">
					<p class="f28 c6" style="text-align: center;line-height: .94rem;height: .94rem;">———分享至———</p>
					<div class="share-class flex">
						<div @click="shareAction('weixin','WXSceneSession')" class="flex share-btn">
							<img src="../../../static/images/share/weixinshare.png" alt="" />
							<span class="f28 c3">微信</span>
						</div>
						<div @click="shareAction('weixin','WXSceneTimeline')" class="flex share-btn">
							<img src="../../../static/images/share/friendshare.png" alt="" />
							<span class="f28 c3">朋友圈</span>
						</div>
						<div @click="shareAction('qq','')" class="flex share-btn">
							<img src="../../../static/images/share/QQshare.png" alt="" />
							<span class="f28 c3">QQ</span>
						</div>
						<div @click="shareAction('sinaweibo','')" class="flex share-btn">
							<img src="../../../static/images/share/weiboshare.png" alt="" />
							<span class="f28 c3">微博</span>
						</div>

					</div>
				</div>
				<div @click="show=!show" class="f32 c3" style="text-align: center;line-height: .96rem;border-top: .01rem solid #e5e5e5;">取消</div>
			</div>
		</transition>

		<!--没有登录或等级为帮众时显示页面-->
		<div v-show="!level" class="rule">
			<x-header :left-options="{showBack: false}" title="一键分享规则" style="background-color: #f9f9f9;">
			</x-header>
			<div style="height: .88rem;"></div>
			<img src="../../../static/images/shareRoom/share_header.jpg" alt="" style="width: 100%;height: 3.84rem;" />
			<div class="rule-tip">项目介绍</div>
			<div class="contents">
				<div class="rule-main">
					<img src="../../../static/images/shareRoom/icon1.png" alt="" class="rule-main-icon" />
					<p>合伙人是指通过享利客平台分享各大电商平台 商家大额优惠券商品到微信等平台；朋友或客 户购买后您既可获取商家给予的对应佣金作为 奖励。他省钱你赚钱；不伤和气，不损面子。
					</p>
				</div>
				<div class="rule-main rule-main2">
					<img src="../../../static/images/shareRoom/icon2.png" alt="" class="rule-main-icon" />
					<div style="overflow-y: scroll;height: 3.16rem;">
						<p><span>特权1</span>全网各大电商平台全覆盖，商品优惠券覆盖率高达95%
						</p>
						<p><span>特权2</span>自用省钱；部分合作商家或指定商品领券抵现+平台补贴省上省！
						</p>
						<p><span>特权3</span>分享赚钱；把别人需要的东西分享出去，TA省钱你赚钱，利人利己
						</p>
						<p><span>特权4</span>化繁为简：朋友圈、微博一键发，不麻烦，想推什么直接搜一键发出长按识别自动激活淘宝或京东应用很简单</p>
						<p><span>特权5</span>正规电商平台交易，全网商家都是你的仓库，更主要的是买家不再担心售后与信任问题</p>
						<p><span>特权6</span>分裂系统：得益于享利客识别归属技术，多其实还可以更多，而我们做的就是跑马圈地更有2级分销模式助力发展</p>
						<p><span>特权7</span>强力锁粉：不再为客户重叠而担忧，一经锁定长期产生被动收益效应，你就是自己的老板，不做他人打工者
						</p>
						<p><span>特权8</span>无需技术：享利客全程技术维护与指导，告别学历与能力困境，享利客网赚能力培训计划进行中</p>
					</div>
				</div>
				<div class="rule-tip">如何升级</div>
				<div class="contents">
					<div class="rule-main">
						<img src="../../../static/images/shareRoom/icon3.png" alt="" class="rule-main-icon" />
						<p>通过分享旗下拥有150名用户或20名注册会员即 可申请免费成为长老级别用户，同等享受长老级别用户所有权益（无任何暗消费等后续要求）
						</p>
						<div class="flex" style="justify-content: space-between;">
							<span class="rule-btn" @click="toApplication()">我要申请</span>
							<span class="rule-btn" @click="toUpgrade()">立即升级</span>
						</div>
					</div>
				</div>
				<div class="rule-tip">级别说明</div>
				<div style="padding: 0 .36rem .7rem;line-height: .48rem;font-size: .24rem;color: white;">
					<p class="rule-title">一、制度说明</p>
					<p>帮主----长老----帮众，长老为帮主下级，帮众为长老下级；</p>
					<p>帮众----免费会员定位于自买省钱</p>
					<p>长老----VIP会员定位于分享赚钱</p>
					<p>帮主----顶级会员定位于店主</p>
					<p class="rule-title">二、规则说明</p>
					<p>1. 帮众升级长老需邀请20名注册新用户或分享累计拥有150名用户即可免费获得长老权限，或立即购买享利客特供商品即可马上开启长老权限。</p>
					<p>2. 消费佣金是指您或您的旗下会员使用享利客APP领取合作大额券下单收货并确认收货后，享利客奖励给您的佣金。</p>
					<p>3. 好友通过您的宣传海报或启蒙码下载并注册成为帮众会员后，Ta即永久成为您的旗下会员；未来他在享利客领券购物等行为即与您产生连锁关系。</p>
					<p>4. 当您的享利客会员取消订单、退货、或因订单异常等情况下，系统会扣除相应佣金。</p>
					<p>5. 佣金结算后您随时可以选择提现至支付宝等账户，并且无提现额度限制最低1毛钱也可提现。其他未尽事宜请参考白鹭书院内相关规则或说明</p>

				</div>
			</div>
		</div>
		<loading v-model="showLoading" :text="loadText"></loading>
	</div>
</template>

<script>
	import { XHeader, Swiper, Tab, TabItem, Loading, } from 'vux'
	const list1 = () => ['高佣金', '高券额']
	const list2 = () => ['今日更新', '昨日更新']
	//	const url = ''
	export default {
		name: 'shareRoom',
		components: {
			XHeader,
			Swiper,
			Tab,
			TabItem,
			Loading,
		},
		data() {
			return {
				keywords: "",
				active: true,
				list1: list1(),
				list2: list2(),
				type: 0,
				type2: 0,
				page: 1,
				limit: 20,
				noData: false,
				shareBanner: [],
				defaultImg: 'this.src="' + require('../../../static/images/default_img.png') + '"',
				goodsList: [],
				circleList: [],
				show: false,
				tipFixed1: false,
				tipFixed2: false,
				offsetTop1: '',
				offsetTop2: '',
				id: '',
				level: null,
				level_id: '',
				token: '',
				showLoading: false,
				loadText: '',
			}
		},
		methods: {
			getLevel: function() {
				this.$http({
					method: 'get',
					url: this.http + '/api/getMemberLevel'
				}).then((res) => {
					if(res.data.code == '200') {
						this.level_id = res.data.data.level_id
						if(this.level_id == 1) {
							this.level = false
						} else {
							this.level = true
							this.showLoading = true
							this.getBannerList()
							this.getList()
						}
						plus.storage.setItem('level_id', res.data.data.level_id)
					} else {
						this.level_id = plus.storage.getItem('level_id')
					}
				}, (err) => {
					console.log(JSON.stringify(err))
					this.level_id = plus.storage.getItem('level_id')
					plus.nativeUI.toast("加载失败");
				})
			},
			//      获取分享轮播图
			getBannerList: function() {
				this.$http({
					method: 'get',
					url: this.http + '/api/oneShareBanner'
				}).then((res) => {
					if(res.data.code == '200') {
						const imgList = res.data.data
						const demoList = imgList.map((item, index) => ({
							url: item.click_url,
							img: item.image
						}))
						this.shareBanner = demoList
						plus.storage.setItem("shareBanner", JSON.stringify(this.shareBanner))
					}
				}, (err) => {
					this.shareBanner = JSON.parse(plus.storage.getItem("shareBanner"))
					plus.nativeUI.toast("加载失败");
				})
			},
			//发单酷列表
			getList() {
				this.$http({
					method: 'get',
					url: this.http + '/api/searchShareList',
					params: {
						keywords: this.keywords,
						type: this.type,
						page: this.page,
						limit: this.limit
					}
				}).then((res) => {
					this.showLoading = false
					if(res.data.code == '200') {
						if(res.data.data.list == 0) {
							this.noData = true
							this.$refs.myscroller.finishInfinite(2);
						} else {
							this.goodsList = this.goodsList.concat(res.data.data.list)
							this.$refs.myscroller.finishPullToRefresh()
						}
					} else {
						this.noData = true
						this.$refs.myscroller.finishInfinite(2);
					}
				}, (err) => {
					this.showLoading = false
					this.noData = true
					this.$refs.myscroller.finishInfinite(2);
					plus.nativeUI.toast("加载失败");
				})
			},
			//搜索商品
			toSearch() {
				this.showLoading = true
				this.noData = false
				this.page = 1
				this.goodsList = []
				this.getList()
			},
			//     话题圈列表 
			getCircleList: function() {
				this.$http({
					method: 'get',
					url: this.http + '/api/getCircleList',
					params: {
						type: this.type2,
						page: this.page,
						limit: this.limit
					}
				}).then((res) => {
					this.showLoading = false
					if(res.data.code == '200') {
						if(res.data.data.list == 0) {
							this.noData = true
							this.$refs.myscroller.finishInfinite(2);
						} else {
							this.circleList = this.circleList.concat(res.data.data.list)
							this.$refs.myscroller.finishPullToRefresh()
						}

					} else {
						this.noData = true
						this.$refs.myscroller.finishInfinite(2);
					}
				}, (err) => {
					this.showLoading = false
					this.noData = true
					this.$refs.myscroller.finishInfinite(2);
					plus.nativeUI.toast("加载失败");
				})
			},
			//			handleScroll() {
			//				console.log('aaa')
			//				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
			//
			//				if(scrollTop > this.offsetTop1) {
			//					this.tipFixed1 = true
			//				} else {
			//					this.tipFixed1 = false
			//				}
			//
			//				if(scrollTop > this.offsetTop2) {
			//					this.tipFixed2 = true
			//				} else {
			//					this.tipFixed2 = false
			//				}
			//
			//			},
			infinite(done) {
				if(this.noData) {
					setTimeout(() => {
						this.$refs.myscroller.finishInfinite(2);
					})
					return;
				} else {
					let self = this;
					if(self.active) {
						setTimeout(() => {
							self.page += 1
							self.getList()
							done()
						}, 1500)
					} else {
						setTimeout(() => {
							self.page += 1
							self.getCircleList()
							done()
						}, 1500)
					}

				}
			},
			refresh(done) {
				var self = this
				this.page = 1
				this.shareBanner = []
				if(this.active){
					this.goodsList = []
				    this.getList()
				}else{
					this.circleList=[]
					this.getCircleList()
				}
				
				this.getBannerList()
				setTimeout(function() {
					self.top = self.top - 10;
					done()
				}, 1500)
			},
			change(item, index) {
				this.showLoading = true
				this.noData = false
				this.page = 1
				this.goodsList = []
				this.getList()
			},
			change2(item, index) {
				this.showLoading = true
				this.noData = false
				this.page = 1
				this.circleList = []
				this.getCircleList()
			},
			//分享操作
			shareAction(id, ex) {
				plus.nativeUI.showWaiting();
				var self = this
				var s = window.shares[id]
				self.$http.post(this.http + '/api/getShareImage', {
					type: 3,
					id: self.id,
				}).then((res) => {
					if(res.data.code == '200') {
						var picUrl = res.data.data.url
						var dtask = plus.downloader.createDownload(picUrl, {}, function(d, status) {
							// 下载完成
							if(status == 200) {
								var s = window.shares[id]
								if(!id || !s) {
									plus.nativeUI.closeWaiting();
									plus.nativeUI.toast("分享失败");
									return;
								}
								if(s.authenticated) {
									plus.nativeUI.closeWaiting();
									self.shareMessage(s, ex, d.filename);
								} else {
									plus.nativeUI.closeWaiting();
									s.authorize(self.shareMessage(s, ex, d.filename), function(e) {

									});
								}
							} else {
								plus.nativeUI.closeWaiting();
								plus.nativeUI.toast("分享失败");
							}
						});
						dtask.start();

					} else {
						plus.nativeUI.closeWaiting();
						plus.nativeUI.toast("分享失败，请重试");
					}
				}, (err) => {
					plus.nativeUI.closeWaiting();
					plus.nativeUI.toast("分享失败，请重试");
				})

			},

			toShareDetail(item) {
				this.$router.push({
					name: 'ShareDetail',
					query: {
						item: JSON.stringify(item)
					}
				})
			},
			toSingleShare(id) {
				this.show = !this.show
				this.id = id
			},
			//发送分享消息
			shareMessage(s, ex, d) {
				var self = this
				s.send({
					//					title: '享利客——',
					//					content: "sagdsa",
					pictures: [d],
					extra: {
						scene: ex
					}
				}, function() {
					self.show = !self.show
					self.id = ''
					plus.nativeUI.toast("分享成功！");
				}, function(e) {
					self.show = !self.show
					self.id = ''
					plus.nativeUI.toast("取消分享");
				});
			},
			toDetail(id, index) {
				if(index == 4) {

				} else {
					this.$router.push({
						name: 'TBDetail',
						query: {
							type: 4,
							id: id
						}
					})
				}
			},
			toUpgrade() {
				if(this.token) {
					this.$router.push({
						name: "GoodsDetail"
					})
				} else {
					plus.nativeUI.toast("请登录");

				}

			},
			toApplication() {
				if(this.token) {
					this.toUpgrage()
				} else {
					plus.nativeUI.toast("请登录");
				}
			},
			//申请升级长老
			toUpgrage() {
				var self = this
				this.$http.post(this.http + "/api/applyUpgrade").then(
					(res) => {
						if(res.data.code == '200') {
							this.$vux.confirm.show({
								title: res.data.data.message,
								onCancel() {

								},
								onConfirm() {
									self.showLoading = true
									self.level = true
									self.getBannerList()
									self.getList()
								}
							})
						} else if(res.data.code == "400") {
							this.$vux.confirm.show({
								title: res.data.error,
								onCancel() {

								},
								onConfirm() {
									self.$router.push({
										name: 'Share'
									})
								}
							})
						} else {

						}
					}, (err) => {
						plus.nativeUI.toast("加载失败");
					})
			}
		},
		mounted: function() {
			//			this.offsetTop1 = document.getElementById('tip1').offsetTop
			//			this.offsetTop2 = document.getElementById('tip2').offsetTop
			//			console.log(this.offsetTop1)
			//			window.addEventListener('scroll', this.handleScroll)
			var tab = document.getElementsByClassName('tab1-tab')
			var tab1 = document.getElementById('tab1')
			for(var i = 0; i < tab.length; i++) {
				let self = this
				tab[i].index = i
				tab[i].onclick = function() {
					self.page = 1
					if(this.index == 0) {
						self.showLoading = true
						self.active = true
						tab1.classList.remove('tabactive')
						self.goodsList = []
						self.getList()
					} else {
						self.showLoading = true
						self.active = false
						tab1.classList.add('tabactive')
						self.circleList = []
						self.getCircleList()
					}
					for(var j = 0; j < tab.length; j++) {
						tab[j].classList.remove('active')
					}
					tab[this.index].classList.add('active')
					self.noData = false
				}
			}

		},
		created: function() {
			this.token = plus.storage.getItem('token')
			if(this.token) {
				this.level_id = plus.storage.getItem('level_id')
				if(this.level_id) {
					if(this.level_id !== 1) {
						console.log('aaa')
						this.level = true
						this.showLoading = true
						this.getBannerList()
						this.getList()
					} else {
						console.log('bbb')
						this.level = false
					}
				} else {
					this.getLevel()
				}

			} else {
				console.log('eee')
				this.level = false
			}
		},
		destroyed() {
			//			window.removeEventListener('scroll', this.handleScroll)
		},
		activated: function() {
			this.token = plus.storage.getItem('token')
			if(this.token) {
				this.level_id = plus.storage.getItem('level_id')
				if(this.level_id) {
					if(this.level_id !== 1) {
						console.log('aaa')
						this.level = true
						this.showLoading = true
						this.getBannerList()
						this.getList()
					} else {
						console.log('bbb')
						this.level = false
					}
				} else {
					this.getLevel()
				}

			} else {
				console.log('eee')
				this.level = false
			}
		}

	}
</script>

<style scoped="scoped">
	.searchDiv {
		background-color: white;
		padding: .28rem .26rem .1rem;
		font-size: 0;
		position: relative;
	}
	
	.searchDiv>img {
		width: .28rem;
		height: .28rem;
		vertical-align: middle;
		position: absolute;
		top: .45rem;
		left: .46rem;
		z-index: 999;
	}
	
	.searchDiv>form {
		display: inline-block;
		width: 100%;
		box-shadow: 0rem .02rem .12rem 0 #dedede;
		border-radius: .06rem;
		position: relative;
	}
	
	.searchDiv>form>input {
		width: 100%;
		outline: none;
		padding: .1rem .1rem .1rem .7rem;
		border: none;
		line-height: .44rem;
		font-size: .28rem;
		box-sizing: border-box;
	}
	
	.to-search {
		position: absolute;
		right: 0;
		top: 0;
		color: white;
		width: 1.2rem;
		height: 100%;
		line-height: 100%;
		justify-content: center;
		border-top-right-radius: .06rem;
		border-bottom-right-radius: .06rem;
		background: -webkit-linear-gradient(left, #8721b5, #db3283);
		background: -o-linear-gradient(left, #8721b5, #db3283);
		background: -moz-linear-gradient(left, #8721b5, #db3283);
		background: linear-gradient(left, #8721b5, #db3283);
	}
	
	.tab1 {
		width: 100%;
		height: .8rem;
		font-size: .34rem;
		background: url(../../../static/images/share/tab_bd2.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	
	.tab1.tabactive {
		background: url(../../../static/images/share/tab_bd1.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	
	.tab1>div {
		width: 50%;
		height: 100%;
		justify-content: center;
	}
	
	.tab1>div>img {
		width: .36rem;
		height: .36rem;
		margin-right: .1rem;
	}
	
	.tab1 .active {
		color: #d73186;
	}
	
	.goods li {
		overflow: hidden;
		padding: .2rem .26rem .4rem .3rem;
		border-bottom: 1px solid #f4f4f4;
	}
	
	.pic {
		width: 2.3rem;
		height: 2.3rem;
		border-radius: .06rem;
	}
	
	.content {
		width: calc(100% - 2.3rem - .24rem);
		padding-left: .24rem;
		display: flex;
		flex-direction: column;
		height: 2.3rem;
	}
	
	.title {
		font-size: .28rem;
		color: #333333;
		height: .5rem;
		overflow: hidden;
		line-height: .5rem;
		margin-bottom: .1rem;
	}
	
	.new_num {
		font-size: .36rem;
		color: #f51d46;
	}
	
	.old_num {
		font-size: .24rem;
		color: #999999;
		margin-left: .1rem;
	}
	
	.income {
		height: .32rem;
		/*line-height: .32rem;*/
		display: inline-block;
		padding: 0 .12rem;
		border-radius: 1rem;
		color: white;
		margin-top: .46rem;
		background: -webkit-linear-gradient(left, #f51d46, #fe6d13);
		background: -o-linear-gradient(left, #f51d46, #fe6d13);
		background: -moz-linear-gradient(left, #f51d46, #fe6d13);
		background: linear-gradient(left, #f51d46, #fe6d13);
	}
	
	.to-share {
		width: 1.3rem;
		height: .56rem;
		line-height: .56rem;
		background: #F51D46;
		font-size: .24rem;
		text-align: center;
		color: white;
		border-radius: .06rem;
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
		margin-bottom: .1rem;
		border-top: .1rem solid #f4f4f4;
	}
	
	.list:nth-child(1) {
		border-top: 0;
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
	/*.detail-btn {
		width: 1.21rem;
		height: .4rem;
		line-height: .4rem;
		border-radius: .2rem;
		border: .01rem solid #9a9a9a;
		text-align: center;
		float: right;
		margin-top: .2rem;
	}*/
	
	.isFixed {
		width: 100%;
		position: fixed;
		top: .88rem;
		z-index: 99999;
	}
	
	.quan-list {
		width: 100%;
		line-height: 0;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	
	.quan-list li {
		width: calc((100% - .2rem) / 3);
		height: 2.3rem;
		overflow: hidden;
		margin-top: .1rem;
		position: relative;
	}
	
	.quan-list li img {
		width: 100%;
		height: auto;
		margin: -1rem 0;
	}
	
	.price {
		border-radius: .15rem;
		font-size: .2rem;
		display: inline-block;
		position: absolute;
		text-align: center;
		height: .3rem;
		line-height: .3rem;
		color: white;
		padding: 0 .12rem;
		right: .1rem;
		bottom: .1rem;
		background: -webkit-linear-gradient(left, #8721b5, #db3283);
		background: -o-linear-gradient(left, #8721b5, #db3283);
		background: -moz-linear-gradient(left, #8721b5, #db3283);
		background: linear-gradient(left, #8721b5, #db3283);
	}
	/*规则页面样式*/
	
	.rule {
		font-size: 0;
		background-color: #b178fe;
	}
	
	.rule-tip {
		height: .74rem;
		line-height: .74rem;
		width: 100%;
		color: white;
		font-size: .32rem;
		text-align: center;
		background: url(../../../static/images/shareRoom/bd_line.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	
	.contents {
		margin-top: .2rem;
		color: #333;
		font-size: .28rem;
	}
	
	.rule-main {
		width: 6.8rem;
		margin: 0 auto .5rem;
		padding: 1.3rem .5rem .36rem;
		box-sizing: border-box;
		background: white;
		position: relative;
		border-radius: .1rem;
		box-shadow: .03rem .05rem .24rem 0 #9865e0;
	}
	
	.rule-main-icon {
		position: absolute;
		top: .4rem;
		left: -.12rem;
		height: .81rem;
	}
	
	.rule-main p {
		line-height: .48rem;
	}
	
	.rule-main p>span {
		color: #ef2789;
		font-style: oblique;
		margin-right: .1rem;
		font-weight: bolder;
	}
	
	.rule-btn {
		width: 2.6rem;
		margin: .44rem 0 0;
		height: .8rem;
		line-height: .8rem;
		color: white;
		text-align: center;
		background: linear-gradient(left, #ef1b93, #feab00);
		display: inline-block;
		border-radius: .4rem;
	}
	
	.rule-title {
		margin: .1rem 0;
	}
	
	.share-btn {
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>