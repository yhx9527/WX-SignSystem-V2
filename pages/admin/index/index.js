const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showSelf: false,
    week:1,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    let user=wx.getStorage({
      key: 'user',
      success: function(res) {
        that.setData({
          user:res.data
        })
      },
    })
    //app.agriknow.admin_login();
    app.agriknow.getWeek()
      .then(data=>{
        that.setData({
          week:data.week
        })
        wx.setStorageSync('week', data.week)
      })
      .catch(data=>{

      })
    
  },

  //个人中心抽屉
  toggleSelf: function () {
    this.setData({
      showSelf: !this.data.showSelf
    });
  },


  //授权页
  shouquan: function () {
    console.log('授权');
    wx.openSetting({
    })
  },

  //客服
  kefu: function () {
    console.log('客服')
  },
  //清除缓存并退出
  handleOpen1: function () {
    this.setData({
      visible1: true
    });
  },
  handleClose1() {
    this.setData({
      visible1: false
    });
  },
  clear_cache() {
    wx.clearStorageSync();
    wx.reLaunch({
      url: '/pages/login/login',
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