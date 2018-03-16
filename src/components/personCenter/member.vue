<template>
	<div>
		<x-header :left-options="{backText: ''}" :title="title" style="background-color: #f9f9f9;"></x-header>
		<div style="height: 1.28rem;"></div>
		<div>
			<div class="list" v-for="(item,index) in list" :key="index">
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
</template>

<script>
	import { XHeader} from 'vux'
	const url='http://xlk.dxvke.com/'
	export default {
		name: 'Member',
		components: {
			XHeader,
		},
		data() {
			return {
               title:'旗下帮主',
               type:'',
               list:[]
			}
		},
		methods: {
            //获取某个等级下的粉丝数量
			getList() {
				this.$http({
					methods:'get',
					url:url+'/api/myInviteList',
					params:{level:this.type}
					}).then((res) => {
					if(res.data.code == '200') {
						this.list = res.data.data
					} else {

					}
				}, (err) => {
					console.log(err)
				})
			},
		},
		created: function() {
            this.type=this.$route.query.type
            this.getList()
		},
		mounted: function() {
            if(this.type==3){
            	this.title='旗下帮主'
            }else if(this.type==2){
            	this.title='旗下长老'
            }else{
            	this.title='旗下帮众'
            }
		}
	}
</script>

<style scoped="scoped">
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
	.list{
		border-top: .01rem solid #e5e5e5;
	}
	.list:nth-child(1){
		border-top:none;
	}
</style>