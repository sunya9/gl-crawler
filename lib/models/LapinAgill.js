const CrawlBase = require('./CrawlBase')

class LapinAgill extends CrawlBase {
}

LapinAgill.URL = 'http://www.boz.ne.jp/product/new/lapin%20agill/list.html'
LapinAgill.anchor = '#product_list a'
LapinAgill.img = '#photo0 a'

module.exports = LapinAgill
