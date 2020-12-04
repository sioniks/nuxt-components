<template>
  <section class="section section-info">
    <div class="container">
      <div class="info-wr">
        <div v-for="(item, ind) in block.items" :key="ind" class="info-block">
          <div v-if="item.extra.service_latitude" class="info-block__link">
            <a href="/" class="map-link">
              <MapIcon />
              MAN Service Map
            </a>
          </div>
          <div class="info-block__icon">
            <img
              :src="item.icon.url"
              :alt="item.icon.custom_properties.seo_alt"
            />
          </div>
          <div class="info-block__suptitle">{{ item.description }}</div>
          <div class="info-block__title">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import MapIcon from '~/assets/images/icons/map-icon.svg';

export default {
  components: {
    MapIcon
  },
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
.info-wr {
  display: flex;
  justify-content: space-between;
  @include media(767px) {
    flex-direction: column;
  }
}
.info-block {
  width: calc((100% - 4em) / 3);
  padding: 157px 32px 32px 32px;
  position: relative;
  min-height: 250px;
  background: #f9fafa;
  @include media(767px) {
    width: 100%;
    margin-bottom: 12px;
    padding: 85px 24px 24px;
    min-height: 160px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
.info-block__link {
  position: absolute;
  top: 50px;
  left: 32px;
  font-family: $font-1b;
  font-size: vw(16px);
  line-height: 1.2;
  color: #041c30;
  padding-left: vw(20px);
  @include media(767px) {
    top: 34px;
    left: inherit;
    right: 24px;
    font-size: 14px;
    padding-left: 20px;
  }
  &:hover {
    a {
      color: $red;
    }
    svg {
      fill: $red;
    }
  }
  .svg-icon {
    position: absolute;
    left: 0;
    top: -2px;
  }
}
.info-block__icon {
  position: absolute;
  right: 32px;
  top: 32px;
  width: unquote('max(20%, 75px)');
  height: 62px;
  img {
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    @include media(767px) {
      width: auto;
      left: 0;
    }
  }
  @include media(767px) {
    top: 24px;
    left: 24px;
    width: 68px;
    height: 38px;
  }
  // .svg-icon {
  //   max-width: 100%;
  //   position: absolute;
  //   right: 0;
  //   top: 0;
  // }
}
.info-block__suptitle {
  font-family: $font-1r;
  margin-bottom: 13px;
  font-weight: normal;
  font-size: vw(16px);
  line-height: 1.2;
  color: #041c30;
  @include media(767px) {
    font-size: 16px;
    line-height: 1.17;
    margin-bottom: 8px;
  }
}
.info-block__title {
  font-family: $font-2b;
  font-size: vw(26px);
  line-height: 1.15;
  text-transform: uppercase;
  color: #041c30;
  @include media(767px) {
    font-size: 20px;
    line-height: 1.25;
  }
}
</style>
