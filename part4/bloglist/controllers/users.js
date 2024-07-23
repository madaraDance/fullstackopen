const bcrypt = require('bcryptjs')
require('express-async-errors')
const userRouter = require('express').Router()
const User = require('../models/users')


userRouter.get('/', async (request, response) => {
    const usersFromDB = await User.find({}).select('username name').populate('blogs', {title: 1, author: 1, url: 1, likes: 1});
    response.status(200).json(usersFromDB)
})

userRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body

    if (password === undefined || password === null) {
        return response.status(400).json({error: 'Password can not be null or undefined'})
    }

    if (password.length < 3) {
        return response.status(400).json({error: 'Password has to be atleast 3 chars long'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const userToSave = new User({
        username: username,
        name: name,
        passwordHash: passwordHash,
    })

    const savedUserFromDB = await userToSave.save()

    response.status(201).json(savedUserFromDB)
})

module.exports = userRouter
