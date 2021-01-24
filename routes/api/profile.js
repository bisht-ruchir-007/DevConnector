const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// @route       GET api/profile/me
// @description Get current user profile
// @access      Private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id }).populate('user', [ 'name', 'avatar' ]);

		if (!profile) {
			return res.status(400).json({ msg: 'There is no profile for this user.' });
		}

		res.json(profile);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server error');
	}
});

// @route       POST api/profile
// @description Create or Update a User Profile
// @access      Private
router.post(
	'/',
	[
		auth,
		[
			check('status', 'Status is Required').not().isEmpty(),
			check('skills', 'Enter atleast one Skill').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			company,
			website,
			location,
			bio,
			status,
			githubusername,
			skills,
			youtube,
			facebook,
			twitter,
			instagram,
			linkedin
		} = req.body;

		// Build profile object
		const profileFields = {};
		profileFields.user = req.user.id;
		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (bio) profileFields.bio = bio;
		if (githubusername) profileFields.githubusername = githubusername;
		if (status) profileFields.status = status;
		if (skills) {
			// changing the skill from String to Array
			profileFields.skills = skills.split(',').map((skill) => skill.trim());
		}

		// Build Social object
		profileFields.social = {};
		if (youtube) profileFields.social.youtube = youtube;
		if (twitter) profileFields.social.twitter = twitter;
		if (facebook) profileFields.social.facebook = facebook;
		if (linkedin) profileFields.social.linkedin = linkedin;
		if (instagram) profileFields.social.instagram = instagram;

		try {
			let profile = await Profile.findOne({ user: req.user.id });

			if (profile) {
				//update the profile
				profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
				return res.json(profile);
			}
			// Create a new profile
			profile = new Profile(profileFields);
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.log(err.message);
			res.status(500).send('Server error');
		}
	}
);

// @route       GET api/profile
// @description Get all profile
// @access      Public
router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', [ 'name', 'avatar' ]);
		res.json(profiles);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server error');
	}
});

// @route       GET api/profile/user/:user_id
// @description Get all profile by user ID
// @access      Public
router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', [ 'name', 'avatar' ]);

		if (!profile) {
			return res.status(400).json({ msg: 'Profile not found.' });
		}
		res.json(profile);
	} catch (err) {
		console.log(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(400).json({ msg: 'Profile not found.' });
		}
		res.status(500).send('Server error');
	}
});

// @route       DELETE api/profile
// @description Delete profile, user & posts
// @access      Private
router.delete('/', auth, async (req, res) => {
	try {
		// @todo - remove users posts

		//Remove profile
		await Profile.findOneAndRemove({ user: req.user.id });
		// Remove User
		await User.findOneAndRemove({ _id: req.user.id });

		res.json({ msg: 'User deleted.' });
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
