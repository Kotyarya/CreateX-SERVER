const Router = require('express')
const router = new Router()
const ArticleElementListController = require('../Controllers/articleElementListController')

router.get("/", ArticleElementListController.getAll)
router.post("/", ArticleElementListController.create)

module.exports = router