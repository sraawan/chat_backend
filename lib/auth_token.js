const jwt = require('jsonwebtoken')
const shortid = require('shortid')
const secretToken = 'againagainagaintoken'


let generateToken=(data,cb)=>{
    try{
        let claims= {
            jwtid : shortid.generate(),
            iat:Date.now(),
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 48),
            sub:'adminToken',
            iss:'sravan',
            data:data
        }
        let tokenDetails={
            token:jwt.sign(claims,secretToken),
            tokenSecret:secretToken
        }
        
        cb(null,tokenDetails)
    }catch(err){
        console.log(err)
        cb(err,null)

    }
}
    let validateClaime =(token,secretToken,cb)=>{
        jwt.verify(token,secretToken,(err,decode)=>{
            if(err){
                console.log('there is a error in validateClime')
                console.log(err)
                cb(err,null)
            }else{
                console.log('decode result')
                console.log(decode)
                cb(null,decode)
            }
        })
    }

    let validateWithOutKey=(token,cb)=>{
            jwt.verify(token,secretToken,(err,decode)=>{
                if(err){
                    console.log('validateWithOutKey error')
                    console.log(err)
                    cb(err,null)
                }else{
                    console.log('validateWithOutKey decode')
                    //console.log(decode)
                    cb(null,decode)
                }
            })
    }
    module.exports={
        generateToken:generateToken,
        validateClaime:validateClaime,
        validateWithOutKey:validateWithOutKey

    }
