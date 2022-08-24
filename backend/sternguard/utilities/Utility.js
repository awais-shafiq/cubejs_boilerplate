const bcrypt = require('bcrypt');
const { Storage } = require('@google-cloud/storage');
const freeEmailDomains = require('free-email-domains');

/**
 *
 * @param {string} email Email to be validated
 * @returns {boolean} true if email is valid else false
 */
const isEmailValid = function (email) {
	const validationRegex = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);
	
	if (!validationRegex.test(email)) {
		return false;
	} else {
		const domain = email.split('@')[1];
		if (freeEmailDomains.includes(domain)) {
			return false;
		}
	}
	
	return true;
};

/**
 *
 * @param {string} password Password to be validated
 */
const isPasswordValid = function (password) {
	const validationRegex = new RegExp(
		/[A-Za-z0-9._%+-@#$!^&*()={},~`]{6,60}/g
	);
	return validationRegex.test(password);
};

/**
 *
 * @param {string} invite_id uuid4 assesment invite id to be validated
 */
const isInviteIdValid = function (invite_id) {
	const validationRegex = new RegExp(
		/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
	);
	return validationRegex.test(invite_id);
};

/**
 *
 * @param {string} text plain text that has to be encrypted
 * @param {number} saltRounds number of rounds for salt
 * @returns {string} encrypted hash
 */
const getHash = async function (text, saltRounds) {
	return await bcrypt.hash(text, saltRounds);
};

/**
 *
 * @param {string} plain plain text that needs to be validated
 * @param {string} hash encrypted hash that will validate plain text
 * @returns {boolean} true if hash compare is success else false
 */
const isHashValid = async function (plain, hash) {
	return await bcrypt.compare(plain, hash);
};

/**
 *
 * @param {string} text Text that you want to capitalize
 * @example toCapitalizedCase(text)
 * @returns {string} Capitalized Text
 */

const getStandardString = function (text) {
	return text.replace(/_|:|-/g, ' ').replace(/ +(?= )/g, '');
};

/**
 *
 * @summary this function will map request path to object name
 * @param {string} requestPath Request url path
 * @returns
 */
const mapRequestPathToObject = function (requestPath) {
	return requestPath.replace('/v1/', '').split('/')[0];
};

/**
 *
 * @summary This function will map request methods to action names
 * @param {string} method Name of the request method
 * @returns
 */
const mapMethodToAction = function (method) {
	const methods = {
		POST: 'CREATE',
		GET: 'READ',
		PATCH: 'UPDATE',
		PUT: 'UPDATE',
		DELETE: 'DELETE',
	};

	return methods[method];
};

/**
 *
 * @summary This function will upload an image to GCS
 * @param {blob} imageFile Name of the request method
 * @returns {object}
 */
const upload_To_GCS = async function (imageFile) {
	var bucketName = process.env.SOCIAL_LOGO_BUCKET;
	var storage = new Storage();
	const bucket = storage.bucket(bucketName);
	const gcsFileName = `${Date.now()}-${imageFile.originalname}`;
	const file = bucket.file(gcsFileName);
	const stream = file.createWriteStream({
		metadata: {
			contentType: imageFile.mimetype,
		},
	});

	stream.on('error', (err) => {
		console.log('GCS Error:', err);
		return {
			success: false,
			data: err,
			imageName: imageFile.fieldname,
		};
	});

	stream.end(imageFile.buffer);
	const publicUrl = `https://storage.googleapis.com/${bucketName}/${gcsFileName}`;
	return {
		success: true,
		data: publicUrl,
		imageName: imageFile.fieldname,
	};
};

module.exports = {
	isEmailValid,
	getHash,
	isHashValid,
	getStandardString,
	isPasswordValid,
	isInviteIdValid,
	mapRequestPathToObject,
	mapMethodToAction,
	upload_To_GCS,
};
