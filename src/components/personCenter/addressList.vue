<template>
	<div>
		<div>
			<div class="list" v-for="item in list" @click="newC()">
				<div>
					<h5 class="f28 c3">{{item.consignee}}<span style="font-family: arial;">{{item.telephone}}</span></h5>
				    <p class="f26 c9">{{item.province}}{{item.city}}{{item.country}}{{item.address}}</p>
				</div>
				<div class="operate f24 c3" style="flex-direction: row-reverse;">
					<div class="operate-right">
						<router-link class="operate-right" :to="{name:'AddAddress',query:{from:1,id:item.id}}">
							<img src="../../../static/images/personCenter/edit_icon.png" alt="" class="icon"/>编辑
						</router-link>
						<div class="operate-right" @click="del(item.id)">
							<img src="../../../static/images/personCenter/del_icon.png" alt="" class="icon"/>删除
						</div>
					</div>
					<span style="color: #927BFF;" v-show="item.is_default==1">默认地址</span>
				</div>
			</div>
		</div>
		<div style="height: .96rem;"></div>
		<div style="position:fixed;bottom: 0;width: 100%;height: .96rem;">
			<x-button @click.native="click()" type="primary" action-type="button" style="width: 100%;height: 100%;border-radius: 0;" class="f32">添加新地址</x-button>
		</div>
		<toast v-model="showToast" type="text" :time="800" is-show-mask position="middle">{{toast}}</toast>
		<loading v-model="showLoading" :text="loadText"></loading>
	</div>
</template>

<script>
	import { XHeader, XInput, XButton, Group,Toast,Loading} from 'vux'
	const url='http://xlk.dxvke.com/'
	export default {
		name: 'Realize',
		components: {
			XHeader,
			XInput,
			XButton,
			Group,
			Toast,
			Loading
		},
		data() {
			return {
				type:0,
				page:1,
				limit:10,
				list:[],
				showToast:false,
				toast:'',
				showLoading:false,
				loadText:'',
			}
		},
		methods: {
			//      收货地址列表
			getAddressList: function() {
				this.$http({
					method: 'get',
					url: url+'/api/addressList',
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
			//      删除收货地址列表
			del(id) {
				this.showLoading=true
				this.$http.post(url+'/api/delAddress',{id:id}).then((res) => {
					this.showLoading=false
					if(res.data.code == '200') {
						this.$vux.toast.show({
                             text: res.data.data.message,
                             type:'success',
                        })
						this.getAddressList()
					}else{
						this.$vux.toast.show({
                             text: res.data.error,
                             type:'warn',
                       })
					}
				}, (err) => {
					this.showLoading=false
					console.log(err)
				})
			},
			click(){
				this.$router.push({name:'AddAddress',query:{}})
//          	this.$router.replace({name: ''})
           },
           newC(){
           	console.log('aaaa')
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
		padding: .27rem .29rem 0;
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
	input[type="radio"] {
		display: none;
	}
	
	
	.all {
		position: relative;
		width: .36rem;
		height: .36rem;
		border-radius: 50%;
		border: .01rem solid #e5e5e5;
		margin-right: .1rem;
	}
	
	.radio {
		width: 100%;
		height: 100%;
		display: inline-block;
		position: absolute;
		top: 0;
		left: 0;
	}
	.success {
		width: .36rem;
		height: .36rem;
		position: absolute;
	}
	.operate{
		border-top:.01rem solid #e5e5e5;
		margin-top: .27rem;
		display: flex;
		align-items: center;
        justify-content: space-between;
        height: .94rem;
	}
	.icon{
		width: .28rem;
		height: .28rem;
		margin-right: .1rem;
	}
	.operate-right{
		display: flex;
		align-items: center;
		height: 100%;
		margin-left: .2rem;
		color: #333;
	}
</style>