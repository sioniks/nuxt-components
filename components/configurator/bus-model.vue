<template>
  <div class="bus-model">
    <div class="bus-model__container">
      <p class="bus-model__name gsapLeftTitle">{{ model.name }}</p>
    </div>
    <div class="bus-model__img">
      <img
        :src="model.menu_image.url || ''"
        :alt="model.menu_image.seo_alt || ''"
        class="gsapBottom"
      />
    </div>
    <div class="bus-model__container bus-model__content">
      <div class="bus-model__price gsapBottom" v-html="model.menu_price_text" />
      <div
        class="bus-model__description gsapBottom"
        v-html="model.menu_description"
      />
      <div class="bus-model__configure">
        <nuxt-link
          :to="`${model.slug}/components?step=${stepTo}`"
          append
          class="bus-model__link gsapBottom"
        >
          Configure model
          <ArrowRight class="bus-models__arrow" />
        </nuxt-link>
      </div>
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
    model: {
      type: Object,
      default: null
    }
  },
  computed: {
    stepTo() {
      return this.$route.params.bus === ' ' ? 'packages' : 'vehicle';
    }
  }
};
</script>
<style lang="scss" scoped>
.gsapLeftTitle {
  opacity: 0;
  transform: translateX(-50px);
}
.gsapBottom {
  opacity: 0;
  transform: translateY(50px);
}
</style>
<style lang="scss">
.bus-model {
  padding: vw(32px) 0 0 0;
  background: #ffffff;
  border: 1px solid #eaeaea;
  width: 33.33%;
  z-index: 5;
  display: flex;
  flex-direction: column;
  @include media(767px) {
    width: 100%;
    padding-top: 32px;
    margin-bottom: 16px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &__name {
    font-family: $font-2b;
    color: $black;
    text-transform: uppercase;
    font-size: vw(26px);
    line-height: vw(33px);
    @include media(767px) {
      font-size: 20px;
      line-height: 1.25;
      margin-bottom: 10px;
    }
  }

  &__img {
    width: 91%;
    display: block;
    position: relative;
    margin: 0 auto;
    height: vw(240px);
    @include media(767px) {
      width: 100%;
      height: auto;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      @include media(767px) {
        width: 100%;
        height: auto;
        object-fit: inherit;
      }
    }
  }

  &__price {
    color: $gray;
    font-size: vw(14px);
    line-height: vw(16px);
    margin-bottom: vw(16px);
    margin-top: vw(15px);
    @include media(767px) {
      font-size: 14px;
      line-height: 1.17;
      margin: 26px 0 20px;
    }
    strong {
      color: $black;
    }
  }

  &__description {
    font-size: vw(16px);
    line-height: vw(28px);
    color: $black;
    margin-bottom: vw(24px);
    @include media(767px) {
      font-size: 12px;
      line-height: 1.17;
      margin-bottom: 22px;
    }
  }

  &__configure {
    border-top: 1px solid #eaeaea;
    margin-top: auto;
  }

  &__link {
    width: 100%;
    padding: vw(24px) 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: vw(16px);
    line-height: vw(19px);
    text-transform: uppercase;
    color: $red;
    transition: color 0.5s ease;
    font-family: $font-1b;
    @include media(767px) {
      font-size: 14px;
      line-height: 1.17;
      padding: 24px 0;
    }
    &:hover {
      color: $black;

      svg {
        fill: $black;
      }
    }

    svg {
      fill: $red;
      transition: color 0.5s ease;
    }
  }

  &__container {
    padding: 0 vw(32px);
    @include media(767px) {
      padding: 0 24px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
}
</style>
