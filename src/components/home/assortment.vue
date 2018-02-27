<template>
  <div>
  	<x-header :left-options="{backText: ''}" title="淘宝领券" class="header"><a slot="right">
  		<router-link to="/home/assortment/search">
  			<img src="../../../static/images/search_icon.png" alt="" style="width: .4rem;height: .4rem;vertical-align: middle;"/>
  		</router-link>
  		
  	</a></x-header>
    <scroller :on-infinite="infinite" :on-refresh="refresh" ref="myscroller" style="margin-top: .88rem;">
      <swiper auto loop :list="demoList" style="width:100%;" height="2.6rem" dots-class="custom-bottom"
              dots-position="center" :show-desc-mask="false"></swiper>
      <div>
        <ul class="nav-small">
          <router-link tag="li" v-for="(type,index) in typeList" :to="{name:'Classify',query:{id:type.id}}" :key="index">
            <img :src="type.image_url" :onerror="defaultImg">
            <span>{{type.cate_name}}</span>
          </router-link>
        </ul>
      </div>
      <div class="main">
        <div class="nav-bigger">
          <router-link to="">
          <img class="same" src="../../../static/images/yuanbaoShop_img.png">
          </router-link>
            <router-link to="">
              <img class="same" src="../../../static/images/xianbao_img.png">
            </router-link>
          <router-link to="">
            <img class="same" src="../../../static/images/zhinan_img.png">
          </router-link>
            <router-link to="">
              <img class="same" src="../../../static/images/fuli_img.png">
            </router-link>
        </div>
         <div class="main_goods">
           <ul class="goods">
             <router-link tag="li" v-for="(goods,index) in goodsList" class="goods_list" to="" :key="index">
               <img :src="goods.pict_url" alt="" :onerror="defaultImg">
               <div class="content">
                 <div class="des">{{goods.title}}</div>
                 <div style="margin: .15rem 0rem;">
                      <span class="juan_style">
                      <span class="juan_style_left">券</span>
                      <span class="juan_style_right">{{goods.coupon_number}}元</span>
                      </span>
                   <span class="return_num_style" v-show="goods.fans_acer !==0">返{{goods.fans_acer}}元宝</span>
                 </div>
                 <div class="des_b">
                   <span class="price"><span style="font-size: .2rem;">￥</span>{{goods.zk_final_price.rmb}}<span style="font-size: .20rem;" v-show="goods.zk_final_price.corner!=='00'">.{{goods.zk_final_price.corner}}</span></span>
                   <!--<del style="font-size: .20rem;color: #999;" >￥{{goods.reserve_price.rmb}}<span v-show="goods.reserve_price.corner!=='00'">.{{goods.reserve_price.corner}}</span></del>-->
                   <span class="num">{{goods.volume}}件已售</span>
                 </div>
               </div>
             </router-link>
           </ul>
         </div>
      </div>
    </scroller>
    <!--<div class="toTop" @click="toTop()">-->
      <!--<img src="/static/images/top.png" alt="" style="width: .35rem;height: .15rem;display: block;margin: .2rem auto .1rem;">-->
      <!--<span>顶部</span>-->
    <!--</div>-->
  </div>
</template>
<script>
  import {XHeader,Swiper} from 'vux'
  export default {
    name: 'Home',
    components: {
    	XHeader,
      Swiper,
    },
    data() {
      return {
        demoList: [],
        typeList:[],
        storeTypeList:[],
        goodsList:[],
        defaultImg: 'this.src="' + require('../../../static/images/default_img.png') + '"',
        pageIndex:1,
        limit:10,
        noData: false,
      }
    },
    methods: {
      //      获取首页轮播图
      getBannerList:function(){
        this.$http({
          method:'POST',
          url:'/api/index_banner'
        }).then((res)=>{
          if(res.data.code=='200'){
            const imgList = res.data.data.index_banner
            const demoList = imgList.map((item, index) => ({
              url: item.banner_url,
              img: item.banner_image
            }))
            this.demoList = demoList
//          console.log(imgList)
          }
        },(err)=>{
          console.log(err)
        })
      },
//      获取商品分类
      getTypeList:function(){
        this.$http({
          method:'POST',
          url:'/api/index_type'
        }).then((res)=>{
         if(res.data.code=='200'){
           const typeList = res.data.data.goods_type_up
           this.typeList = typeList
         }
        },(err)=>{
          console.log(err)
        })
      },
//      获取商品列表
      getGoodsList:function(){
        const self = this
        this.$http({
          method:'POST',
          url:'/api/index_goods',
          data:{page:this.pageIndex,limit:this.limit}
        }).then((res)=>{
         if(res.data.code=='200'){
           if(res.data.data.goods.length==0){
             this.noData=true
             this.$refs.myscroller.finishInfinite(2);
//             self.noData=false;
//             self.$refs.myscroller.finishPullToRefresh();
           }else{
             this.goodsList=this.goodsList.concat(res.data.data.goods)
           }
         }
        },(err)=>{
          console.log(err)
        })
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
              self.getGoodsList()
            done()
          },1500)
        }
      },
      refresh(done) {
        var self = this
        this.pageIndex=1
        this.goodsList=[]
        this.getBannerList()
        this.getTypeList()
        this.getGoodsList()
        setTimeout(function () {
          self.top = self.top - 10;
          done()
        }, 1500)
      },
//      toTop(){
//        document.documentElement.scrollTop = document.body.scrollTop =0;
//      },
    },
    mounted: function () {
      this.$nextTick(function() {
//        // 返回顶部
//        let back_btn = document.getElementsByClassName('toTop')[0];
//        window.onscroll=function () {
//          let top = document.documentElement.scrollTop || document.body.scrollTop;
////          console.log(top)
//          if (top > 800) {
//            back_btn.style.display = 'block';
//          } else {
//            back_btn.style.display = 'none';
//          }
//        }
      })
    },
    created: function(){
      this.getBannerList()
      this.getTypeList()
      this.getGoodsList()
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
  .nav-small {
    overflow: hidden;
    padding: .38rem .2rem .1rem .2rem;
    background-color: white;
  }

  .nav-small li {
    margin-bottom: .25rem;
    width: 20%;
    float: left;
    list-style: none;
    text-align: center;
  }

  .nav-small li img {
    width: .8rem;
    height: .8rem;
    border-radius: 50%;
    margin: 0 auto;
    word-break: break-all;
  }

  .nav-small li span {
    font-size: .24rem;
    color: #333333;
    display: block;
  }

  .nav-bigger {
    width: 100%;
    background-color: white;
    font-size: 0;
    margin: .16rem 0;
  }

  .same:nth-child(odd){
    width: 50%;
    height: 1.52rem;
    display: inline-block;
    border-right: .01rem solid #f4f4f4;
    box-sizing: border-box;
  }
  .same:nth-child(1),.same:nth-child(1){
    border-bottom: .01rem solid #f4f4f4;
  }
  .main {
    margin-bottom: 1.06rem;
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
    padding:.1rem;
  }

  .des {
    height: .8rem;
    font-size: .28rem;
    color: #333;
    line-height: .4rem;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
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
</style>
<style>
  .vux-slider > .vux-indicator > a > .vux-icon-dot.active {
    background-color: #ff425f !important;
  }
  .juan_style{
    border: .01rem solid #ff425f;display: inline-block;border-radius: .02rem;
  }
  .juan_style_left{
    font-size: .20rem;color: #ffeff2;background-color: #ff425f;height: 100%;display: inline-block;padding: 0 .05rem;
  }
  .juan_style_right{
    font-size: .20rem;color: #ff425f;background-color: #ffeff2;height: 100%;display: inline-block;padding: 0 .05rem;
  }
  .return_num_style{
    padding: 0 .05rem;color: #ff8a1e;font-size: .2rem;border-radius: .02rem;border: .01rem solid #ff8a1e;display: inline-block;margin-left: .1rem;
  }
  .vux-slider > .vux-indicator, .vux-slider .vux-indicator-right {
    bottom: 2px!important;
  }
</style>
