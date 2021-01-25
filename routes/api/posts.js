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

module.exports = router;
