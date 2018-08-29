const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    translist_do:[1,2,3,4,5,6,7,8],
    current:'untreated',
    translist_agree: [1, 2],
    translist_reject: [1, 2],
    visiable1:false,
    showcancel:false,
    spanshow:false,
    if_untreated:false   //是否有未处理的课程

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.agriknow.getMonTrans('untreated')
      .then(data=>{
        
      })
      .catch(data=>{

      })
  },
  //换标签页
  handleChange({ detail }) {
    var that=this;
    new Promise(function(resolve,reject){
      that.setData({
        current: detail.key,
        spanshow: true
      });
      app.agriknow.getMonTrans(detail.key)
        .then(data=>{
          resolve(data)
        })
        .catch(data=>{
          reject(data)
        })
    })
    .then(data=>{
      that.setData({
        spanshow:false
      })
    })
    .catch(data=>{
        that.setData({
          spanshow:false
        })
        wx.showToast({
          title: '加载失败',
        })
    })
    

  },
  //转接的课程详情显示
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
  //处理转接
  rejectTrans:function(){

  },
  agreeTrans:function(){

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