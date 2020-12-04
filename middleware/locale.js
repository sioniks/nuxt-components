/**
 *
 * @param {import('@nuxt/types').Context} param0
 */
export default function ({ route, store }) {
  // IMPORTANT! Do not insert any language detection logic here.
  // All requests will be cached, so it is important that only one concrete language
  // corresponds to the default route (default == with no language parameter).
  // If you want to add some logic based on Accept-Language header or cookie value
  // then create this logic as redirects on the proxy level (e.g. through Cloudflare Workers).
  const language = route.params.language || 'en';
  store.commit('setLocale', language);
}
