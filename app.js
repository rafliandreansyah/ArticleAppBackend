const express = require('express')

const app = express()

const sequelize = require('./helpers/database')

const articleRouter = require('./routes/article-router')
const authRouter = require('./routes/auth-router')

//Parser
app.use(express.json())

//Route
app.use(articleRouter)
app.use(authRouter)

sequelize.sync()
    .then(result => {
        app.listen(3000)
    })
    .catch(err => {
        console.log(err)
    })

