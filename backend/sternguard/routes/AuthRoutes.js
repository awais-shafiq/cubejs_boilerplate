const router = require('express').Router();
const authController = require('../controllers/AuthController');
const { handleResponse } = require('../utilities/ResponseManager');

router.post('/login', async (req, res) => {
	// const { email, password } = req.body;
	// const { result, error } = await authController.login(email, password, req.query);
	const data = await authController.login(req.body);
	handleResponse(res, data);

	// if (error) {
	// 	res.status(error.status).json({ message: error.message });
	// } else if (result) {
	// 	// res.cookie("token", result.message.refresh_token, {
	// 	// 	maxAge: 3600000 * (24 * 7),
	// 	// 	signed: true,
	// 	// 	secret: process.env.COOKIE_SECRETE_KEY,
	// 	// });
	// 	res.status(result.status).json(result.message);
	// } else {
	// 	res.sendStatus(500);
	// }
});


module.exports = router;
