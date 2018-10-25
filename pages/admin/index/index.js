const app=getApp();
const updateManager = wx.getUpdateManager();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showSelf: false,
    week:1,
    kinds:[{kind:1,content:'管理未督导课程'},{kind:2,content:'管理未有督导员的督导课程'},{kind:3,content:'管理已有督导员的督导课程'}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    let user=wx.getStorage({
      key: 'user',
      success: function(res) {
        that.setData({
          user:res.data
        })
      },
    })
    //app.agriknow.admin_login();
    app.agriknow.getWeek()
      .then(data=>{
        that.setData({
          week:data.week
        })
        wx.setStorageSync('week', data.week)
      })
      .catch(data=>{

      })
    
  },
  /*queryCoz(e){
    var that = this;
    let kinds = that.data.kinds;
    wx.showActionSheet({
      itemList: kinds.map(item=>{
        return item.content
      }),
      success:function(res){
        let kind = kinds[res.tapIndex].kind;
        wx.navigateTo({
          url: '../courses/courses?kind='+kind,
        }) 
      }
    })
  },*/
  queryCoz(e) {
    var that = this;
    let kinds = that.data.kinds;
    let index= e.currentTarget.dataset.index
    let kind = kinds[index].kind;
    wx.navigateTo({
      url: '../courses/courses?kind=' + kind,
    })
  },

  //个人中心抽屉
  toggleSelf: function () {
    this.setData({
      showSelf: !this.data.showSelf
    });
  },


  //授权页
  shouquan: function () {
    console.log('授权');
    wx.openSetting({
    })
  },

  //客服
  kefu: function () {
    console.log('客服')
  },
  //清除缓存并退出
  handleOpen1: function () {
    this.setData({
      visible1: true
    });
  },
  handleClose1() {
    this.setData({
      visible1: false
    });
  },
  clear_cache() {
    wx.clearStorageSync();
    wx.reLaunch({
      url: '/pages/login/login',
    })
  },


  //检查小程序是否有新版本
  checkupdate() {
    new Promise((resolve, reject) => {
      updateManager.onUpdateReady(function () {
        resolve(1);
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function (res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          }
        })
      })
      reject(1);
    })
      .then((data) => {


      })
      .catch(data => {
        wx.showToast({
          title: '无需更新',
          icon: 'none'
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