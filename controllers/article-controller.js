
const Article = require('../models/article')
const Comment = require('../models/comment')

exports.getArticle = (req, res, next) => {
    Article.findAll()
        .then(articles => {
            res.status(200).json({
                articles: articles
            })
         }).catch(err => {
            res.status(500).json({
                message: 'Get article failed',
                err: err
            })
         })
}


exports.getDetailArticle = (req, res, next) => {
    const articleId = req.params.articleId

    Article.findByPk(articleId)
        .then(article => {
            if (!article) {
                return res.status(404).json({
                    message: 'Article not found'
                })
            }
            res.status(200).json({
                article: article
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Get detail article failed',
                err: err
            })
        })
}

exports.postArticle = (req, res, next) => {
    const title = req.body.title
    const content = req.body.content
    const image = req.file

    console.log(req.body)

    let imagePath

    if (image){
        imagePath = image.path
    }

    const article = new Article({
        title: title,
        content: content,
        imageUrl: imagePath,
        writerId: req.writerId
    })

    article.save()
        .then(result => {
            res.status(201).json({
                message: 'Success created',
                article: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Create article failed',
                err: err
            })
        })
}
exports.editArticle = (req, res, next) => {
    const articleId = req.params.articleId
    const updatedTitle = req.body.title
    const updatedContent = req.body.content
    const updatedImageUrl = req.body.imageUrl

    Article.findByPk(articleId)
        .then(article => {

            if (article.writerId !== req.writerId){
                return res.status(422).json({
                    message: 'You dont have access for edit this article'
                })
            }
            article.title = updatedTitle
            article.content = updatedContent
            article.imageUrl = updatedImageUrl
            
            return article.save()
        })
        .then(result => {
            res.status(200).json({
                message: 'Article updated',
                article: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Edit article failed',
                err: err
            })
        })
}
exports.deleteArticle = (req, res, next) => {
    const articleId = req.params.articleId
    
    Article.findByPk(articleId)
        .then(article => {
            if (article.writerId !== req.writerId){
                return res.status(422).json({
                    message: 'You dont have access for delete this article'
                })
            }
            return article.destroy()
        })
        .then(result => {
            res.status(200).json({
                message: 'Article deleted',
                article_deleted: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Delete article failed',
                err: err
            })
        })
}

exports.commentArticle = (req, res, next) => {
    const articleId = req.params.articleId
    const commentBody = req.body.comment

    Comment.create({
        comment: commentBody,
        userId: req.userId,
        articleId: articleId
    })
    .then(result => {
        res.status(200).json({
            message: 'Comment uploaded',
            comment: result
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'Delete article failed',
            err: err
        })
    })
}