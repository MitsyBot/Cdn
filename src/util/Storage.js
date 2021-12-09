const FileStorage = require("./FileStorage");
const path = require("path");
const fse = require("fs-extra");
process.cwd();


	let storage

	let location = process.env.STORAGE_LOCATION;
	if (location) {
		location = path.resolve(location);
	} else {
		location = path.join(process.cwd(), "files");
	}
	console.log(`[Mitsy CDN] Arquivos serão armazenados em: ${location}`);
	fse.ensureDirSync(location);
	process.env.STORAGE_LOCATION = location;

	storage = FileStorage

module.exports = { storage };
