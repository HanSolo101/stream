// Phase 8: Razorpay payments
// POST /api/v1/payments/orders  → create Razorpay order
// POST /api/v1/payments/verify  → verify HMAC signature, grant entitlement
// POST /api/v1/payments/webhook → source of truth; idempotent; verifies raw body
// GET  /api/v1/payments/:orderId/status → poll pending UPI status
// GET  /api/v1/me/entitlement → current premium status and expiry

export {};
