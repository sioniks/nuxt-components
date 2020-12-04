import * as AxiosLogger from 'axios-logger';

/**
 *
 * @param {import('@nuxt/types').Context & {$axios: import('@nuxtjs/axios').NuxtAxiosInstance} } param0
 */
export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    config.headers = config.headers || {};
    config.params = config.params || {};

    const setLanguage = !Object.keys(config.headers).some(
      (name) => name.toLowerCase() === 'accept-language'
    );
    if (setLanguage) {
      config.headers['accept-language'] = store.state.languages.locale;
    }

    const setRegion = !config.params.zone_id;
    if (setRegion) {
      config.params.zone_id = store.state.regions.active;
    }
  });

  if (process.server) {
    AxiosLogger.setGlobalConfig({
      headers: true,
      data: true,
      method: true,
      url: true,
      status: true,
      statusText: true,
      code: true
    });
    $axios.interceptors.request.use(
      AxiosLogger.requestLogger,
      AxiosLogger.errorLogger
    );
    $axios.interceptors.response.use(
      AxiosLogger.responseLogger,
      AxiosLogger.errorLogger
    );
  }
}
