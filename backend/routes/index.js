var express = require("express");
const { sigupinsert, logincheck } = require("../controller/authController");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/signup", (req, res) => {
  console.log(req.body);
  sigupinsert(req.body)
    .then(() => {
      res.json({ status: true });
    })
    .catch(() => {
      res.status(401).json();
    });
});

router.post("/adduser", (req, res) => {
  console.log(req.body.data);
  
  sigupinsert(req.body.data)
    .then(() => {
      res.json({ status: true });
    })
    .catch(() => {
      res.status(401).json();
    });
});


router.post("/login", (req, res) => {
  console.log(req.body);
  logincheck(req.body)
    .then((data) => {
      req.session.user = data.userdetails
      res.cookie("jwt", data.refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json(data.userdetails);
    })
    .catch((data) => {
      res.sendStatus(data.status);
    });
});

module.exports = router;
