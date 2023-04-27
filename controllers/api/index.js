const router = require('express').Router();
const userRoutes = require('./userRoutes');
const tabsRoutes = require(`./tabsRoutes`);

router.use('/users', userRoutes);
router.use('/tabs', tabsRoutes);

module.exports = router;
