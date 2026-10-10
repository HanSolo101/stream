import type { FastifyPluginAsync } from 'fastify';
import { ok } from '../../common/errors.js';
import { db } from '../../common/db.js';
import { redis } from '../../common/redis.js';

export const healthRouter: FastifyPluginAsync = async (app) => {
  app.get('/health', async (_req, reply) => {
    const checks: Record<string, 'ok' | 'error'> = {};

    // Check Postgres
    try {
      await db.query('SELECT 1');
      checks.postgres = 'ok';
    } catch {
      checks.postgres = 'error';
    }

    // Check Redis
    try {
      await redis.ping();
      checks.redis = 'ok';
    } catch {
      checks.redis = 'error';
    }

    const allOk = Object.values(checks).every((v) => v === 'ok');
    return reply.status(allOk ? 200 : 503).send(
      ok({ status: allOk ? 'healthy' : 'degraded', checks }),
    );
  });
};
