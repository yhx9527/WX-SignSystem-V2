class Table{
  doDaytoInt(day){
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
  doDaytoString(day) {
    let day1 = 1;
    switch (day) {
      case 1: day1 = 'MONDAY';
        break;
      case 2: day1 = 'TUESDAY';
        break;
      case 3: day1 = 'WEDNESDAY';
        break;
      case 4: day1 = 'THURSDAY';
        break;
      case 5: day1 = 'FRIDAY';
        break;
      case 6: day1 = 'SATURDAY';
        break;
      case 7: day1 = 'SUNDAY';
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
  doFortToString(fort){
    let fort1 = '全周';
    switch (fort) {
      case 0: fort1 = '全周';
        break;
      case 1: fort1 = '单周';
        break;
      case 2: fort1 = '双周';
        break;
    }
    return fort1;
  }
  /**
   * 课程表根据course提取schedule
   */
  docoz(courses,width){
    var that = this;
    let schedules = [];

    var course;
    let i = courses.length;
    while(i--){
      course=courses[i].sisCourse;
      let schs = course.sisScheduleList;
      let j = schs.length;
      while (j--) {
      let schedule = {};
      try{
        schedule['cozId']= course.scId;
        schedule['cozName'] = course.scName;
        schedule['cozMaxSize'] = course.scMaxSize;
        schedule['cozTea'] = course.sisJoinCourseList.filter(function (item, index, array){
          return item.joinCourseType=== 1
        }).map(function(item,index,array){
          return item.sisUser.suName;
        })
        schedule['teaStr'] = schedule['cozTea'].join(',');
        schedule['cozIfMon'] = course.scNeedMonitor;
        //let schstemp=[];
        schedule['schs'] = course.sisScheduleList.map(item=>{
          return { schId: item.ssId, schTime: that.doDaytoString(item.ssDayOfWeek) + ' ' + item.ssStartTime + '-' + item.ssEndTime,schSuspends: item.ssSuspensionList,schSuspendnote:item.ssSuspension,slId: item.slId}
        })
          let sch = schs[j]
          //let day = that.doDay(sch.ssDayOfWeek);
          let time=sch.ssStartTime;
          let long=sch.ssEndTime-sch.ssStartTime+1;
          schedule['schId'] = sch.ssId;
          schedule['schTerm'] = sch.ssYearEtTerm;
          schedule['schDay'] = sch.ssDayOfWeek;
          schedule['schLeft'] = width * (0.07 + 0.1324 * (sch.ssDayOfWeek - 1));
          schedule['schTop'] = 35 + 45 + 45 * (time - 1);
          schedule['schLong'] = long;
          schedule['schFort'] = that.doFort(sch.ssFortnight);
          schedule['schStartWeek'] = sch.ssStartWeek;
          schedule['schEndWeek'] = sch.ssEndWeek;
          schedule['schStartTime'] = sch.ssStartTime;
          schedule['schEndTime'] = sch.ssEndTime;
          schedule['schSuspends'] = sch.ssSuspensionList;
          schedule['schSuspendnote'] = sch.ssSuspension;
          schedule['ifClass'] = true;
          //schstemp.push({ schId: sch.ssId, schTime: that.doDaytoString(sch.ssDayOfWeek)+' '+sch.ssStartTime+'-'+sch.ssEndTime}); 
        
        //schedule['schs'] = schstemp;
      }
      catch(e){
        console.log('生成课表所需的schedule出错'+JSON.stringify(e))
      }
      schedules.push(schedule);
      }
    }
    return schedules;

  }
/**
 * 筛选schedule
 */
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
/**
  * 课程表另一种查看方式
  */
  othercourse(courses){
    let cozName='';
    let len = courses.length;
    let cozs = [];
    while(len--){
      if(courses[len].cozName !== cozName){
        /*if(courses[len].schs.length > 1){
        courses[len]['times'] = courses[len].schs.reduce((item,next)=>{
          return item.schTime+','+next.schTime;
        })
        }else{
          courses[len]['times'] = courses[len].schs[0].schTime;
        }*/
        cozs.push(courses[len])
      }
      cozName = courses[len].cozName;
    }
    return cozs
  }
/**
 * 处理督导课程展示列表
 */
  mancoz(courses){
    let course;
    let i = courses.length;
    let cozs=[];
    while(i--){
      let coz = {};
      try{
        course = courses[i]
        coz['cozId'] = course.scId;
        coz['cozSize'] = course.scMaxSize;
        coz['cozName'] = course.scName;
        coz['cozTeaAbout'] = course.sisJoinCourseList.filter(function (item, index, array) {
          return item.joinCourseType === 1
        }).map(function (item, index, array) {
          return item.sisUser;
        })
        coz['cozStus'] = course.sisJoinCourseList.filter(function (item, index, array) {
          return item.joinCourseType === 0
        }).map(function (item, index, array) {
          return item.sisUser;
        })
        let schedules = course.sisScheduleList;
        let j = schedules.length;
        let schs = [];
        while(j--){
          let sch = {};
          let schedule = schedules[j];
          sch['schid'] = schedule['ssId'];
          sch['slid'] = schedule['slId'];
          let day = this.doDaytoString(schedule.ssDayOfWeek);
          sch['schtime'] = day+' '+schedule['ssStartTime']+'-'+schedule['ssEndTime'];
          schs.push(sch);
        }
        coz['schs']=schs;
        if(coz['cozTeaAbout'].length>1){
          coz['cozTea'] = coz['cozTeaAbout'].reduce(function (prev, cur, index, array) {
            return prev.suName + ',' + cur.suName;
          })
        }else{
          coz['cozTea']=coz['cozTeaAbout'][0].suName;
        }
       if(coz['schs'].length>1){
         coz['cozTime'] = coz['schs'].reduce(function (prev, cur, index, array) {
           return prev.schtime + ',' + cur.schtime;
         })
       }else{
         coz['cozTime'] = coz['schs'][0].schtime;
       }
      
        
      }catch(e){
        console.log('生成查看的课程出错')
      }
      cozs.push(coz);
    }
    return cozs;
  }
  /**
   * 督导记录处理列表
   */
  domonrec(array){
    var that=this;
    let records=[];
    array.forEach(function(item,index,arra){
      if(item.sisSupervisionList.length>0){
      try{
        let temps = item.sisSupervisionList
        let i = temps.length;
        while (i--) {
          let record = {};
        let day = that.doDaytoString(item.ssDayOfWeek);
      record['schtime'] = day+' '+item.ssStartTime+'-'+item.ssEndTime;
      record['ssId'] = item.ssId;
        let temp = temps[i];
        record['note'] = temp;
        record['week'] = temp.ssvWeek;
        records.push(record);
      }
      }catch(e){
        console.log('生成督导记录出错')
      }
     
      }
    })
    return records;
  }
  /**
   * 根据json形式的筛选条件来过滤给定数组
   * records 要筛选的数组
   * form 筛选条件的json，注意key的值要与records元素的属性同名
   * ignore 忽略的key值组成的数组
   */
  myfilter(records,form,ignore=[]){
    let keys=form.map(item=>{
      return Object.keys(item)
    })
    let values=form.map(item=>{
      return Object.values(item)
    })
    ignore.forEach(i=>{
      let j=0;
      while(j!==-1){
       j = values[0].indexOf(i);
      if(j !== -1){
        keys[0].splice(j,1);
        values[0].splice(j,1);
      }
      }
    })
    return records.filter(item=>{
      let ifflag=true;
      if(keys[0].length >0){
      ifflag = keys[0].every((item1, index, array) => {
        //console.log(index + '   ' + values[0][index] + '    ' + item[item1] + '  ' + item1);
        return values[0][index] == item[item1]
      })
      }
      //console.log('ifflag:'+ifflag)
      return ifflag
    })
  }
  /**
   * 督导转接的处理函数
   */
  dotrans(array){
    let translist=[];
    let i = array.length;
    while(i--){
      let trans={};
      let arr = array[i];
      try{
      trans['userId'] = arr.suId;
      trans['schId'] = arr.ssId;
      trans['week'] = arr.smtWeek;
      trans['schname'] = arr.sisSchedule.sisCourse.scName;
      trans['schsize'] = arr.sisSchedule.sisCourse.scMaxSize;
      trans['username'] = arr.sisSchedule.sisCourse.sisUser.suName;
      trans['weektime'] = arr.sisSchedule.ssStartWeek+'-'+arr.sisSchedule.ssEndWeek;
      let day = this.doDaytoString(arr.sisSchedule.ssDayOfWeek);
      trans['time'] = day+' '+arr.sisSchedule.ssStartTime+'-'+arr.sisSchedule.ssEndTime;
      trans['fort'] = arr.sisSchedule.ssFortnight;
      }catch(e){
        console.log('生成督导转接列表出错')
      }
      translist.push(trans);
    }
    return translist;
  }
  /**
   * 督导池塘列表处理函数
   */
  domonpond(array){
    let that=this;
    let pondlist=[];
    let i = array.length;
    while(i--){
      let pond={};
      let arr = array[i];
      try{
      pond['cozId'] = arr.scId;
      pond['cozName'] = arr.scName;
      pond['cozSize'] = arr.scMaxSize;
      pond['cozTea'] = arr.sisJoinCourseList.filter(function (item, index, array) {
          return item.joinCourseType === 1
        }).map(function (item, index, array) {
          return item.sisUser.suName;
        }).join(' ')
      pond['cozIfMon'] = arr.scNeedMonitor;
      pond['schs']=arr.sisScheduleList.map(function(item,index,array){
        let sch = {};
        sch['schId']=item.scId;
        sch['term']=item.ssYearEtTerm;
        let day = that.doDaytoString(item.ssDayOfWeek);
        sch['time'] = day+' '+item.ssStartTime+'-'+item.ssEndTime;
        sch['weekTime'] = item.ssStartWeek+'-'+item.ssEndWeek;
        sch['fort']=that.doFortToString(item.ssFortnight);
        return sch;
      })
      }catch(e){
        console.log('生成督导池的督导出错')
      }
      pondlist.push(pond);
    }
    return pondlist
  }
  /**
   * 管理员查看课程列表处理函数
   */
  doadmincourses(array){
    var that = this;
    let courses = [];
    let i = array.length;
    while(i--){
      let course={};
      let arr=array[i];
      try{
      course['cozid'] = arr.scId;
      course['cozname'] = arr.scName;
      course['cozsize'] = arr.scMaxSize;
      course['ifmon'] = arr.scNeedMonitor;
      course['monitor'] = arr.scNeedMonitor ? arr.monitor :{};
      course['schs'] = arr.sisScheduleList.map(function(item,index,array){
        item['schid'] = item.ssId;
        item['sch'] = that.doDaytoString(item.ssDayOfWeek)+' '+item.ssStartTime+'-'+item.ssEndTime;
        item['weektime'] = that.doFortToString(item.ssFortnight)+' '+item.ssStartWeek+'-'+item.ssEndWeek;
        item['slid'] = item.slId;
        return item;
      });
      course['suspends'] = arr.sisScheduleList.map(function(item,index,array){
        let suspend={};
        suspend['schid']=item.ssId;
        suspend['suspend']=item.ssSuspensionList.join(',');
        suspend['suspendnote']=item.ssSuspension;
        return suspend;
      })
      course['students'] = arr.sisJoinCourseList.filter(item=>{
        return item.joinCourseType == 0;
      }).map(item=>{
        return item.sisUser;
      })
      course['teachers'] = arr.sisJoinCourseList.filter(item => {
        return item.joinCourseType == 1;
      }).map(item => {
        return item.sisUser;
      })
      if(course['teachers'].length >1){
      course['coztea'] = course['teachers'].reduce((prev,next,index,array)=>{
        return prev.suName+' '+next.suName;
      })
      }else{
        course['coztea'] = course['teachers'][0].suName;
      }
      }catch(e){
        console.log('生成管理员查看课程列表出错');
      }
      courses.push(course);

    }
    return courses;
  }
/**
 * 停课课程提示
 */
suspendtip(courses,week){
  let tips = courses.map((item)=>{
    if(item.schSuspends.indexOf(parseInt(week)) > -1 ){
      let tip={};
      tip['cozName'] = item.cozName;
      tip['cozTime'] = this.doDaytoString(item.schDay)+' '+item.schStartTime+'-'+item.schEndTime;
    }
    return tip;
  })
  return tips;
}
/**
 * 老师课程处理
 */
doteacoz(courses){
  var that = this;
  let teacozs = courses.map((item)=>{
    let teacoz = {};
    try{
    teacoz['cozId'] = item.scId;
    teacoz['cozSize'] = item.sisCourse.scMaxSize;
    teacoz['cozName'] = item.sisCourse.scName;
    teacoz['ifMon'] = item.sisCourse.scNeedMonitor;
    teacoz['stuList'] = item.sisCourse.sisJoinCourseList.filter(item1=>{
      return item1.joinCourseType == 0;
    });
    teacoz['schs'] = item.sisCourse.sisScheduleList.map(item2 => {
      return { schId: item2.ssId, schTime: that.doDaytoString(item2.ssDayOfWeek) + ' ' + item2.ssStartTime + '-' + item2.ssEndTime, slId: item2.slId }
    })  
    teacoz['schedules'] = item.sisCourse.sisScheduleList;
    }
    catch(e){
      console.log('生成老师课程出错');
    }
    return teacoz
  })
  return teacozs;
}
/**
 * 学生签到记录处理
 */
dostusign(schlist){
  let week = wx.getStorageSync('week');
  let signlists = schlist.map(item=>{
    let sign={};
  })
}

}
export default Table