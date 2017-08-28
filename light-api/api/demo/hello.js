module.exports={
  method:'GET',
  path:'/demo/hello',
  handler:function(request,reply){
   return reply('hello,world');
  }  

}