const UrlModel = require('./lib/models/UrlModel')
const Tweet = require('./lib/Tweet')
const _ = require('underscore')
const Url = require('./lib/models/UrlModel')
const mongoose = require('mongoose')

class App {
  constructor() {
    this.tweet = new Tweet()
    this.check = this.check.bind(this)
    this.startup = false
  }

  check() {
    console.log('check')
    const allBrandsPromise = App.brands.map(getAllDetails)
    Promise.all(allBrandsPromise)
      .then(isInsertedMap)
      .then(isInsertedFilter)
      .then(insertUrlModels)
      .catch(console.error.bind(null, 'crawl error:')) // クローラエラーをすべてキャッチ
      .then(() => this.tweet.tweet(true))
      .then(timer => setTimeout(this.check, App.interval))
  }
}

App.interval = 60 * 60 * 1000 // 1hour

function getAllDetails(Brand) {
  const brand = new Brand()
  return brand.getUrls().then(getDetails(brand))
}

function getDetails(brand) {
  return urls => {
    const detailObjects = urls.map(url => brand.getDetail(url))
    return Promise.all(detailObjects)
  }
}

function isInsertedMap(detailObjects) {
  const mapDetailObjects = _.chain(detailObjects).flatten().map(addCountInfo).value()
  return Promise.all(mapDetailObjects)
}

function addCountInfo(detailObj) {
  return Url.count({url: detailObj.url}).then(count => Object.assign({}, detailObj, {
    count: count
  }))
}

function insertUrlModels(filteredDetailObjects) {
  filteredDetailObjects = filteredDetailObjects.map(detailObj => new Url(detailObj).save())
  return Promise.all(filteredDetailObjects)
}

function isInsertedFilter(detailObjects) {
  return detailObjects.filter(detailObj => detailObj.count === 0)
}

App.brands = [
  require('./lib/models/Btssb'),
  require('./lib/models/Ap'),
  require('./lib/models/Iw'),
  require('./lib/models/Metamorphose'),
  require('./lib/models/Boz'),
  require('./lib/models/LapinAgill'),
  require('./lib/models/Putumayo'),
  require('./lib/models/Pierrot'),
  require('./lib/models/MihoMatsuda'),
  require('./lib/models/Maxicimam'),
  require('./lib/models/Vm'),
  require('./lib/models/Ccc'),
  require('./lib/models/Marble'),
  require('./lib/models/Sheglit')
]

const app = new App()
app.check()

process.on('SIGINT', () => {
  mongoose.disconnect()
  process.exit()
})
