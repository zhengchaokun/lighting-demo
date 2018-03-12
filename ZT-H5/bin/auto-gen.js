let paths = require("./base").paths;

let js = ``
for(let key in paths){
    for(let methods in paths[key]){
        js+=`
        /**
        * ${paths[key][methods].description}
        */
        ${paths[key][methods].operationId}(params){
            return execute('${methods}','${key}',params);
        },
        `
    }
}

console.log(js)