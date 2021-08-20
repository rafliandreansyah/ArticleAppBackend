const express = require('express')
const path = require('path')
const app = express()

const sequelize = require('./helpers/database')
const multer = require('multer')

const articleRouter = require('./routes/article-router')
const authRouter = require('./routes/auth-router')
const userRouter = require('./routes/user-router')

const uploadImageHelper = require('./helpers/upload-image')

const User = require('./models/user')
const Article = require('./models/article')
const Writer = require('./models/writer')
const Comment = require('./models/comment')

//Parser
app.use(express.json())

//middleware for upload images
app.use(multer({storage: uploadImageHelper.imageStorageArticle, fileFilter: uploadImageHelper.fileImageFilter}).single('image'))

app.use(multer({storage: uploadImageHelper.imageStorageUser, fileFilter: uploadImageHelper.fileImageFilter}).single('user-image'))

// static path
app.use('/images', express.static(path.join(__dirname, 'images')))

// Allow cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

//Route
app.use(articleRouter)
app.use(authRouter)
app.use(userRouter)


//Relation
Article.belongsTo(Writer, {onDelete: 'CASCADE'})
Writer.hasMany(Article)

Comment.belongsTo(User, { onDelete: 'CASCADE' })
User.hasMany(Comment)

Comment.belongsTo(Article, {onDelete: 'CASCADE'});
Article.hasMany(Comment);

sequelize.sync()
    .then(result => {
        // const writer = new Writer({
        //     email: 'writer@mail.com',
        //     password: '1122',
        //     name: 'Johny A'
        // })
        // writer.save()
        app.listen(3000)
    })
    .catch(err => {
        console.log(err)
    })

