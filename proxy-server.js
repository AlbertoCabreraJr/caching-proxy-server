const express = require("express");
const axios = require("axios");
const cache = require("./cache");


const startProxy = (port, origin) => {
  const app = express();

  app.use(async (req, res) => {
    const cacheKey = req.originalUrl;

    if (req.method === "GET") {
      const cached = cache.get(cacheKey);
      if (cached) {
        res.set("X-Cached", "HIT");
        return res.status(cached.status).set(cached.headers).send(cached.data);
      }
    }

    try {
      const targetUrl = `${origin}${req.originalUrl}`;
      const response = await axios.get(targetUrl);

      const headers = { ...response.headers };
      delete headers["content-encoding"];

      if (req.method === "GET") {
        cache.set(cacheKey, {
          status: response.status,
          headers,
          data: response.data,
        })
      }

      res.set("X-Cached", "MISS");
      res.status(response.status).set(headers).send(response.data);
    } catch (error) {
      res.status(500).send("Proxy error: " + error.message);
    }
  })

  app.listen(port, () => {
    console.log(`Proxy server is running on port ${port}`);
    console.log(`📦 Forwarding requests to ${origin}`);
  })
}

module.exports = startProxy;