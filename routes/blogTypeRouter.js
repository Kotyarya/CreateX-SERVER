const Router = require('express')
const router = new Router()
const BlogTypeController = require('../Controllers/blogTypeController')

router.post("/", BlogTypeController.create)
router.get("/", BlogTypeController.getAll)


module.exports = router