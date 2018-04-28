<template>
  <div>
  	<tabbar class="footer">
    <tabbar-item link="/home" :selected="$route.path == '/home'">
      <img slot="icon" src="../../assets/home_gray.png" v-show="$route.path !== '/home'">
      <img slot="icon" src="../../assets/home_red.png" v-show="$route.path == '/home'">
      <span slot="label">首页</span>
    </tabbar-item>
    <tabbar-item link="/shareRoom" :selected="$route.path == '/shareRoom'">
      <img slot="icon" src="../../assets/search_gray.png" v-show="$route.path !== '/shareRoom'">
      <img slot="icon" src="../../assets/search_red.png" v-show="$route.path == '/shareRoom'">
      <span slot="label">一键分享</span>
    </tabbar-item>
    <tabbar-item  link="/brandSite" :selected="$route.path == '/brandSite'">
      <img slot="icon" src="../../assets/youhui_gray.png" v-show="$route.path !== '/brandSite'">
      <img slot="icon" src="../../assets/youhui_red.png" v-show="$route.path == '/brandSite'">
      <span slot="label">品牌现场</span>
    </tabbar-item>
    <tabbar-item link="/PersonCenter" :selected="$route.path == '/PersonCenter'">
      <img slot="icon" src="../../assets/personcenter_gray.png" v-show="$route.path !== '/PersonCenter'">
      <img slot="icon" src="../../assets/personcenter_red.png" v-show="$route.path == '/PersonCenter'">
      <span slot="label">个人中心</span>
    </tabbar-item>
  </tabbar>
    <div style="height: 1.06rem;"></div>
  </div>
</template>
<script>
  import { Tabbar, TabbarItem} from 'vux'
  export  default {
    name:'AppFooter',
    components:{
      Tabbar,
      TabbarItem,
    }

  }
</script>
<style scoped>
   .footer {
     position: fixed;
   }
</style>
<style>
  .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
    color:#8721b5!important;
    font-size: .2rem;
  }
  .weui-tabbar__icon {
    display: inline-block;
    width: .54rem;
    height: .54rem;
}
.weui-tabbar__item{
	padding: .1rem 0 0;
}
</style>
