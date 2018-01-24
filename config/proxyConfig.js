module.exports={
  proxy:{
    '/api': {  //将192.168.1.101印射为/api
      // target: 'http://www.longha.xin', // 接口域名
      // target: 'http://192.168.1.101/api', // 接口域名
      target: 'https://www.dxvke.com/api', // 接口域名
      // target:'http://www.cxvke.com/api',
      changeOrigin: true, //是否跨域
      pathRewrite: {
        '^/api': ''  //需要rewrite的,
      }
    }
  }
}
