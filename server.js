// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require('cookie-session')

const db = require('./db');


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'session',
  keys: ["testkey1", "testkey2", "testkey3"]
}));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const homePageRoutes = require("./routes/homePage");
const widgetsRoutes = require("./routes/widgets");
const confirmationRoutes = require("./routes/confirmation")
const menuRoutes = require("./routes/menu")
const myOrdersRoutes = require ("./routes/my-orders");
const checkoutRoutes = require ("./routes/checkout");


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/homePage", homePageRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/confirmation", confirmationRoutes(db));
app.use("/menu", menuRoutes(db));
app.use("/my-orders", myOrdersRoutes(db));
app.use("/checkout", checkoutRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
