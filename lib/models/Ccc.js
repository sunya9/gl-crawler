const CrawlBase = require('./CrawlBase')

class Ccc extends CrawlBase {
  getImg($) {
    const relative = $(this.constructor.img).attr('src')
    return this.resolveUrl(relative)
  }
}

Ccc.URL = 'http://chocochip-cookie.ocnk.net/phone/new'
Ccc.anchor = 'h3 a'
Ccc.img = '#main_image'

module.exports = Ccc
