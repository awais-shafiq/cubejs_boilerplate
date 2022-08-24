const exceptionHandler = require('../utilities/Exceptions');
const {
	generateAccessToken,
	generateRefreshToken,
} = require('../utilities/Authentication');
const { StatusCodes } = require('http-status-codes');
const logger = require('../utilities/Logger');




const login = async function ({ email, user_id, tenant_id }) {
	try {

		const user = {
			id: user_id,
			tenant_id: tenant_id,
			email: email,
		};

		console.log({ user });

		const { access_token, expiration_timestamp } = generateAccessToken({ ...user });
		const refreshToken = generateRefreshToken({ ...user });

		console.log({ user });

		return {
			result: {
				status: StatusCodes.OK,
				data: {
					user_id: user.id,
					tenant_id: user.tenant_id,
					email: user.email,
					access_token: access_token,
					refresh_token: refreshToken,
					expires_at: expiration_timestamp,
				},
			},
		};
		// }
	} catch (error) {
		logger.error({ error });
		return { error: exceptionHandler.getError(error) };
	}
};

module.exports = {
	login,
};
