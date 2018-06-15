module.exports = {
    build(config, merge, webpack) {
        let localconfig = {
            
            plugins: [
                new webpack.DefinePlugin({
                    APP_CONFIG: JSON.stringify(process.env.NODE_ENV),
                }),
            ]
        };


        return merge(config, localconfig)
    }
}