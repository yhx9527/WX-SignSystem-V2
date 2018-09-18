const app = getApp();
const { $Message } = require('../../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    searchWeeks: [],
    nowSchedule: 0,
    schedules: [],
    height1: 0,
    height2: 0,
    signlists:[],
    cozName:'',
    coz:{},
    ifspin:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var coz = wx.getStorageSync('coz');
    let week = wx.getStorageSync('week')
    this.setData({
      schedules:coz.schs,
      cozName:coz.cozname,
      'id1':week-1,
      coz :coz
    })
  },

  //下拉菜单
  click_show1: function () {
    var height1 = this.data.height1;
    var length = this.data.schedules.length
    this.setData({
      height1: height1 == 0 ? 4 * length + 1 : 0
    })
  },
  click_show2: function () {
    var height2 = this.data.height2;
    this.setData({
      height2: height2 == 0 ? 21 : 0
    })
  },
  changeWeek: function (e) {
    var id = e.target.dataset.id;
    this.setData({
      'id1': id,
      height2: 0
    })
  },
  changeSchedule: function (e) {
    var id = e.target.dataset.id;
    this.setData({
      'id': id,
      height1: 0
    })
  },
  formSubmit:function(e){
    var that = this;
    let form = e.detail.value;
    let schs = this.data.schedules;
   
    try{
    let ssId = schs.filter(item=>{
      return item.sch == form.ssid;
    })[0].schid;
    let week = form.week;
      that.setData({
        ifspin: true,
        signlists:[]
      })
      app.agriknow.getSchSignRec(ssId,week)
      .then(data=>{
        let signlists = [];
        if(data.success == true){
          if(data.data){
          signlists = data.data.sisSignInDetailList;
          }
        }
        that.setData({
          signlists: signlists,
          ifspin: false
        })
          $Message({
            content: '加载成功',
            type: 'success'
          });

        
      })
      .catch(data=>{
        that.setData({
          ifspin: false
        })
        $Message({
          content: '加载失败',
          type: 'error'
        });
      })
    }catch(e){
      wx.showToast({
        title: '搜索不能为空',
        icon:'none'
      })
    }
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