<template>
  <div>
  	<tabbar class="tabbar">
  		<img src="../../../static/images/lt_black.png" class="return"/>
    <div class="title">{{title}}</div>
  </tabbar>
<div style="height: .88rem;"></div>
  </div>
</template>
<style scoped>
  .tabbar{
    background-color:#f9f9f9;
    height:.88rem;
    position:fixed;
    top:0;
    display: flex;
    align-items: center;
  }
  .title{
    text-align:center;
    margin:auto;
    color:#333;
    font-size:.36rem;
  }
  .return{
  	width: .19rem;
  	height: .36rem;
  	vertical-align: middle;
  	padding: .24rem;
  }
</style>
<script>
  import {Tabbar,TabbarItem} from 'vux'
  export default{
    name: 'AppHeader',
    components: {
      Tabbar,
      TabbarItem
    },
    props:{
      title:{
        default:'微客'
      }
    },
    methods: {
      resultClick (item) {
        alert('you click the result item: ' + JSON.stringify(item))
      },
      getResult (val) {
        this.results = val
      }
    },
  }

</script>
