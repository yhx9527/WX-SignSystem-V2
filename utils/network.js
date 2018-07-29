const app=getApp()
var Promise=require("./es6-promise.js")
function request(url,params={},method = "POST", header = {}) {
  let promise=new Promise(function(resolve,reject){
    wx.request({
    url: url,
    method: method,
    data: params?params:{},
     // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: header ? header : "application/json", // 设置请求的 header
    success: function (res) {
      console.log("返回结果")
      console.log(res)
      
      resolve(res);
    },
    fail: function (res) {
      console.log(res.data)
      wx.showToast({
        title: '连接失败',
        icon: "loading",
        duration: 2000
      })
      reject(res);
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