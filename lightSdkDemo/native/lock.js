module.exports = {
  "inputParams": {
    "title": "手势密码"
  },
  "navigationbar":{
    "disableSystemBarTint":false,
    "backgroundColor": "#e81f1f"
  },
  "style": {
    "backgroundColor": "#000000",//背景色
    "headerBackgroundColor": "#ffffff",
    "headerTextColor": "#ffffff",
    "hintTextColor": "#ffffff",//错误提示文字颜色
    "defaultColor": "#ffffff",//手势未输入状态时默认颜色
    "selectedColor": "#6D90FB",//已输入手势的颜色
    "inCorrectColor": "#db5329",//手势输入有误后的颜色
    "lineColor": "#6D90FB",//手势输入过程中连接的线的颜色
    "lineWidth": 3//线的宽度
  },
  "config": {
    "maxNumberOfRetries":3,//重试次数
    "minNumberOfNodes":4,//最少连接的节点个数
    "freezeTime":10//超过重试次数后的锁定时间
  }
}
