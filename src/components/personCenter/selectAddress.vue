<template>
	<div>
		<x-header :left-options="{backText: ''}" title="选择收货地址" style="background-color: #f9f9f9;">
			<a slot="right" style="color: #9A7BFF;font-size: .32rem;" href="/personCenter/myOrder/addressList">管理</a>
		</x-header>
		<div style="height: .88rem;"></div>
		<div>
			<div class="list" v-for="(item,index) in list" @click="">
				<h5 class="f28 c3"><span class="left"><span class="default" v-show="item.is_default==1">默认</span><span>{{item.consignee}}</span></span><small class="f28" style="font-family: arial;">{{item.telephone}}</small></h5>
				<p class="f26 c9">{{item.province}}{{item.city}}{{item.country}}{{item.address}}</p>
			</div>
		</div>
		<div style="position:fixed;bottom: 0;width: 100%;height: .96rem;">
			<x-button @click.native="click()" type="primary" action-type="button" style="width: 100%;height: 100%;border-radius: 0;" class="f32">添加新地址</x-button>
		</div>
	</div>
</template>

<script>
	import { XHeader,XButton} from 'vux'
	export default {
		name: 'Realize',
		components: {
			XHeader,
			XButton
		},
		data() {
			return {
                page:1,
                limit:10,
                list:[],
			}
		},
		methods: {
            //      收货地址列表
			getAddressList: function() {
				this.$http({
					method: 'get',
					url: '/api/addressList',
					params: {
						page: this.page,
						limit: this.limit
					}
				}).then((res) => {
					if(res.data.code == '200') {
						this.list = res.data.data.list
					}
				}, (err) => {
					console.log(err)
				})
			},
			click(){
				this.$router.push({name:'AddAddress',query:{}})
//          	this.$router.replace({name: ''})
           },
		},
		created: function() {
            this.getAddressList()
		},
		mounted: function() {

		}
	}
</script>

<style scoped="scoped">
	.list {
		background: white;
		border-radius: .06rem;
		margin: .3rem .26rem;
		padding: .27rem .29rem;
	}
	
	.list h5 {
		font-weight: normal;
		margin-bottom: .1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.list p{
		line-height: .34rem;
	}
	.default{
		line-height: .28rem;
        width: .6rem;
		display: inline-block;
		border: .01rem solid #927BFF;
		border-radius: .06rem;
		color: #927BFF;
		margin-right: .14rem;
		font-size: .2rem;
		text-align: center;
	}
	.left{
		display: flex;
		align-items: center;
	}
</style>