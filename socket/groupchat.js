
module.exports = function(io){
  let a = 0
  let activeGroup = ""
  io.on('connection',(socket)=>{
    ++a
    console.log(a,'connected');
    socket.on('group-message',function(message){
      console.log(message)
      socket.broadcast.emit('new-group-message',message)
    })
    socket.on('typing',function(user){
      socket.broadcast.emit('user-typing',user)
    })
    socket.on('disconnect',()=>{
      --a
      console.log(a,'connected')
    })
  })
}
