<template>
  <div class="loaded-svg" v-html="inner_html"></div>
</template>

<script>
export default {
  components: {},
  props: {
    svgUrl: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      test: null
    };
  },
  computed: {
    inner_html() {
      return this.test; // any raw html
    }
  },
  mounted() {
    this.loadSVG();
  },
  methods: {
    loadSVG() {
      this.$nextTick(() => {
        fetch(this.svgUrl)
          .then((res) => res.text())
          .then((svg) => {
            this.test = svg;
          });
      });
    }
  }
};
</script>
