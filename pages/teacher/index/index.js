const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showSelf:false,
    systemInfo: app.globalData.systemInfo,
    teachList: [{ unique: "unique_1", selected: false, index: 1, title: "微积分" },
    { unique: "unique_2", selected: false, index: 1, title: "高数" },
    { unique: "unique_3", selected: false, index: 1, title: "数据库" }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.agriknow.after_login('teacher')
      .then(data => {

      })
      .catch(data => {

      })
  },

//个人中心抽屉
  toggleSelf:function(){
    this.setData({
      showSelf: !this.data.showSelf
    });
  },

  //滑动卡片
  getSelectItem: function (e) {
    var that = this,
      itemWidth = e.detail.scrollWidth / that.data.teachList.length,//每个商品的宽度
      scrollLeft = e.detail.scrollLeft,//滚动宽度
      curIndex = Math.round(scrollLeft / itemWidth),//通过Math.round方法对滚动大于一半的位置进行进位
      teachList = that.data.teachList;
    for (var i = 0, len = that.data.teachList.length; i < len; ++i) {
      teachList[i].selected = false;
    }
    teachList[curIndex].selected = true;
    that.setData({
      teachList: teachList,
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