# bun-api-starter

[![Bun (🍔) API Starter CI](https://github.com/cham11ng/bun-api-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/cham11ng/bun-api-starter/actions/workflows/ci.yml)

A robust Bun-based API starter built using ElysiaJS framework, and MongoDB as database. ElysiaJS, a type-safe and fast framework. MongoDB, a powerful NoSQL database. This starter offers a solid foundation for your API development, allowing you to focus on your unique business logic.

## Getting Started

To install bun.

```bash
curl -fsSL https://bun.sh/install | bash
```

## Development

To start the development server run:

```bash
$ bun run dev
Bun (🍔) API Starter is running at localhost:8000
```

Open <http://localhost:8000/docs> with your browser to see the result.

### cURL

```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"name": "Name", "email": "name@domain.com", "password": "secret@123"}' \
  localhost:8000/users
```

### Docker

```bash
# production
docker build --target production -t bun-api-starter-prod .
docker run -d --rm --env-file .env.docker \
  -p 8080:8000 \
  -t bun-api-starter-prod:latest
```

```bash
# Check logs
$ docker compose up -d dev
[+] Running 2/3
 ⠋ Network bun-api-starter_default  Created           1.0s
 ✔ Container starter-mongodb        Started           0.5s
 ✔ Container starter-dev            Started           0.9s

# Check logs.
$ docker compose logs -f
```

### MongoDB Compass

```bash
# Connect URI for root user.
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
