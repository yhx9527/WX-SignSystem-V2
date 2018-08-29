const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyList: [{ courseName: "微积分", courseTeacher: "xxx", courseTime: "xxx", coursePlace: "xxx" },
    { courseName: "数据库", courseTeacher: "xxx", courseTime: "xxx", coursePlace: "xxx" },
    { courseName: "java", courseTeacher: "xxx", courseTime: "xxx", coursePlace: "xxx" },
    ],
    Weeks: ['全部',1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    searchWeeks: [],
    nowSchedule: 0,
    schedules: ['全部'],
    height1: 0,
    height2: 0,
    page:1,
    records:[],
    searchs:[],
    showcancel:false,
    visible1:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let scId=options.scid;
    let schs=JSON.parse(options.schs);
    let cozname = options.cozname;
    let cozsize = options.cozsize;
    let schedules = this.data.schedules;
    let records = [];
    schs.forEach(function(item){
      schedules.push(item.schtime);
    })
    this.setData({
      schedules:schedules,
      cozname:cozname,
      cozsize:cozsize
    })
    app.agriknow.getMonRec(scId)
      .then(data=>{
        if(data.success==true){
          records=app.table.domonrec(data.array);
          this.setData({
            records:records,
            searchs:records
          })
        }
      })
      .catch(data=>{
        
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
  //根据条件搜索对应课程
  formSubmit:function(e){
    let form = e.detail.value;
    console.log(form,undefined,'\t');
    let records = this.data.records;
    let searchs = app.table.myfilter(records,[form],["","全部"]);
    this.setData({
      searchs:searchs
    })

  },

  //点击查看督导详情
  recmore:function(e){
    let dataset = e.currentTarget.dataset;
    this.setData({
      visible1: true,
      note:dataset.note,
      cozsize:dataset.cozsize
    });
  },
  handleClose1() {
    this.setData({
      visible1: false
    });
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