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
            total:data.data.pageNum,
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
    let pond=e.currentTarget.dataset.item;
    this.setData({
      visible1: true,
      pond:pond
    });
    this.getLoc(pond.schs);

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
          wx.redirectTo({
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
        wx.showToast({
          title: '连接失败',
          icon: 'none'
        })
      })
    this.setData({
      visible2: false
    })
  },
  //地点查询展示
  getLoc(schs) {
    var that = this;
    let pondplace = [];
    new Promise((reslove,reject)=>{
      schs.forEach(item => {
        app.agriknow.getLoc(item.slId)
          .then(data => {
            if (data.success == true) {
              pondplace.push(data.sisLocation.slName);
              reslove(pondplace);
            }
          })
          .catch(data => {

          })
      })

    })
   .then(data=>{
     that.setData({
       pondplace: data
     })
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