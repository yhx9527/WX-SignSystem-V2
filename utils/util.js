const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function headToEnd(array){
  if(array instanceof Array){
    var temp = array.pop();
    array.unshift(temp);
  }

}
const formUtil={
  ifBlank:function(value,array){
    for(var i=array.length-1;i>=0;i--){
      if (value[array[i]]==null || value[array[i]].length==0){
        return true;
      }
    }
    return false;
  }
}

module.exports = {
  formatTime: formatTime,
  hendToEnd: headToEnd,
  formUtil:formUtil
}
