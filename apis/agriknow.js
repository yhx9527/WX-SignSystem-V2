import request from './request.js'
class agriknow {
  constructor() {
    this._baseUrl = 'https://api.xsix103.cn/sign_in_system/v3/'
    this._defaultHeader = { 'Content-Type': 'application/json' }
    this._request = new request()
    this._request.setErrorHandler(this.errorHander)
  }

  /**
   * 统一的异常处理方法
   */
  errorHander(message,res) {
    console.error(message)
    wx.showToast({
      title: '连接出错',
      icon:'loading'
    })
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
    /*
    let getType;
    if(!gettype){
      let temp = wx.getStorageSync('getType') || wx.getStorageSync('user').suAuthoritiesStr.toLowerCase();
      getType = temp.split(',')[0];
    }else{
      getType = gettype;
    }
    */
    data['getType']=gettype;
    return this._request.getRequest(this._baseUrl+'courses',data)
  }
  /**
   * 登录验证函数
   */
  checkAuth(rank,auths){
    let flag = auths.toLowerCase().indexOf(rank);
    return true ? flag>-1 : false;
  }
  /**
   * 首次登录跳转函数,并绑定
   */
  login_redict(rank,auths,suId){
    var that = this;
    if(that.checkAuth(rank,auths) == true){
      that.putWX(suId)
        .then(data => {
          if (data.success == true) {
            that.header({ 'Authorization': 'Bearer ' + data['access_token'] })
            switch (rank) {
              case 'student':
                wx.redirectTo({
                  url: '/pages/student/sign/sign',
                })
                break;
              case 'monitor':
                wx.redirectTo({
                  url: '/pages/student/sign/sign',
                })
                break;
              case 'teacher':
                wx.redirectTo({
                  url: '/pages/teacher/index/index',
                })
                break;
              case 'administrator':
                wx.redirectTo({
                  url: '/pages/admin/index/index',
                })
                break;
            }
          } else {
            wx.showModal({
              title: '提示',
              content: '该账号已被他人绑定,请使用新账号',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.reLaunch({
                    url: '/pages/login/login',
                  })
                }
              }
            })
          }


        })
        .catch(data => {

        })
    }else{
      wx.showModal({
        title: '提示',
        content: '角色选择有误，请重试',
        showCancel:false
      })
    }
  }
  /**
   * 老师，学生，督导员正确的登录之后方可绑定微信的整合，先是正确获取课程，之后异步获取当前周及绑定微信
   */
  after_login(gettype){
    var that = this;
    return new Promise((resolve,reject)=>{
      that.getWeek()
        .then((data) => {
          wx.setStorageSync('week', data.week)
        })
        .catch((data) => {

        })
      that.getStuCourse(gettype)
        .then(data => {
        if(data.success==true || data.message==="No courses"){
          /*
          let ifBind=wx.getStorageSync('ifBind');
          let suId = wx.getStorageSync('suId') || wx.getStorageSync('user').suId;
          if(ifBind != true){
            that.putWX(suId)
              .then(data=>{
                if(data.success == true){
                  wx.setStorage({
                    key: 'ifBind',
                    data: true,
                  })
                  that.header({ 'Authorization': 'Bearer ' + data['access_token']})
                }else{
                  wx.showModal({
                    title: '提示',
                    content: '该账号已被他人绑定,请使用新账号',
                    showCancel:false,
                    success:function(res){
                      if(res.confirm){
                        wx.reLaunch({
                          url: '/pages/login/login',
                        })
                      }
                    }
                  })
                }
                

              })
              .catch(data=>{

              })
          }
          */
          
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
 * 管理员登录后处理函数
 */
admin_login(){
  var that = this;
    let ifBind = wx.getStorageSync('ifBind');
  let user = wx.getStorageSync('user');
    let suId = wx.getStorageSync('suId') || user.suId;
  let flag = user.suAuthoritiesStr.split(',').indexOf("ADMINISTRATOR");
  if (ifBind != true && flag != -1) {
      that.putWX(suId)
        .then(data => {
          if (data.success == true) {
            wx.setStorage({
              key: 'ifBind',
              data: true,
            })
            that.header({ 'Authorization': 'Bearer ' + data['access_token'] })
          } else {
            wx.showModal({
              title: '提示',
              content: '该账号已被他人绑定，请使用新账号登录!!!',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.reLaunch({
                    url: '/pages/login/login',
                  })
                }
              }
            })
          }
        })
        .catch(data => {

        })
    }else{
    wx.showModal({
      title: '提示',
      content: '无权访问!!!',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          wx.reLaunch({
            url: '/pages/login/login',
          })
        }
      }
    })
    } 
}
/**
 * 修改督导
 */
putMon(scId,sisCourse){
  let header = this._request.getHeader();
  header['Content-Type'] = "application/json"
  return this._request.putRequest(this._baseUrl  +'courses/'+scId+'/sc-need-monitor', sisCourse,header)
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
    return this._request.putRequest(this._baseUrl + 'schedules/' + ssId + '/monitor-trans',sisMonitorTrans)
  }
  /**
   * 申请转接
   */
  applyMonTrans(ssId, sisMonitorTrans) {
    return this._request.postRequest(this._baseUrl + 'schedules/' + ssId + '/monitor-trans', sisMonitorTrans)
  }
  /**
   * 插入督导记录
   */
  insertMonRec(ssId,sisSupervision){
    let header = this._request.getHeader();
    header['Content-Type'] = "application/json"
    //header['Content-Type'] = "application/x-www-form-urlencoded";
    //console.log(JSON.stringify({ 'sisSupervision': sisSupervision }))
    return this._request.postRequest(this._baseUrl + 'schedules/' + ssId + '/supervisions',sisSupervision,header)
  }
  /**
   * 获取转接课程
   */
  getMonTrans(smtStatus){
    let header = this._request.getHeader();
    header['Content-Type'] = "application/json"
    return this._request.getRequest(this._baseUrl + 'schedules/monitor-trans', { 'smtStatus': smtStatus },header)
  }
}


export default agriknow
