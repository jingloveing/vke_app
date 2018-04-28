<template>
    <div>
    	<iframe :src="url" scrolling="" style="border:0px;height: 12.46rem;" width="100%"></iframe>
		<!--<div class="return flex" @click="goHome()">
			<img src="../../../static/images/return_icon.png" alt="" />
			<span class="f28">返回</span>
		</div>-->
    </div>
</template>

<script>
	export default {
		components: {
			
		},
		data() {
			return {
				type: '',
				url:''
			}
		},
		methods: {
			
			//      获取淘宝、京东授权
			getAccredit() {
				var type = this.$route.query.type
				if(type == 1) {
					if(this.tb_auth == 0) {
						this.$http({
							method: 'get',
							url: this.http+'/api/doAccredit',
							params: {
								type: type
							}
						}).then((res) => {
							if(res.data.code == '200') {
								this.url = res.data.data.data.url
							} else {

							}
						}, (err) => {
							console.log(err)
						})
					} else {
						this.$http({
							method: 'get',
							url: this.http+'/api/exitAccredit',
							params: {
								type: type
							}
						}).then((res) => {
							if(res.data.code == '200') {
								this.url = res.data.data.data.url
							} else {

							}
						}, (err) => {
							console.log(err)
						})
					}
				} else {
					if(this.jd_auth == 0) {
						this.$http({
							method: 'get',
							url: this.http+'/api/doAccredit',
							params: {
								type: type
							}
						}).then((res) => {
							if(res.data.code == '200') {
								this.url = res.data.data.data.url
							} else {

							}
						}, (err) => {
							console.log(err)
						})
					} else {
						this.$http({
							method: 'get',
							url: this.http+'/api/exitAccredit',
							params: {
								type: type
							}
						}).then((res) => {
							if(res.data.code == '200') {
								this.url = res.data.data.data.url
							} else {

							}
						}, (err) => {
							console.log(err)
						})
					}
				}

			},
//			goHome(){
//				router.go(-1);
//			}
		},
		created: function() {
			this.getAccredit()
		}
	}
</script>

<style scoped="scoped">
	/*.return{
    	width: 1.34rem;
    	line-height: .56rem;
    	height: .56rem;
    	border-top-right-radius: .28rem;
    	border-bottom-right-radius: .28rem;
    	color: white;
    	background: rgba(154,123,255,.8);
    	position: fixed;
    	left: 0;
    	bottom: 3.28rem;
    	z-index: 99999;
    }
    .return img{
    	width: .28rem;
    	height: .28rem;
    	margin:0 .05rem 0 .1rem;
    }*/
</style>