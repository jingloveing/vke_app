<template>
	<div>
		<div style="position: relative;margin-bottom: 1.5rem;">
			<div class="header">
				<p class="f30">帮众总数:{{data.total}}人</p>
			</div>
			<div class="header_main">
				<ul class="header_list c3">
					<router-link :to="{name:'Member',query:{type:3}}" tag="li">
						<p class="header_list_title">帮主</p>
						<p style="font-size: .36rem;">{{data.level3}}<small class="f2 c6">人</small></p>
					</router-link>
					<router-link :to="{name:'Member',query:{type:2}}" tag="li">
						<p class="header_list_title">长老</p>
						<p style="font-size: .36rem;">{{data.level2}}<small class="f2 c6">人</small></p>
					</router-link>
					<router-link :to="{name:'Member',query:{type:1}}" tag="li">
						<p class="header_list_title">帮众</p>
						<p style="font-size: .36rem;">{{data.level1}}<small class="f2 c6">人</small></p>
					</router-link>
				</ul>
			</div>
		</div>
		<div class="main">
			<div class="list">
				<div class="list_left">
					<img :src="data.nickname.head_image" alt="" />
				</div>
				<div class="list_right">
					<p class="title">{{data.nickname.nickname}}<span class="leve">推荐人</span></p>
					<p class="name">
						<span v-show="data.nickname.level_id==1">帮众</span>
						<span v-show="data.nickname.level_id==2">长老</span>
						<span v-show="data.nickname.level_id==3">帮主</span>
					</p>
				</div>
			</div>
			<p class="f24 c9 tip">最新帮众</p>
			<div>
				<div class="list" v-for="(item,index) in newInvite" :key="index">
					<div class="list_left">
						<img :src="item.head_image" alt="" />
					</div>
					<div class="list_right">
						<p class="title">{{item.nickname}}</p>
						<p class="name">
							<span v-show="item.level_id==1">帮众</span>
						<span v-show="item.level_id==2">长老</span>
						<span v-show="item.level_id==3">帮主</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast, Loading } from 'vux'
	const url='http://xlk.dxvke.com/'
	export default {
		name: 'Code',
		components: {
			Toast,
			Loading
		},
		data() {
			return {
				data: {
					total: null,
					level1: null,
					level2: null,
					level3: null,
					nickname: {
						nickname: null,
						level_id: null
					}
				},
				newInvite: [],
				showToast: false,
				text: '',
				showLoading: false,
				loadText: ''
			}
		},
		methods: {
			//获取个人推荐人数及信息
			getCount() {
				this.$http.get(url+'/api/inviteCount', {}).then((res) => {
					if(res.data.code == '200') {
						this.data = res.data.data
					} else {

					}
				}, (err) => {
					console.log(err)
				})
			},
			//获取最新邀请粉丝信息
			getInviteNew() {
				this.$http.get(url+'/api/inviteNew', {}).then((res) => {
					if(res.data.code == '200') {
						this.newInvite = res.data.data
					} else {

					}
				}, (err) => {
					console.log(err)
				})
			},

		},
		mounted: function() {

		},
		created: function() {
			this.getCount()
			this.getInviteNew()
		}
	}
</script>

<style scoped="scoped">
	.header {
		text-align: center;
		width: 100%;
		height: 2.68rem;
		background-image: url("../../../static/images/personCenter/myWorld_bd.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		color: white;
		padding-top: .7rem;
		box-sizing: border-box;
	}
	
	.header_list {
		height: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	
	.header_list>li {
		width: calc(100%/3);
		width: -moz-calc(100%/3);
		width: -webkit-calc(100%/3);
	}
	
	.header_list>li>p {
		text-align: center;
	}
	
	.header_list_title {
		font-size: .3rem;
		color: #333;
	}
	
	.main {
		margin-top: .2rem;
	}
	
	.list {
		background: white;
		display: flex;
		align-items: center;
		padding: .33rem .26rem;
	}
	
	.list_right {
		width: calc(100% - 1.18rem);
		width: -moz-calc(100% - 1.18rem);
		width: -webkit-calc(100% - 1.18rem);
	}
	
	.list_left {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.list_left>img {
		width: 1rem;
		height: 1rem;
		margin-right: .18rem;
		border-radius: 50%;
	}
	
	.list .title {
		font-size: .32rem;
		color: #333;
	}
	
	.list .time {
		font-size: .24rem;
		color: #999;
	}
	
	.list .name {
		font-size: .26rem;
		color: #999;
	}
	
	.leve {
		font-size: .22rem;
		color: #F51D46;
		border: .01rem solid #F51D46;
		border-radius: .06rem;
		width: .88rem;
		line-height: .28rem;
		text-align: center;
		display: inline-block;
		margin-left: .16rem;
	}
	
	.tip {
		line-height: .58rem;
		padding: 0 .26rem;
	}
	
	.list {
		border-top: .01rem solid #e5e5e5;
	}
	
	.list:nth-child(1) {
		border-top: none;
	}
</style>