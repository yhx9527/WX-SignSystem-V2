import request from './request.js'
class agriknow {
  constructor() {
    this._baseUrl = 'https://api.xsix103.cn/sign_in_system/v3/'
    this._defaultHeader = { 'content-type': 'application/json' }
    this._request = new request()
    this._request.setErrorHandler(this.errorHander)
  }

  /**
   * 统一的异常处理方法
   */
  errorHander(message,res) {
    console.error(message)
    
   
    
  }

  /**
   * 检查是否绑定微信
   */
  getBind(){
    var that=this
    return new Promise((resolve,reject)=>{
      wx.login({
      success: function (res) {
        if (res.code) {
          resolve(that._request.getRequest(that._baseUrl + 'tokens/' + res.code))
        }     
    }  
  })
    })
  }
  /**
   * 用户登录
   */
  login(formdata){
    let header = { "Content-Type": "application/x-www-form-urlencoded" }
    return this._request.postRequest(this._baseUrl+'tokens',formdata,header)
  }
 
  /**
   * 获取学生课程
   */
  getStuCourse(authorization){
    let getType=wx.getStorageSync('getType')
    let header = { 'Authorization': authorization}
    return this._request.getRequest(this._baseUrl+'courses',{'getType':getType},header)
  }

  /**
   * 查询所有新闻列表
   */
  getNews(page = 1, size = 10) {
    let data = { page: page, size: size }
    return this._request.getRequest(this._baseUrl + 'news/client', data).then(res => res.data)
  }

  /**
   * 获取所有课程
   */
  getCourseList(page = 1, size = 10, key = null) {
    let data = key != null ? { page: page, size: size, queryValue: key } : { page: page, size: size }
    return this._request.getRequest(this._baseUrl + '/course/mobile', data).then(res => res.data)
  }
}
export default agriknow
