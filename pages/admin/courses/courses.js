const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    total:1,
    courses:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadCourse(1);
  },

  /**
   * 加载课程列表
   */
  loadCourse:function(page){
    var that = this;
    app.agriknow.getStuCourse('administrator', { page: page })
      .then(data => {
        if (data.success == true) {
          let courses = app.table.doadmincourses(data.data.list);
          that.setData({
            courses:courses
          })
        } else {
          wx.showToast({
            title: '加载出错',
            icon: 'none'
          })
        }
      })
      .catch(data => {

      })
  },
  /**分页 */
  pageChange({ detail }) {
    const type = detail.type;
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
  //下拉刷新
  onPullDownRefresh:function(){
    var that=this;
    let page = that.data.page;
    that.loadCourse(page);
    wx.stopPullDownRefresh();
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