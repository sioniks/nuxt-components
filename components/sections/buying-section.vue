<template>
  <section class="section section-buying">
    <div class="container">
      <div class="section-header">Buying options</div>
      <div class="elements">
        <div v-for="(elem, index) in options" :key="index" class="elem">
          <div class="elem_header">{{ elem.header }}</div>
          <div class="elem_descr">{{ elem.descr }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      options: [
        {
          header: 'Porsche Finance',
          descr: 'Clearly calculable costs without'
        }
      ]
    };
  },
  computed: {},
  methods: {}
};
</script>

<style scoped lang="scss">
.section-buying {
  margin-top: 7vw;
}
.section-header {
  margin-bottom: 4vw;
}
.elements {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: #f9fafa;
}
.elem {
  padding: 5vw 4vw 7vw;
}
.elem_header {
  font-family: $font-1b;
  font-size: vw(36px);
  line-height: 1.4;
  text-transform: uppercase;
  color: #041c30;
  margin-bottom: 0.7em;
}
.elem_descr {
  font-family: $font-1r;
  font-size: vw(16px);
  line-height: 1.75;
  color: #041c30;
}
</style>
