const { StatusCodes } = require('http-status-codes');
const UserRole = require('../database/models/UserRole');
const Subscription = require('./../database/models/Subscription');
const exceptionHandler = require('./../utilities/Exceptions');


/**
 *
 * @summary This function will list all roles and permissions of the user
 * @param {number} userId Unique id of the user
 * @returns
 */
// const listPermissions = async function (userId) {
// 	try {
// 		// const data = await RoleAssignment.query().select("role_id", "roles.role_name")
// 		// 	.joinRelated("roles")
// 		// 	.where("user_id", userId)
// 		// 	.withGraphFetched("permissions");

// 		// 		// const data = await Role.query()
// 		// 		// 	.select(["id", RoleAssignment.query().findOne({ user_id: 31 }).select("Role_Assignment.role_id")])
// 		// 		// 	.withGraphFetched("permissions");

// 		// 		// const data = await RoleAssignment.query().findOne({ user_id: 31 })
// 		// 		// 	.select("Role_Assignment.role_id",
// 		// 		// 		Role.query().where("role_id", "Role_Assignment.role_id").withGraphFetched("permissions")
// 		// 		// 	);

// 		// 		// const data = await Role.query().findOne({ id: 1 }).withGraphFetched("permissions");

// 		//return { result: { status: 200, data: data } };
// 		return { result: { status: 200, data: userId } };
// 	} catch (err) {
// 		return { error: exceptionHandler.getError(err) };
// 	}
// };

/**
 *
 * @summary This function will check permission of the user for action on given object name
 * @param {number} userId
 * @param {string} objectName
 * @param {string} actionName
 * @returns
 */
const checkPermission = async function (userId, objectName, actionName, tenantId) {
	try {
		// console.log(userId, objectName, actionName, tenantId);

		const data = await UserRole.query()
			.findOne({ user_id: userId, tenant_id: tenantId })
			.withGraphJoined('[role, permissions, tenant]')
			.where('permissions.object_name', objectName)
			.where('permissions.action_name', actionName)
			// .where('user_id', userId)
			// .andWhere('tenant_id', tenantId)
			// .first()
			.throwIfNotFound();

		return { result: { status: StatusCodes.OK, data: data } };
		// return { result: { status: 200 } };
	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

/**
 *
 */

const getSubscriptionPackage = async function (tenantId) {
	try {
		const subscription = await Subscription.query()
			.select('*', 'subscription_package.*')
			.findOne({ tenant_id: tenantId })
			.joinRelated('subscription_package')
			.throwIfNotFound();

		return { result: { status: 200, data: subscription } };
	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

module.exports = { checkPermission, getSubscriptionPackage };
