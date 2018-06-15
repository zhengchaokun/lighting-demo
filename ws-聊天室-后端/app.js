const app = require("light-api");
//先初始化 ，然后启动App
app.init().start(function(){
   console.log('start...');
});