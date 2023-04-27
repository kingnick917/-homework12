const router = require('express').Router();
const { User,Blog } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const user = (await User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.session.user_id
      }
    })).get({ plain: true });

    console.log("passing in this user:", user);

    const users = userData.map((user) => user.get({ plain: true }));

    console.log(users);

    res.render('homepage', { //.handlebars but you don't need to put that
      user,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login',  async(req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});
router.get(`/dashoard`, async (req, res) => {
  const BlogData = await Blog.findAll({
    include:[User]
  });
  console.log(BlogData)

  if (req.session.logged_in) {
    res.render('dashoard',{BlogData});
    return;
  }
})
router.get(`/homepage`, (req, res) => {
  if (req.session.logged_in) {
    res.render('homepage');
    return;
  }
})

module.exports = router;
