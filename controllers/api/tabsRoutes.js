const router = require('express').Router();
const { User,Blog } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const BlogData = await Blog.findAll({
      include:[User]
    });
    res.status(200).json(BlogData);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);

  }
});


  router.post('/', async (req, res) => {
    try {
      const BlogData = await Blog.create(req.body);
      res.status(200).json(BlogData);
    } catch (err) {
      console.log(err)
      res.status(400).json(err);
  }});

  module.exports = router;