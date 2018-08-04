const app=getApp();
const util = require('../../../../utils/util.js');
var sysInfo = app.globalData.systemInfo;
var width = sysInfo.width;
var winWidth = width*1.05 ;
var height = sysInfo.height
var winHeight = height * 0.1;
function headToEnd(array) {
  if (array instanceof Array) {
    var temp = array.shift();
    array.push(temp);
  }

}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowWeek: 1,
    Weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    distance: "",
    xArrays:[1.05*winWidth,winWidth,0.95*winWidth],
    yArrays:[0.7*winHeight,winHeight,1.3*winHeight],
    zIndexs:[-2,-1,0] ,
    x:winWidth,
    y:winHeight,
    disabled:true,
    //leaveCards: [{ x: width * 1.1, y: height * 0.08 }, { x: winWidth, y: winHeight }, { x: width * 1, y: height * 0.12}],
    leaveCards: [{ id:0,x: 1.05, y: 0.7, disabled: true},{id:1,x:1,y:1,disabled:true},{id:2,x:0.95,y:1.3,disabled:false}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  //卡片滑动
  onChange:function(e){
    var that = this;
    that.setData({
      distance: e.detail.x
    })
  },
  
  tap:function(e){
    var that = this;
    var item = e.currentTarget.dataset.item;
    var distance = that.data.distance;
    var xArrays = that.data.xArrays;
    var yArrays = that.data.yArrays;
    var zIndexs = that.data.zIndexs;
    console.log("tapl")
    if (distance > (winWidth + winWidth / 4)) {
      headToEnd(xArrays);
      headToEnd(yArrays);
      headToEnd(zIndexs);
      that.setData({
        disabled: false,
        xArrays: xArrays,
        yArrays: yArrays,
        zIndexs: zIndexs
      })
    } else if (distance < (winWidth - winWidth / 2)){
      headToEnd(xArrays);
      headToEnd(yArrays);
      headToEnd(zIndexs);
      that.setData({
        disabled:false,
        xArrays: xArrays,
        yArrays: yArrays,
        zIndexs: zIndexs,
        
      })
    } else {

      that.setData({
        xArrays: xArrays,
        yArrays: yArrays,
        zIndexs:zIndexs
      })
    }
  },
  //批准请假
  yesClick (){
    /*var that = this;
    var xArrays = that.data.xArrays;
    var yArrays = that.data.yArrays;
    var zIndexs = that.data.zIndexs;
    console.log("批准了")
    headToEnd(xArrays);
    headToEnd(yArrays);
    headToEnd(zIndexs);
    that.setData({
      disabled: false,
      xArrays: xArrays,
      yArrays: yArrays,
      zIndexs: zIndexs
    })*/
  },
  //驳回请假
  noClick (){
    /*var that = this;
    var xArrays = that.data.xArrays;
    var yArrays = that.data.yArrays;
    var zIndexs = that.data.zIndexs;
    console.log("驳回了")
    headToEnd(xArrays);
    headToEnd(yArrays);
    headToEnd(zIndexs);
    that.setData({
      disabled: false,
      xArrays: xArrays,
      yArrays: yArrays,
      zIndexs: zIndexs
    })*/
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})