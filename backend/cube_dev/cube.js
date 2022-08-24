module.exports = {

	// schemaPath: '/query',
	basePath: '/v1/cube',

	checkAuth: async (req, auth) => {
		try {


			const user = JSON.parse(req.headers.user);
			req.securityContext = user;

		} catch {
			throw new Error('Could not authenticate user from LDAP');
		}
	},

	queryRewrite: (query, { securityContext }) => {

		console.log({ query, securityContext });

		// Ensure `securityContext` has an `id` property
		if (!securityContext.tenant_id) {
			throw new Error('No id found in Security Context!');
		}

		query.filters.push({
			member: 'HevoTenantprofile.id',
			operator: 'equals',
			values: [securityContext.tenant_id],
		});

		return query;
	},
};