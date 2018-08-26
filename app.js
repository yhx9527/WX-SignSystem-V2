//app.js
import Agriknow from './apis/agriknow.js';
import Table from './utils/pro_coz.js' ;
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    });

    wx.getSystemInfo({
      success: function(res) {
        var sysInfo = {};
        sysInfo.height = res.windowHeight;
        sysInfo.width = res.windowWidth;
        that.globalData.systemInfo = sysInfo;
      },
    })
  },
  agriknow:new Agriknow(),

  table:new Table(),

  globalData: {
    systemInfo:{},
    header: {},
  }
})