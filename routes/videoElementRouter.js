const Router = require('express')
const router = new Router()
const VideoElementController = require('../Controllers/videoElementController')

router.get('/', VideoElementController.getAll)
router.post('/', VideoElementController.create)

module.exports = router