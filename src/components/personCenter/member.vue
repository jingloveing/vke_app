<template>
	<div>
		<x-header :left-options="{backText: ''}" :title="title" style="background-color: #f9f9f9;"></x-header>
		<div style="height: .88rem;"></div>
		<div>
			<div class="list" v-for="i in 5">
				<div class="list_left">
					<img src="../../../static/images/acerStore.png" alt="" />
				</div>
				<div class="list_right">
					<p class="title">姓名</p>
					<p class="name">身份（帮主,长老,帮众）</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { XHeader} from 'vux'
	export default {
		name: 'Member',
		components: {
			XHeader,
		},
		data() {
			return {
               title:'旗下帮主',
               type:'',
			}
		},
		methods: {
            
		},
		created: function() {
            this.type=this.$route.query.type
		},
		mounted: function() {
            if(this.type==0){
            	this.title='旗下帮主'
            }else if(this.type==1){
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