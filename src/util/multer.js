const multerConfig = require("multer");

const multer = multerConfig({
	storage: multerConfig.memoryStorage(),
	limits: {
		fields: 10,
		files: 10,
		fileSize: 2366 * 768 * 100,
	},
});

module.exports = { multer }
