const Router = require('express')
const router = new Router()
const PodcastElementController = require('../Controllers/podcastElementController')

router.get("/", PodcastElementController.getAll)
router.post("/", PodcastElementController.create)
router.delete("/:id", PodcastElementController.delete)

module.exports = router