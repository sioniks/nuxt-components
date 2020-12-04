/**
 *
 * @param {import('@nuxt/types').Context} context
 */
export default async function (context) {
  await context.store.dispatch('init', { context });
}
