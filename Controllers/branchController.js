const ApiError = require("../Error/ApiError");
const {Branch, Course} = require("../models/models");
const {Sequelize} = require("sequelize");

class BranchController {
    async create(req, res, next) {
        const {name} = req.body

        if (!name) {
            return next(ApiError.badRequest("Name is not valid"))
        }

        const branch = await Branch.create({name})
        return res.status(200).json(branch)
    }

    async getAll(req, res) {


        const branches = await Branch.findAll({
            attributes: {
                include: [[Sequelize.fn("COUNT", Sequelize.col("courses.branchId")), "courseCount"]]
            },
            include: [{
                model: Course, attributes: []
            }],
            group: ['branch.id']
        })


        return res.status(200).json(branches)
    }


    async delete(req, res, next) {
        const {id} = req.query

        if (!id) {
            return next(ApiError.badRequest("ID is not valid"))
        }

        const branch = await Branch.destroy({where: {id}})

        return res.status(200).json(branch)
    }
}

module.exports = new BranchController()