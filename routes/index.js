const router = require("express").Router();
const axios = require("axios");
var bcrypt = require("bcrypt");
var multer = require("multer");
const path = require("path");
const db = require("../models");
const auth = require("../libs/auth");


var data = {count:0};

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  }
});
var upload = multer({ storage: storage })
router
  .get("/", (req, res) => {
    res.render("home");
  })
  .get("/count", (req, res) => {
    data.count ++;
    res.render("count", data);
  })
  .get("/register", (req, res) => {
    res.render("register");
  })
  .post("/register", auth.registerValidate, async (req, res) => {
    try {
      const hash = bcrypt.hashSync(req.body.password, 10);
      console.log(hash);
      await db.user.create({
        userId: req.data.userId,
        password: hash,
        email: req.body.email,
        name: req.body.name
      });
      return res.send(
        '<script>alert("회원가입됨");location.href="/";</script>'
      );
    } catch (e) {
      console.log(e);
    }
  })
  .get("/login", (req, res) => res.render("login.html"))
  .post("/login", async (req, res) => {
    try {
      const user = await db.user.findOne({ where: { userId: req.body.id } });
      if (!user) {
        return res.send(
          '<script>alert("틀렸음");location.href="/login";</script>'
        );
      }
      const result = bcrypt.compareSync(req.body.password, user.password);
      if (result == true) {
        req.session.user = user;
        return res.redirect("/");
      } else {
        res.send('<script>alert("틀렸음");location.href="/login";</script>');
      }
    } catch (e) {
      console.log(e);
    }
  })
  .get("/logout", (req, res) => {
    if (req.session.user) {
      req.session.destroy(function(err) {
        
      });
      console.log(req.session);
      res.send('<script>alert("세션이 종료됨");location.href="/";</script>');
    }
    res.redirect("/");
  })
  .get("/list", async (req, res) => {
    let items = null;
    if (req.session.user) {
      items = await db.board.findAll({
        where: {
          userId: req.session.user.name
        },
        order: [
          ['createdAt', 'DESC']
        ]
      });
      if(items){
        items.forEach(e => {
          console.log(e);
          e.imgFakeName = e.imgFakeName.split(';')[0];
        });
      }
      return res.render("list", { items });
    }
    return res.redirect("login");
  })
  .get("/board/:id", async(req, res) => {
    var board = await db.board.findOne({
      where: {
        id: req.params.id
      }
    });
    var file = board.imgFakeName.split(';');
    board.imgFakeName = file;
    return res.render("view", {board});
  })
  .get("/write", (req, res) => {
    if (req.session.user != null) {
      res.render("write");
    }
    else res.redirect("login");
  })
  .post("/write", upload.array("file", 10), async (req, res) => {
    var rName = "";
    var fName = "";
    req.files.forEach(e => {
      rName += e.originalname + ";";
      fName += e.filename + ";";
    });
    try {
      console.log(req.files);
      await db.board.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.session.user.name,
      imgRealName: rName,
      imgFakeName: fName
      });
      return res.redirect("/");
    } catch (e) {
      console.error(e);
      console.log(req.session.user.user);
      return res.send('<script>alert("실패");location.href="/";</script>');
    }
  })
  .get("/update/:id", async(req, res) => {
    const board = await db.board.findOne({
      where: {
        id: req.params.id
      }
    })
    return res.redirect("write", {board})
  })
  .get("/delete:id", async (req, res) => {
    const board = await db.board.destroy({
      where: {
        id: req.params.id
      }
    })
    console.log("삭제");
    return res.redirect("list");
  })

module.exports = router;
