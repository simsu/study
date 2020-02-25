const router = require('express').Router();
var bcrypt = require('bcrypt');
const db = require('../models');
const auth = require('../libs/auth');

 router
        .get('/', (req, res) => {
                res.render('index');
        })
        .get('/register', (req, res) => {
                res.render('register');
        })
        .post('/register', async (req, res) => {
                try{
                        const hash = bcrypt.hashSync(req.body.password, 10);
                        console.log(hash);
                        await db.user.create({
                                userId: req.body.id,
                                password: hash,
                                email: req.body.email,
                                name: req.body.name
                        })
                        return (
                                res.send('<script>alert("회원가입됨");location.href="/";</script>')
                        );
                } catch(e){
                        console.log(e);
                }
        })
        .get('/login', (req, res) => res.render('login'))
        .post('/login', async (req, res) => {
                try{
                        const user = await db.user.findOne({where: { userId: req.body.id }});
                        if(!user){
                                return res.send('<script>alert("틀렸음");location.href="/login";</script>');
                        }
                        const result = bcrypt.compareSync(req.body.password, user.password);
                        if (result == true) {
                                req.session.user = user;
                                console.log(req.session.user);
                                return res.render('home');
                        } else{
                                res.send('<script>alert("틀렸음");location.href="/login";</script>');
                        }
                } catch(e){
                        console.log(e);
                }
        })
        .get('/login', auth.loginRequired, (req, res) => {
                
                res.render('home')
        })
        .get('/logout', auth.loginRequired, (req, res) => {
                req.session.destroy(function(err) {
                console.log(req.session);
                res.send('<script>alert("세션이 종료됨");location.href="/";</script>');
                })
               
        })

module.exports = router;