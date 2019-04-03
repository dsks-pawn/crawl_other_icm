import { sequelizeVietNamWork } from '../sequelize';
import Sequelize from 'sequelize';

export default sequelizeVietNamWork.define('candidate_information', {
	
	id: {
		type: Sequelize.BIGINT,
		primaryKey: true,
		unique: true
	},
	id_post: {
		type: Sequelize.CHAR(500)
	},
	title: {
		type: Sequelize.CHAR(500)
	},
	url: {
		type: Sequelize.CHAR(Number.MAX_SAFE_INTEGER)
	},
	career: {
		type: Sequelize.CHAR(500)
	},
	location: {
		type: Sequelize.CHAR(500)
	},
	rank: {
		type: Sequelize.CHAR(500)
	},
	previous_company: {
		type: Sequelize.CHAR(500)
	},
	expected_salary: {
		type: Sequelize.CHAR(500)
	},
	year_of_experience: {
		type: Sequelize.INTEGER
	},
	view: {
		type: Sequelize.INTEGER
	},
	dowload: {
		type: Sequelize.INTEGER
	},
	credit: {
		type: Sequelize.INTEGER
	},
	time_update: {
		type: Sequelize.STRING
	},
	avatar: {
		type: Sequelize.CHAR(Number.MAX_SAFE_INTEGER)
	},
	short_information: {
		type: Sequelize.CHAR(500)
	},
	highest_degree: {
		type: Sequelize.CHAR(500)
	},
	language_skills: {
		type: Sequelize.CHAR(500)
	},
	recent_work: {
		type: Sequelize.CHAR(500)
	},
	recent_companies: {
		type: Sequelize.CHAR(500)
	},
	current_rank: {
		type: Sequelize.CHAR(500)
	},
	desired_location: {
		type: Sequelize.CHAR(500)
	},
	level_desired: {
		type: Sequelize.CHAR(500)
	},
	workplace_desired: {
		type: Sequelize.CHAR(500)
	},
	job_function_desired: {
		type: Sequelize.CHAR(500)
	},
	the_desired_minimum_wage: {
		type: Sequelize.CHAR(500)
	},
	cv: {
		type: Sequelize.CHAR(Number.MAX_SAFE_INTEGER)
	},
	address: {
		type: Sequelize.CHAR(500)
	},
	index_crawl: {
		type: Sequelize.BIGINT
	},
	createdtime: {
		type: Sequelize.STRING
	},
}, {
		freezeTableName: true,
		timestamps: false,
	});

