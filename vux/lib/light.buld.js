module.exports = function (light,config) {
    const vuxLoader = light.require('vux-loader');
    config = vuxLoader.merge(config, {
        options: {
            projectRoot:`${__dirname}/lib`
        },
        plugins:  [
            {
                name: 'vux-ui'
            }
        ]
    })
    return config
}