module.exports={
  method:'GET',
  path:'/demo/hello',
  handler:function(request,reply){
    // request.query-代表请求参数
    // request.payload-代表请求体（只有POST/PUT有请求体）
    // request.headers
   return reply("hello,world");
  }
}
