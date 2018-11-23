const logger = require('./../lib/loggerlib')
const response = require('./../lib/responcelib')
const mongoose = require('mongoose')
const check = require('./../lib/checklib')
const chatM = require('./../model/chatM')
const userM = require('./../model/userM')

const chatModel = mongoose.model('chat')
const UserModel = mongoose.model('user')




let getUsersChat = (req, res) => {
    // function to validate params.
    let validateParams = () => {
      return new Promise((resolve, reject) => {
        if (check.isEmpty(req.query.senderId) || check.isEmpty(req.query.receiverId)) {
          logger.info('parameters missing', 'getUsersChat handler', 9)
          let apiResponse = response.generate(true, 'parameters missing.', 403, null)
          reject(apiResponse)
        } else {
          resolve()
        }
      })
    } // end of the validateParams function.
  
    // function to get chats.
    let findChats = () => {
      return new Promise((resolve, reject) => {
        // creating find query.
        let findQuery = {
          $or: [
            {
              $and: [
                {senderId: req.query.senderId},
                {receiverId: req.query.receiverId}
              ]
            },
            {
              $and: [
                {receiverId: req.query.senderId},
                {senderId: req.query.receiverId}
              ]
            }
          ]
        }
      
        chatModel.find(findQuery)
          .select('-_id -__v -chatRoom')
          .sort('-createdOn')
          .skip(parseInt(req.query.skip) || 0)
          .lean()
          .limit(10)
          .exec((err, result) => {
            if (err) {
              console.log(err)
              logger.error(err.message, 'Chat Controller: getUsersChat', 10)
              let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
              reject(apiResponse)
            } else if (check.isEmpty(result)) {
              logger.info('No Chat Found', 'Chat Controller: getUsersChat')
              let apiResponse = response.generate(true, 'No Chat Found', 404, null)
              reject(apiResponse)
            } else {
              console.log('chat found and listed.')
  
              // reversing array.
              let reverseResult = result.reverse()
  
              resolve(result)
            }
          })
      })
    } // end of the findChats function.
  
    // making promise call.
    validateParams()
      .then(findChats)
      .then((result) => {
       let apiResponse = response.generate(false, 'All Chats Listed', 200, result)
        res.send(apiResponse)
      })
      .catch((error) => {
        res.send(error)
      })
  } // end of the getUsersChat func

  let getgroupChat = (req,res)=>{
      let validateParams = ()=>{
      return new Promise((resolve,reject)=>{
          if(check.isEmpty(req.query.chatId)){         
          logger.info('parametermissing', 'Chat Controller: getgroupChat', 9)
          if(check.isEmpty(req.query.chatId)){
              let apiResponse= response.generate(true,'parameter missing',403,null)
              reject(apiResponse)
          }else{
              resolve()
          }
              }
  })
}
  let findChats = ()=>{
      return new Promise((resolve,reject)=>{
            let findQuery ={
                 chatId:req.query.chatId
            }
            chatModel.find(findQuery)
            
            .exec((err,result)=>{
                if(err){
                    console.log(err)
                    logger.error(err.message, 'Chat Controller: getUsersChat', 10)
                    let apiResponse= response.generate(true,"chatroom error",404,null)
                    reject(apiResponse)
                }else if(check.isEmpty(result)){
                   let apiResponse = responce.generate(null,"no chat room found",404,null)
                   reject(apiResponse)
                }else{
                    resolve(result)
                }
            })
      })
  }
  validateParams()
  .then(findChats)
  .then((result)=>{
    console.log(result)
    let apiResponse = response.generate(false,'found Data',200,result)
    res.send(apiResponse)
  })
  .catch((error)=>{
  res.send(error)
  })

}

let getUnseenChats= (req,res)=>{

  let validateParam = ()=>{
    return new Promise((resolve,reject)=>{
      if(check.isEmpty(req.query.userId)){
        
        logger.info('parameter missing', 'Chat Controller: validPa', 9)
        let apiResponse = response.generate(true,'filed to find parameters',403,null)
        reject(apiResponse) 
      }else{
        resolve()
      }
    })
    
  }
  let UnSeenChat = ()=>{
    return new Promise ((resolve,reject)=>{
  let findQuery = {}
  findQuery['receiverId'] = req.query.userId
  findQuery['seen'] = false

  if (check.isEmpty(req.query.senderId) === false) {
    findQuery['senderId'] = req.query.senderId
  }
  chatModel.find(findQuery)
  .select('-_id -__v')  
  .sort('-createdOn')
  .lean()
  .limit(10)
  .exec((err,result)=>{
    if(err){
      console.log(err)
      logger.error(err.message,'chatControl: unSeenchat',10)
      let apiResponse = response.generate(true,'no DataFound',400,null)
      reject(apiResponse)
    } else if(check.isEmpty(result)) {
    }else{
      console.log('unseen chat found')
      let reverseResult = result.reverse()
      resolve(result)
    }
  })
    })
}
validateParam()
.then(UnSeenChat)
.then((result)=>{
let apiResponse = response.generate(false,'data found and liseted',200,result)
res.send(apiResponse)
})
.catch((error)=>{
  res.send(error)

})
}
let countUnseenChat= (req,res)=>{

  let validateParam = ()=>{
    return new Promise((resolve,reject)=>{
      if(check.isEmpty(req.query.userId)){
        
        logger.info('parameter missing', 'Chat Controller: validPa', 9)
        let apiResponse = response.generate(true,'filed to find parameters',403,null)
        reject(apiResponse) 
      }else{
        resolve()
      }
    })
    
  }
  let countChat = ()=>{
    return new Promise ((resolve,reject)=>{
  let findQuery = {}
  findQuery['receiverId'] = req.query.userId
  findQuery['seen'] = false

  if (check.isEmpty(req.query.senderId) === false) {
    findQuery['senderId'] = req.query.senderId
  }
  chatModel.count(findQuery)
  .select('-_id -__v')  
  .lean()
  .exec((err,result)=>{
    if(err){
      console.log(err)
      logger.error(err.message,'chatControl: unSeenchat',10)
      let apiResponse = response.generate(true,'no DataFound',400,null)
      reject(apiResponse)
    } else if(check.isEmpty(result)) {
    }else{
      console.log('unseen chat found')
      //let reverseResult = result.reverse()
      resolve(result)
    }
  })
    })
}
validateParam()
.then(countChat)
.then((result)=>{
let apiResponse = response.generate(false,'data found and liseted',200,result)
res.send(apiResponse)
})
.catch((error)=>{
  res.send(error)

})
}
let markAsSeen = (req,res)=>{
  let validateParam = ()=>{
    return new Promise((resolve,reject)=>{
    if(check.isEmpty(req.query.chatId)){
      logger.info('param missing','markAsSeen handler',9)
      let apiResponse = response.generate(true,'missing the params',403,null)
      reject(apiResponse)
    }else{
      resolve()
    }
  
  })
}

  let modifyChat = ()=>{
    return new Promise ((resolve,reject)=>{
        let findQuery={
          chatId:req.query.chatId
        }
       let updateQuery = {
         seen:true
       } 
      chatModel.update(findQuery,updateQuery,{multi:true})
      .exec((err, result) => {
        if (err) {
          console.log(err)
          logger.error(err.message, 'Chat Controller: markChatAsSeen', 10)
          let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
          reject(apiResponse)
        } else if (result=== 0) {
          logger.info('No Chat Found', 'Chat Controller: markChatAsSeen')
          let apiResponse = response.generate(true, 'No Chat Found', 404, null)
          reject(apiResponse)
        } else {
          console.log('chat found and updated.')

          resolve(result)
        }
      })
    })
  }
  validateParam()
  .then(modifyChat)
  .then((result)=>{
    let apiResponse = response.generate(false,"Data Found and Listed",200,result)
    res.send(apiResponse)
  })
  .catch((error)=>{
    res.send(error)
  })
}// end of the modifyChat function.



module.exports= {
  getUsersChat: getUsersChat,
  getgroupChat:getgroupChat,
  getUnseenChats:getUnseenChats,
  countUnseenChat:countUnseenChat,
  markAsSeen:markAsSeen
}