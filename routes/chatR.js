const express = require('express')
const app = express()
const chatC = require('./../control/chatCtrol')
const config = require('./../consfig/config')



let setRouter = (app)=>{
    let baseUrl = (`${config.apiVersion}/chat`)
    app.get(`${baseUrl}/user`,chatC.getUsersChat)

    app.get(`${baseUrl}/groupChat`,chatC.getgroupChat)

    app.get(`${baseUrl}/unseenChat`,chatC.getUnseenChats)

    app.get (`${baseUrl}/count/unseenchat`,chatC.countUnseenChat)

    app.get(`${baseUrl}/seen/chats`,chatC.markAsSeen)

  
}
module.exports={
    setRouter:setRouter
}