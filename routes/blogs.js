const express = require('express');
const { postBlog, blogById, read, remove, update, list, photo, listBySearch, listRelated } = require('../controller/blogs');
const { requireSignIn, isAuth } = require('../controller/auth');
const { userById } = require('../controller/user');


const router = express.Router();


router.get('/blogs', list);
router.get('/blog/:blogId', read);
router.post('/blog/create/:userId', requireSignIn, isAuth, postBlog);
router.delete('/blog/:blogId/:userId', requireSignIn, isAuth, remove);
router.put('/blog/:blogId/:userId', requireSignIn, isAuth, update);
router.get('/blog/photo/:blogId', photo);

router.post('/blogs/by/search', listBySearch);
router.get('/blogs/related/:blogId', listRelated);

router.param('userId', userById);
router.param('blogId', blogById);


module.exports = router;