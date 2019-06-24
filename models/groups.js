
const mongoose = require('mongoose')

const newGroup = mongoose.Schema({
  fullname:{type:String,unique:true},
  category:{type:String},
  members:[{
    username:{type:String,default:''},
    email:{type:String,default:''}
  }]
})

module.exports = mongoose.model('Groups',newGroup)
