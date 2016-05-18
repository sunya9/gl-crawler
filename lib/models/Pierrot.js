const CrawlBase = require('./CrawlBase')

class Pierrot extends CrawlBase {
}

Pierrot.URL = 'http://atelier-pierrot.shop-pro.jp/?mode=cate&cbid=1834803&csid=0&sort=n'
Pierrot.anchor = '.item_photo a'
Pierrot.img = 'a.cloud-zoom-gallery:first-child'
Pierrot.charset = 'euc-jp'

module.exports = Pierrot
