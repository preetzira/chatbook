'use-strict'

const AYLIENTextAPI = require('aylien_textapi')
const config = require('config')
const textapi = new AYLIENTextAPI(config.get('aylient-credentials'))

module.exports = function(){
  return {
    setRouting: function(router){
      router.get('/get-emotion/:text',this.getEmotion)
    },
    getEmotion: (req,res) => {
      textapi.sentiment({
        text:req.params.text,
      }, function(error, response) {
        if (error === null) {
          return res.json(response)
        } else throw new Error(error)
      })
    }
  }
}
