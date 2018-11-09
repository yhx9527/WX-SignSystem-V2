Page({

  /**
   * 页面的初始数据
   */
  data: {
    ssId: '',
    shot: 'back',
    ifshoot: true,
    src: '',
    percent: 0,
    status: 'active',
    ifBar: false,
    uploadTask: {},
    token: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync('Authorization')
    this.setData({
      ssId: options.ssId,
      token: token
    })
    this.ctx = wx.createCameraContext()
  },
  takePhoto() {
    this.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath,
          ifshoot: false
        })
      }
    })
  },
  error(e) {
    console.log(e.detail)
  },
  revise() {
    let temp = this.data.shot === 'back' ? 'front' : 'back'
    console.log('转换摄像头',temp)
    this.setData({
      shot: temp
    })
  },
  back(){
    this.setData({
      ifshoot: true
    })
  },
  send(){
    console.log('发送')
    let that = this
    this.setData({
      ifBar: true
    })
    let ssId = this.data.ssId
    let token = this.data.token
    let src = this.data.src
    const uploadTask = wx.uploadFile({
      url: 'https://api.xsix103.cn/sign_in_system/v3/schedules/' + ssId + '/signIns/doBackSignIn',
      filePath: src,
      name: 'picture',
      header: {
        'Authorization': token,
        'Content-Type': 'multipart/form-data'
      },
      success: function(res) {
        let data = JSON.parse(res.data)
        switch(res.statusCode){
          case 200:
            if (data.success) {
              wx.showToast({
                title: '照片已发送',
              })
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 1500)
            } else {
              wx.showToast({
                title: '发送失败',
                icon: 'none'
              })
            }
          break;
          case 400:
            wx.showToast({
              title: '无需签到或签到已过',
              icon: 'none',
              duration: 2000
            })
            break;
          case 401:
            wx.showToast({
              title: '请返回上个页面重试',
              icon: 'none'
            })
            break;
          case 500:
            wx.showToast({
              title: '服务器错误',
              icon: 'none'
            })
            break;
            default:
            wx.showModal({
              title: '提示',
              content: data.message,
            })
        }
        console.log(JSON.parse(res.data))
        that.setData({
          ifBar: false,
          percent: 0,
          status: 'active'
        })
      },
      fail: function(err) {
        that.setData({
          ifBar: false,
          status: 'wrong'
        })
        console.log(err)
      }
    })
    this.setData({
      uploadTask: uploadTask
    })
    uploadTask.onProgressUpdate((res)=>{
      this.setData({
        percent: res.progress,
        status: res.progress === 100 ? 'success' : 'active',
        ifBar: res.progress === 100 ? false : true,
      })
      console.log('上传进度', res.progress)
    })
  },
  cancel(){
    console.log('取消上传')
    try{
      console.log(this.uploadTask)
      this.uploadTask.abort()
      this.setData({
        ifBar: false,
        percent: 0,
        status: 'active'
      })
    }catch(e){
      console.log('取消失败',e)
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

})