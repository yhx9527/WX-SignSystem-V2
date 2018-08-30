const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    pondlist:[],
    total:1,
    visible1: false,
    visible2:false,
    showcancel:false,
    scId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.agriknow.getStuCourse('monitor',{'hasMonitor':false,'needMonitor':true,'page':1})
      .then(data=>{
        if(data.success == true){
          let pondlist = app.table.domonpond(data.data.list);
          that.setData({
            total:data.data.total,
            pondlist:pondlist
          })
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
            let pondlist = app.table.domonpond(data.data.list);
            that.setData({
              total: data.data.total,
              pondlist: pondlist
            })
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
            let pondlist = app.table.domonpond(data.data.list);
            that.setData({
              total: data.data.total,
              pondlist: pondlist
            })
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
  handleOpen1:function(e) {
    let pond=e.currentTarget.dataset.item
    this.setData({
      visible1: true,
      pond:pond
    });
  },
  handleClose1() {
    this.setData({
      visible1: false
    });
  },
  //领取课程
  handleOpen2:function(e){
    let scId=e.currentTarget.dataset.scid;
    this.setData({
      visible2:true,
      scId:scId
    })
  },
  handleCloseCancel(){
    this.setData({
      visible2:false
    })
  },
  handleCloseOk() {
    let scId=this.data.scId;
    app.agriknow.getMonPond(scId)
      .then(data=>{
        if(data.success==true){
          wx.navigateTo({
            url: '/pages/student/monitor/work/work',
          })
        }else{
          wx.showToast({
            title: '领取失败',
            icon:'none'
          })
        }
      })
      .catch(data=>{

      })
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