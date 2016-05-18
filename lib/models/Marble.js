const CrawlBase = require('./CrawlBase')

class Marble extends CrawlBase {
  getImg($) {
    const relative = $(this.constructor.img).attr('src')
    return this.resolveUrl(relative)
  }
  getTitle($) {
    return $('#Layer1 b').first().text().replace(/\s+/g, ' ')
  }
}

Marble.URL = 'http://marble.girly.jp/sinsaku.html'
Marble.anchor = 'table a'
Marble.img = 'table a img'
Marble.charset = 'Shift_JIS'

module.exports = Marble
