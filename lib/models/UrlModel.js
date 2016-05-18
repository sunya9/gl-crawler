const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/gl-crawler')

const schema = new Schema({
  title:  String,
  url: String,
  img: String,
  tweeted: {
    type: Boolean,
    default: false
  }
})

const Url = mongoose.model('Url', schema)

module.exports = Url
