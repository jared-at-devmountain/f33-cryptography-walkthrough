let bcrypt = require('bcryptjs');

let userDatase = []

let randomFortunes = [
    'You befriend a bear',
    'You get $3000 dropped off on your porch',
    'You give a child a hug'
]

let startingId = 1

module.exports = {
    logIn: (req, res) => {
        let { email, password } = req.body

        let userObj
        for (let i = 0; i < userDatase.length; i++) {
            if (email === userDatase[i].email) {
                userObj = userDatase[i]
            }
        }

        if (!userObj) {
            res.status(200).send({success: false, message: 'user with that email does not exist'})
            return
        }

        bcrypt.compare(password, userObj.hash).then((isMatching) => {
            if (isMatching) {
                let randomFortune = randomFortunes[Math.floor(Math.random() * randomFortunes.length)]

                res.send({success: true, fortune: randomFortune})
            } else {
                res.status(200).send({sucess: false, message: 'bad password'})
            }
        })
    },
    signUp: (req, res) => {
        let { email, password, firstName, lastName } = req.body
        let saltRounds = 10

        bcrypt.hash(password, saltRounds, function(err, hash) {
            if (err) {
                console.log(err)
                res.status(500).send({success: false})
                return
            }

            userDatase.push({
                email,
                hash,
                firstName,
                lastName,
                id: startingId++
            })

            res.send({success: true})
        })
    }
}
