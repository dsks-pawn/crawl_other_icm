

const express = require('express');
const router = express.Router();
import cheerio from 'cheerio'
import rp from 'request-promise';
import * as handlingMuaSamCong from '../services/handlingMuaSamCong'

let timeCrawl = 15 * 60 * 1000

// let options = {
//     method: 'GET',
//     Connection: 'keep-alive',
//     transform: function (body) {
//         return cheerio.load(body);
//     },
//     insecure: true,
//     headers: {
//         Cookie: '__zlcmid=rci8FuExha6ZLn; PHPSESSID=qmdvgj3nnaqe6v1n4odfogdb51; VNWWS128450527232960E=MWUzYjU0OGUwYTgzZmJmNDY4MjA3YmZjOTlhMWIzM2UxOTQ0ZTI0ZTFmNGZmZDkwNmY2ZWJlZTU0YjFiOWEwNA%7CM2IwZDc2NGYzNDg5NTFlOGY4YzE4MzEzNDQ0YTQ3MGFjNjg1YWM2ZGU5Y2VmZDRkZTU1NWU1MzQ4YjcwMzUyMA; VNW128450527232960E=1cd98d5effdb49f0e7ca924db822d97c3574245; REMEMBERME=TmF2aXdvcmtzXFVzZXJCdW5kbGVcRW50aXR5XEVtcGxveWVyOmFtOWljMEJwWTI5dGJTNTJiZz09OjE1ODU3MzYxOTE6MzExNzg0ZDU0OTE5ZWI5NzRjYzRlNjI2ZTY1MjFhNzEwYTg1MDM0ZDBiYzMzMzBhZmE5NGIwYzBhM2ZjYzk1Ng%3D%3D; VNWJSAll128450527232960=bJ%2FL0ZmsmZWJi6u4aZzOn5mtyZOIvam3b8ugnmqtmsRbj3uHbZqb%7Cd8vqfgb167ccl2d1thin2gkbc3; VNW_WS_COOKIE=hrC02JHvtZJ0naqGiLC7oIbvrdxznZW%2Bh63W14a5tZV0nYnCk9Ozn4e8vs5zi5XBhrC01pGnrZWAnaCHk62755LMtZWAnYyLkpuz6IXJsZNznZzNh9Dmx7LH07CQqnikprfUvKXP0LuQqr%2Bka7KcyKLKmq96nnywjbvVu4%2FH07ugwL%2BlfbLkyIzH0q%2BQxbCwkL6ax2q70bCTq7OkfdSfu7Lg4a96qnqwfcKeu68%3D; VNW_USER_COOKIE=bJ%2FL0ZmsmZWJi6u4aZzOn5mtyZOIvam3b8ugnmqtmsRbj3uHbZqb; lang=1; specialLang=0; VNWResumeSearchCondition=%7B%22keyword%22%3Anull%2C%22industries%22%3A%5B35%5D%2C%22jobLevel%22%3A5%2C%22location%22%3A%5B24%5D%2C%22yearExperience%22%3Anull%2C%22nationality%22%3A%22%22%2C%22language%22%3Anull%2C%22languageLevel%22%3Anull%2C%22ageFrom%22%3Anull%2C%22ageTo%22%3Anull%2C%22salaryFrom%22%3Anull%2C%22salaryTo%22%3Anull%2C%22gender%22%3Anull%2C%22lastModified%22%3A365%7D; FIREBASE_JWT=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJ2aWV0bmFtd29ya3MtbWVzc2FnZUB2aWV0bmFtd29ya3MtbWVzc2FnZS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6InZpZXRuYW13b3Jrcy1tZXNzYWdlQHZpZXRuYW13b3Jrcy1tZXNzYWdlLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwiYXVkIjoiaHR0cHM6XC9cL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbVwvZ29vZ2xlLmlkZW50aXR5LmlkZW50aXR5dG9vbGtpdC52MS5JZGVudGl0eVRvb2xraXQiLCJpYXQiOjE1NTQyNzkzNjAsImV4cCI6MTU1NDI4Mjk2MCwidWlkIjozNTc0MjQ1fQ.ODtKHUJ3x2UBHEgij5YJ1nlO1-OWtWIAkANfjfx0rt6qxFFiSn8DdpLp8icJkvalZVantxQV8JMIdU73JMnfgoGOEFyPXLxhKGL6JnTe-RA0S7PKSqor6CR48b3mw3_crvGlPuL4MzG8t228g1ym9As48tpkkeznh18mGdGfAVVe50aLCuyY2V0NQb-_Xxtp3QHweEiBe8wbt3-VZ_WXopj-SVw2TEUdu2010pcvYUUbNrLu2_vkWDjw8_pmQeN49RvN7JEmq90TSqU6gcQZW4noSMIb_wVRnAaMPCKjBEaBzBfl7M7SYpYH6kKqe9KQrjMM1EKlbmXj77RAbU8IRw'
//     }

// };

// options.uri = 'https://employer.vietnamworks.com/v2/resume/search?searchResume%5Bkeyword%5D=&searchResume%5Bindustry%5D%5B%5D=35&searchResume%5BjobLevelId%5D=5&searchResume%5Blocation%5D%5B%5D=24&searchResume%5BlastModified%5D=365&btnResumeSearch=1&searchResume%5ByearExperience%5D=&searchResume%5Bnationality%5D=&searchResume%5Blanguage%5D=&searchResume%5BlanguageLevel%5D=&searchResume%5BageFrom%5D=&searchResume%5BageTo%5D=&searchResume%5BsalaryFrom%5D=&searchResume%5BsalaryTo%5D=&searchResume%5BgenderId%5D=&isSearchPage=1&searchResume%5BsortDirection%5D=desc&searchResume%5BsortField%5D=&utm_source=&utm_medium='
// rp(options)
//     .then(async ($) => {
//         console.log('$ :', $);
//         // return
//     })
//     .catch(function (err) {
//         throw err
//     });



// var arrUrl = [
//     {
//         index: 1,
//         url: 'goi-thau?bid_target=bid-plan&aujusted_limited=0&date_type=PUBLIC_DT&datetimestart=27/03/2000&datetimesend=03/04/2019&page=',
//         type_vi: 'Kế hoạch lựa chọn nhà thầu',
//         type_en: 'contractor_selection_plan'
//     }
// ]

// const crawlOutsideData = async (obj, index) => {
//     options.uri = 'http://muasamcong.mpi.gov.vn/' + obj.url + obj.index
//     console.log('options.uri', options.uri)
//     rp(options)
//         .then(async ($) => {
//             // let result = await handlingMuaSamCong.handlingOutside($, obj)
//             console.log('$ :', $);
//             // return
//         })
//         .catch(function (err) {
//             throw err
//             setTimeout(() => {
//                 crawlOutsideData(obj, index)
//             }, 120000)
//             return
//         });
// }
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
