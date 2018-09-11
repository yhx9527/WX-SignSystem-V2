const app = getApp();
const { $Message } = require('../../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    monRecs:[1,2,3],
    coz:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let coz = wx.getStorageSync('coz');
    this.setData({
      coz:coz
    })
    this.fresh();
  },
  fresh(){
    let coz = this.data.coz;
    var that = this;
    app.agriknow.getMonRec(coz.cozId)
    .then(data=>{
      if(data.success){
        let monRecs = app.table.domonrec(data.array);
        this.setData({
          monRecs: monRecs
        })
        wx.stopPullDownRefresh();
        $Message({
          content: '加载成功',
          type: 'success'
        });
      }
    })
    .catch(data=>{
      $Message({
        content: '刷新失败',
        type: 'error'
      });
    })
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
    this.fresh();
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