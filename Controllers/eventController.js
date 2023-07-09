const ApiError = require('../Error/ApiError')
const {Event, EventType, Theme} = require("../models/models");

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

        let {limit, page, eventTypeId} = req.query

        limit = limit || 9
        page = page || 1

        const offset = limit * page - limit


        if (!eventTypeId || eventTypeId === "0") {
            const events = await Event.findAndCountAll(
                {
                    limit, offset, order: [["id", "ASC"]],
                    include: [
                        {model: EventType, as: "eventType", attributes: ["name"]},
                        {model: Theme, as: "theme"}
                    ],
                    distinct: true
                }
            )

            return res.status(200).json(events)
        }


        const events = await Event.findAndCountAll(
            {
                limit, offset, order: [["id", "ASC"]],
                where: {eventTypeId},
                include: [
                    {model: EventType, as: "eventType", attributes: ["name"]},
                    {model: Theme, as: "theme"}
                ],
                distinct: true

            }
        )
        return res.status(200).json(events)
    }
}

module.exports = new EventController()