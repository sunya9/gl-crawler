const cheerio = require('cheerio')
const request = require('request-promise')
const _ = require('underscore')
const url = require('url')
const Iconv  = require('iconv').Iconv
const path = require('path')

const option = context => {
  return {
    transform(body) {
      if(context.constructor.charset) {
        utf8 = new Iconv(context.constructor.charset, 'UTF-8//TRANSLIT//IGNORE')
        body = new Buffer(body, 'binary');
        body = utf8.convert(body).toString()
      }
      return cheerio.load(body)
    },
    encoding: context.constructor.charset ? 'binary' : 'utf8',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.87 Safari/537.36 OPR/37.0.2178.32'
    }
  }
}

class CrawlBase {
  constructor() {
    this.resolveUrl = this.resolveUrl.bind(this)
    this.getDetail = this.getDetail.bind(this)
    this.getTitle = this.getTitle.bind(this)
    this.getImg = this.getImg.bind(this)
  }
  getUrls() {
    this._currentUrl = this.constructor.URL
    return request(Object.assign({}, option(this), {url: this.constructor.URL})).then($ => {
      const urls = $(this.constructor.anchor).map(i => {
        let relative = $(this.constructor.anchor).eq(i).attr('href')
        return this.resolveUrl(relative)
      }).get()
      return _.uniq(urls)
    }).catch(error => {
      console.error(error)
    })
  }
  resolveUrl(relative) {
    const parsedUrl = url.parse(this._currentUrl)
    const dir = path.parse(parsedUrl.pathname).dir
    const host = `${parsedUrl.protocol}//${parsedUrl.hostname}${dir}/`
    return url.resolve(host, relative)
  }
  getTitle($) {
    return $('title').text()
  }
  getImg($) {
    const relative = $(this.constructor.img).attr('href')
    return this.resolveUrl(relative)
  }

  getDetail(detailUrl) {
    this._currentUrl = detailUrl;
    return request(Object.assign({}, option(this), {url: detailUrl})).then($ => {
      return {
        title: this.getTitle($),
        url: detailUrl,
        img: this.getImg($)
      }
    }).catch(error => {
      console.error(error)
    })
  }
}

module.exports = CrawlBase
