const express = require('express');
const { create, genreById, read, update, remove, list } = require('../controller/genre');
const { requireSignIn, isAuth, isAdmin } = require('../controller/auth');
const { userById } = require('../controller/user');


const router = express.Router();

router.get('/genre/:genreId', read);
router.post('/genre/create/:userId', requireSignIn, isAuth, isAdmin, create);
router.put('/genre/:genreId/:userId', requireSignIn, isAuth, isAdmin, update);
router.delete('/genre/:genreId/:userId', requireSignIn, isAuth, isAdmin, remove);
router.get('/genres', list);

router.param('genreId', genreById);
router.param('userId', userById);

module.exports = router;