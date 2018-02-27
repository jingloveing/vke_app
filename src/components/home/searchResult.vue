<template>
  <div style="background-color: white;">
    <!--<x-header :left-options="{backText: ''}"-->
    <!--style="padding: 2px 0 ;background-color: white;position: fixed;z-index: 100;width: 100%;top: 0;border-bottom: 1px solid #e1e1e1;height: .88rem;">-->
    <!--搜索-->
    <!--</x-header>-->
    <!--<div style="height: .88rem;"></div>-->
   <div style="position: fixed;z-index: 999999;width: 100%;">
     <div class="goHome" @click="goHome()">
       <img src="../../../static/images/home.png" alt="">
     </div>
     <div @click="onFocus">
       <search placeholder="请输入商品名称" cancel-text="取消"
               :results="results"
               v-model="keywords"
               ref="search"  style="width: 90%;margin-left: 10%;"></search>
     </div>
   </div>
    <!--<div v-show="searchResults" id="hot">-->
      <!--<p style="font-size: .28rem;color: #666;padding: .2rem .3rem">热门搜索</p>-->
      <!--<ul class="hot_list">-->
        <!--<li v-for="hotList in hotList" v-text="hotList.keywords" @click="onSubmit(hotList.keywords)">冬装</li>-->
      <!--</ul>-->
      <!--<p style="font-size: .28rem;color: #666;padding:0 .3rem .2rem ;">历史搜索 <img src="../assets/trash.png" alt="" style="margin-top:.05rem;width: .28rem;height: .28rem;float: right;" @click="del"></p>-->
      <!--<ul class="hot_list">-->
        <!--<li v-for="historyList in historyList" v-text="historyList.keywords" @click="onSubmit(historyList.keywords)">冬装</li>-->
      <!--</ul>-->
    <!--</div>-->
    <div id="results" style="overflow: hidden;">
      <tab :line-width=0 active-color='#9a7bff' v-model="index" custom-bar-width="1.2rem" bar-active-color="#9a7bff"
           style="border-bottom: 1px solid #e1e1e1;margin-top: 44px;">
        <tab-item class="vux-center" :selected="index === 0" v-for="(item, index) in list" @on-item-click="change(index)"
                  :key="index">{{item}}
        </tab-item>
      </tab>
      <scroller :on-infinite="infinite" :on-refresh="refresh" ref="myscroller" style="margin-top: 89px;">
      <div class="main_goods">
        <ul class="goods">
          <router-link tag="li" class="goods_list" v-for="(goods,index) in goodsList" :key="index" :to="{name:'goodsDetail',query:{id:goods.id,type:2}}">
            <img :src="goods.pict_url" alt="" :onerror="defaultImg">
            <div class="content">
              <div class="des" v-text="goods.title">产品介绍产品介绍产品介绍产品介绍产品介绍</div>
              <div style="margin: .15rem 0rem;">
                      <span class="juan_style">
                      <span class="juan_style_left">券</span>
                      <span class="juan_style_right">{{goods.coupon_number}}元</span>
                      </span>
              </div>
              <div class="des_b">
                <span class="price"><span style="font-size: .2rem;">￥</span>{{goods.zk_final_price.rmb}}<span v-show="goods.zk_final_price.corner!=='00'">.{{goods.zk_final_price.corner}}</span></span>
                <span class="num">{{goods.volume}}件已售</span>
              </div>
            </div>
          </router-link>
        </ul>
      </div>
      </scroller>
    </div>
    <loading v-model="showLoading" :text="loadText"></loading>
    <!--<div class="toTop" @click="toTop()"><img src="/static/images/top.png" alt="" style="width: .35rem;height: .15rem;display: block;margin: .2rem auto .1rem;"><span>顶部</span></div>-->

  </div>
</template>
<script>
  import {Search, XHeader,Tab, TabItem,Loading} from 'vux'
  export default {
    name: 'searchPage',
    components: {
      XHeader,
      Search,
      Tab,
      TabItem,
      Loading
    },
    data() {
      return {
        sort_id:9,
        goodsList:[],
        showLoading:false,
        loadText:'加载中...',
        hotList:[],
        historyList:[],
//        searchResults:true,
        results: [],
        keywords: '',
        list:['综合','热门','新品','价格'],
        index: 0,
        getBarWidth: function (index) {
          return (index + 1) * 22 + 'px'
        },
        pageIndex:1,
        limit:10,
        totalPage:0,
        noData: false,
        defaultImg: 'this.src="' + require('../../../static/images/default_img.png') + '"',
      }
    },
    mounted() {
      const search = document.getElementsByClassName('weui-search-bar__cancel-btn')
      search[0].style.cssText="color:#333;font-size:.28rem;"
//      // 返回顶部
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
    methods: {
      //      执行搜索
      doSearch:function(){
        this.$http({
          method:'POST',
          url:'/api/doSearch',
          data:{keywords:this.keywords,sort:this.sort_id,page:this.pageIndex,limit:this.limit}
        }).then((res)=>{
          this.showLoading=false
          if(res.data.code=='200'){
//            this.searchResults=false;
//            this.goodsList=res.data.data.product_list
            if(res.data.data.product_list.length==0){
              this.noData=true
              this.$refs.myscroller.finishInfinite(2);
            }else{
              this.goodsList=this.goodsList.concat(res.data.data.product_list)
              this.$refs.myscroller.finishPullToRefresh()
            }
          }else if(res.data.code=='400'){
//            this.$vux.toast.show({
//              type:"cancel",
//              text:res.data.message
//            })
          }
        },(err)=>{
          console.log(err)
        })
      },
//      //      热门推荐列表
//      getType:function(){
//        this.$http({
//          method:'POST',
//          url:'/api/serrchSort'
//        }).then((res)=>{
//          if(res.data.code=='200'){
//            this.list = res.data.data.sorts_type
//          }else{
//
//          }
//        },(err)=>{
//          console.log(err)
//        })
//      },
//      },
      onSubmit(e) {
        console.log(e)
        this.$refs.search.setBlur();
        this.keywords=e
        this.showLoading=true
        this.doSearch()

      },
      onFocus() {
        this.$router.push({path:'/home/assortment/searchPage'})
      },
      onCancel() {
//  应该返回到智搜首页
        history.go(-1)
//      console.log('aa')
      },
      change(e){
        this.pageIndex=1
        this.goodsList=[]
        if(e==0){
          this.sort_id=9
        }else if(e==1){
          this.sort_id=10
        }else{
          this.sort_id=11
        }
        this.doSearch()

      },
//      toTop(){
//        document.documentElement.scrollTop = document.body.scrollTop =0;
//      },
      goHome(){
        this.$router.push({path:'/home'})
      },
      infinite(done) {
        if (this.noData) {
          setTimeout(() => {
            this.$refs.myscroller.finishInfinite(2);
          })
          return;
        }
        else{
          let self = this;//this指向问题
          setTimeout(()=>{
            self.pageIndex += 1
            self.doSearch()
            done()
          },1500)
        }

      },
      refresh(done) {
        var self = this
        this.pageIndex=1
        this.goodsList=[]
        this.doSearch()
        setTimeout(function () {
          self.top = self.top - 10;
          done()
        }, 1500)
      },
    },
    created:function(){
      this.keywords = this.$route.query.keyword
      this.doSearch()
//      this.getType()
    },

  }
</script>
<style scoped>
  .hot_list{
    margin: 0 .3rem;
  }
  ul li{
    list-style: none;
  }
  .hot_list li{
    display: inline-block;
    border: .01rem solid #999;
    border-radius: .5rem;
    line-height: .6rem;
    padding: 0rem .3rem;
    font-size: .28rem;
    color: #333;
    margin: 0 .2rem .2rem 0;
  }

  .goods {
    overflow: hidden;
  }

  .goods_list {
    font-size: 0;
    background-color: white;
    list-style: none;
    float: left;
    width: 50%;
    box-sizing: border-box;
    border-bottom: .1rem solid #f4f4f4;
  }

  .goods_list img {
    width: 100%;
    height: 3.6rem;
  }

  .goods_list:nth-of-type(odd) {
    border-right: .05rem solid #f4f4f4;
  }

  .goods_list:nth-of-type(even) {
    border-left: .05rem solid #f4f4f4;
  }

  .content {
    padding: .15rem;
  }

  .des {
    font-size: .28rem;
    color: #333;
    line-height: .4rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .price {
    font-size: .32rem;
    color: #ff425f;
  }

  .num {
    font-size: .24rem;
    color: #999;
    float: right;
    margin-top: .1rem;
    margin-right: .15rem;
  }
  .goHome{
    background-color: #f9f9f9;height: 44px;width: 10%;position: absolute;
    box-sizing: border-box;
  }
  .goHome>img{
    width: 22px;height: 22px;margin-top: 11px;margin-left: calc(((100% - 22px)/2) + 4px);
  }
</style>
<style>
	.weui-search-bar{
		background-color: #f9f9f9!important;
	}
	.weui-search-bar:before{
		border-top: none!important;
	}
	.weui-search-bar:after{
		border-bottom: none!important;
	}
</style>
