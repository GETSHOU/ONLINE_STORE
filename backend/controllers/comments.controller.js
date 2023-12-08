const Comment = require("../models/Comment.model");
const Product = require("../models/Product.model");
const { mapComment } = require("../helpers");

const commentsController = {
	create: async (productId, comment, res) => {
		try {
			const newComment = await Comment.create(comment);

			await Product.findByIdAndUpdate(productId, {
				$push: { comments: newComment },
			});

			await newComment.populate("author");

			res.send({ data: mapComment(newComment) });

			return newComment;
		} catch (e) {
			res.send({ error: e.message });
		}
	},
	delete: async (productId, commentId, res) => {
		try {
			await Comment.deleteOne({ _id: commentId });

			await Product.findByIdAndUpdate(productId, {
				$pull: { comments: commentId },
			});

			res.send({ error: null });
		} catch (e) {
			res.send({ error: e.message });
		}
	},
	get: async (productId, res) => {
		try {
			const comments = await Comment.findById(productId);

			res.send({ data: comments.map(mapComment) });
		} catch (e) {
			res.send({ error: e.message });
		}
	},
};

module.exports = commentsController;

// add
async function addComment(postId, comment) {
	const newComment = await Comment.create(comment);

	// нам нужно найти наш пост и добавить в него комментарий
	// $push - добавление комментария в массив comments
	await Post.findByIdAndUpdate(postId, { $push: { comments: newComment } });

	// превращаем автора из безликого идентификатора в объект с информацией об авторе
	// т.к. в комментах есть связь с автором мы можем попросить 'mongoose' заполнить информацию об авторе за нас
	// для этого используется метод 'populate'
	await newComment.populate("author");

	return newComment;
}

// delete
async function deleteComment(postId, commentId) {
	// сначала удалим сам комментарий
	await Comment.deleteOne({ _id: commentId });

	// а после уберем у поста этот комментарий из массива, используя операцию '$pull'
	await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
}

function getComments() {
	return Comment.find();
}

// get comments list for post
// контроллер получения списка коментариев для поста нам не понадобится, потому что при получении поста у нас уже есть вся необходимая информация
// с помощью populate мы избавили наш фронт от необходимости делать один лишний запрос
