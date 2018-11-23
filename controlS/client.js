const socket = io('http://localhost:3000/chat')

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IjY0YkwybHA4ZyIsImlhdCI6MTU0MjYxOTY3NjIyNiwiZXhwIjoxNTQyNzkyNDc2LCJzdWIiOiJhZG1pblRva2VuIiwiaXNzIjoic3JhdmFuIiwiZGF0YSI6eyJ1c2VySWQiOiJfS0VIV1k0TlgiLCJ1c2VybmFtZSI6InNyYWF3YW4iLCJlbWFpbCI6InNyYWF3YW4xMjBAZ21haWwuY29tIiwicGhvbmUiOjk3MDA3MDk3MDV9fQ.UaXzAseiLFGHbN_bOO4rcxrEV-TjELNMLE4zNMRawhA"
const userId = "_KEHWY4NX"

let chatMessage ={
    createdOn:Date.now(),
    receiverId:"cNGEfHJc5",
    receiverName:"kumar",
    senderId : userId,
    senderName:"sraawan"

}
let room = {
    roomId :[]
}
let chatToken = ()=>{
    socket.on('verifyUser',(data)=>{
        console.log("verifying user")
        //console.log("verify user Data")

        socket.emit("setUser",authToken)
    });

    socket.on(userId, (data)=>{
        console.log('you have recevied a message'+data.senderName)
        console.log(data.message)
         $("p").text(data.message)

    })

    socket.on('users_online',(data)=>{
          console.log('user is online or went offline')
          console.log(data)
    })
    

    $("#send").on('click',function(){
        let messageText = $("#chatmeg").val();
        chatMessage.message = messageText;
        
        socket.emit("chatMessage",chatMessage)
        

    });
    $("#createId").on('click',function(){
     let mess = $("#roomId").val();
     console.log('test',mess)     
     socket.emit('create-room',mess)
     
    })

    
    
        
    
    $("#chatmeg").on('keypress',()=>{
        socket.emit('typing','kumar')
    })
    socket.on('typing',(data)=>{
        console.log(data+" is typing")
    })
   
}//end of socket function
chatToken();