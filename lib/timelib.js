const moment = require('moment')
const momenttz = require('moment-timezone')
const timeZone = 'Asia/Calcutta'

let now = ()=>{
    return moment.utc().format()
}

let globeTime = ()=>{
    return moment.tz(timeZone).format()
}

let convertTimeTolocal=(time)=>{
    return momenttz.tz(time,timeZone).format('LLLL')
}

module.exports = {
    now : now,
    globeTime : globeTime,
    convertTimeTolocal :convertTimeTolocal
}