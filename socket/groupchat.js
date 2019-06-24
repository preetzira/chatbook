
module.exports = function(io){
  let a = 0
  io.on('connection',(socket)=>{
    a++;
    console.log(a,'connected');
    io.on('subscribeToTimer',(interval)=>{
      console.log('client is subscribing to timer with interval ', interval);
      setInterval(() => {
        io.emit('timer', new Date());
      }, interval);
    })
    io.on('disconnect',()=>{
      a--;
      console.log(a,'disconnected')
    })
  })
}
