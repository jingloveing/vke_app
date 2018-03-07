<template>
  <div>
    <div>
      <group class="main">
        <x-input title="姓名" name="username" placeholder="请输入姓名" is-type="china-name" v-model="name" class="f28 same c3"></x-input>
        <x-input title="手机号码" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"  v-model="tel" class="f28 c3 same"></x-input>
        <x-address title="所在地区" v-model="address"  :list="addressData" value-text-align="center" class="f28 c3 same"></x-address>
        <textarea name="des" placeholder="详细地址" class="des same" v-model="detail">
    </textarea>
      <checklist :options="commonList" v-model="checkValue" @on-change="change" ref="check" class="f24 c3 checkList"></checklist>
       </group>
    </div>
    <div style="height: .96rem;"></div>
		<div style="position:fixed;bottom: 0;width: 100%;height: .96rem;">
			<x-button @click.native="click()" type="primary" action-type="button" style="width: 100%;height: 100%;border-radius: 0;" class="f32">保存</x-button>
		</div>
    <loading v-model="showLoading" :text="loadText"></loading>
  </div>
</template>
<script>
  import {Cell,ChinaAddressV4Data,Group,XAddress,XInput,Checklist,XButton,Loading,Value2nameFilter as value2name } from 'vux'

  export default {
    name: 'addAddress',
    components: {
      ChinaAddressV4Data,
      Group,
      XAddress,
      XInput,
      Checklist,
      XButton,
      Loading,
      Cell
    },
    data () {
      return {
        addressData: ChinaAddressV4Data,
        commonList: [{key:'1', value:'设为默认'}],
        checkValue: [],
        address_id:'',
        showLoading:false,
        loadText:'加载中...',
        name:'',
        tel:'',
        address:[],
        detail:'',
        type:'',
        value2name:'',
        is_default:'',
        from:'',
        pro_id:'',
      }
    },
    methods: {
      //      新增收货地址
      addAddress:function(){
        this.getName(this.address)
        this.showLoading=true
        this.$http.post('/api/updateAddress',{
            consignee:this.name,
            telephone:this.tel,
            detail:this.detail,
            address:this.value2name,
            is_default:this.type
         }).then((res)=>{
          if(res.data.code=='200'){
            this.showLoading=false
            this.$router.go(-1)
          }else if(res.data.code=='400'){
            this.$vux.toast.show({
              text:res.data.error,
              type:'cancel'
            })
            this.showLoading=false
          }
        },(err)=>{
          console.log(err)
        })
      },
      //      修改收货地址详情
      update:function(){
        this.getName(this.address)
        this.showLoading=true
        this.$http.post('/api/updateAddress',{
            id:this.address_id,
            consignee:this.name,
            telephone:this.tel,
            detail:this.detail,
            address:this.value2name,
            is_default:this.type
         }).then((res)=>{
          if(res.data.code=='200'){
            this.showLoading=false
            this.$router.push({name: 'AddressList',query:{id:this.pro_id,type:this.from}})
          }else if(res.data.code=='400'){
            this.showLoading=false
          }
        },(err)=>{
          console.log(err)
        })
      },
      //      收货地址详情
  getAddressDetail:function(){
        this.showLoading=true
        this.$http({
          method:'GET',
          url:'/api/updateAddress',
          params:{id:this.address_id}
        }).then((res)=>{
          if(res.data.code=='200'){
            this.showLoading=false
            this.name=res.data.data.consignee
            this.tel=res.data.data.telephone
            this.address=res.data.data.address_array
            this.type = res.data.data.is_default
            this.is_default=res.data.data.is_default
            this.detail=res.data.data.address
            if(res.data.data.is_default==1){
              this.checkValue=['1']
            }else{
              this.checkValue=[]
            }
            console.log(this.checkValue)
          }else if(res.data.code=='400'){
            this.showLoading=false
          }
        },(err)=>{
        	this.showLoading=false
          console.log(err)
        })
      },
      doShowAddress () {
        this.showAddress = true
        setTimeout(() => {
          this.showAddress = false
        }, 2000)
      },
      change (val, label) {
          if (val == '1') {
            this.type = '1'
          } else {
            this.type = '0'
          }
          console.log(this.checkValue)
      },
      getName:function(value){
        this.value2name= value2name(value, ChinaAddressV4Data)
      },
      click(){
        if(this.address_id){
           this.update()
        }else{
           this.addAddress()
        }
      }
    },
    created:function(){
      const address_id = this.$route.query.id
      const from = this.$route.query.from
      this.address_id = address_id
      this.from =from
      this.pro_id=this.$route.query.pro_id
      this.getAddressDetail()
    },
    mounted:function(){

    }

  }
</script>
<style scoped="">
  .des{
    width: 100%;height: 1.94rem;outline: none;border: none;resize: none;
    font-size: .28rem;
    color: #666;
    margin: 0 .3rem;
    padding: .3rem 0;
    -webkit-appearance: none;
  }
  .same{
  	border-bottom:.01rem solid #e5e5e5;
  	padding-left: 0;
  	margin-left: .26rem;
  }
</style>
<style>
	.main .weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked:before {
    color: #9a7bff!important;
}
.main .weui-cells_checkbox .weui-icon-checked:before{
	font-size: .36rem!important;
}
.checkList .weui-cells{
	font-size: .24rem!important;
	color: #333;
}
.main .weui-cells:before{
	border-top: none;
	height: 0;
}
.main .weui-cell:before{
	border-top: none;
	height: 0;
}
.main .weui-cells:after{
	border-bottom: none;
	height: 0;
}
.same .weui-cell{
	padding-left: 0;
}
</style>
