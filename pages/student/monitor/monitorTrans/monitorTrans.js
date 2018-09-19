 const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    translist_do:[],
    current:'untreated',
    translist_agree: [],
    translist_reject: [],
    visiable1:false,
    showcancel:false,
    spanshow:false,
    if_untreated:false   //是否有未处理的课程

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let detail={key:'untreated'};
    this.handleChange({detail});
  },
  //换标签页
  handleChange({ detail }) {
    var that=this;
    new Promise(function(resolve,reject){
      that.setData({
        current: detail.key,
        spanshow: true
      });
      app.agriknow.getMonTrans(detail.key)
        .then(data=>{
            let translists = app.table.dotrans(data);
            resolve({status:detail.key,translists:translists});
        })
        .catch(data=>{
          reject(data)
        })
    })
    .then(data=>{
      switch (data.status) {
        case 'untreated':
          that.setData({
            spanshow: false,
            translist_do: data.translists
          })
          break;
        case 'agree': 
          that.setData({
          spanshow: false,
          translist_agree: data.translists
        })
          break;
        case 'disagree': 
          that.setData({
          spanshow: false,
          translist_reject: data.translists
        })
          break;
      }
    })
    .catch(data=>{
        that.setData({
          spanshow:false
        })
        wx.showToast({
          title: '加载失败',
          icon:'none'
        })
    })
    

  },
  //转接的课程详情显示
  handleOpen1: function (e) {
    let trans = e.currentTarget.dataset.item;
    //this.getLoc(trans.slId);
    this.setData({
      visible1: true,
      trans:trans
    });
  },
  handleClose1() {
    this.setData({
      visible1: false
    });
  },
  //处理转接
  rejectTrans:function(e){
    var that = this;
    wx.showLoading({
      title: '处理中...',
    })
    let trans = e.currentTarget.dataset.item;
    let sisMonitorTrans={
      "smtStatus": 2,
      "smtWeek": trans.week,
      "ssId": trans.schId,
      "suId": trans.userId
    }
    app.agriknow.doMonTrans(trans.schId,sisMonitorTrans)
      .then(data=>{
        wx.hideLoading();
        if (data.success == 1) {
          let detail = { key: 'disagree' };
          that.handleChange({ detail });
        } else {
          wx.showToast({
            title: '操作失败',
            icon: 'none'
          })
        }
      })
      .catch(data=>{
        wx.hideLoading();
      })
  },
  agreeTrans:function(e){
    wx.showLoading({
      title: '处理中...',
    })
    let trans = e.currentTarget.dataset.item;
    let sisMonitorTrans = {
      "smtStatus": 1,
      "smtWeek": trans.week,
      "ssId": trans.schId,
      "suId": trans.userId
    }
    var that = this;
    app.agriknow.doMonTrans(trans.schId, sisMonitorTrans)
      .then(data => {
        wx.hideLoading();
        if(data.success==1){
          let detail = { key: 'agree' };
          that.handleChange({ detail });
        }else{
          wx.showToast({
            title: '操作失败',
            icon:'none'
          })
        }
      })
      .catch(data => {
        wx.hideLoading();
      })
  },

  //转接课程的督导
  transToMon:function(e){
    let trans = e.currentTarget.dataset.item;
    let item = {
      cozName: trans.schname,
      cozSize: trans.schsize
    }
    wx.navigateTo({
      url: '../monitorForm/monitorForm?ssId=' + trans.schId + '&item=' + JSON.stringify(item) + '&schtime=' + trans.time + '&slId=' +trans.slId
    })

  },
  //地点查询展示
  getLoc(slId){
    var that = this;
    let tranplace=''
    app.agriknow.getLoc(slId)
      .then(data => {
          tranplace = data.slName
          that.setData({
            tranplace: tranplace
          })
      })
      .catch(data => {
        that.setData({
          tranplace: tranplace
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