const Router = require('express')
const router = new Router()
const EventController = require('../Controllers/eventController')

router.post("/", EventController.create)
router.get("/", EventController.getAll)
router.put("/:id", EventController.update)

module.exports = router