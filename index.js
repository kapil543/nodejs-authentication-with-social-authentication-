const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

const app = express();
const PORT = process.env.PORT || 3002;

//------------ Passport-google Configuration ------------//
const passportGoogle=require('./config/passport-google-oauth2-strategy');

//------------ Passport Configuration ------------//
require("./config/passport")(passport);

//------------ DB Configuration ------------//
const db = require("./config/mongoose");

//------------ EJS Configuration ------------//
app.use(expressLayouts);
app.use("/assets", express.static("./assets"));
app.set("view engine", "ejs");
app.set("views","./views");


//------------ Bodyparser Configuration ------------//
app.use(express.urlencoded({ extended: false }));

//------------ Express session Configuration ------------//
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

//------------ Passport Middlewares ------------//
app.use(passport.initialize());

app.use(passport.session());

//------------ Connecting flash ------------//
app.use(flash());

//------------ Global variables ------------//
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});
//------------ Routes ------------//
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));


app.listen(PORT, console.log(`Server running on http://localhost:${PORT}`));
