const socket  = io('http://localhost:3000/chat')

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IlJDUlE5UnRWZSIsImlhdCI6MTU0MjYyMjI1NTI3OCwiZXhwIjoxNTQyNzk1MDU1LCJzdWIiOiJhZG1pblRva2VuIiwiaXNzIjoic3JhdmFuIiwiZGF0YSI6eyJ1c2VySWQiOiJjTkdFZkhKYzUiLCJ1c2VybmFtZSI6Imt1bWFycyIsImVtYWlsIjoiYS52LnNhaS5zcmF2YW5AZ21haWwuY29tIiwicGhvbmUiOjk3MDA3MDk3MDV9fQ.cv4H1ZHsnOpCIyr2F6WLoD0uzprJ9S2YL8kQq-nJ0_g"
const userId = "cNGEfHJc5"

let chatMessage = {
    createdOn:Date.now(),
    receiverId:"_KEHWY4NX",
    receiverName:"sraawan",
    senderId : userId,
    senderName:"kumars"

}

let chatToken = ()=>{
    socket.on('verifyUser',(data)=>{
          console.log('user2 verifyed')
          
          socket.emit('setUser',authToken)
    });

    socket.on(userId, (data)=>{
        console.log('you have received meg'+ data.senderName)
        console.log(data.message)
        $("p").text(data.message)

    })
    socket.on('users_online',(data)=>{
        console.log('user is online or went offline')
        console.log(data)

    })
    socket.on('typing',(data)=>{
        console.log(data+" is typing")
    })

    $("#send").on('click',function(){
        let messageText = $("#chatmeg").val()
        chatMessage.message = messageText
       
        socket.emit("chatMessage",chatMessage)
        

        })
     
        $("#chatmeg").on('keypress',()=>{
            socket.emit('typing','sraawan')
        })
}
chatToken()