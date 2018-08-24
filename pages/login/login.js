const app = getApp()
const network = require("../../utils/network.js");
const util = require('../../utils/util.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.agriknow.getBind().then(data=>{
      if (data.success == true) {
        wx.showLoading({
          title: '登录中...',
          success: function () {
            wx.hideLoading();
          }
        })

      } else {
        wx.showModal({
          title: '提示',
          content: '您的账号尚未绑定请登录绑定',
          showCancel: false
        })
      }
    })
  },

  //登录
  formSubmit: function (e) {
    var that = this
    var flag = wx.getStorageSync('person')
    console.log("flag" + JSON.stringify(wx.getStorageSync('person')))
    var value = e.detail.value;
    var ifBlank = util.formUtil.ifBlank(value,['suId','suPassword','suType']);
    //if(flag==[]){
    if (ifBlank) {
      wx.showModal({
        title: '提示',
        content: '均不能为空，请慎重选择角色',
        showCancel:false
      })
    } else {
      wx.showModal({
        title: '注意',
        content: '登录后不能再更改账号',
        confirmText: '确定登录',
        cancelText: '我再想想',
        success: function (res) {
          if (res.confirm) {
            wx.showLoading({
              title: '登录中...',
              success: function () {
                wx.setStorageSync('getType', e.detail.value.suType)
                app.agriknow.login(e.detail.value)
                .then(data =>{
                  wx.hideLoading();
                  if (data.success == true) {
                    app.globalData.header = { 'Authorization': 'Bearer ' + data['access_token'] }
                    wx.redirectTo({
                      url: '../student/sign/sign',
                    })
                  } else {
                    wx.showModal({
                      title: '提示',
                      content: data.message,
                      showCancel: false
                    })
                  }
                })
              }
            })
          }

        },
      })
    }
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