const app=getApp();
const util=require('../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    monitorClass: { courseName: "微积分", courseTeacher: "xxx", courseTime: "xxx", coursePlace: "xxx" },
    manSwitch:false,
    autoSwitch:false,
    manChecked:false,
    autoChecked:false,
    date: "2018-7-23",
    time: "12:12:12",
    validMin:1,
    ssId:0,
    week:0,
    slId:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = wx.getStorageSync('user')
    let week = wx.getStorageSync('week')
    let item=JSON.parse(options.item);
    let ssId = parseInt(options.ssId);
    let slId = parseInt(options.slId);
    let schtime=options.schtime;
    this.setData({
      schtime:schtime,
      item:item,
      user:user,
      ssId: ssId,
      week:week,
      slId:slId
    })
  },

  //督导表单提交
  formSubmit:function(e){
    var that = this;
    let form = e.detail.value;
    if(util.formUtil.ifBlank(form, ['ssvActualNum']) == false){
      let sisSupervision={
        "ssId": this.data.ssId,
        "ssvActualNum": form.ssvActualNum,
        "ssvMobileNum": form.ssvMobileNum || 0,
        "ssvRecInfo": form.ssvRecInfo || '无',
        "ssvSleepNum": form.ssvSleepNum || 0,
        "ssvWeek": this.data.week
      }

      app.agriknow.insertMonRec(this.data.ssId,sisSupervision)
        .then(data=>{
            if(data.success == true){
              wx.showToast({
                title: '提交成功',
                success:function(res){
                  setTimeout(function(){
                    wx.navigateBack({

                    })
                  },1000)
                }
              })
            }else{
              wx.showModal({
                title: '提示',
                content: data.message,
                showCancel: false
              })
            }
        })
        .catch(data=>{
          if(data.statusCode == 403){
            wx.showModal({
              title: '提示',
              content: "该周您无权督导",
              showCancel: false
            })
          }
        })
    }else{
      wx.showToast({
        title: '实到人数不能为空',
        icon:'none'
      })
    }
  },
  formReset:function(){
    this.setData({
      value1:'',
      value2:'',
      value3:'',
      value4:''
    })
  },

  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let slId = this.data.slId;
    var that = this;
    app.agriknow.getLoc(slId)
    .then(data=>{
      if (data.success == true) {
        that.setData({
          coursePlace: data.sisLocation.slName
        })
      }
    })
    .catch(data=>{

    })
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