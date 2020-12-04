<template>
  <a
    v-if="externalLink"
    v-bind="this.$attrs"
    :href="this.$attrs.to"
    v-on="$listeners"
  >
    <slot />
  </a>
  <nuxt-link v-else v-bind="this.$attrs" :to="normalizedTo" v-on="$listeners">
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  inheritAttrs: false,
  computed: {
    externalLink() {
      const to = this.$attrs.to;
      return (
        typeof to === 'string' &&
        (to.startsWith('https://') || to.startsWith('http://'))
      );
    },
    normalizedTo() {
      if (this.externalLink) return null;
      let res = this.$attrs.to;
      if (typeof res === 'string') {
        const {
          route: { name, params, query, hash, matched }
        } = this.$router.resolve(res);
        if (matched.length) {
          res = { name, params: { ...params }, query: { ...query }, hash };
        } else {
          res = { path: res };
        }
      }

      if (!res.params) res.params = {};
      if (!res.query) res.query = {};
      if (res.params.language === undefined)
        res.params.language = this.$route.params.language;
      if (res.query.region === undefined)
        res.query.region = this.$route.query.region;
      return res;
    }
  }
};
</script>
