const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURL');

const connectDB = async () => {
	try {
		await mongoose.connect(db);
		console.log('MongoDB Connected...');
	} catch (e) {
		console.log(e.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;
