const CrawlBase = require('./CrawlBase')

class Metamorphose extends CrawlBase {
}

Metamorphose.URL = 'https://www.metamorphose.gr.jp/product/pickup/1028'
Metamorphose.anchor = '#product_list .view-content .productlist_img a[href^="/product/"]'
Metamorphose.img = '.gallery-slide a'


module.exports = Metamorphose
