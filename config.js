const RABBIT = {
	URI: process.env.RABBIT_URL || 'amqp://localhost',
	QUEUE: process.env.RABBIT_QUEUE || 'image_processing',
};

module.exports = {
	RABBIT,
};