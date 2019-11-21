const RABBIT = {
	URI: process.env.RABBIT_URL || 'amqp://localhost',
	QUEUE: process.env.RABBIT_QUEUE || 'image_processing',
};
const TESSERACT = {
	lang: process.env.TESSERACT_LANG || "eng",
	oem: process.env.OEM || 1,
	psm: process.env.PSM || 3,
};

module.exports = {
	RABBIT,
	TESSERACT,
};