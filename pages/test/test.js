var winWidth = 414;
var winHeight = 736;
const js_pinyin = require('js-pinyin');
Page({
  data: {
    x: winWidth,
    y: winHeight,
    distance: "",
    animationData: {},
    content: [{ "value": '' }, { "value": '' }, { "value": '' }, { "value": '' }]
  },
  onLoad: function () {
    console.log(js_pinyin.getFullChars('管理员'));
    console.log(js_pinyin.getCamelChars('管理员'));
    var that = this;
    var res = wx.getSystemInfoSync();
    winWidth = res.windowWidth;
    winHeight = res.windowHeight;
    that.setData({
      x: winWidth,
      y: winHeight
    })
  },
  tap: function (e) {
    var that = this;
    var distance = that.data.distance;
    if ((distance > (winWidth + winWidth / 2)) || (distance < (winWidth - winWidth / 2))) {
      var content = that.data.content;
      content.splice(e.currentTarget.dataset.index, 1);
      that.setData({
        x: winWidth,
        y: winHeight,
        content: content
      });
    } else {
      that.setData({
        x: winWidth,
        y: winHeight
      })
    }
  },
  onChange: function (e) {
    var that = this;
    that.setData({
      distance: e.detail.x
    })
  },
  onScale: function (e) {
  }
})