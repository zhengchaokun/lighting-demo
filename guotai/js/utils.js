function getBackgroundColorByTimeMode(mode) {
  if ("day" == mode) {
    return "#ffffff";
  } else if ("night" == mode) {
    return "#000000";
  } else if ("auto" == mode) {
    var dateTemp = new Date();
    var hour = dateTemp.getHours();
    if (hour >= 6 && hour < 19) {
      return "#ffffff";
    } else {
      return "#000000";
    }
  }
}

function parse2query(data) {
  let string = "";
  Object.keys(data).forEach(function(key) {
    string += `${key}=${data[key]}&`
  });
  string = string.substring(0, string.length - 1);
  return string;
}

function getPriceChangePercent(rate, px_change) {
  if (rate == "停牌" || rate == "--")
    return rate;
  if (typeof(rate) != "undefined") {
    if ((rate + "").indexOf("%") >= 0) {
      if ((rate + "").indexOf("-") == -1) {
        return "+" + rate;
      }
      return rate;
    }
    if (rate == 0 && px_change < 0) ///涨跌幅为0，但涨跌额小于0的时候，需要显示为-0.00%
    {
      return "-0.00%";
    } else {
      return getPriceChange(rate);
    }
  }
}

function getPriceChange(rate) {
  if (rate > 0)
    return "+" + rate;
  else
    return rate;
}

function getColorWithPriceChange(priceChange) {
  if (priceChange > 0)
    return "riseColor";
  else if (priceChange < 0)
    return "fallColor";
  else
    return "stableColor";
}

function getColorWithNumber(priceChange) {
  if (priceChange > 0)
    return "#FF4500";
  else if (priceChange < 0)
    return "#3CB371";
  else
    return "#333";
}

function formatDate(date, fmt) {
  var o = {
    "M+": date.getMonth() + 1, //月份 
    "d+": date.getDate(), //日 
    "h+": date.getHours(), //小时 
    "m+": date.getMinutes(), //分 
    "s+": date.getSeconds(), //秒 
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
    "S": date.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

module.exports = {
  getBackgroundColorByTimeMode,
  parse2query,
  getColorWithPriceChange,
  getColorWithNumber,
  formatDate
}