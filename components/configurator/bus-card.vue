<template>
  <div :id="item.link" class="bus-card">
    <div class="card__head">
      <div data-hook="0.8" class="card__title gsapTop">
        {{ item.configurator_title }}
      </div>
      <picture
        v-if="item.configurator_bg"
        class="card__bg gsapOpacity"
        data-hook="1"
      >
        <source
          v-if="item.configurator_bg.conversions.original_webp"
          :srcset="item.configurator_bg.conversions.original_webp"
          type="image/webp"
        />
        <img :src="item.configurator_bg.url" class="card__bg-img" />
      </picture>
      <picture
        v-if="item.configurator_image"
        class="card__img gsapBottom"
        data-transform="translate(-50%, 2%)"
        data-hook="1"
      >
        <source
          v-if="item.configurator_image.conversions.original_webp"
          :srcset="item.configurator_image.conversions.original_webp"
          type="image/webp"
        />
        <img :src="item.configurator_image.url" />
      </picture>
    </div>
    <div class="card__content">
      <div
        class="card__price gsapBottom"
        v-html="item.configurator_price_text"
      />
      <i class="divider"></i>
      <nuxt-link :to="item.slug" append class="card__link gsapBottom">
        {{ item.configurator_button_title }}
        <ArrowRight class="card__arrow" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import ArrowRight from '~/assets/images/icons/arrow-right.svg';
export default {
  components: {
    ArrowRight
  },
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.$nextTick(() => this.gsapTranslateBus());
  },
  methods: {
    gsapTranslateBus() {
      Array.from(
        document.querySelectorAll(
          '.gsapOpacity, .gsapTop, .gsapBottom, .gsapLeft, .gsapRight'
        )
      ).forEach((item) => {
        const delay = +item.dataset.delay || 0;
        const duration = +item.dataset.duration || 0.8;
        const hook = +item.dataset.hook || 1;
        const transform = item.dataset.transform || 'translate(0, 0)';
        const scene = this.$scrollmagic
          .scene({
            offset: -50,
            triggerElement: item,
            triggerHook: hook,
            duration: 0,
            reverse: false
          })
          .setTween(item, duration, {
            delay,
            transform,
            opacity: 1,
            overwrite: false,
            lazy: true
          });
        // .addIndicators();
        this.$scrollmagic.addScene(scene);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.bus-card .card__link {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.5s ease;
}
.bus-card i.divider {
  height: 1px;
}
</style>
<style lang="scss">
.card__price {
  color: $gray;
  text-align: center;
  padding: 0 0 vw(100px) 0;
  font-family: $font-acumin-r;
  font-size: vw(17px);
  @include media(767px) {
    font-size: 14px;
    line-height: 1.15;
    padding-bottom: 32px;
    text-align: left;
  }
  strong {
    color: $black;
  }
}
.card__arrow {
  fill: $red;
  width: vw(24px);
  height: vw(15px);
  margin-left: vw(10px);
  transition: fill 0.5s ease;
  @include media(767px) {
    width: 17px;
    height: 11px;
    margin-left: 10px;
  }
}
.bus-card .card__link {
  &.card__link_justify {
    @include media(767px) {
      justify-content: space-between;
      margin-bottom: 8px;
    }
  }
  &:hover {
    svg {
      fill: $darkBlue;
    }
  }
}
</style>
