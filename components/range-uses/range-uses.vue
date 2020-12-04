<template>
  <section class="section section-rangeuses">
    <div class="container">
      <div class="range-uses_content">
        <div class="section__header range-uses_title">{{ block.title }}</div>
        <div class="range-uses_text">
          {{ block.description }}
        </div>
      </div>
    </div>
    <div class="range-blocs_wr">
      <div v-for="(item, index) in block.items" :key="index" class="one-block">
        <div class="one-block_title">{{ item.title }}</div>
        <div class="one-block_subtitle">{{ item.description }}</div>
        <img
          :src="item.image.url"
          :alt="item.image.custom_properties.seo_alt"
          class="one-block_img"
        />
      </div>
      <div class="one-block custom-block">
        <div class="one-block_title">{{ block.configurator_block.title }}</div>
        <div
          class="one-block_subtitle"
          v-html="block.configurator_block.description"
        ></div>
        <Button
          btn-type="red"
          :btn-text="block.configurator_block.button_title"
          class="one-block_btn"
        />
      </div>
    </div>
  </section>
</template>

<script>
import Button from '~/components/ui/btn/btn';
export default {
  components: { Button },
  props: {
    block: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      range: [
        {
          title: 'Adventure ',
          subtitle: 'Starting ',
          img: 'bsdf.jpg'
        }
      ]
    };
  },
  computed: {},
  methods: {}
};
</script>

<style scoped lang="scss">
.section-rangeuses {
  padding-top: vw(116px);
  @include media(767px) {
    padding-top: 64px;
  }
}
.range-uses_content {
  display: flex;
  justify-content: space-between;
  margin-bottom: vw(64px);
  @include media(767px) {
    flex-direction: column;
    margin-bottom: 32px;
  }
}
.range-uses_title {
  text-transform: uppercase;
  color: #0d314f;
  width: 50%;
  text-align: left;
  @include media(767px) {
    width: 100%;
  }
}
.range-uses_text {
  font-family: $font-1r;
  font-size: vw(16px);
  line-height: 1.6;
  color: #041c30;
  width: vw(536px);
  @include media(767px) {
    width: 100%;
    font-size: 16px;
    margin-top: 20px;
  }
}
.range-blocs_wr {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  @include media(767px) {
    display: flex;
    flex-direction: column;
  }
}
.one-block {
  position: relative;
  height: calc(100vw / 3);
  overflow: hidden;
  padding: vw(40px);
  @include media(767px) {
    width: 100%;
    height: 100vw;
    padding: 32px;
  }
  &.custom-block {
    background: #041c30;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .one-block_title {
      margin-bottom: vw(25px);
      text-align: center;
      @include media(767px) {
        font-size: 32px;
        margin-bottom: 24px;
      }
    }
    .one-block_subtitle {
      margin-bottom: vw(70px);
      @include media(767px) {
        margin-bottom: 40px;
      }
    }
  }
}
.one-block_img {
  z-index: -1;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: bottom;
}
.one-block_title {
  font-family: $font-2b;
  font-size: vw(32px);
  line-height: 1.14;
  text-transform: uppercase;
  color: #ffffff;
  margin-bottom: vw(12px);
  @include media(767px) {
    font-size: 24px;
    line-height: 1.25;
    margin-bottom: 8px;
  }
}
.one-block_subtitle {
  font-family: $font-1r;
  font-size: vw(14px);
  line-height: 1.2;
  color: #ffffff;
  @include media(767px) {
    font-size: 14px;
    line-height: 1.15;
  }
  span {
    color: #808080;
  }
}
.one-block_btn {
  // width: 60%;
  padding: 0 52px;
  @include media(767px) {
    width: 100%;
  }
}
</style>
