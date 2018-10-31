const app = getApp();
const util = require('../../../utils/util.js');
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
  //联系我们
  formSubmit(e){
    console.log(e.detail.value);
    var that = this;
    let form = e.detail.value;
    let formId = e.detail.formId
    console.log('生成formId', formId)
    if (util.formUtil.ifBlank(form,['sctName','sctContact','sctContent']) == false){
      wx.showLoading({
        title: '发送中...',
        success:function(){
          let sisContact = {
            "sctContact": form.sctContact,
            "sctContent": form.sctContent,
            "sctName": form.sctName
          }
          app.agriknow.contact(sisContact, formId)
            .then(data => {
              wx.hideLoading();
              if (data.success == true) {
                wx.showToast({
                  title: '提交成功',
                })
                that.setData({
                  value1: '',
                  value2: '',
                  value3: ''
                })
              } else {
                app.feedback.showModal(data.message);
              }
            })
            .catch(data => {
              wx.hideLoading();
            })
        }
      })
 
    }else{
      app.feedback.showModal('表单均不能为空')
    }
    app.agriknow.message(formId)
      .then(data => { })
      .catch(data => { })
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