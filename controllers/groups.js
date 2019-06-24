'use-strict'

const Groups = require('../models/groups')

module.exports = function(){
  return {
    setRouting: function(router){
      router.get('/groups',this.sendGroups)
      router.get('/groups/:name',this.groupPage)
    },
    sendGroups: function(req,res){
      if(req.isAuthenticated()){
        Groups.find({}, (err,groups) => {
          console.log(groups);
          return res.json(groups)
        })
      } else {
        res.redirect('/login')
      }
    },
    groupPage: function(req,res){
      if(req.isAuthenticated()){
        Groups.find({}, (err,groups) => {
          console.log(groups);
          return res.json(groups)
        })
      } else {
        res.redirect('/login')
      }
    }
  }
}
