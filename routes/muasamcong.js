

const express = require('express');
const router = express.Router();
import cheerio from 'cheerio'
import rp from 'request-promise';
import * as handlingMuaSamCong from '../services/handlingMuaSamCong'

let timeCrawl = 15 * 60 * 1000

let options = {
    method: 'GET',
    Connection: 'keep-alive',
    transform: function (body) {
        return cheerio.load(body);
    },
    insecure: true,
    gzip: true,
    headers: {
        Cookie: '_csrf-frontend=88b516bfbd4728b5b1cdf5f610853f2c16f6ecf8bb76f231973695fb1ea0eb04a%3A2%3A%7Bi%3A0%3Bs%3A14%3A%22_csrf-frontend%22%3Bi%3A1%3Bs%3A32%3A%22%FB%9A%FDcl%A5%F2%DD%EC%F41%5E%C9%3B%85%A0%A1%C3%CD%A0q_%94%82%F6%19w%11%1E%DDk%B7%22%3B%7D; PHPSESSID=c7l94q6s9si7jsr7c088caa98j; _ga=GA1.3.1689071677.1554274528; _gid=GA1.3.1623958078.1554274528; _pk_id.2.ea8d=2f6aea9dca1a3716.1554274528.1.1554274528.1554274528.; JSESSIONID=QKTRckZbJNzqCNhFVdg2dkmgphlrV2L7NNfyBxTVhZLntM9NNQcZ!-1579259435',
        Referer: 'http://muasamcong.mpi.gov.vn/goi-thau?bid_target=bid-plan&aujusted_limited=0&date_type=PUBLIC_DT&datetimestart=28/03/2019&datetimesend=04/04/2019',
        Host: 'muasamcong.mpi.gov.vn',
        DNT: 1,
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'Accept-Encoding': 'gzip, deflate',
        'Cache-Control': 'max-age=0',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
        'Accept-Encoding': 'gzip, deflate'
    }

};


var arrUrl = [
    {
        index: 1,
        url: '/goi-thau?bid_target=bid-plan&aujusted_limited=0&date_type=PUBLIC_DT&datetimestart=27/03/2000&datetimesend=03/04/2019&page=',
        type_vi: 'Kế hoạch lựa chọn nhà thầu',
        type_en: 'contractor_selection_plan'
    }
]

const crawlOutsideData = async (obj, index) => {
    options.uri = 'http://muasamcong.mpi.gov.vn' + obj.url + obj.index
    rp(options)
        .then(async ($) => {
            let result = await handlingMuaSamCong.handlingOutside($, obj)
            // console.log('$ :', $);
            console.log('result :', result);
            // return
        })
        .catch(function (err) {
            setTimeout(() => {
                crawlOutsideData(obj, index)
            }, 120000)
            throw err
        });
}
// crawlOutsideData(arrUrl[0], 0)
// const CrawlFullData = (data, indexArr) => {

//     data.forEach((element, index) => {
//         options.uri = element.href
//         rp(options)
//             .then(async ($) => {
//                 let result = await handlingDetailBds($, element)
//                 result.index_crawl = indexArr
//                 if (arrUrl[indexArr].type == "sale") {
//                     let check = await MuaBanNhaDatControllers.findOnlyRecordDataLandForSaleByCodeNews(result.code_news)
//                     if (check.length == 0) {
//                         await MuaBanNhaDatControllers.insertOnlyRecordDataLandForSale(result)
//                     }
//                 } else {
//                     let check = await MuaBanNhaDatControllers.findOnlyRecordDataLandForRentByCodeNews(result.code_news)
//                     if (check.length == 0) {
//                         await MuaBanNhaDatControllers.insertOnlyRecordDataLandForRent(result)
//                     }
//                 }

//                 if (index == data.length - 1) {
//                     arrUrl[indexArr].index++
//                     // if (arrUrl[indexArr].index < 10) {

//                     // } else {
//                     //     arrUrl[indexArr].index = 0
//                     // }
//                     setTimeout(() => {
//                         crawlOutsideData(arrUrl[indexArr], indexArr)
//                     }, 60000)
//                     return
//                 }
//             })
//             .catch(function (err) {
//                 // setTimeout(() => {
//                 //     crawlOutsideData(arrUrl[indexArr], indexArr)
//                 // }, 120000)
//                 return
//             });
//     });
// }

module.exports = router;
