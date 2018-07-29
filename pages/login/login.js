const app = getApp()
const network = require("../../utils/network.js");
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  //登录
  formSubmit: function (e) {
    var that = this
    var flag = wx.getStorageSync('person')
    console.log("flag" + JSON.stringify(wx.getStorageSync('person')))
    var value = e.detail.value;
    var ifBlank = util.formUtil.ifBlank(value,['userID','userCode']);
    //if(flag==[]){
    if (ifBlank) {
      wx.showModal({
        title: '提示',
        content: '学号/工号和姓名不能为空'
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
                wx.login({
                  success: function (res1) {
                    console.log("code1:" + res1.code)
                    if (res1.code) {
                      wx.request({
                        url: 'https://api.xsix103.cn/sign_in_system/v2/user/user',
                        method: "POST",
                        data: {
                          'code': res1.code,
                          'usrId': value.userID,
                          'usrPwd': value.userCode,
                        },
                        header: app.globalData.header,
                        success: function (res) {
                          /*
                          if (res.data.length != 0 && JSON.stringify(res.data) !== "{}") {
                            app.globalData.header['Access-Token'] = res.data.token
                            console.log("login:" + app.globalData.header['Access-Token'])
                            var userPermit = processPermit(res.data.user.usrPermit);
                            var person = { "userPermit": userPermit, "userId": res.data.user.usrId, "userName": res.data.user.usrName }
                            //个人信息报存本地
                            wx.setStorageSync('person', person);
                            wx.hideLoading();
                            //跳转界面
                            wx.switchTab({
                              url: '../users/student/student',
                            })

                          } else {
                            wx.hideLoading();
                            wx.showModal({
                              title: '提示',
                              content: '用户名或密码错误',
                            })
                          }*/

                        },
                        fail: function (res) {
                          wx.hideLoading();
                          console.log("失败原因： " + JSON.stringify(res))
                          wx.showToast({
                            title: '服务繁忙',
                            icon: 'loading',
                            duration: 2000
                          })
                        }
                      })
                      console.log('用户点击确定')
                    } else {
                      wx.hideLoading();
                      wx.showToast({
                        title: '连接失败',
                        icon: 'loading',
                        duration: 2000
                      })
                      console.log('登录失败！' + e.errMsg)
                    }
                  },
                  fail: function () {
                    wx.hideLoading();
                    wx.showToast({
                      title: '网络错误',
                      icon: "loading",
                      duration: 1500,
                    })
                  }
                })
              }
            })

          }

        },
        fail: function () {

        }
      })
      console.log(app.globalData)


    }
    /*}else{
      wx.showModal({
        title: '已绑定微信',
        content: '请检查网络后重开应用，等待自动跳转',
      })
    }*/
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