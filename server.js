const express = require('express')
const morgan  = require('morgan')
const http = require('http')
const container = require('./container')
const port = process.env.PORT || 5000
const config = require('config')
const cookieParser  = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
const passport = require('passport')
const socketIO = require('socket.io')

container.resolve(function(users,groups){

  const uri = `mongodb+srv://${config.get('username')}:${config.get('password')}@chatroom-lvym9.mongodb.net/test?retryWrites=true&w=majority`
  mongoose.Promise = global.Promise
  mongoose.connect(uri,{useNewUrlParser: true,useCreateIndex:true}).catch(err=>console.error(`mongoose throws ${err}`))

  const setupServer = () => {
    const app = express()
    app.use(morgan('dev'))
    const server = http.createServer(app)
    const io = socketIO(server)

    require('./socket/groupchat')(io)

    server.listen(port,()=>{
      console.log(`server is listening to ${port}`)
    })
    configServer(app)
    const router = express.Router()
    users.setRouting(router)
    groups.setRouting(router)
    app.use(router)
  }

  const configServer = (app) => {

    require('./passport/passport-local.js')

    app.use((req,res,next)=>{
      res.header('Allow-Control-Allow-Origin','*')
      res.header('Content-Type', 'application/json');
      next()
    })

    app.use(express.urlencoded({extended:true}))
    app.use(express.json())
    app.use(session({
        secret: config.get('secret-key'),
        cookie: { path: '/', httpOnly: true, secure: false, maxAge: (1000 * 60 * 60 * 24 * 7) },
        saveUninitialized: true,
        saveInitialized: true,
        resave:true,
        maxAge: (1000 * 60 * 60 * 24 * 7),
        store: new MongoStore({url:uri,collection:'sessions'})
    }));

    app.use(passport.initialize())
    app.use(passport.session())

  }

  const app = setupServer()
})
