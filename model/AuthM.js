const mongoose = require('mongoose')
const Schema = mongoose.Schema
const time = require('../lib/timelib')

let authSchema = new Schema({

    userId : String,
    authToken: String,
    tokenScreat : String,
    tokenGenerationTime : {
        type:Date,
        default:time.now()
    }

})
mongoose.model('Auth',authSchema)

