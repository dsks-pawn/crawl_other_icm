export const handlingOutside = ($, obj) => {
    let result = []
    if ($('section tbody tr').length > 0) {
        $('section tbody tr').each(function (index) {
            let timePublic = $(this).find('td:nth-child(5)').text().trim().split(' ')
            let timeResult = timePublic[0].split("/").slice(0, 3).reverse().join('/') + " " + timePublic[2] + ":00"
            let data = {
                id_news: $(this).find('td:nth-child(2)').text().trim(),
                name_project: $(this).find('td:nth-child(3) > a').text().trim(),
                investor: $(this).find('td:nth-child(4)').text().trim(),
                time_public: timeResult,
                type_en: obj.type_en,
                type_vi: obj.type_vi,
                index_page: obj.index
            }
            if (data.name_project && data.name_project != 'null') {
                data.url = 'http://muasamcong.mpi.gov.vn' + $(this).find('td:nth-child(3) > a').attr('href')
                data.id_crawl_iframe = data.url.match(/id=(\d+)/)[1]
                data.urlCrawlDetail = 'http://muasamcong.mpi.gov.vn/dt8082/BP/EP_EPJ_BPP102_OCVN.jsp?project_plan_id=' + data.id_crawl_iframe
            }
            result.push(data)
        })
    }
    return result
}

export const handlingDetail = ($, result) => {
    result.raw = $('html').html()
    return result
}



