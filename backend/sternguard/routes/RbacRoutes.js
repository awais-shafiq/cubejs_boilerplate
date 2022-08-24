const router = require('express').Router();
// const {
// 	mapMethodToAction,
// 	mapRequestPathToObject,
// } = require('./../utilities/Utility');
// const rbacController = require('./../controllers/RbacController');
// const { StatusCodes } = require('http-status-codes');
// const logger = require('../utilities/Logger');

router.use('/check', async (req, res) => {
	
	console.log(req.user);
	res.setHeader('user', JSON.stringify(req.user));
	res.sendStatus(200);

});

module.exports = router;
