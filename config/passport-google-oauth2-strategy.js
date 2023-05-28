const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/User");
const { error } = require("console");

// tell passport to use new strategy for google login
passport.use(
  new googleStrategy(
    {
      clientID:
        "767017057393-32efumpupqj4db7fdmqv4ka16cc7mk1b.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3002/auth/google/callback",
      
    },
    // find a user
    async function (accessToken, refreshToken, profile, done) {
      try {
        const user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
          return done(null, user);
        } else {
          // if not found ,create the user and set it as req.user
          const newuser = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString("hex"),
          });
          if (newuser) {
            return done(null, newuser);
          } else {
            console.log("error in creating user google-strategy-passport");
            return;
          }
        }
      } catch (err) {
        console.log("error in google-strategy-passport", err);
        return;
      }
    }
  )
);
module.exports = passport;
