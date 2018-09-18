const app=getApp();
const { $Message } = require('../../../../dist/base/index');
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
    that.fresh(that.data.page);
  },
  //刷新一页的内容
  fresh(page){
    var that = this;
    app.agriknow.getStuCourse('monitor', { 'hasMonitor': false, 'needMonitor': true, 'page': page })
      .then(data => {
        wx.stopPullDownRefresh();
          let pondlist = app.table.domonpond(data.list);
          that.setData({
            total: data.pages,
            pondlist: pondlist,
            page:page
          })
        $Message({
          content: '加载成功',
          type: 'success'
        });
      })
      .catch(data => {
        wx.stopPullDownRefresh();
        $Message({
          content: '加载失败',
          type: 'error'
        });
      })
  },
  //分页
  pageChange({ detail }) {
    const type = detail.type;
    if (type === 'next') {
      let page = this.data.page + 1;
      this.fresh(page);
      /*
      this.setData({
        page: page
      });
      */

    } else if (type === 'prev') {
      let page = this.data.page - 1;
      this.fresh(page);
      /*
      this.setData({
        page: page
      });
      */
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
    var that = this;
    let scId=this.data.scId;
    app.agriknow.getMonPond(scId)
      .then(data=>{
        if(data.success==true){
          wx.showToast({
            title: '领取成功',
          })
          setTimeout(function(){
            that.fresh(that.data.page);
            /*wx.redirectTo({
              url: '/pages/student/monitor/work/work',
            })*/
          },1500)
        }else{
          wx.showModal({
            title: '提示',
            content: data.message,
            showCancel:false,
            success:function(res){
              if(res.confirm){
                that.fresh(that.data.page);
              }
            }
          })
        }
      })
      .catch(data=>{
        if(data.statusCode == 403){
          wx.showModal({
            title: '提示',
            content: '未抢到该课程',
            showCancel:false,
            success:function(res){
              if(res.confirm){
                that.fresh(that.data.page);
              }
            }
          })
        }else{
          wx.showToast({
            title: '连接失败',
            icon: 'none'
          })
        }
      })
    this.setData({
      visible2: false
    })
  },
  //地点查询展示
  getLoc(schs) {
    var that = this;
    let pondplace = [];
    let only = Array.from(new Set(schs.map(item=>{
      return item.slId;
    })))
    console.log(only);
    new Promise((reslove,reject)=>{
      only.forEach((item,index,array) => {
        app.agriknow.getLoc(item)
          .then(data => {
            console.log(pondplace);
              pondplace.push({slId:data.slId,slName:data.slName});
              if(pondplace.length == array.length){
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
    this.fresh(this.data.page);
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