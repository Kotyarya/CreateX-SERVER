const sendGrid = require('@sendgrid/mail')

sendGrid.setApiKey(process.env.SEND_GRID_API_KEY)


class EmailSendController {
    subscribe(req, res) {
        const {email, key} = req.body

        if (key !== process.env.RANDOM_KEY) {
            return res.status(400).json("Incorrect api key")
        }

        sendGrid.send({
            to: email,
            from: "createx.pet.project@gmail.com",
            text: "Subscribe",
            subject: "Subscribe"
        })

        return res.status(200).json("Email send")
    }

    sendMessage(req, res) {
        const {email, name, message, phone, key} = req.body

        if (key !== process.env.RANDOM_KEY) {
            return res.status(400).json("Incorrect api key")
        }

        sendGrid.send({
            to: email,
            from: "createx.pet.project@gmail.com",
            html: `
                <h1>Hello ${name}</h1>
                <p>Your message: ${message}</p>
                <p>Your phone: ${phone}</p> 
            `,
            subject: "Send Message"
        })

    }

    register(req, res) {
        const {email, name, phone, key} = req.body

        if (key !== process.env.RANDOM_KEY) {
            return res.status(400).json("Incorrect api key")
        }

        sendGrid.send({
            to: email,
            from: "createx.pet.project@gmail.com",
            html: `
                <h1>Hello ${name}</h1>
                <p>Your phone: ${phone}</p> 
            `,
            subject: "Register"
        })
    }
}

module.exports = new EmailSendController()