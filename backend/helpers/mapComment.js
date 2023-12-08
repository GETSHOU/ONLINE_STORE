module.exports = function (comment) {
	return {
		content: comment.content,
		authorName: comment.author.name,
		authorRoleId: comment.author.role,
		id: comment._id,
		publishedAt: comment.createdAt,
	};
};
