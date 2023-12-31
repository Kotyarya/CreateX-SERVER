const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            return res.status(401).json({message: "Not authorization"})
        }

        const decoded = jwt.verify(token, process.env.RANDOM_KEY)
        req.user = decoded
        next()
    } catch (e) {
        return res.status(401).json({message: e.message})
    }
}