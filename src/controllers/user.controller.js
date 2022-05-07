const express = require("express");
const router = express.Router();
const User =  require("../models/user.model")
const Comment = require("../models/comment.model");


router.get("/", async (req, res) => {
  try {
    const users = await User.find().lean().exec();
    return res.send(users);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get('/:id/post', async(req, res)=>{
  try {
      const { page = 1, pageSize = 10 } = req.query;
      let offset = (page - 1) * pageSize;
      const post = await Comment.find().skip(offset).limit(pageSize);
      res.status(200).json(post);
  } catch (err) {
      res.status(400).send(err.message)
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;