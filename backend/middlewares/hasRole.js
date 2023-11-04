// мидлвара, которая будет заниматься проверкой ролей пользователя
// она надеется, что в объекте запроса уже есть пользователь, т.е. до нее нужно будет обязательно подключить мидлвару 'authenticated'
// она будет отдавать функцию, которая вернет функцию

module.exports = function (roles) {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			res.send({ error: "Access denied" });
		}

		next();
	};
};
