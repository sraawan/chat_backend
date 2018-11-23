const mongoose = require('mongoose'),
Schema = mongoose.Schema

let chatSchema= new Schema({
    chatId:{type:String, unique:true,require:true},
    senderName:{type:String,default:''},
    senderId:{type:String,default:''},
    receiverId:{type:String,default:''},
    receiverName:{type:String,default:''},
    createdOn:{type:Date,default:Date.now},
    seen:{type:Boolean,default:false},
    message:{type:String,default:''},
    chatRoom:{type:String,default:''},
    modifiedOn:{type:Date,default:''}
})
mongoose.model('chat',chatSchema)
