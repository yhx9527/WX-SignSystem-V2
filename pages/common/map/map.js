const app = getApp()
const gcoord = require('gcoord');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: '',
    latitude: '',
    markers: [],
    circles: [],
    includePoints: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.mapCtx = wx.createMapContext('myMap')
    console.log(options)
    let cur = gcoord.transform(
      [options['lon'], options['lat']],    // 经纬度坐标
      gcoord.WGS84,               // 当前坐标系
      gcoord.GCJ02                // 目标坐标系
    )
    console.log(cur)
    app.agriknow.getLoc(options.slId)
      .then(data => {
        console.log(data)
        var bourn = gcoord.transform(
          [data.slLong, data.slLat],    // 经纬度坐标
          gcoord.WGS84,               // 当前坐标系
          gcoord.GCJ02                // 目标坐标系
        )
        console.log('中心点',bourn[0], bourn[1])
        that.setData({
          longitude: bourn[0],
          latitude: bourn[1],
          markers: [{ id: 0, latitude: bourn[1], longitude: bourn[0], title: data.slName, callout: { content: data.slName } }, { id: 1, latitude: cur[1], longitude: cur[0], title: '我的位置', callout: { content: '我的位置' } }],
          circles: [{ latitude: bourn[1], longitude: bourn[0], radius: 100, fillColor: "#FFFFFFAA", color: "#74b9ffAA" }],
          includePoints: [{ latitude: bourn[1], longitude: bourn[0] }, { latitude: options['lat'], longitude: options['lon'] }]
        })
      })
      .catch(data => {
        console.log('获取位置出错');
        app.feedback.showNoToast('签到失败');
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
    
  }
})