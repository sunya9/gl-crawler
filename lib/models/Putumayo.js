const CrawlBase = require('./CrawlBase')

class Putumayo extends CrawlBase {
  getImg($) {
    const relative = $(this.constructor.img).attr('src')
    return this.resolveUrl(relative)
  }
}

Putumayo.URL = 'http://putumayo.co.jp/'
Putumayo.anchor = '.newItem a'
Putumayo.img = '.description p img:first-child'


module.exports = Putumayo
