const app = getApp();
const network = require("../../../utils/network.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'sign',
    systemInfo: app.globalData.systemInfo,
    signList: [{ unique: "unique_1", selected: false, index: 1, title: "微积分" }, 
    { unique: "unique_2", selected: false, index: 1, title: "微积分" }, 
    { unique: "unique_3", selected: false, index: 1, title: "微积分" }],
    //课表相关参数
    tableHead: ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    tableContent: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tableCourse: [],//课表数组
    year: 2017,
    yearTemp: 2017,
    term: true,
    termTemp: true,
    week: 1,
    weekTemp: 1,
    Temp: 1,
    Temp1: 1,
    iconBackColor: ['#FFFFCC', '#CCFFFF', '#FFCCCC', '#CCCCFF', '#FFCC99', '#CCFF99', '#CCFFCC', '#66cccc'],
    end: '#cccccc',//结课的颜色
    WEEKS: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    YEARS: ['2017-2018', '2018-2019', '2019-2020', '2020-2021', '2021-2022', '2022-2023', '2023-2024', '2024-2025'],
    TERMS: ['上', '下'],
    isCW: false,//是否需要更改周
    isCY: false,//更改学年
    userPermit: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let authorization = app.globalData.header.Authorization
    app.agriknow.getStuCourse(authorization)
    .then(data=>{

    })
    .catch(res=>{
      if(res.data.message){
        wx.showModal({
          title: '提示',
          content: res.data.message,
          showCancel: false,
          success:function(res1){
            if(res1.confirm){
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
//切换底部栏
  handleChange({ detail }) {
    var key = detail.key;
    this.setData({
      current: key
    });
  },
  //滑动卡片
  getSelectItem: function (e) {
    var that = this,
        itemWidth = e.detail.scrollWidth / that.data.signList.length,//每个商品的宽度
        scrollLeft = e.detail.scrollLeft,//滚动宽度
        curIndex = Math.round(scrollLeft / itemWidth),//通过Math.round方法对滚动大于一半的位置进行进位
        signList = that.data.signList;
    for (var i = 0, len = that.data.signList.length; i < len; ++i) {
      signList[i].selected = false;
    }
    signList[curIndex].selected = true;
    that.setData({
      signList: signList,
    });
  },

  //授权页
  shouquan:function(){
    console.log('授权');
    wx.openSetting({  
    })
  },
  
  //客服
  kefu:function(){
    console.log('客服')
  },


  /**
   * 课表操作相关函数
   */

  isChangeWeek:function(){
    if(this.data.isCW==false){
      this.setData({
        isCW: true,
        isCY: false,
      })
    }else{
      this.setData({
        isCW: false,
        isCY: false,
      })
    }

  },
  changWeek:function(e){
    this.setData({
      weekTemp:parseInt(e.detail.value)+1,

    })
  },
  closeChangeWeek:function(){
    this.setData({
      isCW:false,
      isCY: false,
    })
  },
  confirmCW:function(){
    console.log("更改周")
    var week=this.data.weekTemp;
    this.setData({
      week:week,
      isCW:false
    })
  },
  isChangeYear:function(){
    if(this.data.isCY==false){
      this.setData({
        isCY: true,
        isCW:false
      })
    }else{
      this.setData({
        isCY: false,
        isCW:false
      })
    }

  },
  changYear:function(e){
    var yearTemp=2017+e.detail.value[0];
    var Temp=e.detail.value[1];
    var termTemp=this.data.termTemp;
    if(Temp==0){
      termTemp=false;
    }else if(Temp==1){
      termTemp=true;
    }

    this.setData({
      yearTemp:yearTemp,
      termTemp:termTemp,
      Temp:Temp,
    })

  },
  confirmCY:function(){
    var year=this.data.yearTemp
    var term=this.data.termTemp
    var Temp1=this.data.Temp
    var cards = JSON.parse(JSON.stringify(wx.getStorageSync('Cards')));
    var table = fillTable(year, term, cards);
    console.log("year"+year);
    this.setData({
      year:year,
      term:term,
      tableCourse:table,
      isCY:false,
      Temp1:Temp1
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