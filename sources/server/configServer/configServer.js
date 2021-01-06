const urlDisplay = (req) => {
	if (req) {
		return new Promise((resolve, reject) => {
			const scheme = req.connection.encrypted ? 'https' : 'http';
			const host = req.headers.host;
			const path = req.url;

			if (scheme && host && path) {
				console.log(`URL -> ${scheme}://${host}${path}`);
				resolve(req);
			} else {
				reject(req);
			}
		}).catch(err => {
			return err.stack;
		});
	} else {
		return err.stack;
	}
};

module.exports = {
	urlDisplay
}
