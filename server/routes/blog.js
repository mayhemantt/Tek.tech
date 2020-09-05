const express = require('express');
const router = express.Router();
const { create } = require('../controllers/blog');

const { requireSignin, adminMiddleware } = require('../controllers/auth');

router.post('/blog', requireSignin, adminMiddleware, create);
router.get('/blogs', list);
router.post('/blogs-categories-tags', listAllBlogsCategoriesTags);
router.get('/blog/:slug', read);


module.exports = router;