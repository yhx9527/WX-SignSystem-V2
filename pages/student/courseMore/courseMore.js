const app=getApp();
const util = require("../../../utils/util.js");
const aboutcode = require("../../../utils/aboutcode.js");
const Base64 = require("../../../utils/base64.js");
const { $Message } = require('../../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'tab1',
    signDataList: [],
    leaveDataList: [{ siId: 1, leaveWeek: '2', leaveDay: '三' },{ siId: 2, leaveWeek: '3', leaveDay: '四' },{ siId: 3, leaveWeek: '4', leaveDay: '三' }],
    absDataList: [{ siId: 1, absWeek: '2', absDay: '三' }, { siId: 2, absWeek: '3', absDay: '三' }, { siId: 3, absWeek: '2', absDay: '五' }],
    schedule:{},
    cozName:'',
    ifnotice:false,
    scId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let schedule =  JSON.parse(options.schedule);
    console.log(schedule.cozName)
    let cozName=schedule.cozName;
    let scId=schedule.cozId;
    this.setData({
      schedule: schedule,
      cozName: cozName,
      scId: scId
    })
    this.fresh();

  },
  //更新签到记录列表函数
  fresh(){
    var that = this;
    let scId = that.data.scId;
    let user = wx.getStorageSync('user')
    app.agriknow.getSignRec(scId, { "queryType": "student" })
      .then(data => {
        if (data.success == true) {
          let signDataList = app.table.dostusign(data.course.sisScheduleList,user.suId);
          wx.stopPullDownRefresh();
          that.setData({
            signDataList:signDataList
          })
          $Message({
            content: '加载成功',
            type: 'success'
          });
        }
      })
      .catch(data => {
        wx.stopPullDownRefresh();
        $Message({
          content: '加载失败',
          type: 'error'
        });
      })
  },
  //
  //标签页改变
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },
  /**
   * 排课选择及功能
   */
  tellsch:function(e){
    var that = this;
    let mark = e.currentTarget.dataset.mark;
    let schs = that.data.schedule.schs;
    let schtimes = schs.map(function (item, index, array) {
      return item.schTime;
    })
    wx.showActionSheet({
      itemList: schtimes,
      success: function (res) {
        let ssId = schs[res.tapIndex].schId;
        switch(mark){
          case 'sign':
            wx.authorize({
              scope: 'scope.userLocation',
              success() {
                wx.getLocation({
                  success: function (res) {
                    that.self_sign(ssId,res.latitude,res.longitude);
                  },
                })
              },
              fail() {
                wx.showModal({
                  title: '提示',
                  content: '请检查是否进行位置授权',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      wx.openSetting({

                      })
                    }
                  }
                })
              }
            })
          break;
          case 'leave':
            wx.showToast({
              title: '暂不支持',
              icon:'none'
            })
          break;
          case 'scan':
            // 只允许从相机扫码
            
            wx.showToast({
              title: '暂不支持',
              icon:'none'
            })
            /*
            wx.scanCode({
              onlyFromCamera: true,
              success: (res) => {
                console.log(res)
              }
            })*/
          break;
        }
   


      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  //签到函数
  self_sign(ssId,lat,long){
    let locString = JSON.stringify({ loc_lat: lat, loc_long: long });
    let token = aboutcode.encrypt(locString);
    //console.log('jiema '+ aboutcode.decrypt(Base64.decode(token))
    app.agriknow.signIn(ssId, token)
      .then(data => {
        if (data.success) {
          if (data.success.success == true) {
            wx.showToast({
              title: '签到成功',
            })
          }
          else {
            wx.showModal({
              title: '提示',
              content: data.success.message,
              showCancel: false
            })
          }
        } else {
          wx.showToast({
            title: '签到失败',
            icon: 'none'
          })
        }
      })
      .catch(data => {
        if (data.statusCode == 400) {
          wx.showModal({
            title: '提示',
            content: '无需签到',
            showCancel: false
          })
        }
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
    this.fresh();
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