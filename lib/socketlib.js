const express = require('express')
const app = express()
const event = require('events')
const token = require('./auth_token')
const socketio = require('socket.io')
const mongoose = require('mongoose')
let eventEmitter = new event.EventEmitter();
const shortid = require('shortid')
const responce = require('./../lib/responcelib')
const check = require('./checklib')
const redis = require('./redislib')

const chatModel = mongoose.model('chat')
const roomModel= mongoose.model('room')

let setEvent = (server)=>{

  //let UsersList =[]
  let Rooms = 'chat'

  let io=socketio.listen(server)

  let myIo = io.of('/chat')

  myIo.on('connection',(socket)=>{
      console.log('on connected --verify user')
      socket.emit('verifyUser',"")

      socket.on('setUser',(authToken)=>{
          console.log('setUser called')
            token.validateWithOutKey(authToken,(err,user)=>{
                if(err){
                    console.log(err)
                    socket.emit('authError',{status:500, error:'please verify auth error'})

                }else {
                    console.log("verfing user .. setting Deatils")
                    let currentUser= user.data
                    console.log("current",currentUser)
                    socket.userId= currentUser.userId
                    let userName =`${currentUser.username}`
                    let key = currentUser.userId
                    let value = userName
                    //console.log(`${userName} is online `)

                    let setUserOnline = redis.setNewOnlineUser("onlineusers",key,value,(err,result)=>{
                        if(err){
                            console.log(err)
                        }else{
                            redis.getAllHashes("onlineusers",(err,result)=>{
                                if(err){
                                    console.log(err)
                                }else{
                                    console.log(`${userName} is online`)
                                    socket.room= Rooms
                                    //chatModel.chatRoom= socket.room
                                    socket.join(socket.room)
                                    socket.to(socket.room).broadcast.emit('users_online',result)
                                }
                            })
                        }
                    })
                //socket.emit(currentUser.userId,"you are Online")
               // let userObj = {userID:currentUser.userId,username:userName}
                   // UsersList.push(userObj)
                    //console.log(userObj)
                   
                }
            })
      });
      socket.on('create-room',(data)=>{
          console.log('Croom',data)
          

          eventEmitter.emit('save-room',data)

      })
      
      socket.on('disconnect',()=>{
          console.log('disconnect')
          console.log(socket.userId);
          if (socket.Userid){
              redis.deleteHashName('onlineusers',socket.userId)
              redis.getAllHashes('onlineusers',(err,result)=>{
                  if(err){
                      console.log(err)
                  }else{
                    socket.leave(socket.room)
                    socket.to(socket.room).broadcast.emit('user_online',result)
                    
                  }
              })
          }
         // let removeIndex = UsersList.map(function(user){return user.userId}).indexOf(socket.userId)          
          //UsersList.splice(removeIndex,1)
          //console.log(UsersList)
         
          
      }) 

      socket.on('chatMessage',(data)=>{
           console.log('chatMessage called ')
           console.log(data.receiverId)
           console.log(data)
           data['chatId']= shortid.generate()
           data['chatRoom'] = socket.room
           eventEmitter.emit('saveChat',data)
           console.log(data.receiverId)
           myIo.emit(data.receiverId,data)
            })

            socket.on('typing',(userName)=>{
                socket.to(socket.room).broadcast.emit('typing',userName)
            })
  });


}
eventEmitter.on('saveChat',(data)=>{
let saveChat = new chatModel({
    chatId :data.chatId,
    message:data.message,
    receiverId:data.receiverId,
    receiverName:data.receiverName,
    senderId:data.senderId,
    senderName:data.senderName,
    seen:data.seen,
    createdOn:data.createdOn,
    modifiedOn:data.modifiedOn,
    chatRoom:data.chatRoom
})

saveChat.save((err,result)=>{
    if(err){
        console.log(err)
    }else if(check.isEmpty(result)){
        console.log('user not found')

    }else{
        console.log(result)
    }
})

})
eventEmitter.on('save-room',(data)=>{
    let saveRoom = new roomModel({
        roomId : data.roomId,
        roomName: data.roomName,
        roomCount: data.roomCount,
        roomUsers:[{userId:data.userId,userName:data.userName}],
        createdOn:data.createdOn
        
    })
    saveRoom.save((err,result)=>{
        if (err){
            console.log(err)
        }else if(check.isEmpty(result)){
            console.log('room not found')
        }else{
            console.log(result)
        }
    })
})

module.exports={
    setEvent:setEvent
}