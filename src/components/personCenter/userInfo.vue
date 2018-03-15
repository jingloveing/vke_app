<template>
	<div>
		<!--<x-header :left-options="{backText: ''}" style="padding: 2px 0 ;background-color: white;position: fixed;z-index: 10;width: 100%;top: 0;border-bottom: 1px solid #e1e1e1;">用户信息</x-header>-->
		<!--<div style="height: .88rem;"></div>-->
		<div class="userInfo">
			<p @click="changePhoto" class="cell c3">头像
				<span><img :src="userInfo.head_image" alt="" class="photo" :onerror="defaultImg">
      <img src="../../../static/images/gt_white.png" alt="" class="gt_icon"/></span>
			</p>
			<router-link to="/personCenter/userInfo/changeName">
				<p class="cell c3">昵称 <span class="c9">{{userInfo.nickname}}<img src="../../../static/images/gt_white.png" alt="" class="gt_icon"/></span></p>
			</router-link>
				<p class="cell c3" @click="changeSex">性别 <span class="c9" v-text="userInfo.gender==1?'男':'女'"><img src="../../../static/images/gt_white.png" alt="" class="gt_icon"/></span></p>
			<p class="cell c3">等级 <span class="c9">{{userInfo.level_title}}</span></p>
		</div>
		<!--<div class="btn">-->
		<!--<x-button @click.native="userInfo()" action-type="reset" style="background-color: #ff526d;color: white;font-size: .32rem;width: 90%;margin: .3rem auto;">同步微信资料</x-button>-->
		<!--</div>-->
		<actionsheet v-model="show1" :menus="menus1" @on-click-menu="click1" show-cancel></actionsheet>
		<actionsheet v-model="show2" :menus="menus2" @on-click-menu="click2" show-cancel></actionsheet>
		<loading v-model="showLoading" :text="loadText"></loading>
        <toast v-model="showToast" type="text" :time="800" is-show-mask position="middle">{{toast}}</toast>
	</div>
</template>
<script>
	import { XHeader, XButton, Loading, Actionsheet,Toast } from 'vux'
	const url='http://xlk.dxvke.com/'
	export default {
		components: {
			XHeader,
			XButton,
			Loading,
			Actionsheet,
			Toast
		},
		data() {
			return {
				userInfo: {
					nickname: '',
					head_image: '',
					gender:null,
					level_title:''
				},
				defaultImg: 'this.src="' + require('../../../static/images/default_img.png') + '"',
				showLoading: false,
				loadText: '加载中...',
				show1: false,
				menus1: {
					menu1: '拍照',
					menu2: '从相册选择'
				},
				show2: false,
				menus2: {
					menu1: '男',
					menu2: '女'
				},
				showToast:false,
				toast:''
			}
		},
		methods: {
			//      修改用户信息
			editInfo: function() {
//				this.showLoading = true
				this.$http.post(url+'/api/updateInfo',{gender:this.userInfo.gender}).then((res) => {
					if(res.data.code == '200') {
						this.toast = res.data.data.message
					    this.showToast = true
					    localStorage.setItem('userInfo',JSON.stringify(this.userInfo))
					} else{
						this.toast = res.data.error
					    this.showToast = true
					}
				}, (err) => {
					
				})
			},
			console(msg) {
				console.log(msg)
			},
			click1(key) {
				console.log(key)
			},
			click2(key) {
				if(key=='menu1'){
					this.userInfo.gender=1
				}else{
					this.userInfo.gender=0
				}
				this.editInfo()
			},
			changePhoto:function(){
				this.show1=true
			},
			changeSex:function(){
				this.show2=true
			}
		},
		mounted() {
			
		},
		created: function() {
			this.userInfo=JSON.parse(localStorage.getItem('userInfo'))
		}
	}
</script>
<style scoped>
	.userInfo {
		background-color: white;
		color: #333;
		font-size: .28rem;
	}
	
	.cell {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 1.24rem;
		line-height: 1.24rem;
		position: relative;
		border-bottom: 1px solid #f4f4f4;
		padding: 0 .26rem;
	}
	
	.photo {
		/*position:absolute;right: .36rem;top:.15rem;*/
		width: .76rem;
		height: .76rem;
		border-radius: 50%;
		vertical-align: middle;
		margin-right: -.1rem;
	}
	
	.btn {
		width: 100%;
		background-color: #f6f6f6;
		position: fixed;
		bottom: 0;
		border-top: 1px solid #e9e9e9;
	}
	
	.gt_icon {
		width: .13rem;
		height: .24rem;
		margin-left: .14rem;
	}
</style>