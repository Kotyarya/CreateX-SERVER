const ApiError = require("../Error/ApiError");
const {Curator} = require("../models/models");
const uuid = require("uuid");
const path = require('path');

class CuratorController {
    async create(req, res, next) {

        try {
            const {name, jobTitle, rate, description, students} = req.body
            const {img} = req.files
            if (!name || !jobTitle || !rate || !description || !students || !img) {
                return next(ApiError.badRequest("Bad request"))
            }

            let fileName = uuid.v4() + ".png"
            img.mv(path.resolve(__dirname, "..", "static", fileName))

            const curator = await Curator.create({name, jobTitle, rate, description, students, img: fileName})

            return res.status(200).json(curator)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }


    }

    async getAll(req, res, next) {

        const curators = await Curator.findAndCountAll()

        return res.status(200).json(curators)
    }


    async delete(req, res, next) {

        const {id} = req.query

        if (!id) {
            return next(ApiError.badRequest("ID is not valid"))
        }

        const curator = await Curator.destroy({where: {id}})

        return res.status(200).json(curator)

    }
}

module.exports = new CuratorController()