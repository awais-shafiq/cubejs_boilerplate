const { StatusCodes } = require('http-status-codes');
const { validateToken } = require('./Authentication');

//Allow Cross-origin resource sharing
exports.crossOriginResource = async function (req, res, next) {

	// Website you wish to allow to connect
	if (req.headers.origin) {
		res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
	}

	// Request methods you wish to allow
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE',
	);

	// Request headers you wish to allow
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-Requested-With, sentry-trace, content-type, authorization, accept',
	);

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	if (req.method === 'OPTIONS') {
		res.sendStatus(200);
	} else {
		next();
	}
};

exports.authenticateToken = function (req, res, next) {
	const authorizationHeader = req.headers['authorization'];

	const accessToken = authorizationHeader && authorizationHeader.split(' ')[1];

	if (!accessToken) {
		return res.sendStatus(403);
	}

	try {
		const tokenData = validateToken(
			accessToken,
			process.env.ACCESS_TOKEN_SECRET_KEY,
		);

		// console.log(tokenData);

		req.user = tokenData.user;

		next();
	} catch (err) {
		console.log({ err });
		res.sendStatus(401);
	}
};

exports.parseUser = function (req, res, next) {

	try {

		const userHeader = req.headers['user'];

		if (!userHeader) {
			res.status(404).send('Invalid Request');
		}

		req.user = JSON.parse(userHeader);

		next();
	} catch (error) {
		res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid request' });
	}
};
