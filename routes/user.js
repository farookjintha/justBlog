const express = require('express');
const { requireSignIn, isAuth, isAdmin } = require('../controller/auth');
const { userById, read, update } = require('../controller/user');

const router = express.Router();

router.get('/secret/:userId', requireSignIn, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});

router.get('/user/:userId', requireSignIn, isAuth, read);
router.put('/user/:userId', requireSignIn, isAuth, update);

router.param('userId', userById);

module.exports = router;