const CrawlBase = require('./CrawlBase')

class Vm extends CrawlBase {
  getImg($) {
    const relative = $(this.constructor.img).attr('src')
    return this.resolveUrl(relative)
  }
  getTitle($) {
    return $('td.style11pix[valign="bottom"]').first().text().replace(/\s+/g, ' ')
  }
}

Vm.URL = 'http://victorianmaiden.com/shopping/new-item.html'
Vm.anchor = 'a[href^="http://v-maiden"]:not(:empty)'
Vm.img = 'td[valign="top"] + td > img:not([src^="../"]):not([src^="http://"])'
Vm.charset = 'Shift_JIS'

module.exports = Vm
