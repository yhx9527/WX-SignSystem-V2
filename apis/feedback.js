class Feedback{
  constructor() {
    
  }
  showModal(message,okcall,title='提示',showcancel=false){
    wx.showModal({
      title: title,
      content: message,
      showCancel:showcancel,
      success:function(res){
        if(res.confirm){
          if(okcall){
          okcall();
          }
        }
      }
    })
  }
  showYesToast(title){
    wx.showToast({
      title: title,
    })
  }
  showNoToast(title){
    wx.showToast({
      title: title,
      icon:'none'
    })
  }
  showLoading(title,duration=1500){
    wx.showLoading({
      title: title,
    })
    setTimeout(function(){
      wx.hideLoading();
    },duration)
  }
  
}
export default Feedback;
