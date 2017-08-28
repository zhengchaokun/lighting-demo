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
                /**
                 * create database `light-api` charset utf8;
                 * CREATE TABLE `light-api`.`users` (
                 * `id` INT NOT NULL AUTO_INCREMENT,
                 * `user_name` VARCHAR(45) NULL,
                 * `age` INT NULL,
                 *  PRIMARY KEY (`id`));
                 *  INSERT INTO `light-api`.`users` (`id`, `user_name`, `age`) VALUES ('1', 'test', '11');
                 *  INSERT INTO `light-api`.`users` (`id`, `user_name`, `age`) VALUES ('2', 'test2', '12');
                 */
                "light-api-mysql":{
                    "connectionLimit" : 10,
                    "host": "172.17.0.2",
                    "user": "root",
                    "password" :"root",
                    "database" :"light-api"
                },
                "./service/chatroom.js":{}
            }
        }
    }
}