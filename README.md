# Caching Proxy

A simple CLI-based caching proxy server that forwards requests to an origin server and caches responses to improve performance.

## Features

- Forwards requests to a specified origin URL
- Caches GET responses in memory
- Adds `X-Cache: HIT` or `X-Cache: MISS` header
- Command to clear the cache

## Installation

```
npm install
npm link
```

## Usage

Start the caching proxy:

```
caching-proxy --port 3000 --origin http://dummyjson.com
```

Clear the cache:

```
caching-proxy --clear-cache
```

## How to Test

1. Start the proxy:

```
caching-proxy --port 3000 --origin http://dummyjson.com
```

2. In a separate terminal, make a request:

```
curl -i http://localhost:3000/products
```

- First request: `X-Cache: MISS` (fetched from origin)
- Second request: `X-Cache: HIT` (fetched from cache)

3. Clear the cache:

```
caching-proxy --clear-cache
```

4. Make the request again — it should show `X-Cache: MISS` again.

## 📁 Example

```
curl -i http://localhost:3000/users
```
