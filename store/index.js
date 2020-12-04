export const state = () => ({
  languages: {
    items: [],
    locale: 'en'
  },
  regions: {
    items: [],
    active: undefined
  },
  headerMenu: [],
  footerMenu: [],
  literals: {},
  busModels: []
});

export const getters = {
  language(state) {
    return state.languages.items.find(
      (lang) => lang.code === state.languages.locale
    );
  },
  region(state) {
    return state.regions.items.find((reg) => reg.id === state.regions.active);
  }
};

export const mutations = {
  setLanguages(state, payload) {
    state.languages.items = payload;
  },
  setLocale(state, val) {
    state.languages.locale = val;
  },
  setRegions(state, payload) {
    state.regions.items = payload;
  },
  setActiveRegion(state, id) {
    state.regions.active = id;
  },
  setHeaderMenu(state, val) {
    state.headerMenu = val;
  },
  setFooterMenu(state, val) {
    state.footerMenu = val;
  },
  setLiterals(state, val) {
    state.literals = val;
  },
  setBusModels(state, val) {
    state.busModels = val;
  }
};

export const actions = {
  /**
   *
   * @param {import('vuex').Store} param0
   * @param {{context: import('@nuxt/types').Context}} param1
   */
  async init(
    { commit, state },
    {
      context: {
        $axios,
        $config: { baseAPI }
      }
    }
  ) {
    const [
      languages,
      regions,
      header,
      footer,
      literals,
      models
    ] = await Promise.all([
      $axios.$get(`${baseAPI}/languages`),
      $axios.$get(`${baseAPI}/zones`),
      $axios.$get(`${baseAPI}/menus/header`),
      $axios.$get(`${baseAPI}/menus/footer`),
      $axios.$get(`${baseAPI}/literals`),
      $axios.$get(`${baseAPI}/menus/buses`)
    ]);
    commit('setLanguages', languages);
    commit('setRegions', regions);
    commit('setHeaderMenu', header.parent_items);
    commit('setFooterMenu', footer.parent_items);
    commit('setLiterals', literals);
    commit('setBusModels', models);
  }
};
