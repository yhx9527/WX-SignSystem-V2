//app.js
import Agriknow from './apis/agriknow.js';
import Table from './utils/pro_coz.js' ;
import Feedback from './apis/feedback.js';

App({
  onLaunch: function () {
    var that = this;


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
  }
})