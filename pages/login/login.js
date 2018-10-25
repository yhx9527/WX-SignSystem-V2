const app = getApp()
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
    wx.showLoading({
      title: '登录中...',
      mask: true,
      success: function () {
        app.agriknow.getBind().then(data => {
          wx.hideLoading();
          if (data.success == true) {
            let authorization = 'Bearer ' + data.data['accessToken'];
            // app.agriknow.header({ 'Authorization': authorization })
            let user = data.data['sisUser'];
            wx.setStorageSync('Authorization', authorization)
            wx.setStorageSync('user', user)
            //if(!wx.getStorageSync('ifBind')){
            //wx.setStorageSync('ifBind', true)
            //}

            let auth = user.suAuthoritiesStr.toLowerCase();
            if (auth.indexOf('student') > -1) {
              wx.redirectTo({
                url: '../student/sign/sign',
              })
            } else if (auth.indexOf('teacher') > -1) {
              wx.redirectTo({
                url: '/pages/teacher/index/index',
              })
            } else if (auth.indexOf('administrator') > -1) {
              wx.redirectTo({
                url: '/pages/admin/index/index',
              })
            }


          } else {
            app.feedback.showModal('您的账号尚未绑定请登录绑定')
          }
        })
          .catch(data => {
            wx.hideLoading();
          })

      }
    })
  },

  //表单登录
  formSubmit: function (e) {
    var that = this;
    //var flag = wx.getStorageSync('person')
    //console.log("flag" + JSON.stringify(wx.getStorageSync('person')))
    var value = e.detail.value;
    var ifBlank = util.formUtil.ifBlank(value,['suId','suPassword','suType']);
    //if(flag==[]){
    if (ifBlank) {
      app.feedback.showModal('均不能为空，请慎重选择角色')
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
                //wx.setStorageSync('getType', e.detail.value.suType)
                //wx.setStorageSync('suId', e.detail.value.suId)
                  app.agriknow.login(e.detail.value)
                    .then(data => {
                      wx.hideLoading();
                      if (data.success == true) {
                        let authorization = 'Bearer ' + data.data['accessToken'];
                       /* app.globalData.header = { 'Authorization': authorization };
                        app.agriknow.header({
                          'Authorization': authorization
                        }) */
                        let sisUser = data.data['sisUser'];
                        wx.setStorageSync('Authorization', authorization)
                        wx.setStorageSync('user', sisUser);
                        app.agriknow.login_redict(e.detail.value.suType,sisUser.suAuthoritiesStr,sisUser.suId);
                       
                      } else {
                        app.feedback.showModal(data.message);
                      }
                    })
                    .catch(data=>{
                      wx.hideLoading();
                      app.feedback.showModal(JSON.stringify(data),function(){
                        wx.reLaunch({
                          url: '/pages/login/login',
                        })
                      });
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