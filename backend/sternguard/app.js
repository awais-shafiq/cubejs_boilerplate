const express = require('express');
// const bodyParser = require("body-parser");
//const { crossOriginResource, authenticateToken, parseUser } = require("./utility/Middleware");
const {
	crossOriginResource,
	// parseUser,
	// authenticateToken,
} = require('./utilities/Middleware');
// const dbConfig = require('./database/DatabaseConfig');
const routes = require('./routes');
// const cookieParser = require("cookie-parser");
// const rbacRoute = require('./routes/RbacRoutes');
// const authRoute = require('./routes/AuthRoutes');
// const oauthRoute = require('./routes/OauthRoutes');
// const tokenRoute = require('./routes/TokenRoute');
// const userRoute = require('./routes/UserRoutes');
// const tenantRoute = require('./routes/TenantRoutes');
// const oauthRoute = require("./routes/OAuthRoutes");
// const rolesRoute = require('./routes/RoleRoutes');
// const roleScopeRoutes = require('./routes/RoleScopeRoutes');
// const roleAssignmentRoute = require('./routes/RoleAssignmentRoutes');
// const subscriptionRoutes = require('./routes/SubscriptionRoutes');
// const subscriptionWebhookRoutes = require('./routes/SubscriptionWebhookRoutes');
// const adminRoutes = require('./routes/AdminRoutes');

// const { startConsumer } = require('./utilities/KafkaConsumer');
// const { eventCallBack } = require('./utilities/KafkaEvent');
// const { webhookCheck } = require('./utilities/StripeManager');

const app = express();

//Initialize Database
// dbConfig.initializeDB();

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// app.use(
// 	'/v1/subscriptions_webhook',
// 	express.raw({ type: 'application/json' }),
// 	webhookCheck,
// 	subscriptionWebhookRoutes
// );

// parse application/json

app.use(express.json({
	verify: (req, res, buf) => {
		req.rawBody = buf;
	}
}));

// parse cookies
// app.use(cookieParser(process.env.COOKIE_SECRETE_KEY));

//app routes
app.use(crossOriginResource);
app.use(routes);

// app.use("/v1/rbac", authenticateToken, rbacRoute);
// app.use('/v1/rbac', authenticateToken, rbacRoute);
// app.use('/v1/auth', authRoute);
// app.use('/v1/oauth', parseUser, oauthRoute);
// app.use('/v1/oauth_token', tokenRoute);
// app.use('/v1/user', parseUser, userRoute);
// app.use('/v1/tenant', tenantRoute);
// app.use('/v1/roles', rolesRoute);
// app.use('/v1/role_assignments', parseUser, roleAssignmentRoute);
// app.use('/v1/role_scopes', roleScopeRoutes);
// app.use('/v1/subscriptions', parseUser, subscriptionRoutes);
// app.use('/v1/super_admin', parseUser, adminRoutes);

// startConsumer(eventCallBack, {
// 	topic: process.env.KAFKA_EVENT_TOPIC,
// 	group: process.env.KAFKA_STERNGUARD_GROUP_ID,
// 	client: 'omers_event_stream',
// }).catch((err) => {
// 	console.error(`Kafka Consumer Error:${err}`);
// 	process.exit(1);
// });

//Configure app on port
app.listen(process.env.PORT, () => {
	console.log(`Server Started on Port ${process.env.PORT}`);
});
