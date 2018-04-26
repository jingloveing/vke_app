<template>
	<div>
		<x-header :left-options="{backText: ''}" title="选择收货地址" style="background-color: #f9f9f9;">
			<a slot="right" style="color: #9A7BFF;font-size: .32rem;">
				<router-link to="/personCenter/myOrder/addressList">
					管理
				</router-link>
			</a>
		</x-header>
		<div style="height: 1.28rem;"></div>
		<div style="margin-bottom: .96rem;">
			<div class="list" v-for="(item,index) in list" @click="goPay(item)">
				<h5 class="f28 c3"><span class="left"><span class="default" v-show="item.is_default==1">默认</span><span>{{item.consignee}}</span></span><small class="f28" style="font-family: arial;">{{item.telephone}}</small></h5>
				<p class="f26 c9">{{item.province}}{{item.city}}{{item.country}}{{item.address}}</p>
			</div>
			<div class="empty" v-show="list.length==0"><img src="../../../static/images/empty/address.png" />
			<p class="empty-word">您还未添加地址</p>
			</div>
		</div>
		<div style="position:fixed;bottom: 0;width: 100%;height: .96rem;">
			<x-button @click.native="click()" action-type="button" style="width: 100%;height: 100%;border-radius: 0;" class="f32">添加新地址</x-button>
		</div>
	</div>
</template>

<script>
	import { XHeader,XButton} from 'vux'
	const url='http://xlk.dxvke.com/'
	export default {
		name: 'Realize',
		components: {
			XHeader,
			XButton
		},
		data() {
			return {
                list:[],
			}
		},
		methods: {
            //      收货地址列表
			getAddressList: function() {
				this.$http({
					method: 'get',
					url: url+'/api/addressList'
				}).then((res) => {
					if(res.data.code == '200') {
						this.list = res.data.data
					}
				}, (err) => {
					console.log(err)
				})
			},
			click(){
				this.$router.push({name:'AddAddress',query:{}})
//          	this.$router.replace({name: ''})
           },
           goPay(ev){
           	    plus.storage.setItem('address',JSON.stringify(ev))
           	    this.$router.go(-1)
           }
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