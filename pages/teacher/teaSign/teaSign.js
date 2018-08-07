Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    monitorClass: { courseName: "微积分", courseNum: 100, courseTime: "xxx", coursePlace: "xxx" },
    manSwitch: false,
    autoSwitch: false,
    manChecked: false,
    autoChecked: false,
    date: "2018-7-23",
    time: "12:12:12",
    validMin: 1,
    nowWeek: 1,
    Weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    searchWeeks:[],
    nowSchedule:0,
    schedules:['全部','星期三5,6节','星期五1,2节','星期四1,2,3,4节','星期一1,2,3节'],
    height1:0,
    height2:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var weeks = this.data.Weeks;
    var searchWeeks = ['全部'];
    /*weeks.forEach(function(data){
      data.toString();
      searchWeeks.push(data);
    })*/
    weeks.map(function(item){searchWeeks.push(item)})
    this.setData({
      searchWeeks:searchWeeks
    })
  },
  //步骤条操作
  handleClick() {
    const addCurrent = this.data.current + 1;
    const current = addCurrent > 2 ? 2 : addCurrent;
    this.setData({
      'current': current
    })
  },
  form1: function () {
    this.setData({
      'current': 0,
    })
  },
  form2: function () {
    this.setData({
      'current': 1,
     
    })
  },
  form3: function () {
    this.setData({
      'current': 2,
    })
  },
  //发起自动签到
  onMan: function (event) {
    var detail = event.detail;
    this.setData({
      'manSwitch': detail.value
    })
  },
  onAuto: function (event) {
    var detail = event.detail;
    this.setData({
      'autoSwitch': detail.value
    })
  },
  handleAutoChange({ detail = {} }) {
    this.setData({
      'autoChecked': detail.current
    })
  },
  handleManChange({ detail = {} }) {
    this.setData({
      'manChecked': detail.current
    })
  },

  //修改人工签到时间
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      time: e.detail.value + ":00"
    })
  },
  //改变二维码有效时间
  changeValidMin({ detail }) {
    this.setData({
      validMin: detail.value
    })
  },

  //下拉菜单
  click_show1:function(){
    var height1 = this.data.height1;
    var length = this.data.schedules.length
    this.setData({
        height1: height1 ==0 ? 4*length+1 :0
    })
  },
  click_show2: function () {
    var height2 = this.data.height2;
    this.setData({
      height2: height2 ==0 ? 21 : 0
    })
  },
  changeWeek:function(e){
    var id = e.target.dataset.id;
    this.setData({
      'id1':id,
      height2:0
    })
  },
  changeSchedule:function(e){
    var id = e.target.dataset.id;
    this.setData({
      'id': id,
      height1:0
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