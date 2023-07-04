const Router = require('express')
const router = new Router()
const branchRouter = require('./branchRouter')
const courseRouter = require('./courseRouter')
const curatorRouter = require('./curatorRouter')
const eventRouter = require('./eventRouter')
const eventTypeRouter = require('./eventTypeRouter')
const forWhomCourseRouter = require('./forWhomCourseRouter')
const forWhomEventRouter = require('./forWhomEventRouter')
const lessonRouter = require('./lessonRouter')
const themeRouter = require('./themeRouter')
const willLearnRouter = require('./willLearnRouter')


router.use("/course", courseRouter)
router.use("/curator", curatorRouter)
router.use("/event", eventRouter)
router.use("/branch", branchRouter)
router.use("/eventType", eventTypeRouter)
router.use("/forWhomCourse", forWhomCourseRouter)
router.use("/forWhomEvent", forWhomEventRouter)
router.use("/lesson", lessonRouter)
router.use("/theme", themeRouter)
router.use("/willLearn", willLearnRouter)


module.exports = router