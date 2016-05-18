const Twitter = require('twitter')
const Url = require('./models/UrlModel')

class Tweet {
  constructor() {
    this.client = new Twitter(require('../config/key'))
    this.timer = null
    this.tweet = this.tweet.bind(this)
    this.tweetPromise = this.tweetPromise.bind(this)
    this.save = this.save.bind(this)
    this.createTweet = this.createTweet.bind(this)
    this.createTimer = this.createTimer.bind(this)
    this.shouldTweet = this.shouldTweet.bind(this)
  }

  tweet(fromCrawl) {
    // クロール後のツイートの場合はタイマーが動いている場合にはタイマーに任せる
    if(fromCrawl && this.timer) return
    return Url.findOne({tweeted: false})
      .then(this.createTweet)
      .then(this.save)
      .catch(console.error)
      .then(this.shouldTweet)
      .then(this.createTimer)
  }

  createTweet(detail) {
    console.log('createTweet', detail)
    if(!detail) {
      // ツイートしきった場合はtimerをクリア
      this.timer = null
      return
    }
    return this.tweetPromise(detail)
  }

  shouldTweet() {
    return Url.count({tweeted: false}).then(count => count > 0)
  }

  createTimer(more) {
    if(more) {
      console.log(Tweet.interval, '秒後にツイートします')
      this.timer = setTimeout(this.tweet, Tweet.interval, false)
      return this.timer
    }
  }

  save(detail) {
    console.log('saved:', detail)
    if(!detail) return
    detail.tweeted = true
    return detail.save()
  }

  tweetPromise(detail) {
    const option = {
      status: `${detail.title.substring(0, Tweet.maxTitleLength)} ${detail.url} ${detail.img}`
    }
    return new Promise((resolve, reject) => {
      this.client.post('statuses/update', option, err => {
        if(err) reject(err)
        // ツイート成功時にはdetailデータを返す
        console.log('tweeted.')
        resolve(detail)
      })
    })
  }
}

Tweet.interval = 60 * 5 * 1000 // 5min
Tweet.maxTitleLength = 140 - (23 * 2 + 2)

module.exports = Tweet
