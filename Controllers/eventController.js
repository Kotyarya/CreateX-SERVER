const ApiError = require('../Error/ApiError')
const {Event} = require("../models/models");

class EventController {
    async create(req, res, next) {
        const {title, eventTypeId, month, day, time, curatorId} = req.body

        if (!title || !eventTypeId || !month || !day || !time || !curatorId) {
            return next(ApiError.badRequest("Bad request"))
        }

        const event = await Event.create({title, eventTypeId, month, day, time, curatorId})

        return res.status(200).json(event)
    }


    async getAll(req, res) {
        const events = await Event.findAll()
        return res.status(200).json(events)
    }
}

module.exports = new EventController()