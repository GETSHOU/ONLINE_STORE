module.exports = function (user) {
	return {
		id: user.id,
		login: user.login,
		roleId: user.role,
		name: user.name,
		phone: user.phone,
		registeredAt: user.createdAt,
	};
};
