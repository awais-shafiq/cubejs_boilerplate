const { StatusCodes } = require('http-status-codes');

module.exports = {

	/**
	 * 
	 * @param {import ("express").Response} res 
	 * @param {{result?, error?}} data 
	 */
	handleResponse: (res, data) => {

		const { result, error } = data;

		if (error) {
			res.status(error.status).json({ message: error.message });
		} else if (result) {
			res.status(result.status).json(result.data);
		} else {
			res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
		}

	}

};