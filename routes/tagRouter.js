const Router = require('express')
const router = new Router()
const TagController = require('../Controllers/tagController')

router.get("/", TagController.getAll)
router.post("/", TagController.create)


module.exports = router