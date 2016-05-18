const CrawlBase = require('./CrawlBase')

class Boz extends CrawlBase {
}

Boz.URL = 'http://www.boz.ne.jp/product/new/boz/list.html'
Boz.anchor = '#product_list a'
Boz.img = '#photo0 a'

module.exports = Boz
