export const handlingOutside = ($, obj) => {
    let result = []
    if ($('section tbody tr').length > 0) {
        $('section tbody tr').each(function (index) {
            let timePublic = $(this).find('td:nth-child(5)').text().trim().split(' ')
            let timeResult = timePublic[0].split("/").slice(0, 3).reverse().join('/') + " " + timePublic[2] + ":00"
            let data = {
                id_news: $(this).find('td:nth-child(2) > a').text().trim(),
                name_project: $(this).find('td:nth-child(3) > a').text().trim(),
                investor: $(this).find('td:nth-child(4)').text().trim(),
                time_public: timeResult,
                type_en: obj.type_en,
                type_vi: obj.type_vi,
                index_page: obj.index
            }
            if (data.name_project && data.name_project != 'null') {
                data.url = 'http://muasamcong.mpi.gov.vn' + $(this).find('td:nth-child(3) > a').attr('href')
            }
            result.push(data)
        })
    }
    return result
}

export const handlingDetail = ($, result) => {
    result.raw = 'http://muasamcong.mpi.gov.vn' + $('#detailFrameResize').attr('src')
    result.raw_html = $('#detailFrameResize').html()
    return result
}



