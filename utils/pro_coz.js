class Table{
  doDay(day){
    let day1 =1;
    switch(day){
      case 'MONDAY':day1=1;
      break;
      case 'TUESDAY': day1 = 2;
        break;
      case 'WEDNESDAY': day1 = 3;
        break;
      case 'THURSDAY': day1 = 4;
        break;
      case 'FRIDAY': day1 = 5;
        break;
      case 'SATURDAY': day1 = 6;
        break;
      case 'SUNDAY': day1 = 7;
        break;
    }
    return day1;
  }
  doFort(fort){
    let fort1 = 0;
    switch(fort){
      case 'FULL':fort1=0;
      break;
      case 'ODD': fort1 = 1;
        break;
      case 'EVEN': fort1 = 2;
        break;
    }
    return fort1;
  }
  docoz(courses,width){
    var that = this;
    let schedules = [];
    let schedule={};
    var course;
    let i = courses.length;
    while(i--){
      course=courses[i].sisCourse;
      try{
        schedule['cozId']= course.scId;
        schedule['cozName'] = course.scName;
        schedule['cozMaxSize'] = course.scMaxSize;
        schedule['cozTea']=course.sisJoinCourseList.reduce(function(prev,cur){
          if(prev instanceof Array){
            return prev.push(cur.sisUser.suName)
          }else{
            return [prev.sisUser.suName].push(cur.sisUser.suName)
          } 
        })
        schedule['cozIfMon'] = course.scNeedMonitor
        let schs = course.sisSchedules;
        let j = schs.length;
        while(j--){
          let sch = schs[j]
          let day = that.doDay(sch.ssDayOfWeek);
          let time=sch.ssStartTime;
          let long=sch.ssEndTime-sch.ssStartTime+1;
          schedule['schId'] = sch.ssId;
          schedule['schDay'] = day;
          schedule['schLeft'] = width * (0.07 + 0.1324 * (day - 1));
          schedule['schTop'] = 35 + 45 + 45 * (time - 1);
          schedule['schLong'] = long;
          schedule['schFort'] = that.doFort(sch.ssFortnight);
          schedule['schStartWeek'] = sch.ssStartWeek;
          schedule['schEndWeek'] = sch.ssEndWeek;
          schedule['schTerm'] = sch.ssYearEtTerm;
          schedule['ifClass'] = true; 
        }
      }
      catch(e){
        console.log('生成schedule出错'+JSON.stringify(e))
      }
      schedules.push(schedule);
    }
    return schedules;

  }

  doschs(schedules,week=1,term='2017-2018-2'){
    let result = [];
    result=schedules.filter(function(item,index,array){
        return item.schTerm==term;
    }).filter(function(item,index,array){
        return item.schStartWeek<=week
    }).map(function(item,index,array){
      if(week%2==1 && item.schFort == 2){
        item.ifClass=false;
      }else if(week%2==0 && item.schFort == 1){
        item.ifClass=false;
      }else{
        item.ifClass=true;
      }
      return item;
    })
    return result;
  }
}
export default Table