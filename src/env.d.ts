/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type D1Database = import('@cloudflare/workers-types').D1Database
type Env = {
    DB: D1Database
    GITHUB_CLIENT_ID: string
    GITHUB_CLIENT_SECRET: string
}