import drawQrcode from '../../../utils/weapp.qrcode.esm.js'
const app= getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '5',
    inputValue: '',
    sch:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let sch = JSON.parse(options.sch);
    app.agriknow.getLoc(sch.slId)
      .then(data=>{
        if (data.success == true) {
          let content = {
            ssid: sch.schId,
            start: Date.parse(new Date()) / 1000,
            loc_lat: data.sisLocation,
            loc_long: data.sisLocation
          }
          that.draw(content)
          that.setData({
            coursePlace: data.sisLocation.slName,
            sch:sch
          })
        }
      })
      .catch(data=>{

      })
 
  },
  changeText:function() {
    if (!this.data.inputValue) {
      wx.showModal({
        title: '提示',
        content: '请输入有效时长！',
        showCancel: false
      })
      return
    }
    this.setData({
      text: this.data.inputValue
    })
    this.draw()
  },
  bindKeyInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  draw(content) {
    let minute = this.data.text;
    content['minute'] = minute;
    drawQrcode({
      width: 200,
      height: 200,
      canvasId: 'myQrcode',
      typeNumber: 10,
      text: JSON.stringify(content),
      callback(e) {
        console.log('e: ', e)
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