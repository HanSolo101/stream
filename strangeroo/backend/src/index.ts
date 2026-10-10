import Fastify, { type FastifyError } from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import { redis } from './common/redis.js';
import { db, checkDbConnection } from './common/db.js';
import { AppError, fail } from './common/errors.js';
import { healthRouter } from './modules/health/health.router.js';

const PORT = Number(process.env.PORT ?? 4000);
const HOST = process.env.HOST ?? '0.0.0.0';

async function bootstrap() {
  const app = Fastify({
    logger: {
      level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
      // Redact sensitive fields from logs
      redact: ['req.headers.authorization', 'req.body.password', 'req.body.credential'],
    },
    trustProxy: true,
  });

  // ── Plugins ──────────────────────────────────────────────────────────────
  await app.register(cors, {
    origin: process.env.APP_URL ?? 'http://localhost:3000',
    credentials: true,
  });

  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'checkout.razorpay.com'],
        frameSrc: ["'self'", 'api.razorpay.com'],
        connectSrc: ["'self'", 'api.razorpay.com'],
      },
    },
  });

  await app.register(rateLimit, {
    global: true,
    max: 200,
    timeWindow: '1 minute',
    redis,
    errorResponseBuilder: (_req, context) => ({
      success: false,
      data: null,
      error: {
        code: 'RATE_LIMITED',
        message: `Too many requests. Try again after ${context.after}.`,
      },
    }),
  });

  // ── Global error handler ─────────────────────────────────────────────────
  app.setErrorHandler((error: FastifyError, _req, reply) => {
    if (error instanceof AppError) {
      return reply
        .status(error.statusCode)
        .send(fail(error.code, error.message));
    }

    // Zod validation errors come through Fastify's schema validation
    if (error.validation) {
      return reply
        .status(400)
        .send(fail('INVALID_INPUT', 'Validation failed'));
    }

    app.log.error({ err: error.message }, 'Unhandled error');
    return reply
      .status(500)
      .send(fail('INTERNAL_ERROR', 'An unexpected error occurred'));
  });

  // ── Routes ───────────────────────────────────────────────────────────────
  await app.register(healthRouter, { prefix: '/api/v1' });

  // Placeholder routers (will be filled in subsequent phases)
  app.get('/api/v1/version', async () => ({ version: '0.1.0', phase: 1 }));

  // ── Start ─────────────────────────────────────────────────────────────────
  try {
    console.info('[Boot] Checking DB connection…');
    await checkDbConnection();
    console.info('[Boot] DB OK');

    console.info('[Boot] Checking Redis connection…');
    await redis.connect();
    console.info('[Boot] Redis OK');

    await app.listen({ port: PORT, host: HOST });
    console.info(`[Boot] Strangeroo backend listening on http://${HOST}:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

bootstrap();
