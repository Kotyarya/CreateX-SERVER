const Router = require('express')
const router = new Router()
const EventController = require('../Controllers/eventController')

router.post("/", EventController.create)
router.get("/", EventController.getAll)

module.exports = router