const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'tab1',
    current_scroll: 'tab1',
    checkLeaveList: [{ courseName: "数据库", courseStudent: "xxx", studentId: "xxx", courseTime: "xxx" }],
    page:1,
    ifmore:false,
    monitorlist:[]
  },
   

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let monitorlist=[];
    var that = this;
    app.agriknow.getStuCourse('monitor')
      .then(data=>{
        monitorlist=app.table.mancoz(data.array);
        that.setData({
          monitorlist:monitorlist
        })
      })
      .catch(data=>{

      })
  },

  //标签页改变
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },

  handleChangeScroll({ detail }) {
    this.setData({
      current_scroll: detail.key
    });
  },

  //分页
  pageChange({ detail }) {
    const type = detail.type;
    if (type === 'next') {
      this.setData({
        page: this.data.page + 1
      });
    } else if (type === 'prev') {
      this.setData({
        page: this.data.page - 1
      });
    }
  },

  //课程更多
  clickmore:function(e){
    let ifmore = this.data.ifmore;
    let dataset = e.currentTarget.dataset;
    let scId=dataset.scid;
    let schs=dataset.schs;
    let cozName =dataset.cozname 
    console.log('scId'+scId)
    //console.log(JSON.stringify(e,undefined,'\t'))
    this.setData({
      ifmore:!ifmore,
      moretop:e.detail.y+8,
      moreleft:e.detail.x-78,
      scId:scId,
      schs:schs,
      cozName:cozName
    })
  },
  //查看督导记录
  monitorRec:function(e){
    let schs = e.currentTarget.dataset.schs;
    let scid = e.currentTarget.dataset.scid;
    let cozname = e.currentTarget.dataset.cozname;
    wx.navigateTo({
      url: '../monitorRec/monitorRec?schs='+JSON.stringify(schs)+'&scid='+scid+'&cozname='+cozname,
    })
  },
  //插入督导记录
  insertMonitor:function(e){
    let schs=e.currentTarget.dataset.schs;
    let schtimes=schs.map(function(item,index,array){
      return item.schtime;
    })
    wx.showActionSheet({
      itemList: schtimes,
      success: function (res) {
        console.log('actinschs'+schs);
        wx.navigateTo({
          url: '../monitorForm/monitorForm?ssId='+schs[res.tapIndex].schid,
        })
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  //督导转接
  transMonitor:function(e){
    let schs = e.currentTarget.dataset.schs;
    let schtimes = schs.map(function (item, index, array) {
      return item.schtime;
    })
    wx.showActionSheet({
      itemList: schtimes,
      success: function (res) {
        let ssId=schs[res.tapIndex].schid;
        console.log(res.tapIndex)
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