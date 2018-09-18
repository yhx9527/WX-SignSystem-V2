const app=getApp();
const { $Message } = require('../../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    total:1,
    courses:[],
    hasMonitor:false,
    needMonitor:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let kind = options.kind;
    var that = this;
    switch(kind){
      case '1':
        that.loadCourse(1);
        break;
      case '2':
        that.setData({
          needMonitor:true,
          hasMonitor:false
        })
        that.loadCourse(1);
        break;
      case '3':
        that.setData({
          needMonitor: true,
          hasMonitor: true
        })
        that.loadCourse(1);
        break;
    }
 
  },

  /**
   * 加载课程列表
   */
  loadCourse:function(page,flag){
    var that = this;
      let data = {
        page: page,
        needMonitor: that.data.needMonitor,
        hasMonitor: that.data.hasMonitor
      }
    
    app.agriknow.getStuCourse('administrator', data)
      .then(data => {
        wx.stopPullDownRefresh();
          let courses = app.table.doadmincourses(data.list);
          that.setData({
            courses:courses,
            total: data.pages,
          })
          $Message({
            content: '加载成功',
            type: 'success'
          });
   
      })
      .catch(data => {
        if (data.message) {
          wx.showModal({
            title: '提示',
            content: res.data.message,
            showCancel: false,
            success: function (res1) {
              if (res1.confirm) {
                if (res.statusCode >= 400 && res.statusCode <= 403) {
                  wx.reLaunch({
                    url: '/pages/login/login',
                  })
                }
              }
            }
          })
        }
      })
  },
  /**分页 */
  pageChange({ detail }) {
    const type = detail.type;
    this.setData({
      courses:[]
    })
    if (type === 'next') {
      let page = this.data.page+1;
      let courses=this.loadCourse(page);
      this.setData({
        page: page,
        courses:courses
      });
    } else if (type === 'prev') {
      let page = this.data.page - 1;
      let courses = this.loadCourse(page);
      this.setData({
        page: page,
        courses: courses
      });
    }
  },
  //课程详情页
  coursemore:function(e){
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../courseDo/courseDo?course='+JSON.stringify(item),
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
    var that = this;
    let page = that.data.page;
    that.loadCourse(page);
  
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