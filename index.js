const express = require('express');
const app = express();
const config= require('./consfig/config');
const mongoose = require('mongoose');
const fs = require('fs');
const bodyParser = require('body-parser')
const path = require('path')
const http = require('http')
const logger = require('./lib/loggerlib')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//socket link
app.use(express.static(path.join(__dirname,'controlS')))


let routePath ='./routes'
fs.readdirSync(routePath).forEach((file)=>{
if(~file.indexOf('.js')){
console.log(routePath+'/'+file);
let route = require(routePath+'/'+file);
route.setRouter(app);
}
})

let modelPath = './model'
fs.readdirSync(modelPath).forEach((file)=>{
if (~file.indexOf('.js'))
    console.log(modelPath+'/'+file)
    require(modelPath+'/'+file)

})
/**
 * Create HTTP server.
 */

const server = http.createServer(app);
// start listening to http server
console.log(config);
server.listen(config.port);
server.on('error', onError);
server.on('listening', onListening);

// end server listening code


// socket io connection handler 
const socketLib = require("./lib/socketlib");
const socketServer = socketLib.setEvent(server);


// end socketio connection handler



/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    logger.error(error.code + ' not equal listen', 'serverOnErrorHandler', 10)
    throw error;
  }


  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(error.code + ':elavated privileges required', 'serverOnErrorHandler', 10);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(error.code + ':port is already in use.', 'serverOnErrorHandler', 10);
      process.exit(1);
      break;
    default:
      logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10);
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  ('Listening on ' + bind);
  logger.info('server listening on port' + addr.port, 'serverOnListeningHandler', 10);
  let db = mongoose.connect(config.db.uri,{ useuseNewUrlParser: true });
}




mongoose.connection.on('err',(err)=>{
    console.log('there is a error in the connection')
    console.log(err)
})

mongoose.connection.on('open',(err)=>{
    if(err)
{
    console.log(err)
}else{
 console.log('datatabase connected')
}})

