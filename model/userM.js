const mongoose = require('mongoose'),
 Schema = mongoose.Schema;

let userSchema = new Schema({
    userId:{
       type:String,
       default:''
    },    
    username:{
           type : String,
            },
    email:String,
    password:String,
    phone:Number
})

mongoose.model('user',userSchema);