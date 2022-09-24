const express = require('express');
const { signup, signin, signout, requireSignIn } = require('../controller/auth');
const { userSignupValidator }  = require('../validator');

const router = express.Router();

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

router.get('/hello',requireSignIn, (req, res) =>{
    res.send('Hello There');
});

module.exports = router;