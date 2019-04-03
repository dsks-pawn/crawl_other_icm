import { sequelizeMuaSamCong } from '../sequelize';
import Sequelize from 'sequelize';

export default sequelizeMuaSamCong.define('data_crawl', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        unique: true
    },
    id_news: {
        type: Sequelize.CHAR(Number.MAX_SAFE_INTEGER)
    },
    name_project: {
        type: Sequelize.CHAR(500)
    },
    investor: {
        type: Sequelize.CHAR(500)
    },
    url: {
        type: Sequelize.CHAR(Number.MAX_SAFE_INTEGER)
    },
    time_public: {
        type: Sequelize.STRING
    },
    raw: {
        type: Sequelize.CHAR(Number.MAX_SAFE_INTEGER)
    },
    type_en: {
        type: Sequelize.CHAR(500)
    },
    type_vi: {
        type: Sequelize.CHAR(500)
    },
    index_page: {
        type: Sequelize.BIGINT
    },
    createdtime: {
        type: Sequelize.STRING
    },
}, {
        freezeTableName: true,
        timestamps: false,
    });

