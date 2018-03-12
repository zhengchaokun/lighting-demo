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
        `;

        try {
            let data = paths[key][methods].responses['200'].schema.allOf[1].properties.data;
            if(data.$ref){
                data = require("./base").definitions[data.$ref.replace('#/definitions/','')]
                let map = data.properties
                let write = {}
                Object.keys(map).forEach(function (ink) {
                    write[ink]=""
                });
                require("fs").writeFileSync(`../mock${key}.json`,`
                        {
                          "code": 0,
                          "message": "string",
                          "data": ${JSON.stringify(write)}
                        }`
                );
            }
        }catch(e){
            console.log(e)
        }
    }
}

