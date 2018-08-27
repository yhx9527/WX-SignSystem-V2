const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    pondlist:[1,2],
    total:1,
    visible1: false,
    visible2:false,
    showcancel:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.agriknow.getStuCourse('monitor',{'hasMonitor':false,'needMonitor':true,'page':1})
      .then(data=>{
        if(data.success == true){

        }
      })
      .catch(data=>{

      })
  },
  //分页
  pageChange({ detail }) {
    const type = detail.type;
    if (type === 'next') {
      let page = this.data.page + 1;
      app.agriknow.getStuCourse('monitor', { 'hasMonitor': false, 'needMonitor': true, 'page': page })
        .then(data => {
          if (data.success == true) {

          }
        })
        .catch(data => {

        })
      this.setData({
        page: page
      });

    } else if (type === 'prev') {
      let page = this.data.page - 1;
      app.agriknow.getStuCourse('monitor', { 'hasMonitor': false, 'needMonitor': true, 'page': page })
        .then(data => {
          if (data.success == true) {

          }
        })
        .catch(data => {

        })
      this.setData({
        page: page
      });
    }
  },
  //课程详情显示
  handleOpen1:function() {
    this.setData({
      visible1: true
    });
  },
  handleClose1() {
    this.setData({
      visible1: false
    });
  },
  //领取课程
  handleOpen2:function(){
    this.setData({
      visible2:true
    })
  },
  handleCloseCancel(){
    this.setData({
      visible2:false
    })
  },
  handleCloseOk() {
    this.setData({
      visible2: false
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