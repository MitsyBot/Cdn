const fs = require("fs");
const fse = require("fs-extra");
const { join, dirname } = require("path");
const { Readable } = require("stream");
const ExifTransformer = require("exif-be-gone");


function getPath(path) {
	const root = process.env.STORAGE_LOCATION || "../";
	var filename = join(root, path);

	if (path.indexOf("\0") !== -1 || !filename.startsWith(root))
		throw new Error("local invalido");
	return filename;
}

module.exports.get = (path) => {
		path = getPath(path);
		try {
			return fs.readFileSync(path);
		} catch (error) {
			try {
				const files = fs.readdirSync(path);
				if (!files.length) return null;
				return fs.readFileSync(join(path, files[0]));
			} catch (error) {
				return null;
			}
		}
	}

	module.exports.set = (path, value) => {
		path = getPath(path);
		fse.ensureDirSync(dirname(path));

		value = Readable.from(value);
		const cleaned_file = fs.createWriteStream(path);

		return value.pipe(new ExifTransformer()).pipe(cleaned_file);
	}

	module.exports.delete = (path) => {
		fs.unlinkSync(getPath(path));
	}

