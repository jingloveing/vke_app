<template>
	<div class="indexSearch">
		<x-header :left-options="{backText: ''}"></x-header>
		<button-tab v-model="type" class="nav">
			<button-tab-item @on-item-click="consoleIndex()">淘宝商品</button-tab-item>
			<button-tab-item @on-item-click="consoleIndex()">品牌商品</button-tab-item>
		</button-tab>
		<div style="height: 1.28rem;"></div>
		<div class="searchDiv">
			<img src="../../../static/images/personCenter/search_img.png" alt="">
			<form action="">
				<input v-model="key" type="text">
			</form>
			<!--<span @click="onCancel()" class="cancel_btn">取消</span>-->
		</div>
		<div id="hot">
			<p style="font-size: .28rem;color: #666;padding: .2rem .3rem">热门搜索</p>
			<ul class="hot_list">
				<li v-for="hotList in hotList" v-text="hotList.keywords" @click="onSubmit(hotList.keywords)">冬装</li>
			</ul>
			<p style="font-size: .28rem;color: #666;padding:0 .3rem .2rem ;">历史搜索 <img src="../../../static/images/trash.png" alt="" style="margin-top:.05rem;width: .28rem;height: .28rem;float: right;" @click="del"></p>
			<ul class="hot_list">
				<li v-for="historyList in historyList" v-text="historyList.keywords" @click="onSubmit(historyList.keywords)">冬装</li>
			</ul>
		</div>
		<loading v-model="showLoading" :text="loadText"></loading>
		<!--<div class="toTop" @click="toTop()"><img src="/static/images/top.png" alt="" style="width: .35rem;height: .15rem;display: block;margin: .2rem auto .1rem;"><span>顶部</span></div>-->
	</div>
</template>

<script>
	import { XHeader, ButtonTab, ButtonTabItem, Loading } from 'vux'
	const url='http://xlk.dxvke.com/'
	export default {
		name: 'Realize',
		components: {
			XHeader,
			ButtonTab,
			ButtonTabItem,
			Loading
		},
		data() {
			return {
				type: 0,
				sort_id: '',
				goodsList: [],
				showLoading: false,
				loadText: '加载中...',
				hotList: [],
				historyList: [],
				results: [],
				list: [],
				index: 0,
				getBarWidth: function(index) {
					return(index + 1) * 22 + 'px'
				},
				key: ''
			}
		},
		methods: {
			//      热门推荐列表
			getHotList: function() {
				this.$http({
					method: 'get',
					url: url+'/api/hotKeywords'
				}).then((res) => {
					if(res.data.code == '200') {
						this.hotList = res.data.data
					} else {

					}
				}, (err) => {
					console.log(err)
				})
			},
			//      搜索历史列表
			getHistoryList: function() {
				this.$http({
					method: 'get',
					url: url+'/api/searchHistory',
					params: {
						type: 3
					}
				}).then((res) => {
					if(res.data.code == '200') {
						this.historyList = res.data.data
					} else {

					}
				}, (err) => {
					console.log(err)
				})
			},
			//      清除历史列表
			del: function() {
				this.$http.post(url+'/api/delSearchHistory', {
					type: 3
				}).then((res) => {
					if(res.data.code == '200') {
						this.$vux.toast.show({
							text: res.data.data.message
						})
						this.historyList = []
					} else {

					}
				}, (err) => {
					console.log(err)
				})
			},
			change(e) {
				this.sort_id = e
				this.goodsList = ''
				this.doSearch()

			},
			onSubmit(e) {
				//        this.showLoading=true
				if(this.type==0){
					this.$router.push({
					name: 'searchResult',
					query: {
						keyword: e,
						type: 3
					}
				})
				}else{
					this.$router.push({
					name: 'searchResult',
					query: {
						keyword: e,
						type: 2
					}
				})
				}
				

			},
			//点击头部事件
			consoleIndex() {
				this.key=''
			}
		},
		created: function() {
			this.getHotList()
			this.getHistoryList()
		},
		mounted: function() {
			this.$nextTick(function() {
				var oForm = document.getElementsByTagName("form")[0];
				var self = this
				oForm.onsubmit = function(e) {
					e.preventDefault();
					if(self.type==0){
						self.$router.push({
						name: 'searchResult',
						query: {
							keyword: self.key,
							type: 3
						}
					})
					}else{
						self.$router.push({
						name: 'searchResult',
						query: {
							keyword: self.key,
							type: 2
						}
					})
					}
				};
			})
		}
	}
</script>

<style scoped="scoped">
	.hot_list {
		margin: 0 .3rem;
	}
	
	ul li {
		list-style: none;
	}
	
	.hot_list li {
		display: inline-block;
		border: .01rem solid #999;
		border-radius: .5rem;
		line-height: .6rem;
		padding: 0rem .3rem;
		font-size: .28rem;
		color: #333;
		margin: 0 .2rem .2rem 0;
	}
	
	.searchDiv {
		background-color: #f4f4f4;
		padding: .28rem .26rem;
		font-size: 0;
		position: relative;
	}
	
	.searchDiv>img {
		width: .4rem;
		height: .4rem;
		vertical-align: middle;
		position: absolute;
		top: .4rem;
		left: .46rem;
	}
	
	.searchDiv>form {
		display: inline-block;
		width: 88.5%;
	}
	
	.searchDiv>form>input {
		width: 100%;
		outline: none;
		padding: .1rem .1rem .1rem .7rem;
		border: none;
		line-height: .44rem;
		font-size: .28rem;
		border-radius: .5rem;
	}
	
	.searchDiv>.cancel_btn {
		display: inline-block;
		text-align: center;
		font-size: .28rem;
		color: #333;
		margin-left: .2rem;
	}
	.nav {
		width: 3.34rem;
		position: fixed;
		top: 0;
		z-index: 99999;
		left: calc((100% - 3.34rem)/2);
		top: calc((.88rem - .6rem)/2 + .4rem);
	}
	
</style>
<style>
	.nav.vux-button-group>a.vux-button-group-current {
		color: #FFF;
		background: #9a7bff;
	}
	
	.nav.vux-button-group>a.vux-button-tab-item-last:after {
		border: .01rem solid #9a7bff;
		border-top-right-radius: .06rem;
		border-bottom-right-radius: .06rem;
	}
	
	.nav.vux-button-group>a.vux-button-tab-item-first:after {
		border: .01rem solid #9a7bff;
		border-top-left-radius: .06rem;
		border-bottom-left-radius: .06rem;
	}
	
	.nav.vux-button-group>a {
		height: .6rem;
		line-height: .6rem;
		color: #9A7BFF;
		font-size: .26rem;
	}
	
	.nav.vux-button-group>a.vux-button-tab-item-last {
		border-top-right-radius: .06rem;
		border-bottom-right-radius: .06rem;
	}
	
	.nav.vux-button-group>a.vux-button-tab-item-first {
		border-top-left-radius: .06rem;
		border-bottom-left-radius: .06rem;
	}
</style>