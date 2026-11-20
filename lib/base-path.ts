/**
 * The app is mounted at luvlab.io/manjak (proxied from the luvlab.io site), so
 * every route, asset and API call carries this prefix. Next.js adds it to
 * links, redirects and its own assets; plain fetch() calls and public file
 * paths must add it by hand with withBase().
 */
export const BASE_PATH = "/manjak";

export function withBase(path: string) {
  return `${BASE_PATH}${path}`;
}
