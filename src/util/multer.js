const multerConfig = require("multer");

const multer = multerConfig({
	storage: multerConfig.memoryStorage(),
	limits: {
		fields: 10,
		files: 10,
		fileSize: 1024 * 1024 * 100,
	},
});

module.exports = { multer }
