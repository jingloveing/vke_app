<template>
  <div>
  	<x-header :left-options="{backText: ''}" title="智搜" class="header"></x-header>
    <div class="search">
     <router-link to="/home/assortment/searchPage">
       <img src="../../../static/images/search_img.png" alt="">
     </router-link>
    </div>
    <!--<div style="height: 1.52rem;"></div>-->
    <img src="../../../static/images/detail.png" alt="" class="detail">
  </div>
</template>
<script>
	import {XHeader} from 'vux'
  export  default {
  name:'Search',
    components:{
    	XHeader
    }
  }
</script>
<style scoped>
	.header{
		border:none;
		background: -webkit-linear-gradient(left, #ff5200, #ff8f00);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(left, #ff5200, #ff8f00);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(left, #ff5200, #ff8f00);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(left, #ff5200, #ff8f00);
		/* 标准的语法 */
	}
.search{
  background-image: url("../../../static/images/search_bd.png");background-size: 100% 100%;background-repeat: no-repeat;
  height: 1.52rem;
  text-align: center;
  margin-top: .88rem;
}
  .search img{
    width: 90%;
    height: .64rem;
    margin-top: .4rem;
  }
  .detail{
    width: 100%;
  }
</style>
