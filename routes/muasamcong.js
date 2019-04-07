

const express = require('express');
const router = express.Router();
import cheerio from 'cheerio'
import rp from 'request-promise';
import * as handlingMuaSamCong from '../services/handlingMuaSamCong'
import * as MuaSamCongControllers from '../controllers/MuaSamCongControllers'

let timeCrawl = 5 * 60 * 60 * 1000

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
        url: '/goi-thau?bid_target=bid-plan&aujusted_limited=0&date_type=PUBLIC_DT&datetimestart=01/01/2000&datetimesend=03/04/2019&page=',
        type_vi: 'Kế hoạch lựa chọn nhà thầu',
        type_en: 'contractor_selection_plan'
    },
    {
        index: 1,
        url: '/goi-thau?bid_target=bid-pq&aujusted_limited=0&date_type=PUBLIC_DT&datetimestart=01/01/2000&datetimesend=04/04/2019&bid_method=00&page=',
        type_vi: 'Thông báo mời sơ tuyển/ mời quan tâm',
        type_en: 'notice_of_preliminary_invitation_and_interest'
    },
    {
        index: 1,
        url: '/goi-thau?bid_target=bid&aujusted_limited=0&date_type=PUBLIC_DT&datetimestart=01/01/2000&datetimesend=04/04/2019&page=',
        type_vi: 'Thông báo mời thầu',
        type_en: 'tender_notice'
    },
    {
        index: 1,
        url: '/goi-thau?bid_target=bid-extend&aujusted_limited=0&date_type=INPUT_DT&datetimestart=01/01/2000&datetimesend=04/04/2019&page=',
        type_vi: 'Thông báo gia hạn/ đính chính',
        type_en: 'notice_of_extension_of_correction'
    },
    {
        index: 1,
        url: '/goi-thau?bid_target=bid-extend&aujusted_limited=1&date_type=INPUT_DT&datetimestart=01/01/2000&datetimesend=04/04/2019&page=',
        type_vi: 'Thông báo gia hạn/ đính chính',
        type_en: 'notice_of_extension_of_correction'
    },
    {
        index: 1,
        url: '/goi-thau?bid_target=bid-shortlist&aujusted_limited=0&date_type=INPUT_DT&datetimestart=01/01/2000&datetimesend=04/04/2019&page=',
        type_vi: 'Danh sách ngắn',
        type_en: 'short_list'
    },
    {
        index: 1,
        url: '/goi-thau?bid_target=bid-pre-select-result&aujusted_limited=0&date_type=PUBLIC_DT&datetimestart=01/01/2000&datetimesend=04/04/2019&bid_method=00&page=',
        type_vi: 'Kết quả sơ tuyển',
        type_en: 'prequalification_results'
    },
    {
        index: 1,
        url: '/goi-thau?bid_target=bid-pre-select-result&aujusted_limited=1&date_type=PUBLIC_DT&datetimestart=01/01/2000&datetimesend=04/04/2019&bid_method=00&page=',
        type_vi: 'Kết quả sơ tuyển',
        type_en: 'prequalification_results'
    },
    {
        index: 1,
        url: '/goi-thau?bid_target=bid-open-result&aujusted_limited=0&date_type=BID_OPEN_DT&datetimestart=01/01/2000&datetimesend=04/04/2019&bid_method=01&page=',
        type_vi: 'Kết quả mở thầu điện tử',
        type_en: 'e-bidding_results'
    },
    {
        index: 1,
        url: '/goi-thau?bid_target=bid-open-result&aujusted_limited=1&date_type=BID_OPEN_DT&datetimestart=01/01/2000&datetimesend=04/04/2019&bid_method=1;5&page=',
        type_vi: 'Kết quả mở thầu điện tử',
        type_en: 'e-bidding_results'
    },
    {
        index: 1,
        url: '/goi-thau?bid_target=bid-result&aujusted_limited=0&date_type=BID_OPEN_DT&datetimestart=01/01/2000&datetimesend=04/04/2019&bid_method=01&page=',
        type_vi: 'Kết quả lựa chọn nhà thầu',
        type_en: 'results_of_contractor_selection'
    },
    {
        index: 1,
        url: '/goi-thau?bid_target=bid-result&aujusted_limited=0&date_type=BID_OPEN_DT&datetimestart=01/01/2000&datetimesend=04/04/2019&bid_method=00&page=',
        type_vi: 'Kết quả lựa chọn nhà thầu',
        type_en: 'results_of_contractor_selection'
    },
    {
        index: 1,
        url: '/goi-thau?bid_target=bid-result&aujusted_limited=1&date_type=BID_OPEN_DT&datetimestart=01/01/2000&datetimesend=04/04/2019&bid_method=01&page=',
        type_vi: 'Kết quả lựa chọn nhà thầu',
        type_en: 'results_of_contractor_selection'
    },
    {
        index: 1,
        url: '/goi-thau?bid_target=bid-result&aujusted_limited=1&date_type=BID_OPEN_DT&datetimestart=01/01/2000&datetimesend=04/04/2019&bid_method=00&page=',
        type_vi: 'Kết quả lựa chọn nhà thầu',
        type_en: 'results_of_contractor_selection'
    }
]

const crawlOutsideData = async (index) => {
    options.uri = 'http://muasamcong.mpi.gov.vn' + arrUrl[index].url + arrUrl[index].index
    rp(options)
        .then(async ($) => {
            let result = await handlingMuaSamCong.handlingOutside($, arrUrl[index])
            if (result.length > 0) CrawlFullData(result, index)
            return
        })
        .catch(function (err) {
            setTimeout(() => {
                crawlOutsideData(index)
            }, 120000)
            throw err
        });
}

const CrawlFullData = (data, indexArr) => {
    data.forEach(async (element, index) => {
        if (element.urlCrawlDetail) {
            options.uri = element.urlCrawlDetail
            rp(options)
                .then(async ($) => {
                    let result = await handlingMuaSamCong.handlingDetail($, element)
                    let check = await MuaSamCongControllers.findOnlyRecord(element.id_news)
                    if (check.length == 0) {
                        await MuaSamCongControllers.insertOnlyRecord(result)
                    }
                    if (index == data.length - 1) {
                        arrUrl[indexArr].index++
                        crawlOutsideData(indexArr)
                        return
                    }
                })
                .catch(function (err) {
                    return
                });
        } else {
            if (index == data.length - 1) {
                arrUrl[indexArr].index++
                crawlOutsideData(indexArr)
                return
            }
        }

    });
}

crawlOutsideData(0)
crawlOutsideData(1)
crawlOutsideData(2)
crawlOutsideData(3)
crawlOutsideData(4)
crawlOutsideData(5)
crawlOutsideData(6)
crawlOutsideData(7)
crawlOutsideData(8)
crawlOutsideData(9)
crawlOutsideData(10)
crawlOutsideData(11)
crawlOutsideData(12)
crawlOutsideData(13)
setInterval(function () { crawlOutsideData(0) }, timeCrawl);
setInterval(function () { crawlOutsideData(1) }, timeCrawl);
setInterval(function () { crawlOutsideData(2) }, timeCrawl);
setInterval(function () { crawlOutsideData(3) }, timeCrawl);
setInterval(function () { crawlOutsideData(4) }, timeCrawl);
setInterval(function () { crawlOutsideData(5) }, timeCrawl);
setInterval(function () { crawlOutsideData(6) }, timeCrawl);
setInterval(function () { crawlOutsideData(7) }, timeCrawl);
setInterval(function () { crawlOutsideData(8) }, timeCrawl);
setInterval(function () { crawlOutsideData(9) }, timeCrawl);
setInterval(function () { crawlOutsideData(10) }, timeCrawl);
setInterval(function () { crawlOutsideData(11) }, timeCrawl);
setInterval(function () { crawlOutsideData(12) }, timeCrawl);
setInterval(function () { crawlOutsideData(13) }, timeCrawl);



module.exports = router;
