function getBackgroundColorByTimeMode(mode) {
    if("day" == mode){
       return "#ffffff";
    }else if("night" == mode){
       return "#000000";
    }else if("auto" == mode){
      var dateTemp=new Date();
      var hour=dateTemp.getHours();
      if(hour>=6 && hour<19){
          return "#ffffff";
      }else{
          return "#000000";
      }
    }
}

module.exports = {
    getBackgroundColorByTimeMode
}