const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course:{},
    visible1:false,
    transerror1:false,
    monitorman:'',
    ifmon:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let course=JSON.parse(options.course);
    this.setData({
      course:course,
      ifmon:course.ifmon
    })
  },

  //发起签到
  beginsign:function(e){
    var that = this;
    let schs = that.data.course.schs;
    let schtimes = schs.map(item=>{
      return '选择 '+item.sch;
    })
    wx.showActionSheet({
      itemList: schtimes,
      success: function (res) {
        let ssId = schs[res.tapIndex].schid;
        app.agriknow.postSign(ssId)
          .then(data=>{
            if(data.success){
              wx.showToast({
                title: '发起成功',
              })
            }else{
              app.feedback.showModal(data.message);
            }
          })
          .catch(data=>{

          })

      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  //修改督导
  monitorModel:function(){
    this.setData({
      visible1: true,
    })
  },
  handleClose1(){
    this.setData({
      visible1:false,
    })
  },
  putmonitor(){
    var that = this;
    let suId = this.data.monitorman;
    //if(suId != ''){
      let scId = this.data.course.cozid;
      let sisCourse={
        scNeedMonitor: this.data.ifmon,
        scId:scId,
      
      }
      this.setData({
        visible1: false,
      })
      app.agriknow.putMon(scId,sisCourse)
        .then(data=>{
          if (data.success == true) {
            let course = that.data.course;
            course.ifmon = that.data.ifmon;
            wx.showToast({
              title: '修改成功',
            })
            that.setData({
              course:course
            })
          } else {
            wx.showToast({
              title: '修改失败',
              icon:'none'
            })
          }
        })
        .catch(data=>{

        })
    
    //}
    /*else{
      this.setData({
        transerror1:true
      })
    }*/
  
  },
  monswitch(event){
    const detail = event.detail;
    this.setData({
      ifmon: detail.value
    })
  },
  inputblur1:function(e){
    this.setData({
      monitorman:e.detail.detail.value
    })
  },

  //查看学生名单
  studentlist:function(e){
    let cozid = e.currentTarget.dataset.cozid;
    wx.navigateTo({
      url: '/pages/common/studentList/studentList?cozid='+cozid,
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