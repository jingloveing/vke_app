<template>
	<div>
		<div class="tip flex">
			<img src="../../../static/images/upgrade_icon.png" alt="" />
			<h3 class="f30 c3">如何升级地位</h3>
		</div>
		<div style="background: white;padding: 0 .26rem .58rem;">
			<table cellspacing="0" cellpadding="0" class="f28 c3">
				<tr>
					<th>身份</th>
					<th>获得方法</th>
				</tr>
				<!--<tr>
					<td>帮众</td>
					<td>扫码关注后下载APP微信登录即可获得</td>
				</tr>-->
				<tr v-show="userInfo.level_id==1">
					<td>长老</td>
					<td style="padding:.24rem .2rem;">
						<p>两种方法：</p>
						<p>a.在特供商品赚取一次性或积累购买产品188元产品免费升级正式长老</p>
						<p>b.旗下团队规模拥有150位以上帮众即可免费成为代理长老(代理长老考核规则详见白鹭书院)</p>
					</td>
				</tr>
				<tr v-show="(userInfo.level_id==2)||(userInfo.level_id==3)">
					<td>帮主</td>
					<td style="padding:.24rem .2rem;">旗下拥有10位正式长老助威即可申请成立帮派升任帮主，审核通过后需要交纳680元/年的帮派维护费(及技术维护费)</td>
				</tr>
			</table>
		</div>
		<router-link :to="{name:'GoodsDetail'}" class="flex f28 c3 footer">
			<img src="../../../static/images/login/cart_s_f.png" alt="" />
			<span>购买特供商品，升级地位</span>
		</router-link>
		<toast v-model="showToast" type="text" :time="800" is-show-mask position="middle">{{toast}}</toast>
	</div>
</template>

<script>
	import {Toast} from 'vux'
	const url='http://xlk.dxvke.com/'
	export default {
		components: {
			Toast
		},
		data() {
			return {
               userInfo:{
               	level_id:null
               },
               showToast:false,
               toast:''
			}
		},
		methods: {
            	//      修改用户信息
			editInfo: function() {
//				this.showLoading = true
				this.$http.post(url+'/api/updateInfo',{gender:this.userInfo.nickname}).then((res) => {
					if(res.data.code == '200') {
						this.toast = res.data.data.message
					    this.showToast = true
					    
					    plus.storage.setItem('userInfo',JSON.stringify(this.userInfo))
					} else{
						this.toast = res.data.error
					    this.showToast = true
					}
				}, (err) => {
					
				})
			},
		},
		created:function(){
			this.userInfo=JSON.parse(plus.storage.getItem('userInfo'))
		},
		mounted() {
			
		},
	}
</script>

<style scoped="scoped">
	.tip {
		line-height: .82rem;
		height: .82rem;
		padding-left: .26rem;
		background-color: white;
	}
	
	.tip img {
		width: .32rem;
		color: .34rem;
		margin-right: .14rem;
	}	
	table tr th,table tr td{ border:.01rem solid #e5e5e5; }
	table tr td{
		border-top: none;
	}
	td,th{
		height: .76rem;
		padding:0 .2rem;
		box-sizing: border-box;
	}
	th{
		font-weight: normal;
		background: #fafafa;
	}
	tr th:nth-child(1),tr td:nth-child(1){
		width: 1.38rem;
		border-right: none;
	}
	.footer{
		line-height: .78rem;
		background: white;
		margin-top: .3rem;
		justify-content: center;
	}
	.footer img{
		width: .32rem;
		height: .32rem;
		margin-right: .14rem;
	}
</style>