const Router = require('express')
const router = new Router()
const EventController = require('../Controllers/eventController')

router.post("/", EventController.create)
router.get("/", EventController.getAll)
router.get("/:id", EventController.getOne)
router.put("/:id", EventController.update)

module.exports = router