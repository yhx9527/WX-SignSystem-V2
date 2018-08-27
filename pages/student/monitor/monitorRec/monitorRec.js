const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyList: [{ courseName: "微积分", courseTeacher: "xxx", courseTime: "xxx", coursePlace: "xxx" },
    { courseName: "数据库", courseTeacher: "xxx", courseTime: "xxx", coursePlace: "xxx" },
    { courseName: "java", courseTeacher: "xxx", courseTime: "xxx", coursePlace: "xxx" },
    ],
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let scId=options.scid;
    app.agriknow.getMonRec(scId)
      .then(data=>{

      })
      .catch(data=>{
        
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