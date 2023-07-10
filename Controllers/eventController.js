const ApiError = require('../Error/ApiError')
const {Event, EventType, Theme} = require("../models/models");
const dateFns = require('date-fns')
const Sequelize = require('sequelize')
const {Op} = require("sequelize");

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

        let {limit, page, eventTypeId, sortBy, text} = req.query
        text = text || ""

        limit = limit || 9
        page = page || 1

        const offset = limit * page - limit


        if (!eventTypeId || eventTypeId === "0") {
            const events = await Event.findAndCountAll(
                {
                    where: {
                        "title": {
                            [Op.like]: '%' + text + '%'
                        }
                    },
                    limit, offset, order: [["date", "ASC"]],
                    include: [
                        {model: EventType, as: "eventType", attributes: ["name"]},
                        {model: Theme, as: "theme"}
                    ],
                    distinct: true,
                }
            )

            return res.status(200).json(events)
        }


        const events = await Event.findAndCountAll(
            {
                limit, offset, order: [["id", "ASC"]],
                where: {
                    eventTypeId,
                    "title": {
                        [Op.like]: '%' + text + '%'
                    }
                },
                include: [
                    {model: EventType, as: "eventType", attributes: ["name"]},
                    {model: Theme, as: "theme"}
                ],
                distinct: true

            }
        )
        return res.status(200).json(events)
    }

    async update(req, res) {
        const {id} = req.params
        const {date} = req.body


        const event = await Event.update({"date": date}, {where: {id}})
        const eventUpdate = await Event.findOne({where: {id}})

        return res.status(200).json(eventUpdate)
    }
}

module.exports = new EventController()