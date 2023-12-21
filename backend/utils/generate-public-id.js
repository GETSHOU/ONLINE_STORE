let usedIds = new Set();

const generatePublicId = () => {
	const id = Math.floor(Math.random() * 900000) + 100000;

	usedIds.add(id);

	return id;
};

module.exports = generatePublicId;
