<template>
  <section class="section empty__section"></section>
</template>
<script>
export default {
  components: {},
  props: {
    block: {
      type: Object,
      default: null
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>
<style scoped lang="scss">
.empty__section {
  height: 100vw;
  display: block;
  width: 100px;
}
</style>
