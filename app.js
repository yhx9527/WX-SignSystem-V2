//app.js
import Agriknow from './apis/agriknow.js';
import Table from './utils/pro_coz.js' ;
import Feedback from './apis/feedback.js';
const updateManager = wx.getUpdateManager();
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
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
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