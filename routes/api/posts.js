const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
// const request = require('request');
// const config = require('config');

// @route       POST api/post
// @description Create a post
// @access      Private
router.post('/', [ auth, [ check('text', 'Please enter a comment').not().isEmpty() ] ], async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const user = await User.findById(req.user.id).select('-password');

		const newPost = new Post({
			text: req.body.text,
			name: user.name,
			avatar: user.avatar,
			user: req.user.id
		});

		const post = await newPost.save();

		res.send(post);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server error');
	}
});

// @route       GET api/post
// @description Get all posts
// @access      Private
router.get('/', auth, async (req, res) => {
	try {
		// get all the post from db
		const posts = await Post.find().sort({ date: -1 });
		res.json(posts);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server error');
	}
});

// @route       GET api/post/:id
// @description Get post by ID
// @access      Private
router.get('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		//check if a post exists
		if (!post) {
			return res.status(404).json({ msg: 'Post not found' });
		}

		res.json(post);
	} catch (err) {
		console.log(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Post not found' });
		}
		res.status(500).send('Server error');
	}
});

// @route       DELETE api/post/:id
// @description Delete post by ID
// @access      Private
router.delete('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		//check if a post exists
		if (!post) {
			return res.status(404).json({ msg: 'Post not found' });
		}
		//check if post is added by the current user
		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User is not authorized' });
		}

		// remove the post
		await post.remove();

		res.json({ msg: 'Post deleted' });
	} catch (err) {
		console.log(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Post not found' });
		}
		res.status(500).send('Server error');
	}
});

// @route       PUT api/post/like/:id
// @description Like post by ID
// @access      Private
router.put('/like/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ msg: 'Post not found' });
		}

		//check if post has already been liked by current user
		if (post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
			return res.status(400).json({ msg: 'Post already liked.' });
		}

		if (post.user.toString() === req.user.id) {
			return res.status(401).json({ msg: "You can't like your own post." });
		}

		post.likes.unshift({ user: req.user.id });

		await post.save();

		res.json(post.likes);
	} catch (err) {
		console.log(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Post not found' });
		}
		res.status(500).send('Server error');
	}
});
module.exports = router;
