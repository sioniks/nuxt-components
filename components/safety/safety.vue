<template>
  <section class="section section__safety">
    <div class="container">
      <div class="section__header" v-html="block.title"></div>
      <div class="description" v-html="block.description"></div>

      <div class="safety__blocks">
        <div
          v-for="(item, index) in block.items"
          :key="index"
          class="safety__item"
        >
          <img
            :src="item.image.url"
            :alt="item.image.custom_properties.seo_alt"
            class="safety__item-icon"
          />
          <div class="safety__item-title" v-html="item.title"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    block: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      activeItem: 1,
      isAnimate: true
    };
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.section__safety {
  padding: vw(90px) 0 vw(72px);
  background: #f9fafa;
  @include media(1200px) {
    padding: 48px 0 32px;
  }
  .section__header {
    text-transform: uppercase;
    margin-bottom: vw(24px);
    @include media(1200px) {
      margin-bottom: 30px;
    }
    @include media(767px) {
      text-align: left;
    }
  }
  .description {
    font-size: vw(16px);
    line-height: 1.62;
    text-align: center;
    color: #041c30;
    margin-bottom: vw(64px);
    @include media(1200px) {
      font-size: 16px;
      margin-bottom: 48px;
    }
    @include media(767px) {
      text-align: left;
    }
  }

  .safety__blocks {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: minmax(100px, 1fr);
    grid-column-gap: 1vw;
    grid-row-gap: 1vw;
    @include media(1200px) {
      grid-column-gap: 10px;
      grid-row-gap: 10px;
      grid-template-columns: repeat(2, 1fr);
      margin-bottom: 32px;
    }
  }
  .safety__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 10vh;
    background: #ffffff;
    padding: 3vw;
    @include media(1200px) {
      padding: 16px;
      min-height: 128px;
    }
  }
  .safety__item-icon {
    height: vw(40px);
    margin-bottom: 1em;
    @include media(1200px) {
      height: 30px;
      margin-bottom: 12px;
    }
  }
  .safety__item-title {
    font-family: $font-2b;
    font-size: vw(14px);
    line-height: 1.5;
    text-align: center;
    text-transform: uppercase;
    color: #041c30;
    @include media(1200px) {
      font-size: 12px;
      line-height: 1.5;
    }
  }
}
</style>
