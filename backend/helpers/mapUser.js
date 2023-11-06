module.exports = function (user) {
	return {
		id: user.id,
		roleId: user.role,
		email: user.email,
		name: user.name,
		registeredAt: user.createdAt,
	};
};
