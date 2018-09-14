const app = getApp();
const { $Message } = require('../../../dist/base/index');
const util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    monRecs:[],
    coz:{},
    monSuId:'',
    test: [{ ssId: 1, week: 1 }, { ssId: 2, week: 1 }, { ssId: 1, week: 3 }],
    settle_week:'1',
    settle_ssId:'0',
    ssIdchecked:false,
    weekchecked:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let coz = wx.getStorageSync('coz');
    this.setData({
      coz:coz,
      monSuId:coz.monSuId
    })
    this.fresh();
  },
  fresh(){
    let coz = this.data.coz;
    var that = this;
    app.agriknow.getMonRec(coz.cozId)
    .then(data=>{
      if(data.success){
        let monRecs = app.table.domonrec(data.array);
        that.settle_sort(monRecs);
        //monRecs.sort(util.desc('week')).sort(util.asce('ssId'))
        
        wx.stopPullDownRefresh();
        $Message({
          content: '加载成功',
          type: 'success'
        });
      }
    })
    .catch(data=>{
      $Message({
        content: '刷新失败',
        type: 'error'
      });
    })
  },
  //安排升序降序
  settle_sort(pendlist){
    let temp  = this.data.settle_week+this.data.settle_ssId;
    switch(temp){
      case '10': pendlist.sort(util.desc('week')).sort(util.asce('ssId'))
        break;
      case '11': pendlist.sort(util.desc('week')).sort(util.desc('ssId'))
        break;
      case '01': pendlist.sort(util.asce('week')).sort(util.desc('ssId'))
        break;
      case '00': pendlist.sort(util.asce('week')).sort(util.asce('ssId'))
        break;
    }
    this.setData({
      monRecs: pendlist
    })

  },
  changessId(e){
    let checked = e.detail.checked;
    this.setData({
      ssIdchecked:checked,
      settle_ssId:checked ? '1' :'0'
    })
    let monRecs = this.data.monRecs;
    this.settle_sort(monRecs);
  },
  changeWeek(e){
    let checked = e.detail.checked;
    this.setData({
      weekchecked: checked,
      settle_week: checked ? '1' : '0'
    })
    let monRecs = this.data.monRecs;
    this.settle_sort(monRecs);
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
    this.fresh();
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