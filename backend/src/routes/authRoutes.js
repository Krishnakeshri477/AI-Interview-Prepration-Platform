// backend\src\routes\authRoutes.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { register, login, logout} = require('../controllers/authController');

router.post('/register', register);

router.post('/login', login);

router.get('/logout',logout)

// OAuth: Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/?error=google' }), (req, res) => {
  const token = req.user.token;
  res.redirect(`/oauth-success?token=${token}`);
});

// OAuth: GitHub
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', { session: false, failureRedirect: '/?error=github' }), (req, res) => {
  const token = req.user.token;
  res.redirect(`/oauth-success?token=${token}`);
});


module.exports = router;