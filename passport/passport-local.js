'use strict'

const passport = require('passport')
const Users = require('../models/users')
const LocalStrategy = require('passport-local').Strategy

passport.serializeUser((user,done)=>{
  done(null,user.id)
})

passport.deserializeUser((id,done)=>{
  console.log(id,'dsadasds');
  Users.findById(id, (err,user)=>{
    done(err,user)
  })
})

passport.use('local-signup',new LocalStrategy({
  usernameField:'userName',
  passwordField:'password',
  passReqToCallback:true
}, (req,userName,password,done) =>{
  Users.findOne({'username':userName}, (err,user)=>{
    if(err){
      return done(err)
    }

    if(user){
      return done(null,false, { 'error' : { 'message' : 'A user already exists with this username/email' } })
    }

    const newUser = new Users()
    newUser.username = req.body.userName
    newUser.fullname = req.body.fullName
    newUser.email = req.body.userEmail
    newUser.password = newUser.encryptPassword(req.body.password)

    newUser.save(err=>{
      done(null,newUser)
    })

  })
}))


passport.use('local-signin', new LocalStrategy({
  usernameField:'userName',
  passwordField:'password',
  passReqToCallback:true
}, (req,userName,password,done) =>{
  Users.findOne({'username':userName}, (err,user)=>{
    if(err){
      return done(err)
    }

    if(!user){
      return done(null,false, { 'error' : { 'message' : 'No user account exists with this username' } })
    }

    if(user && !user.decryptPassword(password)){
      return done(null,false, { 'error' : { 'message' : 'Password used is incorrect' } })
    }

    if(user && user.decryptPassword(password)){
      return done(err,user)
    }

  })
}))
