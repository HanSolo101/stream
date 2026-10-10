# 🎲 Strangeroo

> Anonymous one-to-one text & video chat — meet a stranger, make it count.

Strangeroo is a random chat platform built for the Indian market with interest-based matching, WebRTC video, a full moderation system, and Razorpay/UPI premium subscriptions.

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) + TypeScript + Tailwind CSS |
| Frontend Hosting | Cloudflare Pages / Vercel |
| Backend | Node.js + Fastify + Socket.IO |
| Database | PostgreSQL |
| Cache / Queue | Redis |
| Video | WebRTC (peer-to-peer) |
| TURN | coturn |
| Payments | Razorpay (UPI, Cards, Netbanking) |

---

## Quick Start (Development)

### Prerequisites
- Docker & Docker Compose
- Node.js 20+
- pnpm (`npm i -g pnpm`)

### 1. Clone & configure

```bash
git clone https://github.com/your-org/strangeroo.git
cd strangeroo
cp .env.example .env
# Fill in .env with your values
```

### 2. Start all services

```bash
docker compose up --build
```

This starts:
- **Postgres** on port `5432`
- **Redis** on port `6379`
- **Backend (Fastify)** on port `4000`
- **Frontend (Next.js)** on port `3000`
- **Nginx** on port `80`

### 3. Run migrations (first time)

```bash
docker compose exec backend pnpm migrate
```

### 4. Open the app

Visit [http://localhost](http://localhost)

---

## Build Phases

| Phase | Status | Description |
|---|---|---|
| 1 | ✅ | Repo scaffold, Docker, Postgres/Redis, CI, legal stubs |
| 2 | ⏳ | Frontend shell (landing, chat, video, pricing) |
| 3 | ⏳ | Guest sessions + Redis matching queue |
| 4 | ⏳ | Socket.IO text chat, Stop, Next |
| 5 | ⏳ | WebRTC signaling, STUN/TURN |
| 6 | ⏳ | Report, block, rate limits, moderation dashboard |
| 7 | ⏳ | Accounts (email OTP/Google) + entitlement service |
| 8 | ⏳ | Razorpay + UPI payments |
| 9 | ⏳ | Premium features |
| 10 | ⏳ | Testing, load test, accessibility |
| 11 | ⏳ | Production deploy |

---

## Environment Variables

See [.env.example](.env.example) for all required variables.

---

## Legal

- [Privacy Policy](/privacy)
- [Terms of Service](/terms)
- [Refund Policy](/refund)
- [Grievance Officer](/grievance)

---

## License

MIT
