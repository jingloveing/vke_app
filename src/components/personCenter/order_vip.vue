<template>
	<div>
		<iframe src="https://m.vip.com/user-order-list-more.html" id="Iframe" frameborder="0" scrolling="" style="border:0px;height: 12.46rem;" width="100%" height=""></iframe>
		<div class="return flex" @click="goHome()">
			<img src="../../../static/images/return_icon.png" alt="" />
			<span class="f28">返回</span>
		</div>
	</div>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {

			}
		},
		methods: {
			goHome(){
				this.$router.push({name:'Home',query:{}})
			}
		},
		created: function() {
            
		},
		mounted() {

		},
	}
</script>

<style scoped="scoped">
.return{
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
    }
</style>