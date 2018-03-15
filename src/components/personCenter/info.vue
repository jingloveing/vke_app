<template>
	 <div>
	 	<router-link class="list" :to="{name:'InfoList',query:{type:1}}">
	 		<div class="list_left">
	 			<img src="../../../static/images/notify.png" alt="" />
	 		</div>
	 		<div class="list_right">
	 		    <p class="title">商品发货<span class="time">{{message.deliver.create_time}}</span></p>
	 		    <p class="name">{{message.deliver.title}}<span class="origin" v-show="message.deliver.is_read==0"></span></p>
	 		</div>
	 	</router-link>
	 	<router-link class="list" :to="{name:'InfoList',query:{type:2}}">
	 		<div class="list_left">
	 			<img src="../../../static/images/acerStore.png" alt="" />
	 		</div>
	 		<div class="list_right">
	 		    <p class="title">财宝入库<span class="time">{{message.wealth.create_time}}</span></p>
	 		    <p class="name">{{message.wealth.title}}<span class="origin" v-show="message.wealth.is_read==0"></span></p>
	 		</div>
	 	</router-link>
	 	<router-link class="list" :to="{name:'InfoList',query:{type:3}}">
	 		<div class="list_left">
	 			<img src="../../../static/images/email.png" alt="" />
	 		</div>
	 		<div class="list_right">
	 		    <p class="title">官方信件<span class="time">{{message.offical.create_time}}</span></p>
	 		    <p class="name">{{message.offical.title}}<span class="origin" v-show="message.offical.is_read==0"></span>
	 		    </p>
	 		</div>
	 	</router-link>
	 </div>
</template>

<script>
	const url='http://xlk.dxvke.com/'
	export default {
  
  components: {
    
  },
  data () {
    return {
       message:{
       	deliver:{
       		title:null,
       		is_read:null
       	},
       	wealth:{
       		title:null,
       		is_read:null
       	},
       	offical:{
       		title:null,
       		is_read:null
       	}
       }
    }
  },
  methods:{
  	//获取消息已读或未读
			getMessage() {
				this.$http.get(url+'/api/messageCate', {}).then((res) => {
					if(res.data.code == '200') {
						this.message = res.data.data
					} else {

					}
				}, (err) => {
					console.log(err)
				})
			},
  },
  created:function(){
  	this.getMessage()
  },
  mounted:function(){
  	 
  }
}
</script>

<style scoped="scoped">
	.list{
		background: white;
		display: flex;
		align-items: center;
		padding: .33rem .26rem;
		border-bottom: .01rem solid #e5e5e5;
	}
	.list_right{
		width: calc(100% - 1.18rem);
		width: -moz-calc(100% - 1.18rem);
		width: -webkit-calc(100% - 1.18rem);
	}
	.list_left{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.list_left>img{
		width: 1rem;
		height: 1rem;
		margin-right: .18rem;
		border-radius: 50%;
	}
	.list .title{
		font-size: .32rem;
		color: #333;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.list .time{
		font-size: .24rem;
		color: #999;
	}
	.list .name{
		height: .4rem;
		font-size: .26rem;
		color: #999;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.origin{
		display: inline-block;
		width: .16rem;
		height: .16rem;
		border-radius: 50%;
		background: #F51D46;
		
	}
</style>