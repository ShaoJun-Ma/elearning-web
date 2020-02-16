module.exports = {
    devServer:{
        port:"8080",
        proxy:{
            '/api':{
                target:"http://localhost:8888",
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};