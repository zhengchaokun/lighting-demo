import Light from "light"

module.exports = {
    getData(){
        return new Promise(function (resolve, reject) {
            return Light.fetch({
                url:'mock/data.json',
            },function(data){
                resolve(data)
            })
        })
    }
}