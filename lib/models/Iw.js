const CrawlBase = require('./CrawlBase')

class Iw extends CrawlBase {
  getImg($) {
    const relative = $(this.constructor.img).attr('src')
    return this.resolveUrl(relative)
  }
}

Iw.URL = 'http://innocent-w.jp/fs/innocentworld/c/new'
Iw.anchor = '.FS2_additional_image_detail_container a'
Iw.img = '.FS2_thumbnail_container img'
Iw.charset = 'Shift_JIS'

module.exports = Iw
