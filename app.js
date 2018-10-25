//app.js
import Agriknow from './apis/agriknow.js';
import Table from './utils/pro_coz.js' ;
import Feedback from './apis/feedback.js';

App({
  onLaunch: function () {
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: 'https://api.xsix103.cn/sign_in_system/v3/tokens/' + res.code,
            method: 'GET',
            success: function (res1) {
              if (res1.data.success) {
                let authorization = 'Bearer ' + res1.data.data['accessToken'];
                wx.setStorageSync('Authorization', authorization)
                if (that.storageCallback) {
                  that.storageCallback(res1.data);
                }
              }
            }
          })
        }
      }
    })
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

  feedback:new Feedback(),

  globalData: {
    systemInfo:{},
    header: {},
    start: false
  }
})