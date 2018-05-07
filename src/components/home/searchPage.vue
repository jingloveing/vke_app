<template>
  <div style="background-color: white;">
    <div class="searchDiv">
      <img src="../../../static/images/personCenter/search_img.png" alt="">
      <form action="">
        <input v-model="key" type="text">
      </form>
      <span @click="onCancel()" class="cancel_btn">取消</span>
    </div>
    <div id="hot">
      <p style="font-size: .28rem;color: #666;padding: .2rem .3rem">热门搜索</p>
      <ul class="hot_list">
        <li v-for="hotList in hotList" v-text="hotList.keywords" @click="onSubmit(hotList.keywords)">冬装</li>
      </ul>
      <p style="font-size: .28rem;color: #666;padding:0 .3rem .2rem ;">历史搜索 <img src="../../../static/images/trash.png" alt="" style="margin-top:.05rem;width: .28rem;height: .28rem;float: right;" @click="del"></p>
      <ul class="hot_list">
        <li v-for="historyList in historyList" v-text="historyList.keywords" @click="onSubmit(historyList.keywords)">冬装</li>
      </ul>
    </div>
    <loading v-model="showLoading" :text="loadText"></loading>
    <!--<div class="toTop" @click="toTop()"><img src="/static/images/top.png" alt="" style="width: .35rem;height: .15rem;display: block;margin: .2rem auto .1rem;"><span>顶部</span></div>-->
  </div>
</template>
<script>
  import {Loading} from 'vux'
  export default {
    name: 'searchPage',
    components: {
      Loading
    },
    data() {
      return {
        sort_id:'',
        goodsList:[],
        showLoading:false,
        loadText:'加载中...',
        hotList:[],
        historyList:[],
        results: [],
        list:[],
        index: 0,
        getBarWidth: function (index) {
          return (index + 1) * 22 + 'px'
        },
        key:'',
      }
    },
    mounted() {
      this.$nextTick(function () {
        var oForm =  document.getElementsByTagName("form")[0];
        var self =this
        oForm.onsubmit = function(e){
          e.preventDefault();
          self.$router.push({name:'searchResult',query:{keyword:self.key,type:self.$route.query.type,id:self.$route.query.id}})
        };
      })
    },
    methods: {
      //      热门推荐列表
			getHotList: function() {
				this.$http({
					method: 'get',
					url: this.http+'/api/hotKeywords'
				}).then((res) => {
					if(res.data.code == '200') {
						this.hotList = res.data.data
					} else {

					}
				}, (err) => {
					console.log(err)
				})
			},
			//      搜索历史列表
			getHistoryList: function() {
				this.$http({
					method: 'get',
					url:this.http+'/api/searchHistory',
					params: {
						type: this.$route.query.type
					}
				}).then((res) => {
					if(res.data.code == '200') {
						this.historyList = res.data.data
					} else {

					}
				}, (err) => {
					console.log(err)
				})
			},
			//      清除历史列表
			del: function() {
				this.$http.post(this.http+'/api/delSearchHistory', {
					type: this.$route.query.type
				}).then((res) => {
					if(res.data.code == '200') {
						this.$vux.toast.show({
							text: res.data.data.message
						})
						this.historyList = []
					} else {

					}
				}, (err) => {
					console.log(err)
				})
			},
      onCancel() {
//  应该返回到智搜首页
//      this.$router.push({path:'/home/assortment/Search'})
        window.history.go(-1)
      },
      change(e){
        console.log(e)
        this.sort_id = e
        this.goodsList=''
        this.doSearch()
 
      },
//      toTop(){
//        document.documentElement.scrollTop = document.body.scrollTop =0;
//      },
      onSubmit(e) {
//        this.showLoading=true
       this.$router.push({name:'searchResult',query:{keyword:e,type:this.$route.query.type,id:this.$route.query.id}})

      },
    },
    created:function(){
    	this.type=this.$route.query.type
      this.getHotList()
      this.getHistoryList()
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
  .searchDiv{
    background: -webkit-linear-gradient(left, #8721b5, #db3283);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(left, #8721b5, #db3283);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(left, #8721b5, #db3283);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(left, #8721b5, #db3283);
		/* 标准的语法 */
		padding: .5rem .1rem .1rem;font-size: 0;
  }
  .searchDiv>img{
    width: .4rem;height: .4rem;vertical-align: middle;position: absolute;top: .62rem;left: .2rem;
  }
  .searchDiv>form{
    width: 80%;display: inline-block;margin-right: .6rem;
  }
  .searchDiv>form>input{
    width: 100%;outline: none;padding:.1rem .1rem .1rem .6rem;border:none;line-height: .44rem;font-size: .28rem;border-radius: .5rem;
  }
  .searchDiv>.cancel_btn{
    display: inline-block;text-align: center;font-size: .28rem;color: white;margin-left: .2rem;
  }
</style>
