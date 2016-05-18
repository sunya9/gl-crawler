const CrawlBase = require('./CrawlBase')

class Maxicimam extends CrawlBase {
  getImg($) {
    const relative = $(this.constructor.img).attr('src')
    return this.resolveUrl(relative)
  }
}

Maxicimam.URL = 'http://www.maxicimam.com/'
Maxicimam.anchor = '.item_thumbnail a'
Maxicimam.img = '.big img'
Maxicimam.charset = 'euc-jp'

module.exports = Maxicimam
