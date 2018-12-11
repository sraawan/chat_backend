const redis = require('redis')
const check = require('./checklib')

let client = redis.createClient({})


client.on('connected', ()=>{
console.log('redis is connected ')
})

let getAllHashes = (hashName,callback)=>{

    client.HGETALL(hashName,(err,result)=>{
    //console.log(`getting all username for hash ${hashName}`)
    if(err){
        console.log(err)
        callback(err,null)

    }else if(check.isEmpty(result)) {
        console.log('user list not avali');
        console.log(result)

       callback(null,{})

    }else{
        console.log(result)
        callback(null,result)
    }

})
}

let setNewOnlineUser= (hashName,key,value,callback)=>{
    client.HMSET(hashName,[key,value],(err,result)=>{
        if(err){
            console.log(err)
            callback(err,null)
        }else{
            console.log('USER HAS SET IN THE HASH MAP')
            console.log(result)
            callback(null,result)
        }
    })
}

    let deleteHashName = (hashName,key)=>{
        client.HDEL(hashName,key)
        return true
    }
    module.exports= {
        setNewOnlineUser:setNewOnlineUser,
        deleteHashName:deleteHashName,
        getAllHashes:getAllHashes

    }


