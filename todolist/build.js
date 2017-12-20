module.exports = {
    build(config,merge,webpack){
        let localconfig = {
            plugins:[
                new webpack.BannerPlugin({
                    banner: '// hello,world\n',
                    raw: true
                })
            ]
        };

        if(process.env.NODE_ENV!=="dev"){
            config.output.publicPath = "http://192.168.12.1:3000/"
        }

        return merge(config,localconfig)
    }
}