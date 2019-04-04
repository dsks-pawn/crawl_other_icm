import candidate_information from '../models/candidate_information'

export const insertOnlyRecord = async data => {
    try {
        candidate_information.removeAttribute('id')
        return await candidate_information.create(data)
    } catch (error) {
        throw error
    }
}

export const findOnlyRecord = async data => {
    try {
        return await candidate_information.findAll({
            raw: true,
            where: {
                id_post: data
            }
        })
    } catch (error) {
        throw error
    }
}