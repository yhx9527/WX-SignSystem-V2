const app = getApp();
const util = require("../../../utils/util.js");
const aboutcode = require("../../../utils/aboutcode.js");
const Base64 = require("../../../utils/base64.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'sign',
    systemInfo: app.globalData.systemInfo,
    //课表相关参数
    tableHead: ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    tableContent: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    year: 2017,
    yearTemp: 2017,
    termTemp: true,
    term:1,
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
    coz:[],
    othercoz:[],
    schedules:[],
    visible1: false,
    ismonitor:false,
    newtrans:false,
    newpond:false,
    recordvisible:false,
    show_cancel:false,
    ifspin:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    let schedules = [];
    let table=app.table;
    let width = that.data.systemInfo.width;
    that.setData({
      ifspin:true
    })
    wx.getStorage({
      key: 'user',
      success: function(res) {
        let ismonitor=that.data.ismonitor;
        if (res.data.suAuthoritiesStr.toLowerCase().indexOf('monitor') > -1){
          ismonitor = true;
        }
        that.setData({
          ismonitor:ismonitor,
          username:res.data.suName,
          userid:res.data.suId
        })
      },
    })

    app.agriknow.after_login('student')
      .then(data=>{
        if(data.success){
          var coz = table.docoz(data.array,width);
          //console.log('coz'+JSON.stringify(coz,undefined,'\t'))
          let week1 = wx.getStorageSync('week');
          that.othercourses(coz,week1);
          setTimeout(function(){
            let term = coz[0].schTerm;
            let termArray = term.split('-')
            var schedules = table.doschs(coz, week1, term)
            that.setData({
              week: week1 || 1,
              year: parseInt(termArray[0]),
              term: parseInt(termArray[2]),
              schedules: schedules,
              ifspin:false,
              coz:coz
            })
            wx.setStorageSync('term', term) 
          },1000)
          
        }
      })
    
  },
//切换底部栏
  handleChange({ detail }) {
    var key = detail.key;
    if(key == "monitor"){
      this.aheadMon();
    }
    /*if (key == "courseTable"){
      let coz = this.data.coz;
      this.othercourses(coz);
    }*/
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
  //清除缓存并退出
  handleOpen1:function(){
    this.setData({
      visible1: true
    });
  },
  handleClose1() {
    this.setData({
      visible1: false
    });
  },
  clear_cache(){
    wx.clearStorageSync();
    wx.reLaunch({
      url: '/pages/login/login',
    })
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
    let table = app.table;
    let coz = this.data.coz;
    let term = wx.getStorageSync('term')
    let schedules = table.doschs(coz,week,term)
    this.setData({
      week:week,
      isCW:false,
      schedules:schedules
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
    let tempargs = year+'-'+parseInt(year+1)+'-'+parseInt(Temp1+1)
    let week=wx.getStorageSync('week')
    let table = app.table;
    let coz = this.data.coz;
    let schedules = table.doschs(coz, week, tempargs)
    this.setData({
      week:week,
      year:year,
      isCY:false,
      term:parseInt(Temp1+1),
      schedules:schedules
    })
  },
  //进入课程详情
  enterCozMore:function(e){
    let schedule = e.currentTarget.dataset.schedule;
    wx.navigateTo({
      url: '../courseMore/courseMore?schedule='+JSON.stringify(schedule),
    })
  },
//督导功能页链接进入
entertrans:function(){
  this.setData({
    newtrans:false
  })
  wx.navigateTo({
    url:'/pages/student/monitor/monitorTrans/monitorTrans',
  })
},

  //督导信息预加载提示
aheadMon:function(){
    var that = this;
    app.agriknow.getMonTrans('untreated')
      .then(data=>{
        if(data.success == true){
          if(data.array.length>0){
            that.setData({
              newtrans:true
            })
          }
        }
      })
      .catch(data=>{

      })
    app.agriknow.getStuCourse('monitor', { 'hasMonitor': false, 'needMonitor': true, 'page': 1 })
      .then(data => {
        if (data.success == true) {
          that.setData({
            newpond:true
          })
        }
      })
      .catch(data => {

      })
  },

  /**
   * 课程另一种展示
   */
  othercourses:function(coz,week){
    let othercoz = app.table.othercourse(coz,week);
    this.setData({
      week:week,
      othercoz: othercoz
    })
  },
  /**
   * 签到
   */
  signs: function (e) {
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
        switch(mark){
          case 'fastsign':
            wx.authorize({
              scope: 'scope.userLocation',
              success() {
                wx.getLocation({
                  success: function (res) {
                    that.self_sign(ssId,res.latitude,res.longitude)
                  },
                })
              },
              fail() {
                wx.showModal({
                  title: '提示',
                  content: '请检查是否进行位置授权',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      wx.openSetting({

                      })
                    }
                  }
                })
              }
            })
          break;
          case 'scansign':
            // 只允许从相机扫码
            wx.showToast({
              title: '暂不支持',
              icon:"none"
            })
            /*
            wx.scanCode({
              onlyFromCamera: true,
              success: (res) => {
                console.log(res)
              }
            })
            */
          break;
        }
    
      
     
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  //签到处理
  self_sign(ssId,lat,long){
    let locString = JSON.stringify({ loc_lat: lat, loc_long: long });
    let token = aboutcode.encrypt(locString);
    //console.log('jiema '+ aboutcode.decrypt(Base64.decode(token)))
    app.agriknow.signIn(ssId, token)
      .then(data => {
        if (data.success==true) {
            wx.showToast({
              title: '签到成功',
            })
        } else{
          wx.showToast({
            title: '签到失败',
            icon: 'none'
          })
        }
      })
      .catch(data => {
        if (data.statusCode == 400) {
          wx.showModal({
            title: '提示',
            content: '无需签到或签到已过',
            showCancel: false
          })
        }
        if (data.statusCode == 403) {
          wx.showModal({
            title: '提示',
            content: data.message,
            showCancel: false
          })
        }
      })
  },

  //停课记录查看
  suspendrecord:function(e){
    let temp = e.currentTarget.dataset.record;
    let record = [];
    record = temp.map(item=>{
      return {time:item.schTime,note:item.schSuspendnote,weeks:item.schSuspends.join(',')}

    })
    this.setData({
      record:record,
      recordvisible:true
    })
  },
  recordClose(){
    this.setData({
      recordvisible:false,
      tipvisible:false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let coz = this.data.coz;
    let tips=app.table.suspendtip(coz);
    this.setData({
      tips:tips
    })
  },
  looktips:function(e){
    let tips = e.currentTarget.dataset.tips;
    this.setData({
      tipvisible:true,
      tips:tips
    })
  },

  //查看上课地点
  lookplace:function(e){
    let schs = e.currentTarget.dataset.schs;
    let schtimes = schs.map(function (item, index, array) {
      return item.schTime;
    })
    wx.showActionSheet({
      itemList: schtimes,
      success: function (res) {
        let slId = schs[res.tapIndex].slId;
        app.agriknow.getLoc(slId)
          .then(data=>{
            if (data.success == true) {
              wx.showModal({
                title: '上课地点',
                content: data.sisLocation.slName,
                showCancel: false
              })
            }
          })
          .catch(data=>{

          })
      }
    })
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