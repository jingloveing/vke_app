<template>
	<div>
		<div style="position: relative;margin-bottom: 1.5rem;">
			<div class="header">
				<p class="f24">财宝总值</p>
				<p style="font-size: .52rem;display: flex;justify-content: center;align-items: center;">{{total.acer}}<span style="font-size: .4rem;">
					<span v-show="total.type==1">铜币</span>
					<span v-show="total.type==2">银</span>
					<span v-show="total.type==3">金</span>
					<span v-show="total.type==4">钻石</span>
					<span v-show="total.type==5">皇冠</span>
					</span>
				</p>
			</div>
			<div class="header_main flex">
				<div class="header_list" style="width: 100%;">
					<ul>
						<li>
							<p class="header_list_title">挂单中</p>
							<div class="header_list_num king" v-show="withdraw_acer.type==5">
								<img src="../../../static/images/personCenter/king.png" alt="" /> {{withdraw_acer.acer}}
							</div>
							<div class="header_list_num jewel" v-show="withdraw_acer.type==4">
								<img src="../../../static/images/personCenter/jewel.png" alt="" /> {{withdraw_acer.acer}}
							</div>
							<div class="header_list_num gold" v-show="withdraw_acer.type==3">
								<img src="../../../static/images/personCenter/gold_acer.png" alt="" /> {{withdraw_acer.acer}}
							</div>
							<div class="header_list_num silver" v-show="withdraw_acer.type==2">
								<img src="../../../static/images/personCenter/silver.png" alt="" /> {{withdraw_acer.acer}}
							</div>
							<div class="header_list_num coppers" v-show="withdraw_acer.type==1">
								<img src="../../../static/images/personCenter/coppers.png" alt="" /> {{withdraw_acer.acer}}
							</div>
							<div class="header_list_num coppers" v-show="withdraw_acer.type==0">
								0
							</div>
						</li>
						<li>
							<p class="header_list_title">已成交</p>
							<div class="header_list_num king" v-show="withdraw_over.type==5">
								<img src="../../../static/images/personCenter/king.png" alt="" /> {{withdraw_over.acer}}
							</div>
							<div class="header_list_num jewel" v-show="withdraw_over.type==4">
								<img src="../../../static/images/personCenter/jewel.png" alt="" /> {{withdraw_over.acer}}
							</div>
							<div class="header_list_num gold" v-show="withdraw_over.type==3">
								<img src="../../../static/images/personCenter/gold_acer.png" alt="" /> {{withdraw_over.acer}}
							</div>
							<div class="header_list_num silver" v-show="withdraw_over.type==2">
								<img src="../../../static/images/personCenter/silver.png" alt="" /> {{withdraw_over.acer}}
							</div>
							<div class="header_list_num coppers" v-show="withdraw_over.type==1">
								<img src="../../../static/images/personCenter/coppers.png" alt="" /> {{withdraw_over.acer}}
							</div>
							<div class="header_list_num coppers" v-show="withdraw_over.type==0">
								0
							</div>
						</li>
						<li>
							<p class="header_list_title">库存</p>
							<div class="header_list_num king" v-show="chest_acer.type==5">
								<img src="../../../static/images/personCenter/king.png" alt="" /> {{chest_acer.acer}}
							</div>
							<div class="header_list_num jewel" v-show="chest_acer.type==4">
								<img src="../../../static/images/personCenter/jewel.png" alt="" /> {{chest_acer.acer}}
							</div>
							<div class="header_list_num gold" v-show="chest_acer.type==3">
								<img src="../../../static/images/personCenter/gold_acer.png" alt="" /> {{chest_acer.acer}}
							</div>
							<div class="header_list_num silver" v-show="chest_acer.type==2">
								<img src="../../../static/images/personCenter/silver.png" alt="" /> {{chest_acer.acer}}
							</div>
							<div class="header_list_num coppers" v-show="chest_acer.type==1">
								<img src="../../../static/images/personCenter/coppers.png" alt="" /> {{chest_acer.acer}}
							</div>
							<div class="header_list_num coppers" v-show="chest_acer.type==0">
								0
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!--<div class="rule">
			<div class="f30 c3 title">
				<img src="../../../static/images/personCenter/rule_icon.png" alt="" class="icon"/>财宝规则说明
			</div>
			<div class="f24 c3" style="line-height: .36rem;padding: 0 .6rem .3rem;">
				<p>哈哈哈</p>
				<p>哈哈哈</p>
				<p>哈哈哈</p>
			</div>
		</div>-->
		<div class="list" style="margin-bottom: .2rem;">
			<router-link class="enjoy" to="/personCenter/goldStore/fansOffer">
				<span class="f30 c3"><img src="../../../static/images/personCenter/enjoy_icon.png" alt="" class="icon"/>帮众贡献</span>
				<span class="f28 c9 right">查看详情
		<img src="../../../static/images/gt_white.png" alt="" class="enjoy-icon" /></span>
		</router-link>
		<ul>
			<li>
				<div class="header_list_num king" v-show="yesterday.type==5">
					<img src="../../../static/images/personCenter/king.png" alt="" /> {{yesterday.acer}}
				</div>
				<div class="header_list_num jewel" v-show="yesterday.type==4">
					<img src="../../../static/images/personCenter/jewel.png" alt="" /> {{yesterday.acer}}
				</div>
				<div class="header_list_num gold" v-show="yesterday.type==3">
					<img src="../../../static/images/personCenter/gold_acer.png" alt="" /> {{yesterday.acer}}
				</div>
				<div class="header_list_num silver" v-show="yesterday.type==2">
					<img src="../../../static/images/personCenter/silver.png" alt="" /> {{yesterday.acer}}
				</div>
				<div class="header_list_num coppers" v-show="yesterday.type==1">
					<img src="../../../static/images/personCenter/coppers.png" alt="" /> {{yesterday.acer}}
				</div>
				<div class="header_list_num coppers" v-show="yesterday.type==0">
					0
				</div>
				<p class="header_list_title">昨日贡献</p>
			</li>
			<li>
				<div class="header_list_num king" v-show="total_bang.type==5">
					<img src="../../../static/images/personCenter/king.png" alt="" /> {{total_bang.acer}}
				</div>
				<div class="header_list_num jewel" v-show="total_bang.type==4">
					<img src="../../../static/images/personCenter/jewel.png" alt="" /> {{total_bang.acer}}
				</div>
				<div class="header_list_num gold" v-show="total_bang.type==3">
					<img src="../../../static/images/personCenter/gold_acer.png" alt="" /> {{total_bang.acer}}
				</div>
				<div class="header_list_num silver" v-show="total_bang.type==2">
					<img src="../../../static/images/personCenter/silver.png" alt="" /> {{total_bang.acer}}
				</div>
				<div class="header_list_num coppers" v-show="total_bang.type==1">
					<img src="../../../static/images/personCenter/coppers.png" alt="" /> {{total_bang.acer}}
				</div>
				<div class="header_list_num coppers" v-show="total_bang.type==0">
					0
				</div>
				<p class="header_list_title">总贡献</p>
			</li>
		</ul>
	</div>
	<div class="list">
		<div class="f30 c3 title">
			<img src="../../../static/images/personCenter/reward.png" alt="" class="icon" />自购奖励
		</div>
		<ul>
			<li>
				<div class="header_list_num king" v-show="jd.type==5">
					<img src="../../../static/images/personCenter/king.png" alt="" /> {{jd.acer}}
				</div>
				<div class="header_list_num jewel" v-show="jd.type==4">
					<img src="../../../static/images/personCenter/jewel.png" alt="" /> {{jd.acer}}
				</div>
				<div class="header_list_num gold" v-show="jd.type==3">
					<img src="../../../static/images/personCenter/gold_acer.png" alt="" /> {{jd.acer}}
				</div>
				<div class="header_list_num silver" v-show="jd.type==2">
					<img src="../../../static/images/personCenter/silver.png" alt="" /> {{jd.acer}}
				</div>
				<div class="header_list_num coppers" v-show="jd.type==1">
					<img src="../../../static/images/personCenter/coppers.png" alt="" /> {{jd.acer}}
				</div>
				<div class="header_list_num coppers" v-show="jd.type==0">
					0
				</div>
				<p class="header_list_title">京东财宝收入</p>
			</li>
			<li>
				<div class="header_list_num king" v-show="mgj.type==5">
					<img src="../../../static/images/personCenter/king.png" alt="" /> {{mgj.acer}}
				</div>
				<div class="header_list_num jewel" v-show="mgj.type==4">
					<img src="../../../static/images/personCenter/jewel.png" alt="" /> {{mgj.acer}}
				</div>
				<div class="header_list_num gold" v-show="mgj.type==3">
					<img src="../../../static/images/personCenter/gold_acer.png" alt="" /> {{mgj.acer}}
				</div>
				<div class="header_list_num silver" v-show="mgj.type==2">
					<img src="../../../static/images/personCenter/silver.png" alt="" /> {{mgj.acer}}
				</div>
				<div class="header_list_num coppers" v-show="mgj.type==1">
					<img src="../../../static/images/personCenter/coppers.png" alt="" /> {{mgj.acer}}
				</div>
				<div class="header_list_num coppers" v-show="mgj.type==0">
					0
				</div>
				<p class="header_list_title">蘑菇街财宝收入</p>
			</li>
		</ul>
	</div>
	<div style="margin: .7rem .5rem 0;">
		<x-button type="default" class="f32 c3" @click.native="toRealize()">立即挂单</x-button>
	</div>
	</div>
</template>

<script>
	import { Toast, Loading, XButton } from 'vux'
	export default {
		components: {
			Toast,
			Loading,
			XButton
		},
		data() {
			return {
				chest_acer: {
					type: 0,
					acer: 0
				},
				withdraw_acer: {
					type: 0,
					acer: 0
				},
				withdraw_over: {
					type: 0,
					acer: 0
				},
				total: {
					type: 0,
					acer: 0
				},
				yesterday: {
					type: 0,
					acer: 0
				},
				jd: {
					type: 0,
					acer: 0,
				},
				mgj: {
					type: 0,
					acer: 0
				},
				total_bang:{
					type: 0,
					acer: 0
				},
				showToast: false,
				text: '',
				showLoading: false,
				loadText: ''
			}
		},
		methods: {
			//获取用户财宝信息
			getCount() {
				this.$http.get(this.http + '/api/withdrawAcer').then((res) => {
					if(res.data.code == '200') {
						//						console.log(JSON.stringify(res.data.data))
						this.chest_acer = res.data.data.chest_acer
						this.withdraw_acer = res.data.data.withdraw_acer
						this.withdraw_over = res.data.data.withdraw_over
						this.total = res.data.data.total,
						this.yesterday = res.data.data.yesterday,
						this.jd = res.data.data.jd,
						this.mgj = res.data.data.mgj
						this.total_bang=res.data.data.total_bang
					} else {

					}
				}, (err) => {
					console.log(JSON.stringify(err))
					this.$vux.toast.show({
						text: "获取数据失败！",
						type: 'warn',
					})
				})
			},
			toRealize() {
				this.$router.push({
					name: 'Realize',
					query: {
						acer: this.chest_acer.acer,
						type: this.chest_acer.type
					}
				})
			}
		},
		mounted: function() {

		},
		created: function() {
//			this.getCount()
		},
		activated: function() {
			this.getCount()
		}
	}
</script>

<style scoped="scoped">
	.header {
		text-align: center;
		width: 100%;
		height: 2.68rem;
		background-image: url("../../../static/images/personCenter/goldStore_bd.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		color: white;
		padding-top: .7rem;
		box-sizing: border-box;
	}
	
	.header_main .botton {
		float: right;
		font-size: .24rem;
		color: #fdc71b;
		border: .01rem solid #fdc71b;
		padding: 0 .2rem;
		border-radius: .5rem;
		margin: .1rem .1rem 0 0;
	}
	
	.header_list>ul {
		display: flex;
		justify-content: space-around;
	}
	
	.header_list>ul>li {
		width: calc(100%/3);
		width: -moz-calc(100%/3);
		width: -webkit-calc(100%/3);
		text-align: center;
	}
	
	.header_list_title {
		font-size: .3rem;
		color: #666;
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
	}
	
	.header_list_num>small {
		font-size: .24rem;
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
	
	.rule {
		background: white;
		margin-bottom: .2rem;
	}
	
	.title {
		display: flex;
		align-items: center;
		padding: 0 .26rem;
		line-height: 1rem;
	}
	
	.icon {
		width: .28rem;
		height: .28rem;
		margin-right: .1rem;
	}
	
	.enjoy {
		background: white;
		line-height: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 .26rem;
	}
	
	.enjoy-icon {
		width: .13rem;
		height: .24rem;
		margin-left: .05rem;
	}
	
	.enjoy .right {
		display: flex;
		align-items: center;
	}
	
	.list {
		background: white;
	}
	
	.list ul {
		border-top: .01rem solid #e5e5e5;
		overflow: hidden;
	}
	
	.list li {
		float: left;
		width: 50%;
		vertical-align: middle;
		text-align: center;
		color: #999;
		font-size: .28rem;
		border-bottom: .01rem solid #e5e5e5;
		box-sizing: border-box;
		padding: .43rem;
	}
	
	.list li:nth-child(odd) {
		border-right: .01rem solid #e5e5e5;
	}
</style>