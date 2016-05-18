const CrawlBase = require('./CrawlBase')

class Btssb extends CrawlBase {
}

Btssb.URL = 'http://www.babyssb.co.jp/online-store/'
Btssb.anchor = '#index_newitem a'
Btssb.img = 'a.thumb:first-child'

module.exports = Btssb
