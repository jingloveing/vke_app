<template>
	<div id="app">
		<x-header :left-options="{backText: ''}" :title="$route.meta.title" v-show="$route.meta.showHeader"></x-header>
		<div style="height: 1.28rem;" v-show="$route.meta.showHeader"></div>
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
		<app-footer v-show="$route.meta.showFooter"></app-footer>
		<div class="toTop" @click="toTop()">
			<img src="../static/images/top.png" style="width: .35rem;height: .15rem;display: block;margin: .2rem auto .1rem;">
			<span>顶部</span>
		</div>
	</div>
</template>
<script>
	import AppHeader from '@/components/common/header'
	import AppFooter from '@/components/common/footer'
	import { XHeader, TransferDom } from 'vux'
	export default {
		directives: {
			TransferDom
		},
		name: 'app',
		components: {
			AppFooter,
			AppHeader,
			XHeader
		},
		data: function() {
			return {
				title: 'haha'
			}
		},
		mounted: function() {
			this.$nextTick(function() {
				// 返回顶部
				let back_btn = document.getElementsByClassName('toTop')[0];
				window.onscroll = function() {
					let top = document.documentElement.scrollTop || document.body.scrollTop;
					if(top > 800) {
						back_btn.style.display = 'block';
					} else {
						back_btn.style.display = 'none';
					}
				}
			})
		},
		watch: {
			//    '$route':'fetchPath'
		},
		methods: {
			toTop() {
				document.documentElement.scrollTop = document.body.scrollTop = 0;
			},
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/reset.less';
	body {
		background-color: #f4f4f4;
	}
</style>