const app=getApp()
function request(url,params={},method = "GET", header) {
  let promise=new Promise(function(resolve,reject){
    wx.request({
    url: url,
    method: method,
    data: params?params:{},
     // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: header ? header : {"Content-Type":"application/json"}, // 设置请求的 header
    success: function (res) {
      console.log("成功返回结果: "+res)
      if((res.statusCode >= 200 && res.statusCode <300) || res.statusCode ==304){
        resolve(res.data)
      }else{
        reject('Request was unsuccessful'+res.statusCode)
      }
    },
    fail: function (res) {
      console.log("失败返回结果: " + res)
      wx.showToast({
        title: '连接失败',
        icon: "loading",
        duration: 2000
      })
      reject('连接失败');
    },
    complete: function () {
      // complete
    }
    })
  });
  return promise
  
}
module.exports={
  request:request,
}