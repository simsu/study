const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const router = require('./routes/index.js');
  // const db = require('./models');

  // db.sequelize.sync({force: true});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));

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
  //throw error('error'); // css-tricks //javascript info //regex //vim
  next();
})

app.use('/', router);

app.listen(3000, function(){
    console.log("HelloWorld!");
});