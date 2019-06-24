const container = require('dependable').container()
const path = require('path')

const modulesRequired = [
  ['_','lodash'],
  ['async','async'],
  ['passport','passport']
]

modulesRequired.map(module => {
  container.register(module[0],function(){
    return require(module[1])
  })
})

container.load(path.join(__dirname,'/controllers'))
container.load(path.join(__dirname,'/helpers'))


container.register('container',function(){
  return container
})

module.exports = container
