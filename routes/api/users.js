const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

// @route       POST api/users
// @description Register User
// @access      Public
router.post(
	'/',
	[
		check('name', 'Name is Required').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Please  enter a valid password with 6 or more characters').isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			// If user exists
			let user = await User.findOne({ email });

			if (user) {
				return res.status(400).json({ errors: [ { msg: 'User already exists' } ] });
			}

			// Get User gravatar
			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm'
			});

			user = new User({
				name,
				email,
				password,
				avatar
			});

			//Encrypt the password
			// 10 -number of rounds -recomended
			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();
			//Return the jsonwebtoken

			res.send('User Registered');
		} catch (err) {
			console.log(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
