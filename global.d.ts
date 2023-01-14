import "@remix-run/cloudflare"

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    DB: D1Database
  }
}
