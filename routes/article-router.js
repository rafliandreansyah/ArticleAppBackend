const { Router } = require('express')

const router = Router()
const articleController = require('../controllers/article-controller')

// GET => http://localhost:3000/
router.get('/', articleController.getArticle)

// POST => http://localhost:3000/add-article
router.post('/add-article', articleController.postArticle)

// PUT => http://localhost:3000/edit-article/id
router.put('/edit-article/:articleId', articleController.editArticle)

// PUT => http://localhost:3000/delete-article/id
router.delete('/delete-article/:articleId', articleController.deleteArticle)


module.exports = router