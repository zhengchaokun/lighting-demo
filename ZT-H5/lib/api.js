import Light from "light";

module.exports = {
    login(params){
        return execute('post','/common/login',params);
    }
};

function execute(type,path,data) {
    return new Promise(function (resolve, reject) {
        Light.ajax({
            url:`mock${path}.json`,
            type:"get",
            // type,
            data,
            dataType:"json",
            success(data){
                resolve(data);
            }
        });
    })
}