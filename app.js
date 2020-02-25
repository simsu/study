const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const models = require('./models');
const router = require('./routes/index.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }), flash())

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
})

app.use('/', router);

app.listen(3000, function(){
    console.log("HelloWorld!");
});