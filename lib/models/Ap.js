const CrawlBase = require('./CrawlBase')

class Ap extends CrawlBase {
}

Ap.URL = 'http://angelicpretty-onlineshop.com/products/list.php?category_id=19'
Ap.anchor = '#list_wrap a'
Ap.img = 'a.expansion'

module.exports = Ap
