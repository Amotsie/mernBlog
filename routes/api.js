const express = require("express");
const BlogPost = require("../models/plogPost");
const router = express.Router();

//Routes
router.get("/", (req, res) => {
  BlogPost.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.post("/save", (req, res) => {
  const data = req.body;
  const newBlogPost = new BlogPost(data);
  newBlogPost.save((error) => {
    if (error) {
      console.log(error);
      return res.status(500).json(error);
    } else {
      return res.json({ message: "Post recieved and stored..." });
    }
  });
});

router.get("/name", (req, res) => {
  const data = {
    name: "Andreas Motsie",
    level: "Senior",
    Year: 4,
  };

  res.send(data);
});

module.exports = router;
