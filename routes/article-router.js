const { Router } = require('express')

const router = Router()
const articleController = require('../controllers/article-controller')

const isUserAuth = require('../helpers/is-auth')
const isWriterAuth = require('../helpers/is-auth-writer')

// GET => http://localhost:3000/
router.get('/', isUserAuth, articleController.getArticle)

// GET => http://localhost:3000/id
router.get('/:articleId', isUserAuth, articleController.getDetailArticle)

// POST => http://localhost:3000/add-article
router.post('/add-article', isWriterAuth, articleController.postArticle)

// PUT => http://localhost:3000/edit-article/id
router.put('/edit-article/:articleId', isWriterAuth, articleController.editArticle)

// DELETE => http://localhost:3000/delete-article/id
router.delete('/delete-article/:articleId', isWriterAuth, articleController.deleteArticle)

// POST => http://localhost:3000/id/comment
router.post('/:articleId/comment', isUserAuth, articleController.commentArticle)


module.exports = router