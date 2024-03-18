# bun-api-starter

[![Bun (🍔) API Starter CI](https://github.com/cham11ng/bun-api-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/cham11ng/bun-api-starter/actions/workflows/ci.yml)

A robust Bun-based API starter built using ElysiaJS framework, and MongoDB as database. ElysiaJS, a type-safe and fast framework. MongoDB, a powerful NoSQL database. This starter offers a solid foundation for your API development, allowing you to focus on your unique business logic.

## Getting Started

To install bun and starter packages.

```bash
curl -fsSL https://bun.sh/install | bash

bun install
```

## Development

To start the development server run:

```bash
$ bun run dev
Environment: development
Bun (🍔) API Starter is running at localhost:8000
Info: MongoDB connection successful: starter
```

Open <http://localhost:8000/docs> with your browser to see the result.

### cURL

```bash
curl --request POST \
  --url http://localhost:8000/login \
  --header 'Content-Type: application/json' \
  --data '{
  "email": "mail@example.com",
  "password": "secret@123"
}'
```

### Docker

```bash
# development
$ docker compose up -d dev
[+] Running 2/3
 ⠋ Network bun-api-starter_default  Created           1.0s
 ✔ Container starter-mongodb        Started           0.5s
 ✔ Container starter-dev            Started           0.9s

# check logs
$ docker compose logs -f
```

```bash
# production
docker build --target production -t bun-api-starter-prod .
docker run -d --rm --env-file .env.docker \
  -p 8080:8000 \
  -t bun-api-starter-prod:latest
```

### MongoDB Compass

```bash
# connect URI for root user.
mongodb://rootuser:root%40123@localhost:27017/starter?authSource=admin
```

## Troubleshooting

```bash
# on default export error
const app = new Elysia();
export default app;

# double bun server initiated.
$ Bun (🍔) API Starter is running at localhost:8000
Started server http://localhost:3000

# do this
export const app = new Elysia();
```


```js
// exception not captured onError.
function controller(context: Context) {}

// do this
const controller = (context: Context) => {}
```

## Happy Coding

> @cham11ng
