let isEmpty = (value)=>{
    if(value === undefined || value === null|| value === ''|| value.length === 0){
        return true 
    }else {
        return false
    }
}
module.exports= {
    isEmpty:isEmpty
}