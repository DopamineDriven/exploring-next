const express = require("express");
const next = require("next");
const LRUcache = require("lru-cache");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// cache object that deletes the least recently used items
const ssrCache = new LRUcache({
	length: (n, key) => {
		return n.toString().length + key.toString().length;
	},
	max: 100 * 1000 * 1000, // 100MB cache soft limit
	maxAge: 1000 * 10 // 10 seconds
});

app
	.prepare()
	.then(() => {
		// instead of setting express to app (as you would in many cases)
		// set server to express since app is set to next({dev}) above
		const server = express();
		// look for incoming url to match regex /speaker/:speakerId
		server.get("/speaker/:speakerId", (req, res) => {
			const actualPage = "/speaker";
			const queryParams = { speakerId: req.params.speakerId };
			// calling app.render does same thing as link element does when
			// creating client-side route
			app.render(req, res, actualPage, queryParams);
		});
		// renderAndCache checks to see if the page has been rendered and cached before
		// if so, use that and avoid rendering pipeline by
		// retrieving html from server-based memory and returning it
		server.get("*", (req, res) => {
			if (
				req.url === "/" ||
				req.url === "/speakers" ||
				req.url === "/sessions"
			) {
				return renderAndCache(req, res, req.url, {});
			} else {
				return handle(req, res);
			}
		});
		// server listening on port 3000
		server.listen(3000, (err) => {
			if (err) throw err;
			console.log("> Ready on http://localhost:3000");
		});
	})
	.catch((ex) => {
		console.error(ex.stack);
		process.exit(1);
	});

// (1) creates cache key based on url passed in
// (2) checks with ssrCache object
// (a) if cache val avail -> cached before; send obj back as web res
// (b) if !cache val avail -> calls the React library,
// takes return string from render to HTML
// stores it in cache
// then returns to caller so it can be output to browser
async function renderAndCache(req, res, pagePath, queryParams) {
	const key = getCacheKey(req);
	if (ssrCache.has(key)) {
		res.setHeader("x-cache", "HIT");
		res.send(ssrCache.get(key));
		return;
	}
	try {
		const html = await app.renderToHTML(req, res, pagePath, queryParams);
		if (res.statusCode !== 200) {
			res.send(html);
			return;
		}
		ssrCache.set(key, html);
		res.setHeader("x-cache", "MISS");
		res.send(html);
	} catch (err) {
		app.renderError(err, req, res, pagePath, queryParams);
	}
}

function getCacheKey(req) {
	return `${req.url}`;
}
