<template>
	<div>
		<div class="goods flex">
			<img src="../../../dist/static/images/default_img.png" alt="" class="pic"/>
			<div>
				<p class="f32 c_f">
				   <span>已发货</span>
				   <span v-show="false">运输中</span>
				   <span v-show="false">派送中</span>
				   <span v-show="false">已签收</span>
				</p>
				 <p class="f24 c6">圆通速递:<span style="font-family: arial;">1111111111132324</span></p>
			</div>
		</div>
		<div class="main">
			<div style="padding: .5rem 1rem 0;" class="flex">
				<img src="../../../static/images/seek_icon.png" alt="" style="width: .28rem; height: .35rem;margin-right: .2rem;"/>
				<p class="f28 c_f">[收货地址]浙江省杭州市滨江区 西兴街道玲珑府小区</p>
			</div>
			 <timeline>
            <timeline-item class='recent'>
            	<p class="f28 c_f">已签收</p>
                <p class="c_f f24">某某某地区</h4>
                <p class="c_f f24">2016-04-17 12:00:00</p>
            </timeline-item>
            <timeline-item>
            	<p class="f28 c9">派送中</p>
                <p class="f28 c9"> 申通快递员 广东广州 收件员 xxx 已揽件</p>
                <p class="f24 c9">2016-04-16 10:23:00</p>
            </timeline-item>
            <timeline-item>
            	<p class="f28 c9">派送中</p>
                 <p class="f28 c9"> 商家正在通知快递公司揽件</p>
                <p class="f24 c9">2016-04-15 9:00:00</p>
            </timeline-item>
        </timeline>
		</div>
	</div>
</template>

<script>
	import { Timeline, TimelineItem, XButton } from 'vux'

export default {
  components: {
    Timeline,
    TimelineItem,
    XButton
  },
  data () {
    return {
      count: 3
    }
  }
}
</script>

<style scoped="scoped">
	.goods{
		height: 1.8rem;
		background: white;
		margin-bottom: .2rem;
	}
	.pic{
		width: 1.18rem;
		height: 1.18rem;
		margin: 0 .24rem 0 .48rem;
	}
	.main{
		background: white;
	}
</style>
<style type="text/css">
	.recent .vux-timeline-item-color{
		background-color: #9a7bff!important;
	}
	.vux-timeline-item-tail{
		background-color: #e5e5e5!important;
		width: .01rem!important;
	}
	.vux-timeline-item-color {
    background-color: #cbcbcb!important;
}
.vux-timeline-item-content {
	padding:0 0 .5rem .6rem!important;
}
.vux-timeline{
	padding: .5rem 1rem!important;
}
</style>