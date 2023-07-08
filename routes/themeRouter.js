const Router = require('express')
const router = new Router()
const ThemeController = require('../Controllers/themeController')

router.post("/", ThemeController.create)
router.get("/", ThemeController.getAll)
router.get("/:id", ThemeController.getByEventId)

module.exports = router