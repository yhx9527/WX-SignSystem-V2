const pinyin = require('../../../utils/pinyin.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    places:['二教','办公室','宿舍','办公楼']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(pinyin.isSupported()){
      /*app.agriknow.getLocs(1, 250)
        .then(data => {
          if(data.success == true){

          }
        })
        .catch(data => {

        })*/
        let temps = this.data.places.map(item=>{
          return {name: item, pinyin: pinyin.convertToPinyin(item)}
        })
        this.indexlist(temps);
    }
  },
  onChange(event) {
    console.log(event.detail, 'click right menu callback data')
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  //生成按拼音索引的列表 
  indexlist(places){
    let storeCity = new Array(26);
    const words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    words.forEach((item, index) => {
      storeCity[index] = {
        key: item,
        list: []
      }
    })
    places.forEach((item) => {
      let firstName = item.pinyin.substring(0, 1);
      let index = words.indexOf(firstName);
      storeCity[index].list.push({
        name: item.name,
        key: firstName
      });
    })
    this.data.places = storeCity;
    this.setData({
      places: this.data.places
    })
  },

  //设置位置
  setloc(e){
    let loc = e.currentTarget.dataset.loc
    console.log(loc);
  },
  //新建地点
  createNew(){
    wx.showModal({
      title: '纠结中',
      content: '新建地点有需要吗？？？',
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