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
   * header设置
   */
  header(args){
    let header = this._request.getHeader();
    for(var key in args){
      header[key]=args[key]
    }
    this._request.setHeader(header)
    
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
   * 绑定微信
   */
  putWX(suId){
    var that = this;
    let header = that._request.getHeader()
    header['Content-Type'] = "application/x-www-form-urlencoded"
    return new Promise((resolve,reject)=>{
      wx.login({
        success:function(res){
          if(res.code){
            resolve(that._request.putRequest(that._baseUrl + 'users/' + suId, { 'code': res.code }, header))
          }
        }
      })
    })
   
  }
  /**
   * 获得当前周
   */
  getWeek(){
    return this._request.getRequest(this._baseUrl+'week')
  }
  /**
   * 用户登录
   */
  login(formdata){
    let header = { "Content-Type": "application/x-www-form-urlencoded" }
    return this._request.postRequest(this._baseUrl+'tokens',formdata,header)
  }
 
  /**
   * 获取课程
   */
  getStuCourse(gettype,data={}){
    let getType;
    if(!gettype){
      let temp = wx.getStorageSync('getType') || wx.getStorageSync('user').suAuthoritiesStr.toLowerCase();
      getType = temp.split(',')[0];
    }else{
      getType = gettype;
    }
    data['getType']=getType;
    return this._request.getRequest(this._baseUrl+'courses',data)
  }
  /**
   * 正确的登录之后方可绑定微信的整合，先是正确获取课程，之后异步获取当前周及绑定微信
   */
  after_login(){
    var that = this;
    return new Promise((resolve,reject)=>{
      that.getStuCourse()
        .then(data => {
        if(data.success==true){
          that.getWeek()
            .then((data) => {
              wx.setStorageSync('week', data.week)
            })
            .catch((data)=>{

            })
          let ifBind=wx.getStorageSync('ifBind');
          let suId = wx.getStorageSync('suId') || wx.getStorageSync('user').suId;
          if(!ifBind){
            that.putWX(suId)
              .then(data=>{
                if(data.success == true){
                  wx.setStorage({
                    key: 'ifBind',
                    data: true,
                  })
                  that.header({ 'Authorization': 'Bearer ' + data['access_token']})
                }
                

              })
              .catch(data=>{

              })
          }
          
        resolve(data)
        }
      })
        .catch(res => {
        if (res.data.message) {
          wx.showModal({
            title: '提示',
            content: res.data.message,
            showCancel: false,
            success: function (res1) {
              if (res1.confirm) {
                if (res.statusCode >= 400 && res.statusCode <= 403) {
                  wx.reLaunch({
                    url: '/pages/login/login',
                  })
                }
              }
            }
          })
        }

      })
    })
  }

/**
 * 修改督导
 */
putMon(scId,sisCourse){
  return this._request.putRequest(this._baseUrl + +'courses/'+scId+'/sc-need-monitor', { 'sisCourse': sisCourse })
}
  /**
   * 获得签到课程
   */
  getSign(ssId) {
    let week = wx.getStorageSync('week') != "" ? wx.getStorageSync('week') : '1';
    if(week){
      return this._request.getRequest(this._baseUrl +'schedules/'+ssId + '/signIns/week/'+week)
    }
  }
  /**
   * 签到
   */
  signIn(ssId){
    return this._request.postRequest(this._baseUrl +'schedules/'+ssId + '/signIns/week/' + week)
  }
  /**
   * 发起签到
   */
  postSign(ssId){
    return this._request.postRequest(this._baseUrl +'schedules/'+ssId + '/signIns')
  }
  /**
   * 获取签到记录
   */
  getSignRec(scId){
    
    return this._request.getRequest(this._baseUrl + 'courses/' + scId + '/signIns')
  }
  /**
   * 领取督导
   */
  getMonPond(scId){
    return this._request.postRequest(this._baseUrl +'courses/'+scId + '/monitor')
  }
  /**
   * 获取某个课程的全部督导记录
   */
  getMonRec(scId){
    return this._request.getRequest(this._baseUrl + 'courses/' + scId + '/supervisions')
  }
  /**
   * 接受或拒绝转接
   */
  doMonTrans(ssId,sisMonitorTrans){
    return this._request.putRequest(this._baseUrl + 'schedules/' + ssId + '/monitor-trans',{'sisMonitorTrans':sisMonitorTrans})
  }
  /**
   * 申请转接
   */
  applyMonTrans(ssId, sisMonitorTrans) {
    return this._request.postRequest(this._baseUrl + 'schedules/' + ssId + '/monitor-trans', { 'sisMonitorTrans': sisMonitorTrans })
  }
  /**
   * 插入督导记录
   */
  insertMonRec(ssId,sisSupervision){
    return this._request.postRequest(this._baseUrl + 'schedules/' + ssId + '/supervisions', { 'sisSupervision': sisSupervision})
  }
  /**
   * 获取转接课程
   */
  getMonTrans(smtStatus){
    return this._request.getRequest(this._baseUrl + 'schedules/monitor-trans', { 'smtStatus': smtStatus })
  }
}


export default agriknow
