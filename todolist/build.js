module.exports = {
    build(config,merge,webpack){
        return merge(config,{
            plugins:[
                new webpack.BannerPlugin({
                    banner: '// hello,world\n',
                    raw: true
                })
            ]
        })
    }
}