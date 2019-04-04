import data_crawl from '../models/data_crawl'

export const insertOnlyRecord = async data => {
    try {
        data_crawl.removeAttribute('id')
        return await data_crawl.create(data)
    } catch (error) {
        throw error
    }
}

export const findOnlyRecord = async data => {
    try {
        return await data_crawl.findAll({
            raw: true,
            where: {
                id_news: data
            }
        })
    } catch (error) {
        throw error
    }
}