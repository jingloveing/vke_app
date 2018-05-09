<template>
	<div class="indexSearch">
		<x-header :left-options="{backText: ''}" class="header"></x-header>
		<div class="nav flex">
			<div class="active tab-items">淘宝</div>
			<div class="tab-items">拼多多</div>
		</div>
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
	</div>
</template>

<script>
	import { XHeader, Loading } from 'vux'
	export default {
		name: 'Realize',
		components: {
			XHeader,
			Loading
		},
		data() {
			return {
				type: 3,
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
					url: this.http+'/api/hotKeywords'
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
					url: this.http+'/api/searchHistory',
					params: {
						type: this.type
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
				this.$http.post(this.http+'/api/delSearchHistory', {
					type: this.type
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
					this.$router.push({
					name: 'searchResult',
					query: {
						keyword: e,
						type: this.type
					}
				})
			},
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
						self.$router.push({
						name: 'searchResult',
						query: {
							keyword: self.key,
							type: self.type
						}
					})
				};
			var tab = document.getElementsByClassName('tab-items')
			for(var i = 0; i < tab.length; i++) {
				tab[i].index = i
				tab[i].onclick = function() {
					if(this.index==0){
						self.key=''
				        self.type=3
				        console.log(self.type)
					}else if(this.index==1){
						self.key=''
				        self.type=5
				        console.log(self.type)
					}
					for(var j = 0; j < tab.length; j++) {
						tab[j].classList.remove('active')
					}
					tab[this.index].classList.add('active')
				}
			}
			})
		},
		activated:function(){
			this.getHotList()
			this.getHistoryList()
		}
	}
</script>

<style scoped="scoped">
	.header{
		padding-top: .4rem;
		border: none;
		background: -webkit-linear-gradient(left, #8721b5, #db3283);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(left, #8721b5, #db3283);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(left, #8721b5, #db3283);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(left, #8721b5, #db3283);
	}
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
		width: .28rem;
		height: .28rem;
		vertical-align: middle;
		position: absolute;
		top: .45rem;
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
		width: 2.2rem;
		position: fixed;
		color: rgba(255,255,255,0.5);
		font-size: .36rem;
		z-index: 99999;
		left: calc((100% - 2.2rem)/2);
		top: calc((.88rem - .6rem)/2 + .4rem);
		justify-content: space-between;
		align-items: center;
	}
	.nav .active{
		border-bottom: .03rem solid white;
		color: white;
	}
</style>
