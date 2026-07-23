import { onRequestPost as __api_auth_js_onRequestPost } from "/Users/muslim/Documents/reviseQuran/functions/api/auth.js"
import { onRequestGet as __api_sync_js_onRequestGet } from "/Users/muslim/Documents/reviseQuran/functions/api/sync.js"
import { onRequestPost as __api_sync_js_onRequestPost } from "/Users/muslim/Documents/reviseQuran/functions/api/sync.js"

export const routes = [
    {
      routePath: "/api/auth",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_js_onRequestPost],
    },
  {
      routePath: "/api/sync",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_sync_js_onRequestGet],
    },
  {
      routePath: "/api/sync",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_sync_js_onRequestPost],
    },
  ]