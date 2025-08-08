const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function findOrCreateOAuthUser(profile, provider) {
  const email = profile.emails && profile.emails[0] && profile.emails[0].value;
  const name = profile.displayName || (profile.name ? `${profile.name.givenName || ''} ${profile.name.familyName || ''}`.trim() : provider + ' User');

  let user = null;
  if (email) {
    user = await User.findOne({ email });
  }

  if (!user) {
    // Create a random password placeholder for OAuth accounts
    const randomPassword = Math.random().toString(36).slice(-12) + 'Aa1!';
    user = await User.create({ name, email: email || `${provider}_${profile.id}@example.com`, password: randomPassword });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  return { user, token };
}

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_CALLBACK_URL) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  }, async (_accessToken, _refreshToken, profile, done) => {
    try {
      const result = await findOrCreateOAuthUser(profile, 'google');
      return done(null, { id: result.user._id, token: result.token });
    } catch (e) {
      return done(e);
    }
  }));
} else {
  console.warn('Google OAuth env vars not set; Google login disabled.');
}

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET && process.env.GITHUB_CALLBACK_URL) {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    scope: ['user:email']
  }, async (_accessToken, _refreshToken, profile, done) => {
    try {
      if (!profile.emails || profile.emails.length === 0) {
        profile.emails = [{ value: `${profile.username || 'github'}_${profile.id}@example.com` }];
      }
      const result = await findOrCreateOAuthUser(profile, 'github');
      return done(null, { id: result.user._id, token: result.token });
    } catch (e) {
      return done(e);
    }
  }));
} else {
  console.warn('GitHub OAuth env vars not set; GitHub login disabled.');
}


module.exports = passport;


