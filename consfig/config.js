const config=[]

config.port = 3000;
config.db={
    uri:'mongodb://127.0.0.1:27017/myapp'
},
config.env = 'dev',
config.apiVersion = '/api/v1',
config.allowedCorsOrigin='*';

module.exports={
    port:config.port,
    env:config.env,
    apiVersion:config.apiVersion,
    allowedCorsOrigin:config.allowedCorsOrigin,
    db:config.db

}
