/**
 *
 * @param {import('@nuxt/types').Context} param0
 */
export default function ({ route, store }) {
  // IMPORTANT! Do not insert any region detection logic here.
  // All requests will be cached, so it is important that only one concrete region
  // corresponds to the default route (default == with no region query parameter).
  // If you want to add some logic based on IP or cookie value
  // then create this logic as redirects on the proxy level (e.g. through Cloudflare Workers).
  const region = route.query.region || undefined;
  store.commit('setActiveRegion', region);
}
