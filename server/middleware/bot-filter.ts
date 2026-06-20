/**
 * Bot Filter & Rate Limiter Middleware
 *
 * Tujuan:
 * - Blokir AI crawler besar yang hammering edge requests
 * - Blokir scrapers & spam bots
 * - Rate limit request berlebih dari IP yang sama
 * - Cegah HEAD/OPTIONS spam dari scanner
 */

// Daftar AI crawler besar yang diblokir (terlalu agresif, banyak edge request)
const BLOCKED_AI_BOTS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'CCBot',                 // Common Crawl — sumber dataset training AI
  'FacebookBot',
  'Bytespider',            // TikTok/ByteDance scraper
  'PetalBot',              // Huawei AI scraper
  'SemrushBot',
  'AhrefsBot',
  'MJ12bot',               // Majestic SEO crawler agresif
  'DotBot',
  'BLEXBot',
  'DataForSeoBot',
  'TurnitinBot',
  'anthropic-ai',          // Anthropic direct (sudah diizinkan ClaudeBot)
  'omgili',
  'omgilibot',
  'webz.io',
  'Diffbot',               // AI content extraction
  'ImagesiftBot',
  'img2dataset',
  'Scrapy',
  'python-requests',       // Bulk scraper default
  'Go-http-client',        // Bulk scanner Go
  'Java/',                 // Scanner Java generic
  'libwww-perl',
  'lwp-trivial',
  'curl/',                 // curl scraper (bukan browser)
  'wget/',
  'mass_download',
  'masscan',
  'zgrab',
  'nuclei',                // Vulnerability scanner
  'sqlmap',
  'nikto',
  'dirbuster',
  'wfuzz',
  'nmap',
]

// AI crawler yang diizinkan tapi dibatasi crawl rate (robots.txt sudah mengatur)
// Daftar ini hanya untuk logging/monitoring, tidak diblokir
const ALLOWED_AI_BOTS = [
  'Googlebot',
  'Bingbot',
  'ClaudeBot',
  'PerplexityBot',
  'DeepSeekBot',
  'YouBot',
  'cohere-ai',
  'Applebot',
]

// Simple in-memory rate limiter (reset setiap proses restart)
// Untuk production yang multi-instance, gunakan Redis/KV
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW_MS = 60_000  // 1 menit
const RATE_LIMIT_MAX = 60            // max 60 req/menit per IP (normal browser ~5-15)
const BOT_RATE_LIMIT_MAX = 10        // lebih ketat untuk known bots

// Cleanup map setiap 5 menit agar tidak memory leak
let lastCleanup = Date.now()
function maybeCleanup() {
  const now = Date.now()
  if (now - lastCleanup > 5 * 60_000) {
    for (const [key, val] of rateLimitMap) {
      if (val.resetAt < now) rateLimitMap.delete(key)
    }
    lastCleanup = now
  }
}

export default defineEventHandler((event) => {
  const req = event.node.req
  const url = req.url ?? '/'

  // Biarkan assets statis lewat tanpa pemrosesan
  if (
    url.startsWith('/_nuxt/') ||
    url.startsWith('/__nuxt_island') ||
    url.startsWith('/favicon') ||
    url.endsWith('.ico') ||
    url.endsWith('.png') ||
    url.endsWith('.jpg') ||
    url.endsWith('.svg') ||
    url.endsWith('.woff2') ||
    url.endsWith('.css') ||
    url.endsWith('.js')
  ) {
    return
  }

  const userAgent = (req.headers['user-agent'] ?? '').toLowerCase()
  const uaRaw = req.headers['user-agent'] ?? ''

  // ── 1. Blokir bot yang masuk daftar hitam ──────────────────────
  const isBlockedBot = BLOCKED_AI_BOTS.some(bot =>
    userAgent.includes(bot.toLowerCase()),
  )

  if (isBlockedBot) {
    setResponseStatus(event, 403)
    setResponseHeaders(event, {
      'content-type': 'text/plain',
      'cache-control': 'no-store',
      'x-robots-tag': 'noindex, nofollow',
    })
    return '403 Forbidden'
  }

  // ── 2. Blokir request tanpa User-Agent (scanner/curl manual) ───
  if (!uaRaw || uaRaw.trim() === '') {
    setResponseStatus(event, 400)
    return 'Bad Request'
  }

  // ── 3. Blokir path yang sering di-scan ─────────────────────────
  const suspiciousPaths = [
    '/wp-admin', '/wp-login', '/xmlrpc.php',
    '/admin', '/.env', '/.git',
    '/config', '/backup', '/shell',
    '/phpmyadmin', '/pma', '/.well-known/security.txt',
    '/actuator', '/api/v1/users', '/aws',
  ]
  if (suspiciousPaths.some(p => url.startsWith(p))) {
    setResponseStatus(event, 404)
    return 'Not Found'
  }

  // ── 4. Rate limiting per IP ─────────────────────────────────────
  maybeCleanup()

  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    (req.headers['x-real-ip'] as string) ||
    req.socket?.remoteAddress ||
    'unknown'

  const isKnownBot = ALLOWED_AI_BOTS.some(bot =>
    userAgent.includes(bot.toLowerCase()),
  )
  const maxReq = isKnownBot ? BOT_RATE_LIMIT_MAX : RATE_LIMIT_MAX
  const now = Date.now()
  const key = `${ip}:${isKnownBot ? 'bot' : 'user'}`
  const entry = rateLimitMap.get(key)

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
  } else {
    entry.count++
    if (entry.count > maxReq) {
      setResponseStatus(event, 429)
      setResponseHeaders(event, {
        'retry-after': String(Math.ceil((entry.resetAt - now) / 1000)),
        'content-type': 'text/plain',
        'cache-control': 'no-store',
      })
      return '429 Too Many Requests'
    }
  }
})
