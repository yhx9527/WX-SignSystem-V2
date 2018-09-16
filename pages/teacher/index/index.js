const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showSelf:false,
    systemInfo: app.globalData.systemInfo,
    teachList: [],
    week:1,
    ifspin:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      ifspin:true
    })
    let week = wx.getStorageSync('week');
    wx.getStorage({
      key: 'user',
      success: function (res) {
        that.setData({
          username: res.data.suName,
          userid: res.data.suId
        })
      },
    })
    app.agriknow.after_login('teacher')
      .then(data => {
          let teachList = app.table.doteacoz(data.list);
          that.setData({
            teachList:teachList,
            week:week,
            ifspin:false
          })
        
      })
      .catch(data => {
        that.setData({
          ifspin:false
        })
      })
  },

//个人中心抽屉
  toggleSelf:function(){
    this.setData({
      showSelf: !this.data.showSelf
    });
  },

  //滑动卡片
  getSelectItem: function (e) {
    var that = this,
      itemWidth = e.detail.scrollWidth / that.data.teachList.length,//每个商品的宽度
      scrollLeft = e.detail.scrollLeft,//滚动宽度
      curIndex = Math.round(scrollLeft / itemWidth),//通过Math.round方法对滚动大于一半的位置进行进位
      teachList = that.data.teachList;
    for (var i = 0, len = that.data.teachList.length; i < len; ++i) {
      teachList[i].selected = false;
    }
    teachList[curIndex].selected = true;
    that.setData({
      teachList: teachList,
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

  //查看上课地点
  lookplace: function (e) {
    let schs = e.currentTarget.dataset.schs;
    let schtimes = schs.map(function (item, index, array) {
      return item.schTime;
    })
    wx.showActionSheet({
      itemList: schtimes,
      success: function (res) {
        let slId = schs[res.tapIndex].slId;
        app.agriknow.getLoc(slId)
          .then(data => {
            if (data.success == true) {
              wx.showModal({
                title: '上课地点',
                content: data.data.slName,
                showCancel: false
              })
            }
          })
          .catch(data => {

          })
      }
    })
  },
  //更多操作
  more:function(e){
    wx.setStorageSync('coz', e.currentTarget.dataset.item);
    wx.navigateTo({
      url: '../teaModules/teaModules',
    })
  },
/**
 * 签到相关
 */
  signabout(e){
    var that = this;
    let mark = e.currentTarget.dataset.type;
    let schs = e.currentTarget.dataset.schs;
    let schtimes = schs.map(function (item, index, array) {
      return item.schTime;
    })
    wx.showActionSheet({
      itemList: schtimes,
      success: function (res) {
        let ssId = schs[res.tapIndex].schId;
        switch (mark) {
          case 'qrcode':
            wx.showToast({
              title: '暂不支持',
              icon: 'none'
            })
            /*
            wx.navigateTo({
              url: '../qrcode/qrcode?sch='+JSON.stringify(schs[res.tapIndex]),
            })
            */
            break;
          case 'sign':
            app.agriknow.postSign(ssId)
             .then(data=>{
               if (data.success) {
                 wx.showToast({
                   title: '发起成功',
                 })
               } else {
                 wx.showModal({
                   title: '提示',
                   content: data.message,
                   showCancel:false
                 })
               }
             })
             .catch(data=>{

             })
            break;
        }



      },
      fail: function (res) {
        console.log(res.errMsg)
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