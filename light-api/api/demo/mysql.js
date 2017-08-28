module.exports={
    method:'GET',
    path:'/demo/mysql',
    handler:function(request,reply){
        const users = this.getPlugin("light-api-mysql").query("select * from users");
        return reply(users);
    }

}