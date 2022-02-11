const { storage } = require("../util/Storage");
const imageSize = require("image-size");
const FileType = require("file-type");

const CONTENT_TYPE = [
	"text/html",
	"text/mhtml",
	"multipart/related",
	"application/xhtml+xml",
];

function regEx(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replaceAll(str, match, replacement){
   return str.replace(new RegExp(regEx(match), 'g'), ()=>replacement);
}

module.exports = class TemplateController {
  static async postMitsyTemplate(req, res) {
    if (!req.file) return res.status(200).json({ error: "arquivo não encotnrado" });

    const { buffer, mimetype, size, originalname } = req.file;
    const filename = replaceAll(originalname, ' ', '_').replace(/[^a-zA-Z0-9._]+/g, "");

    const path = `template/${filename}`;

    const endpoint = process.env.ENDPOINT;

    await storage.set(path, buffer);
    var width;
    var height;
    if (mimetype.includes("image")) {
        const dimensions = imageSize(buffer);
        if (dimensions) {
            width = dimensions.width;
            height = dimensions.height;
        }
    }

    const file = {
        content_type: mimetype,
        filename: filename,
        size,
        url: `${endpoint}/${path}`,
        width,
        height,
    };

    return res.json(file);
  }

  static async getTemplate(req, res) {
    const { filename } = req.params;
		const path = `template/${filename}`;

		const file = await storage.get(path);
        if (!file) return res.status(200).json({ error: "arquivo não encotnrado" });
		const type = await FileType.fromBuffer(file);
		let content_type = type.mime || "application/octet-stream";

		if (CONTENT_TYPE.includes(content_type)) {
			content_type = "application/octet-stream";
		}
		res.set("Content-Type", content_type);
		return res.send(file);
  }

  static async deleteTemplate(req, res) {
    const { filename } = req.params;
		const path = `template/${filename}`;

		await storage.delete(path);

		return res.send({ success: true });
  }  
}
