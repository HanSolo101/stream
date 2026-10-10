-- 001_init.sql — Initial schema for Strangeroo
-- Phase 1: core tables only. Payment tables added in Phase 7-8 migration.

-- Enable pgcrypto for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ── Sessions (guest + authenticated) ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sessions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token_hash    TEXT NOT NULL UNIQUE,    -- SHA-256 of the guest token (never store raw)
  mode          TEXT NOT NULL DEFAULT 'text',  -- 'text' | 'video'
  interests     TEXT[] DEFAULT '{}',
  language      TEXT DEFAULT 'en',
  user_id       UUID,                   -- NULL for guests; set after login
  is_premium    BOOLEAN DEFAULT FALSE,
  ip_hash       TEXT,                   -- hashed IP for rate-limit / ban checks
  user_agent    TEXT,
  age_confirmed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT now(),
  expires_at    TIMESTAMPTZ DEFAULT now() + INTERVAL '24 hours'
);

CREATE INDEX IF NOT EXISTS idx_sessions_token_hash ON sessions (token_hash);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions (user_id);

-- ── Reports ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reports (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_token_hash TEXT NOT NULL,
  reported_token_hash TEXT NOT NULL,
  room_id         TEXT,
  reason          TEXT NOT NULL,
  details         TEXT,               -- user-supplied detail, stored but not logged
  status          TEXT NOT NULL DEFAULT 'pending',  -- pending | reviewed | actioned
  moderator_id    UUID,
  created_at      TIMESTAMPTZ DEFAULT now(),
  reviewed_at     TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_reports_status ON reports (status, created_at DESC);

-- ── Blocks ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blocks (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blocker_token_hash TEXT NOT NULL,
  blocked_token_hash TEXT NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT now(),
  UNIQUE (blocker_token_hash, blocked_token_hash)
);

-- ── Bans ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bans (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_hash         TEXT,
  token_hash      TEXT,
  reason          TEXT NOT NULL,
  moderator_id    UUID,
  expires_at      TIMESTAMPTZ,          -- NULL = permanent
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bans_token_hash ON bans (token_hash);
CREATE INDEX IF NOT EXISTS idx_bans_ip_hash ON bans (ip_hash);

-- ── Audit log ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS audit_log (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id        UUID,               -- moderator / admin user_id
  action          TEXT NOT NULL,
  target_type     TEXT,               -- 'session' | 'report' | 'ban' | 'payment'
  target_id       TEXT,
  metadata        JSONB DEFAULT '{}',
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_log_actor ON audit_log (actor_id, created_at DESC);
