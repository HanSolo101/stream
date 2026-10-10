// Phase 3: Redis-based matching queue
// Uses atomic Lua script to pop two compatible non-blocked sessions
// Premium users get a score bonus for priority queue position
// Matching key pattern: queue:{mode}:{language}

export {};
