const usersRouter = require('express').Router()
const User = require('../models/user')
const AuthSessionToken = require('../models/authSessionToken')

const bcrypt = require('bcrypt')

usersRouter.post('/login', async (request, response) => {
const { username, password } = request.body

    const user = await User.findOne({ username })

    if(!user){
        return response.status(401).json({ error: 'Invalid username or password' })
    }

    const passwordCorrect = await bcrypt.compare(password, user.password)

    if(!passwordCorrect){
        return response.status(401).json({ error: 'Invalid username or password' })
    }

    const AuthSessionTokenData = {
        token: await bcrypt.hash(`${user.username}-${Date.now()}`, 10),
        userId: user._id
    }
    const token = new AuthSessionToken(AuthSessionTokenData)
    token.populate('userId', {username: 1, email: 1})
    const tokenCreated = (await token.save())

    response.status(200).json(tokenCreated)
})

usersRouter.post('/',  async (request, response) => {
    try {
        const cryptedPassword = await bcrypt.hash(request.body.password, 10)

        const data = {
            ...request.body,
            password: cryptedPassword
        }
        const user = new User(data)

        const createdUser = await user.save()

        return response.status(201).json(createdUser)
    }catch(error){
        return response.status(400).json(error)
    }
})

module.exports = usersRouter