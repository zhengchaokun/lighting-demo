import Light from "light";

module.exports = {
    LOCAL_USER_STORE:"LOCAL_USER_STORE",
    login(params){
        return execute('post','/common/login',params);
    },
    logout(){
        const that = this;
        return this.localGet(this.LOCAL_USER_STORE).then(function (info) {
            return execute('post','/common/logout',{
                token:info.TOKEN
            }).then(function () {
                return that.localSet(that.LOCAL_USER_STORE,null)
            });
        })
    },
    localSet(key,value){
        if(value===null) localStorage.removeItem(key);
        else localStorage.setItem(key,encodeURIComponent(JSON.stringify(value)));
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
                if(data.token) {
                    data.data.TOKEN = data.token;
                }
                if(data.code === 0){
                    resolve(data.data||{});
                }

            }
        });
    })
}