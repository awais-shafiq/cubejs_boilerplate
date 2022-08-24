const dbConfig = require('./../database/DatabaseConfig');
const KafkaProducer = require('../utilities/KafkaProducer');
const authController = require('../controllers/AuthController');
const rbacController = require('../controllers/RbacController');
const tenantController = require('../controllers/TenantController');
const userController = require('../controllers/UserController.js');
const roleAssignmentController = require('../controllers/RoleAssignmentController');
const roleController = require('../controllers/RoleController');
const roleScopeController = require('../controllers/RoleScopeController');

dbConfig.initializeDB();

const userWithInvalidEmail = { email: '', password: '' };
const userWithInvalidPassword = { email: 'testemail@mail1.com', password: '' };

const token = {};

const user = {
	email: `test${Math.random().toString(36).substring(7)}@${Math.random()
		.toString(36)
		.substring(7)}.com`,
	password: 'testpassword',
};

const user_2 = {
	email: `test${Math.random().toString(36).substring(7)}@${Math.random()
		.toString(36)
		.substring(7)}.com`,
	password: 'testpassword',
};

// For candidate signup testing
const user_3 = {
	email: `test${Math.random().toString(36).substring(7)}@${Math.random()
		.toString(36)
		.substring(7)}.com`,
	password: 'testpassword',
	first_name: 'Brock',
	last_name: 'Lesner'
};

// const candidateRoleId = 15;
const validInviteId = '17c26f1f-c293-465d-b4cd-1449ab9df1c0';

describe('Authentication', () => {
	afterAll(async (done) => {
		// KafkaProducer.disconnect();
		// dbConfig.destroyKnex();
		done();
	});

	//Auth controller Test
	it('Should fail resgister and output json object with bad request status code', async () => {
		const { error } = await authController.register(
			userWithInvalidEmail.email,
			userWithInvalidEmail.password,
		);
		expect(error).toMatchObject({ status: 400 });
	});

	it('Should fail resgister and output json object with bad request status code', async () => {
		const { error } = await authController.register(
			userWithInvalidPassword.email,
			userWithInvalidPassword.password,
		);
		expect(error).toMatchObject({ status: 400 });
	});

	it('Should successfully register and output json object with success status code', async () => {
		const { result } = await authController.register(user.email, user.password);
		user['id'] = result.data.user_id;
		user['tenant_id'] = result.data.tenant_id;
		expect(result).toMatchObject({ status: 201 });
	});

	it('Should fail resgister and output json object with Conflit status code', async () => {
		const { error } = await authController.register(user.email, user.password);
		expect(error).toMatchObject({ status: 409 });
	});

	it('Should successfully login and output json object with success status code', async () => {
		const { result } = await authController.login(user.email, user.password);
		token['refresh_token'] = result.message.refresh_token;
		expect(result).toMatchObject({ status: 200 });
	});

	it('Should fail login and output json object with bad request status code', async () => {
		const { error } = await authController.login(user.email, 'wrongpassword');
		expect(error).toMatchObject({ status: 400 });
	});

	it('Should fail login and output json object with not found status code', async () => {
		const { error } = await authController.login('asada', 'wrongpassword');
		expect(error).toMatchObject({ status: 404 });
	});

	it('Should successfully get new token and output json object with success status code', async () => {
		const { result } = await authController.refreshToken(token.refresh_token);
		expect(result).toMatchObject({ status: 200 });
	});

	it('Should fail refresh token and output json object with unauthorized status code', async () => {
		const { error } = await authController.refreshToken('');
		expect(error).toMatchObject({ status: 401 });
	});

	it('Should fail refresh token and output json object with not found status code', async () => {
		const { error } = await authController.refreshToken(
			'asdasdas.dasd.asd.asd',
		);
		expect(error).toMatchObject({ status: 403 });
	});

	//rbac controller Test
	it('Should successfully check permission and output success status code', async () => {
		const { result } = await rbacController.checkPermission(
			user.id,
			'user',
			'CREATE',
			user.tenant_id,
		);
		expect(result).toMatchObject({ status: 200 });
	});

	// it("Should fail check permission and output not success status code", async () => {
	// 	const { error } = await rbacController.checkPermission();
	// 	expect(error).not.toMatchObject({ status: 200 });
	// });

	it('Should get tenant and output success status code', async () => {
		const { result } = await tenantController.getTenant(user.tenant_id);
		expect(result).toMatchObject({ status: 200 });
	});

	it('Should fail get tenant and output error status code', async () => {
		const { error } = await tenantController.getTenant('1e');
		expect(error).not.toMatchObject({ status: 200 });
	});

	it('Should update tenant and output success status code', async () => {
		const { result } = await tenantController.updateTenant(
			user.tenant_id,
			'true',
		);
		expect(result).toMatchObject({ status: 200 });
	});

	it('Should update tenant and output success status code', async () => {
		const { result } = await tenantController.updateTenant(
			user.tenant_id,
			'false',
		);
		expect(result).toMatchObject({ status: 200 });
	});

	it('Should fail update tenant and output error status code', async () => {
		const { error } = await tenantController.updateTenant('1e', 0);
		expect(error).not.toMatchObject({ status: 200 });
	});
});

describe('User Controllers', () => {
	afterAll(async (done) => {
		KafkaProducer.disconnect();
		dbConfig.destroyKnex();
		done();
	});

	// getUserByEmail & addUsers

	it('Should fail get user and return a json object with bad request status code', async () => {
		const { error } = await userController.getUserByEmail(
			userWithInvalidEmail.email,
		);
		expect(error).toMatchObject({ status: 400 });
	});
	it('Should fail get user and return a json object with not found status code', async () => {
		const { error } = await userController.getUserByEmail(user_2.email);
		expect(error).toMatchObject({ status: 404 });
	});
	it('Should successfully add a user and return a json object with success status code', async () => {
		const { result, error } = await userController.addUsers({
			email: user_2.email,
			role_id: 15,
		});
		console.log(error);
		expect(result).toMatchObject({ status: 201 });
	});

	it('Should successfully get user and return a json object with success status code', async () => {
		const { result } = await userController.getUserByEmail(user_2.email);
		expect(result).toMatchObject({ status: 200 });
	});

	it('Should fail add user and return a json object with bad request status code', async () => {
		const { error } = await userController.addUsers({
			email: userWithInvalidEmail.email,
		});
		expect(error).toMatchObject({ status: 400 });
	});
	it('Should fail add user and return a json object with conflict status code', async () => {
		const { error } = await userController.addUsers({
			email: user.email,
			role_id: 'stuff',
		});
		expect(error).toMatchObject({ status: 409 });
	});

	// addTeamMember

	it('Should fail add a team member and return a json object with bad request status code', async () => {
		const { error } = await userController.addTeamMember(
			userWithInvalidEmail.email,
			12,
			[],
		);
		expect(error).toMatchObject({ status: 400 });
	});
	// it("Should fail add a team member and return a json object with bad request status code", async () => {
	// 	const { error } = await userController.addTeamMember(user_2.email, 12);
	// 	expect(error).toMatchObject({ status: 400 });
	// });
	// it("Should fail add a team member and return a json object with bad request status code", async () => {
	// 	const { error } = await userController.addTeamMember(user_2.email, []);
	// 	expect(error).toMatchObject({ status: 400 });
	// });
	it('Should successfully add a team member and return a json object with success status code', async () => {
		const { result } = await userController.addTeamMember(
			user_2.email,
			12,
			user.tenant_id,
			[],
		);
		user_2['id'] = result.message.user_id;
		user_2['role_id'] = 12;
		user_2['tenant_id'] = result.message.tenant_id;
		expect(result).toMatchObject({ status: 201 });
	});

	// Switch tenant account
	it('Should successfully switch tenant of a user', async () => {
		const { result } = await userController.switchTenantAccount(
			user,
			user_2.tenant_id,
		);
		expect(result).toMatchObject({ status: 200 });
	});

	// Get tenant ids of user
	it('Should successfully show list of tenants of a user', async () => {
		const { result } = await roleAssignmentController.getTenantsIdsOfUser(
			user.id,
		);
		expect(result).toMatchObject({ status: 200 });
	});

	it('Should fail to show list of tenants of a user', async () => {
		const { error } = await roleAssignmentController.getTenantsIdsOfUser('abc');
		expect(error).toMatchObject({ status: 404 });
	});

	// Get Team Members
	it('Should successfully show list of team members of a tenant', async () => {
		const { result } = await roleAssignmentController.getTeamMembers(
			user.tenant_id,
			user.id,
		);
		expect(result).toMatchObject({ status: 200 });
	});

	it('Should fail to show list of team members of a tenant', async () => {
		const { error } = await roleAssignmentController.getTeamMembers(
			user.tenant_id,
		);
		expect(error).toMatchObject({ status: 404 });
	});

	// updateTeamMember

	it('Should fail to update a team member and return a json object with bad request status code', async () => {
		const { error } = await userController.updateTeamMember(
			userWithInvalidEmail,
		);
		expect(error).toMatchObject({ status: 400 });
	});
	it('Should successfully update a team member and return a json object with success status code', async () => {
		const { result } = await userController.updateTeamMember(
			user_2.id,
			user_2.email,
			user_2.role_id,
			user_2.tenant_id,
			[{ client_id: 1 }, { client_id: 2 }],
		);
		expect(result).toMatchObject({ status: 200 });
	});

	// deleteTeamMember

	it('Should fail delete team member and return a json object with not found status code', async () => {
		const { error } = await userController.deleteTeamMember(
			0,
			user_2.tenant_id,
		);
		expect(error).toMatchObject({ status: 404 });
	});

	it('Should successfully delete a role scope with success status code', async () => {
		const { result } = await roleScopeController.deleteRoleScopes(1);
		expect(result).toMatchObject({ status: 200 });
	});

	it('Should fail delete a role scope with not found status code', async () => {
		const { error } = await roleScopeController.deleteRoleScopes();
		expect(error).toMatchObject({ status: 404 });
	});

	it('Should successfully delete a team member and return a json object with success status code', async () => {
		const { result } = await userController.deleteTeamMember(
			user_2.id,
			user_2.tenant_id,
		);
		expect(result).toMatchObject({ status: 200 });
	});

	//Role Controller
	it('Should fail to update a team member and return a json object with bad request status code', async () => {
		const { result } = await roleController.listRole();
		expect(result).toMatchObject({ status: 200 });
	});

	test('Test should show records of user emails of array of ids', async () => {
		const { result } = await userController.getEmails([user_2.id]);
		expect(result.status).toEqual(200);
	});

	test('Test should fail to show records of user emails of array of ids', async () => {
		const { error } = await userController.getEmails(user_2.id);
		expect(error.status).toEqual(404);
	});

	// Admin Login

	it('Should successfully admin login and output json object with success status code', async () => {
		const { result } = await authController.loginAdmin(
			'admin@ranknrole.com',
			'123qwe'
		);
		// token["refresh_token"] = result.message.refresh_token;
		expect(result).toMatchObject({ status: 200 });
	});

	it('Should fail admin login and output json object with bad request status code', async () => {
		const { error } = await authController.loginAdmin(
			'admin@ranknrole.com',
			'wrongpassword'
		);
		expect(error).toMatchObject({ status: 400 });
	});

	it('Should fail admin login and output json object with not found status code', async () => {
		const { error } = await authController.loginAdmin('asada', 'wrongpassword');
		expect(error).toMatchObject({ status: 404 });
	});

	//Candidate Sign Up Controller

	// Invalid password scenario
	it('Should fail candidate signup and output json object with bad request status code', async () => {
		const { error } = await authController.candidateSignUp(
			{
				...userWithInvalidPassword
			}
		);
		expect(error).toMatchObject({ status: 400 });
	});

	// Invalid JWT invite token scenario
	it('Should fail candidate signup and output json object with forbidden status code', async () => {
		const { error } = await authController.candidateSignUp(
			{
				password: '123qwe',
				invite_token: '123'
			}
		);
		expect(error).toMatchObject({ status: 403 });
	});

	// Invalid invite id format scenario
	it('Should fail candidate signup and output json object with bad request status code', async () => {
		const { error } = await authController.candidateSignUp(
			{
				password: '123qwe',
				invite_id: '123'
			}
		);
		expect(error).toMatchObject({ status: 400, message: 'Invalid invite format' });
	});

	// Invalid invite email scenario
	it('Should fail candidate signup and output json object with bad request status code', async () => {
		const { error } = await authController.candidateSignUp(
			{
				password: '123qwe',
				invite_id: validInviteId,
				email: userWithInvalidEmail.email
			}
		);
		expect(error).toMatchObject({ status: 400, message: 'Invalid Email Address' });
	});

	// Email conflict scenario
	it('Should fail candidate signup and output json object with conflict status code', async () => {
		const { error } = await authController.candidateSignUp(
			{
				password: '123qwe',
				invite_id: validInviteId,
				email: user.email
			}
		);
		expect(error).toMatchObject({ status: 409 });
	});

	// Successful candidate signup using invite_id
	it('Should sign up candidate successfully and output json object with created status code', async () => {
		const { result } = await authController.candidateSignUp(
			{
				invite_id: validInviteId,
				...user_3
			}
		);
		expect(result).toMatchObject({ status: 201 });
	});
});
