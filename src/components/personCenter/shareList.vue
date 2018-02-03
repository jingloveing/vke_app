<template>
   <div>
     <!--<x-header :left-options="{backText: ''}" style="padding: 2px 0 ;background-color: white;position: fixed;z-index: 10;width: 100%;top: 0;border-bottom: 1px solid #e1e1e1;">晒单赚元宝</x-header>-->
     <!--<div style="height: .88rem;"></div>-->
     <!--去掉细线-->
     <x-header :left-options="{backText: ''}" title="包打听" style="background-color: #f9f9f9;">
			<a slot="right" style="color: #9A7BFF;font-size: .32rem;" href="/personCenter/shareList/toShowList">
				<img src="../../../static/images/personCenter/share_edit.png" alt="" style="width: .4rem;height: .4rem;"/>
			</a>
		</x-header>
		<div style="height: .88rem;"></div>
    <div style="font-size: 0">
      <div>
        <tab :line-width=3 v-model="index" custom-bar-width="1.8rem" bar-active-color="#d7cAFF" style="background-color: #9A7BFF;">
          <tab-item class="vux-center" :selected=" type=== index" v-for="(item, index) in list2" :key="index" style="color: white;">
            <img :src="item.src" alt="" style="width: .36rem;height: .36rem;vertical-align: middle;margin-right: .15rem;">{{item.title}}</tab-item>
        </tab>
      </div>
      <div class="main">
        <div v-show="index==0">
          <div class="list_m" v-for="list in orderSquareList">
            <div class="list">
              <div class="user_info">
                <img :src="list.wechat_head_image" alt="" class="user_pic">
                <div class="user_des">
                  <p class="user_name">{{list.wechat_nickname}} <span class="level">帮主</span></p>
                  <p class="user_time" v-text="list.create_time">2017-10-14</p>
                </div>
              </div>
              <p class="message" v-text="list.evaluate_detail">留言内容留言内容留言内容留言内容留言内容留言内容内容留言内容留言内容</p>
              <div class="m_pic">
                <img :src="lists.image" alt="" class="pics"  v-for="lists in list.evaluate_url" :onerror="defaultImg">
              </div>
            </div>
          </div>
        </div>
        <div v-show="index==1">
          <div class="list_m" v-for="list2 in myOrderList">
            <div class="list">
              <div class="user_info">
              	<img :src="list.wechat_head_image" alt="" class="user_pic">
                <div class="user_des">
                  <p class="user_name">{{list.wechat_nickname}}<span class="level">帮主</span></p>
                  <p class="user_time" v-text="list2.create_time">2017-10-14</p>
                </div>
              </div>
              <p class="message" v-text="list2.evaluate_detail">留言内容留言内容留言内容留言内容留言内容留言内容内容留言内容留言内容</p>
              <div class="m_pic">
                <img :src="listss.image" alt="" class="pics"  v-for="listss in list2.evaluate_url" :onerror="defaultImg">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     <loading v-model="showLoading" :text="loadText"></loading>
     <!--<div class="toTop" @click="toTop()"><img src="/static/images/top.png" alt="" style="width: .35rem;height: .15rem;display: block;margin: .2rem auto .1rem;"><span>顶部</span></div>-->

   </div>
</template>
<script>
  import {XHeader,Tab, TabItem, XButton,Loading} from 'vux'
  const list = () => [
    {
      title:'晒单广场',
      src:'../../../static/images/personCenter/share_icon2.png'
    }, {
    title:'我的晒单',
      src:'../../../static/images/personCenter/share_icon1.png'
  },
  ]
  export default {
    name:'shareList',
    components:{
      XHeader,
      Tab, TabItem,
      XButton,
      Loading

    },
    data () {
      return {
        showLoading:false,
        loadText:'加载中...',
        orderSquareList:[],
        myOrderList:[],
        list2: list(),
        index: 0,
        type:0,
        defaultImg: 'this.src="' + require('../../../static/images/default_img.png') + '"',
        getBarWidth: function (index) {
          return (index + 1) * 22 + 'px'
        }
      }
    },
    methods: {
      //      获取晒单广场晒单列表
      getOrderSquareList:function(){
        this.$http({
          method:'POST',
          url:'/api/orderSquare',
        }).then((res)=>{
          if(res.data.code=='200'){
            this.orderSquareList = res.data.data.order_square
//            console.log(this.orderSquareList)
          }
        },(err)=>{
          console.log(err)
        })
      },
      //      获取晒单广场我的晒单列表
      getMyShareOrder:function(){
        this.$http({
          method:'POST',
          url:'/api/myShareOrder',
        }).then((res)=>{
          if(res.data.code=='200'){
            this.myOrderList = res.data.data.my_order
//            console.log(this.myOrderList)
          }
        },(err)=>{
          console.log(err)
        })
      },
////      回到顶部
//      toTop(){
//        document.documentElement.scrollTop = document.body.scrollTop =0;
//      }
    },
    mounted(){
      // 返回顶部
//      let back_btn = document.getElementsByClassName('toTop')[0];
//      window.onscroll = function () {
//        let top = document.documentElement.scrollTop || document.body.scrollTop;
//        if (top > 800) {
//          back_btn.style.display = 'block';
//        } else {
//          back_btn.style.display = 'none';
//        }
//      }
    },
    created:function(){

      this.getOrderSquareList();
      this.getMyShareOrder();
    }
  }
</script>
<style scoped>
  .main{
    background-color: white;
  }
  .list_m{
    border-bottom: .08rem solid #f4f4f4;
  }
.list{
  padding: .22rem;
}
  .user_pic{
    width:.72rem;
    height: .72rem;
    border-radius: 50%;
    margin-right: .1rem;
  }
  .user_des{
    display: inline-block;
  }
  .user_pic{
    font-size: .28rem;
    color: #333;
  }
  .user_time{
    font-size: .2rem;
    color: #d1d1d1;
  }
  .message{
    font-size: .28rem;
    color: #666;
    line-height: .35rem;
  }
  .m_pic{
    margin-top: .24rem;
    font-size: 0;
  }
  .pics{
    width: 2.28rem;
    height: 2.28rem;
    margin-right: .06rem;
  }
  .btn{
    width: 100%;
    background-color: #f6f6f6;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #e9e9e9;
  }
  .user_name{
    font-size:.28rem;
    color: #333;
  }
  .level{
  	color: #f9c303;
  	font-size: .22rem;
  	border-radius: .06rem;
  	border: .01rem solid #f9c303;
  	display: inline-block;
  	width: .64rem;
  	line-height: .28rem;
  	text-align: center;
  }
</style>
