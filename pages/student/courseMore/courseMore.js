Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'tab1',
    signDataList: [{ siId: 1, siWeek: '1', time: '2018-8-4 12:12:12' }, { siId: 2, siWeek: '2', time: '2018-8-5 12:12:12' }, { siId: 3, siWeek: '3', time: '2018-8-6 12:12:12' }],
    leaveDataList: [{ siId: 1, leaveWeek: '2', leaveDay: '三' },{ siId: 2, leaveWeek: '3', leaveDay: '四' },{ siId: 3, leaveWeek: '4', leaveDay: '三' }],
    absDataList: [{ siId: 1, absWeek: '2', absDay: '三' }, { siId: 2, absWeek: '3', absDay: '三' }, { siId: 3, absWeek: '2', absDay: '五' }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  //标签页改变
  handleChange({ detail }) {
    this.setData({
      current: detail.key
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