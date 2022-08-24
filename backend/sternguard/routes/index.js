const router = require('express').Router();
const Middleware = require('../utilities/Middleware');

const rbacRoutes = require('./RbacRoutes');
const authRoutes = require('./AuthRoutes');

router.use('/v1/rbac', Middleware.authenticateToken, rbacRoutes);
router.use('/v1/auth', authRoutes);

module.exports = router;