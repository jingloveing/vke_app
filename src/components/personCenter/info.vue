<template>
	 <div>
	 	<router-link class="list" to="/personCenter/info/infoList">
	 		<div class="list_left">
	 			<img src="../../../static/images/notify.png" alt="" />
	 		</div>
	 		<div class="list_right">
	 		    <p class="title">商品发货<span class="time">12:00</span></p>
	 		    <p class="name">您的淘宝订单已发货 <span class="origin"></span></p>
	 		</div>
	 	</router-link>
	 	<router-link class="list" to="/personCenter/info/acerStorage">
	 		<div class="list_left">
	 			<img src="../../../static/images/acerStore.png" alt="" />
	 		</div>
	 		<div class="list_right">
	 		    <p class="title">财宝入库<span class="time">12:00</span></p>
	 		    <p class="name">您的淘宝订单已发货 <span class="origin"></span></p>
	 		</div>
	 	</router-link>
	 	<router-link class="list" to="/personCenter/info/emailList">
	 		<div class="list_left">
	 			<img src="../../../static/images/email.png" alt="" />
	 		</div>
	 		<div class="list_right">
	 		    <p class="title">官方信件<span class="time">12:00</span></p>
	 		    <p class="name">您的淘宝订单已发货 <span class="origin"></span></p>
	 		</div>
	 	</router-link>
	 </div>
</template>

<script>
	
	export default {
  
  components: {
    
  },
  data () {
    return {
       
    }
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
	.list_left>img{
		width: 1rem;
		height: 1rem;
		margin-right: .18rem;
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
		font-size: .26rem;
		color: #999;
		margin-top: .1rem;
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