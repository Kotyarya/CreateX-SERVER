const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')
const ApiError = require('../Error/ApiError')

class UserController {
    async login(req, res, next) {
        const {password, email} = req.body
        const user = await User.findOne({where: {email}})

        if (!user) {
            return next(ApiError.badRequest("There is no such user"))
        }
        const comparePass = bcrypt.compareSync(password, user.password)

        if (!comparePass) {
            return next(ApiError.badRequest("Incorrect password"))
        }
        const token = jwt.sign({
            id: user.id,
            email: user.email,
            role: user.role
        }, process.env.RANDOM_KEY, {expiresIn: "24h"})

        return res.json({token})

    }

    async register(req, res, next) {
        let {password, email} = req.body

        let role = "USER"

        if (!email || !password) {
            return next(ApiError.badRequest("Invalid email or password"))
        }

        const candidate = await User.findOne({where: {email}})

        if (candidate) {
            return next(ApiError.badRequest("error User already"))
        }

        const hashPass = await bcrypt.hash(password, 4)
        const user = await User.create({email, role, password: hashPass})
        const token = jwt.sign({id: user.id, email: user.email, role}, process.env.RANDOM_KEY, {expiresIn: "24h"})

        return res.json({token})
    }

    async check(req, res, next) {
        const token = jwt.sign({
            id: req.user.id,
            email: req.user.email,
            role: req.user.role
        }, process.env.RANDOM_KEY, {expiresIn: "24h"})

        return res.json({token})
    }
}

module.exports = new UserController()