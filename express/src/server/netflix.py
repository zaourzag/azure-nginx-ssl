import scrapy
from scrapy.crawler import CrawlerProcess
import sys
import logging
class NetflixSpider(scrapy.Spider):
    name = "netflix"
    logging.disable(sys.maxsize) # Python 3
 #   logger = logging.getLogger()
#    logger.disabled = True
#    logging.getLogger('scrapy').propagate = False
    def start_requests(self):
#        urls =  'https://www.netflix.com/nl-en/'
        yield scrapy.Request('https://www.netflix.com/nl-en/')

    def parse(self, response):
        page = response.css(".concord-img").xpath("@src").extract_first()
        res = f"'{page}'"
        print(page)
if __name__ == "__main__":
  process = CrawlerProcess()
  process.crawl(NetflixSpider)
  process.start()
