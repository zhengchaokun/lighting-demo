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

module.exports = {
  getBackgroundColorByTimeMode,
  parse2query,
  getColorWithPriceChange,
  getColorWithNumber
}