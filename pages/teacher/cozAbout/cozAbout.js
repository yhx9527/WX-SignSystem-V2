const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course: {},
    iconBackColor: ['#0099CC', '#33CC99', '#FF6666', '#FF9900', '#99CC33', '#99CCCC', '#FF9966', '#FF9999', '#CCCCFF', '#99CCCC'],
    stuList:[],
    cozId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let course = wx.getStorageSync('coz');
    this.setData({
      course:course,
      stuList:course.stuList,
      cozId:course.cozId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    let stuList = that.data.stuList;
    let cozId = that.data.cozId;
    if(stuList.length == 0){
      app.agriknow.getCozStudents(cozId)
      .then(data=>{
        that.setData({
          stuList:data
        })
      })
      .catch(data=>{

      })
    }
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