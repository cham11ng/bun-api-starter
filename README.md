# bun-api-starter

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
curl -X POST -H "Content-Type: application/json" -d '{"name": "Name", "email": "name@domain.com", "password": "secret@123"}' localhost:8000/users
```

### Docker

```bash
# Check logs
$ docker compose up -d
[+] Running 2/3
 ⠋ Network bun-api-starter_default  Created           1.0s
 ✔ Container starter-mongodb        Started           0.5s
 ✔ Container starter-api            Started           0.9s

# Check logs.
$ docker compose logs -f
```

### MongoDB Compass

```bash
## Connect URI for root user.
mongodb://rootuser:root%40123@localhost:27017/starter?authSource=admin
```

## Happy Coding

> @cham11ng
