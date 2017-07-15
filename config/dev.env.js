var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  FIREBASE_API_KEY: '"AIzaSyCOkTdDBEC_6m1QpsXQAGKe6KwI1VEGDJI"'
})

