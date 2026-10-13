const sendGrid = require('@sendgrid/mail')
const ApiError = require('../Error/ApiError')

sendGrid.setApiKey(process.env.SEND_GRID_API_KEY)

const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const requests = new Map()
const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5

const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')

const isRateLimited = (req) => {
    const now = Date.now()
    const key = `${req.ip}:${req.path}`
    const recent = (requests.get(key) || []).filter((timestamp) => now - timestamp < WINDOW_MS)
    recent.push(now)
    requests.set(key, recent)
    return recent.length > MAX_REQUESTS
}

const send = async (message) => {
    await sendGrid.send({
        from: process.env.SEND_GRID_FROM || 'createx.pet.project@gmail.com',
        ...message,
    })
}

class EmailSendController {
    async subscribe(req, res, next) {
        try {
            const {email} = req.body
            if (!EMAIL_REGEXP.test(email || '')) return next(ApiError.badRequest('Invalid email'))
            if (isRateLimited(req)) return res.status(429).json({message: 'Too many requests'})
            await send({to: email, text: 'You are subscribed to CreateX updates.', subject: 'CreateX subscription'})
            return res.status(200).json({message: 'Email sent'})
        } catch (error) {
            return next(new ApiError(502, 'Email service is unavailable'))
        }
    }

    async sendMessage(req, res, next) {
        try {
            const {email, name, message, phone} = req.body
            if (!EMAIL_REGEXP.test(email || '') || !name || !message) return next(ApiError.badRequest('Invalid form data'))
            if (isRateLimited(req)) return res.status(429).json({message: 'Too many requests'})
            await send({
                to: process.env.CONTACT_EMAIL || 'createx.pet.project@gmail.com',
                replyTo: email,
                html: `<h1>Message from ${escapeHtml(name)}</h1><p>${escapeHtml(message)}</p><p>Email: ${escapeHtml(email)}</p><p>Phone: ${escapeHtml(phone)}</p>`,
                subject: 'CreateX contact form',
            })
            return res.status(200).json({message: 'Message sent'})
        } catch (error) {
            return next(new ApiError(502, 'Email service is unavailable'))
        }
    }

    async register(req, res, next) {
        try {
            const {email, name, phone} = req.body
            if (!EMAIL_REGEXP.test(email || '') || !name || !phone) return next(ApiError.badRequest('Invalid form data'))
            if (isRateLimited(req)) return res.status(429).json({message: 'Too many requests'})
            await send({
                to: email,
                html: `
                    <h1>Hello ${escapeHtml(name)}</h1>
                    <p>We received your CreateX registration request.</p>
                    <p>Your phone: ${escapeHtml(phone)}</p>
                `,
                subject: 'CreateX registration request',
            })
            return res.status(200).json({message: 'Email sent'})
        } catch (error) {
            return next(new ApiError(502, 'Email service is unavailable'))
        }
    }
}

module.exports = new EmailSendController()
