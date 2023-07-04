const Router = require('express')
const router = new Router()
const BranchController = require("../Controllers/branchController")

router.post("/", BranchController.create)
router.get("/", BranchController.getAll)
router.delete("/", BranchController.delete)

module.exports = router