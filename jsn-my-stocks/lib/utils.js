function parse2query(data) {
    let string = "";
    Object.keys(data).forEach(function (key) {
        string+=`${key}=${data[key]}&`
    });
    string=string.substring(0,string.length-1);
    return string;
}

module.exports = {
    parse2query
}