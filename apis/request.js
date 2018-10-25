class request {
  constructor() { 
    this._header = {
      'Content-Type': 'application/json'
    }

  }

  /**
   * 设置统一的异常处理
   */
  setErrorHandler(handler) {
    this._errorHandler = handler;
  }


  setHeader(header){
    this._header=header;
  }
  getHeader() {
    return this._header
  }
  /**
   * GET类型的网络请求
   */
  getRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'GET')
  }

  /**
   * DELETE类型的网络请求
   */
  deleteRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'DELETE')
  }

  /**
   * PUT类型的网络请求
   */
  putRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'PUT')
  }

  /**
   * POST类型的网络请求
   */
  postRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'POST')
  }

  /**
   * 网络请求
   */
  requestAll(url, data, header, method) {
    var that = this;
    let auth = wx.getStorageSync('Authorization')
    let _header = {'Authorization': auth}
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        header: {
          ...header,
          ..._header
          },
        method: method,
        success: (res => {
          if ((res.statusCode >= 200 && res.statusCode < 300) || res.statusCode == 304) {
            //200,正常: 服务端业务处理正常结束
            resolve(res.data)
          } else {
            //其它错误，提示用户错误信息
            if (this._errorHandler != null) {
              //如果有统一的异常处理，就先调用统一异常处理函数对异常进行处理
              this._errorHandler('client request was unsuccessful:'+res.statusCode,res)
            }
            reject(res)
          }
        }),
        fail: (res => {
          //console.log('无网络或服务器响应超时'+res);
            wx.hideLoading();
            let pages = getCurrentPages();
            if (pages.length == 1 && pages[pages.length - 1].route == "pages/login/login"){
              wx.showModal({
                title: '提示',
                content: JSON.stringify(res),
                confirmText:'重试',
                showCancel:false,
                success:function(res){
                  if(res.confirm){
                    wx.reLaunch({
                      url: '/pages/login/login',
                    })
                  }
                }
              })
          }else{
              wx.showToast({
                title: '连接超时',
                icon:'none'
              })
          }
          reject(res)
        })
      })
    })
  }
}

export default request
