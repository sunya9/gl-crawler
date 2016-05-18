const CrawlBase = require('./CrawlBase')

class Sheglit extends CrawlBase {
  getImg($) {
    const relative = $(this.constructor.img).attr('src')
    return this.resolveUrl(relative)
  }
}

Sheglit.URL = `http://sheglit-store.com/?category=${encodeURIComponent('新作')}`
Sheglit.anchor = '.new_9 + a'
Sheglit.img = '.main_content_gallery_image img'

module.exports = Sheglit
