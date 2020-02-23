const router = require('express').Router();
var bcrypt = require('bcrypt');
const db = require('../models');

 router
        .get('/', (req, res) => {
                if(req.session.user){
                        res.redirect('/login');
                }
                res.render('Home.html');
        })
        .get('/signup', (req, res) => {
                res.render('signUpForm.html');
        })
        .post('/signup', async (req, res) => {
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
        .get('/signin', (req, res) => res.render('signIn.html'))
        .post('/signin', async (req, res) => {
                try{
                        const user = await db.user.findOne({where: { user_id: req.body.id }});
                        if(!user){
                                return res.send('<script>alert("틀렸음");location.href="/signin";</script>');
                        }
                        const result = bcrypt.compareSync(req.body.password, user.password);
                        if (result == true) {
                                req.session.user = user;
                                console.log(req.session.user);
                                return res.redirect('/');
                        } else{
                                res.send('<script>alert("틀렸음");location.href="/signin";</script>');
                        }
                } catch(e){
                        console.log(e);
                }
        })
        .get('/login', (req, res) => res.render('loginPage.html'))
        .get('/logout', (req, res) => {
                req.session.destroy(function(err) {
                        console.log(req.session);
                        res.send('<script>alert("세션이 종료됨");location.href="/";</script>');
                })
        })

module.exports = router;