import Light from "light";

module.exports = {
    LOCAL_USER_STORE:"LOCAL_USER_STORE",
    login(params){
        return execute('post','/common/login',params);
    },
    localSet(key,value){
        localStorage.setItem(key,encodeURIComponent(JSON.stringify(value)));
        return Promise.resolve();
    },
    localGet(key){
        return Promise.resolve(JSON.parse(decodeURIComponent(localStorage.getItem(key))));
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