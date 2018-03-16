<template>
  <div style="background-color: white;">
   <div style="position: fixed;z-index: 999999;width: 100%;background:#f9f9f9;padding-top: .4rem;height: .88rem;">
     <div class="goHome" @click="goHome()">
       <x-icon type="ios-arrow-left" size="30" style="fill: #333;width: .86rem;margin-top: 6px;" @click="goback()"></x-icon>
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
           style="margin-top: 1.28rem;">
        <tab-item class="vux-center" v-for="(item, index) in list" @on-item-click="change(index)" :key="index">{{item}}
        </tab-item>
        <tab-item class="vux-center" @on-item-click="change(3)">价格 <div style="display: inline-block;">
				<img src="../../../static/images/sort_price.png" style="width: .12rem;height: .19rem;" v-show="defaultsort"/>
				<img src="../../../static/images/sort_price_asc.png" style="width: .12rem;height: .19rem;" v-show="!asc && !defaultsort"/>
				<img src="../../../static/images/sort_price_desc.png" style="width: .12rem;height: .19rem;" v-show="asc && !defaultsort"/>
			</div>
							</tab-item>
      </tab>
      <scroller :on-infinite="infinite" :on-refresh="refresh" ref="myscroller" style="margin-top: 2.16rem;">
      <div class="main_goods">
        <ul class="goods">
          <router-link tag="li" class="goods_list" v-for="(goods,index) in goodsList" :key="index" :to="{name:'TBDetail',query:{id:goods.id,type:7}}">
            <img :src="goods.thumb_url" alt="" :onerror="defaultImg">
            <div class="content">
              <div class="des" v-text="goods.product_name">产品介绍产品介绍产品介绍产品介绍产品介绍</div>
              <div style="margin: .15rem 0rem;">
                      <span class="juan_style">
                      <span class="juan_style_left">券</span>
                      <span class="juan_style_right">{{goods.coupon_number}}元</span>
                      </span>
              </div>
              <div class="des_b">
                <span class="price"><span style="font-size: .2rem;">￥</span>{{goods.reserve_price.rmb}}<span v-show="goods.reserve_price.corner!=='00'">.{{goods.reserve_price.corner}}</span></span>
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
  import {Search, Tab, TabItem,Loading} from 'vux'
  const url='http://xlk.dxvke.com/'
  export default {
    name: 'searchPage',
    components: {
      Search,
      Tab,
      TabItem,
      Loading
    },
    data() {
      return {
        sort:'',
        goodsList:[],
        showLoading:false,
        loadText:'加载中...',
        hotList:[],
        historyList:[],
//        searchResults:true,
        results: [],
        keywords: '',
        list:['综合','热门','新品'],
        index: 0,
        getBarWidth: function (index) {
          return (index + 1) * 22 + 'px'
        },
        pageIndex:1,
        limit:10,
        totalPage:0,
        noData: false,
        defaultImg: 'this.src="' + require('../../../static/images/default_img.png') + '"',
        order:1,
        defaultsort:true,
				asc:true,
      }
    },
    mounted() {
      const search = document.getElementsByClassName('weui-search-bar__cancel-btn')
      search[0].style.cssText="color:#333;font-size:.28rem;"
    },
    methods: {
      //      执行搜索
      doSearch:function(){
      	if(this.asc==true){
					this.sort='desc'
				}else if(this.asc==false){
					this.sort='asc'
				}else{
					this.sort=''
				}
        this.$http({
          method:'get',
          url:url+'/api/searchProdcut',
          params:{keywords:this.keywords,sort:this.sort,page:this.pageIndex,limit:this.limit,type:this.$route.query.type,order:this.order}
        }).then((res)=>{
          this.showLoading=false
          if(res.data.code=='200'){
            if(res.data.data.list.length==0){
              this.noData=true
              this.$refs.myscroller.finishInfinite(2);
            }else{
              this.goodsList=this.goodsList.concat(res.data.data.list)
              this.$refs.myscroller.finishPullToRefresh()
            }
          }else if(res.data.code=='400'){
          	  this.noData=true
              this.$refs.myscroller.finishInfinite(2);
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
        this.$router.go(-1)
      },
      onCancel() {
//  应该返回到智搜首页
        history.go(-1)
//      console.log('aa')
      },
      change(e){
      	if(e==3){
					this.defaultsort=false
					this.asc=!this.asc
				}else{
					this.defaultsort=true
					this.asc=true
				}
        this.pageIndex=1
        this.goodsList=[]
        this.order=e+1
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
	.weui-search-bar__form:after{
		border-radius: .5rem!important;
	}
	.weui-search-bar__form{
		background: #f9f9f9!important;
	}
</style>
