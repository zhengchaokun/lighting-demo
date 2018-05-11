import Light from "light";
module.exports = {
    getData(){
        Light.trigger("error",Math.ceil(Math.random()*4))
    }
}