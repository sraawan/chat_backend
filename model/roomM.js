const mongoose = require('mongoose')
const Schema = mongoose.Schema

let roomSchema = new Schema({
    roomId:({type:String,default:''}),
    roomName:({type:String,default:''}),
    roomCount:({type:Number,min:1,max:10 }),
    roomUsers:({
        userId:({type:String,default:''}),
        userName:({type:String,default:''})
    }),
    createdOn:({type:Date,default:Date.now()})
})
mongoose.model('room',roomSchema)