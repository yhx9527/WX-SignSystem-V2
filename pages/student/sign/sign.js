const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'sign',
    systemInfo: app.globalData.systemInfo,
    signList: [{ unique: "unique_1", selected: false, index: 1, title: "微积分" }, 
    { unique: "unique_2", selected: false, index: 1, title: "微积分" }, 
    { unique: "unique_3", selected: false, index: 1, title: "微积分" }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
//切换底部栏
  handleChange({ detail }) {
    var key = detail.key;
    this.setData({
      current: key
    });
  },
  //滑动卡片
  getSelectItem: function (e) {
    var that = this,
        itemWidth = e.detail.scrollWidth / that.data.signList.length,//每个商品的宽度
        scrollLeft = e.detail.scrollLeft,//滚动宽度
        curIndex = Math.round(scrollLeft / itemWidth),//通过Math.round方法对滚动大于一半的位置进行进位
        signList = that.data.signList;
    for (var i = 0, len = that.data.signList.length; i < len; ++i) {
      signList[i].selected = false;
    }
    signList[curIndex].selected = true;
    that.setData({
      signList: signList,
    });
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