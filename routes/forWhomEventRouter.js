const Router = require('express')
const router = new Router()
const ForWhomEventController = require('../Controllers/forWhomEventController')

router.post("/", ForWhomEventController.create)
router.get("/", ForWhomEventController.getAll)
router.get("/:id", ForWhomEventController.getForOneEvent)

module.exports = router