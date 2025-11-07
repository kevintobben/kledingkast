declare module '@tanstack/router-plugin/vite' {
  import type { Plugin } from 'vite'
  export function tanstackRouter(options?: Record<string, unknown>): Plugin
  export default tanstackRouter
}
