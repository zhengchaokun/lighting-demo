module.exports = {
    getConfig:function(env){
        
        let svr = require(`./${env}/server.json`);
        let fileWhiteList = require(`./${env}/fileWhiteList.json`);

        return{
            "server":svr,
            "customConfig":{
                fileWhiteList:fileWhiteList
            },
            "plugins":{
            }

        }
    }
}