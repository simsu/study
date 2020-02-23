const express = require('express');
const session = require('express-session');
const models = require('./models');
const router = require('./routes/index.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }))

app.use('/', router);

models.sequelize.sync().then(() => app.listen(3000, function(){
    console.log("HelloWorld!");
}));