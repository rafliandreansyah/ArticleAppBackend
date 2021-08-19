
const Article = require('../models/article')

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
exports.postArticle = (req, res, next) => {
    const title = req.body.title
    const content = req.body.content
    const imageUrl = req.body.imageUrl

    Article.create({ title: title, content: content, imageUrl: imageUrl })
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