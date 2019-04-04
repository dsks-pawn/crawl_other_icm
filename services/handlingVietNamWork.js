export const handlingOutside = ($, index) => {
    let result = []
    if ($('#searchResumeList .search-result').length > 0) {
        $('#searchResumeList .search-result').each(function () {
            let yearOfExperience = $(this).find('div.col-sm-2.extra-info > div:nth-child(1)').text().match(/\d+/g) ? $(this).find('div.col-sm-2.extra-info > div:nth-child(1)').text().match(/\d+/g)[0] : null
            let view = $(this).find('div.col-sm-3.profile-info.text-center > div.view').text().match(/\d+/g) ? $(this).find('div.col-sm-3.profile-info.text-center > div.view').text().match(/\d+/g)[0] : null
            let dowload = $(this).find('div.col-sm-3.profile-info.text-center > div.download').text().match(/\d+/g) ? $(this).find('div.col-sm-3.profile-info.text-center > div.download').text().match(/\d+/g)[0] : null
            let credit = $(this).find('div.col-sm-3.profile-info.text-center > div.credit').text().match(/\d+/g) ? $(this).find('div.col-sm-3.profile-info.text-center > div.credit').text().match(/\d+/g)[0] : null
            result.push({
                id_post: $(this).attr('id').replace('resumeSearchResultRow-', ''),
                title: $(this).find('.resume-title').text().trim(),
                url: 'https://employer.vietnamworks.com' + $(this).find('.resume-title').attr('href'),
                career: $(this).find('div.col-sm-6 > div > div:nth-child(1)').text().trim(),
                location: $(this).find('div.col-sm-6 > div > div:nth-child(2)').text().trim(),
                rank: $(this).find('div.col-sm-6 > div > div:nth-child(3)').text().trim(),
                previous_company: $(this).find('div.col-sm-6 > div > div:nth-child(4)').text().trim(),
                year_of_experience: yearOfExperience,
                expected_salary: $(this).find('div.col-sm-2.extra-info > div.div.text-center.salary').text().trim(),
                view: view,
                dowload: dowload,
                credit: credit,
                time_update: $(this).find('div.col-sm-3.profile-info.text-center > div.last-modified').text().trim().replace(/ /g, '').replace('Cậpnhật\n:', '').split('/').slice(0, 3).reverse().join('/'),
                index_crawl: index
            })
        })
    }
    return result
}

export const handlingDetail = ($, result) => {
    let blockInfo = $('#resumeDetail > div:nth-child(2) > div > div > div > div > div > div:nth-child(1) > div.col-sm-8 > div > div:nth-child(2) > div > div > div > div > table > tbody')
    result.avatar = $('#contact-3 > div > div > div.col-sm-3 > div > img').attr('src')
    result.short_information = $('#contact-3 > div > div > div.col-sm-9.m-t > p:nth-child(2)').text().trim().replace(/  /g, '')
    result.highest_degree = $(blockInfo).find('tr:nth-child(1) > td:nth-child(2)').text().trim()
    result.language_skills = $(blockInfo).find('tr:nth-child(3) > td:nth-child(2)').text().trim()
    result.recent_work = $(blockInfo).find('tr:nth-child(4) > td:nth-child(2)').text().trim()
    result.recent_companies = $(blockInfo).find('tr:nth-child(5) > td:nth-child(2)').text().trim()
    result.current_rank = $(blockInfo).find('tr:nth-child(6) > td:nth-child(2)').text().trim()
    result.desired_location = $(blockInfo).find('tr:nth-child(7) > td:nth-child(2)').text().trim()
    result.level_desired = $(blockInfo).find('tr:nth-child(8) > td:nth-child(2)').text().trim()
    result.workplace_desired = $(blockInfo).find('tr:nth-child(9) > td:nth-child(2)').text().trim()
    result.job_function_desired = $(blockInfo).find('tr:nth-child(10) > td:nth-child(2)').text().trim()
    result.the_desired_minimum_wage = $(blockInfo).find('tr:nth-child(11) > td:nth-child(2)').text().trim()
    let cv = $('#viewer').attr('src')
    if (cv) result.cv = 'https://employer.vietnamworks.com' + cv
    result.address = $('#contact-3 > div > div > div.col-sm-9.m-t > div.contact-detail.gray-light > p').text().trim()
    return result
}

