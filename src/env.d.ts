/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type ENV = {
    DB: import("@cloudflare/workers-types").D1Database;
    SESSION: import("@cloudflare/workers-types").KVNamespace;
};

type Runtime = import("@astrojs/cloudflare").Runtime<ENV>;
declare namespace App {
    interface Locals extends Runtime {}
}