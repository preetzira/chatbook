
const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const usersSchema = mongoose.Schema({
  username:{type:String,unique:true},
  fullname:{type:String,default:''},
  email:{type:String,unique:true},
  password:{type:String},
  userImage:{type:String, default:'user.png'}
})

usersSchema.methods.encryptPassword = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

usersSchema.methods.decryptPassword = function(password){
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('Users',usersSchema)
