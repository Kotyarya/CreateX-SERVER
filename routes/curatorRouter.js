const Router = require('express')
const CuratorController = require("../Controllers/curatorController")
const router = new Router()

router.post("/", CuratorController.create)
router.get("/", CuratorController.getAll)
router.delete("/", CuratorController.delete)

module.exports = router