const DEFAULT_PRICING_ID = process.env.DEFAULT_PRICING_ID;
const DEFAULT_COUPON_ID = process.env.DEFAULT_COUPON_ID;

// stripe subscription statuses
const SUB_ACTIVE = 'active';

const Roles = Object.freeze({
	'Super Admin': 11,
	Admin: 12,
	Recruiter: 14,
	Candidate: 15,
	Guest: 16,
	Public: 17,
});

module.exports = {
	DEFAULT_PRICING_ID,
	DEFAULT_COUPON_ID,
	SUB_ACTIVE,
	Roles
};
