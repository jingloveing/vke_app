<template>
	<div>
		<x-header :left-options="{backText: ''}" :title="title" style="background-color: #f9f9f9;"></x-header>
		<div class="list" v-for="(item,index) in list" :key="index">
			<h5 class="f32 c3">
				<span style="display: inline-block;min-width: .2rem;height: .5rem;">{{item.title}}</span>
				<small class="f24 c9" style="font-family: arial;">{{item.create_time}}</small></h5>
			<p class="f26 c9">{{item.content}}</p>
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
               title:'',
               type:'',
               list:[],
			}
		},
		methods: {
            //获取消息列表
			getList() {
				this.$http({
					methods:'get',
					url:'/api/messageList',
					params:{
						cate:this.type
					}
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
            if(this.type==1){
            	this.title='商品发货'
            }else if(this.type==2){
            	this.title='财宝入库'
            }else{
            	this.title='官方信件'
            }
		}
	}
</script>

<style scoped="scoped">
	.list{
		background: white;
		border-radius: .06rem;
		margin: .3rem .26rem;
		padding: .27rem .29rem;
	}
	.list h5{
		font-weight: normal;
		margin-bottom: .1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	

</style>