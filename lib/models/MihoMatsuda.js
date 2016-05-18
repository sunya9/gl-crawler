const CrawlBase = require('./CrawlBase')

class MihoMatsuda extends CrawlBase {
  getImg($) {
    const relative = $(this.constructor.img).attr('src')
    return this.resolveUrl(relative)
  }
}

MihoMatsuda.URL = 'http://mihomatsuda.com/'
MihoMatsuda.anchor = '.centerbox:nth-child(3) .item a'
MihoMatsuda.img = '.mainCont > p > img:first-of-type'
MihoMatsuda.charset = 'euc-jp'

module.exports = MihoMatsuda
