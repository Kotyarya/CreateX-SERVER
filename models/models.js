const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const Course = sequelize.define("course", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: true},
    price: {type: DataTypes.INTEGER},
    description: {type: DataTypes.TEXT},
    date: {type: DataTypes.STRING}
})

const Branch = sequelize.define("branch", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
})

const WillLearn = sequelize.define("willLearn", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING},
})

const ForWhomCourse = sequelize.define("forWhomCourse", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING},
})

const Lesson = sequelize.define("lesson", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.TEXT},
})


const Event = sequelize.define("event", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: true},
    month: {type: DataTypes.STRING},
    day: {type: DataTypes.STRING},
    time: {type: DataTypes.STRING}
})

const EventType = sequelize.define("eventType", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
})

const Theme = sequelize.define("theme", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
})

const ForWhomEvent = sequelize.define("forWhomEvent", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING},
})


const Curator = sequelize.define("curator", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    jobTitle: {type: DataTypes.STRING},
    rate: {type: DataTypes.FLOAT},
    description: {type: DataTypes.TEXT},
    students: {type: DataTypes.INTEGER},
    img: {type: DataTypes.STRING}
})


Branch.hasMany(Course)
Course.belongsTo(Branch)

Course.hasMany(Lesson)
Lesson.belongsTo(Course)

Course.hasMany(ForWhomCourse)
ForWhomCourse.belongsTo(Course)

Course.hasMany(WillLearn)
WillLearn.belongsTo(Course)


EventType.hasMany(Event)
Event.belongsTo(EventType)

Event.hasMany(Theme)
Theme.belongsTo(Event)

Event.hasMany(ForWhomEvent)
ForWhomEvent.belongsTo(Event)

Curator.hasMany(Event)
Event.belongsTo(Curator)

Curator.hasMany(Course)
Course.belongsTo(Curator)


module.exports = {
    EventType,
    Event,
    Theme,
    ForWhomEvent,
    WillLearn,
    ForWhomCourse,
    Lesson,
    Course,
    Branch,
    Curator
}