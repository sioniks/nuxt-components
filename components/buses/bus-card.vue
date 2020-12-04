<template>
  <div :id="item.link" class="bus-card">
    <Btn360
      class="gsapRight"
      data-hook="0.8"
      @click.native="$emit('show3d', { link: item.view_360 })"
    />
    <div class="card__head">
      <div data-hook="0.8" class="card__title gsapTop">{{ item.title }}</div>
      <picture class="card__bg gsapOpacity" data-hook="1">
        <source
          v-if="item.image_bg.conversions.original_webp"
          :srcset="item.image_bg.conversions.original_webp"
          type="image/webp"
        />
        <img :src="item.image_bg.url" class="card__bg-img" />
      </picture>
      <picture
        class="card__img gsapBottom"
        data-transform="translate(-50%, 0)"
        data-hook="1"
      >
        <source
          v-if="item.image_bus.conversions.original_webp"
          :srcset="item.image_bus.conversions.original_webp"
          type="image/webp"
        />
        <img :src="item.image_bus.url" />
      </picture>
    </div>
    <div class="card__content">
      <div class="card__items">
        <div
          v-for="(elem, index) in item.features"
          :key="index"
          class="card__item"
        >
          <img
            :src="elem.image_feature.url"
            class="card__item-icon gsapTop"
            :data-delay="(0.2 * (index + 1)).toFixed(2)"
            data-hook="0.8"
          />
          <div class="card__item-title gsapBottom" data-hook="0.9">
            {{ elem.title }}
          </div>
        </div>
      </div>
      <div class="card__text gsapBottom">
        <div class="" v-html="item.text"></div>
      </div>
      <i class="divider"></i>
      <app-link to="/about- " class="card__link gsapBottom"
        >{{ item.button_text }}
      </app-link>
      <!-- <a class="card__link gsapBottom">{{ item.button_text }}</a> -->
    </div>
  </div>
</template>

<script>
import Btn360 from '~/components/ui/btn/btn360';

export default {
  components: {
    Btn360
  },
  props: {
    item: {
      type: Object,
      default: null
    }
    // animate: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      show: false
    };
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

<style lang="scss">
.bus-card {
  width: 49%;
  // width: 50%;
  background: #f8f9f9;
  position: relative;
  @include media(767px) {
    width: 100%;
    margin-bottom: 32px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .card__head {
    width: 100%;
    height: 35vw;
    position: relative;
    @include media(767px) {
      height: 87vw;
    }
  }
  .btn--360 {
    position: absolute;
    right: 3vw;
    top: 3vw;
    z-index: 1;
    @include media(767px) {
      right: 0;
      top: 0;
      padding: 7px 16px;
    }
  }
  .card__title {
    font-family: $font-2b;
    position: absolute;
    z-index: 3;
    top: 4vw;
    left: 4vw;
    font-size: vw(38px);
    line-height: 1.26;
    text-transform: uppercase;
    color: #ffffff;
    width: 50%;
    @include media(1200px) {
      font-size: 20px;
    }
    @include media(767px) {
      font-size: 32px;
      top: 40px;
      left: 20px;
      width: calc(100% - 40px);
    }
  }
  .card__bg {
    width: 100%;
    height: 80%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }
  .card__bg-img {
    width: 100%;
    object-fit: contain;
    @include media(767px) {
      height: 71vw;
      object-fit: cover;
    }
  }
  .card__img {
    position: absolute;
    width: 90%;
    left: 50%;
    transform: translate(-50%, 50%);
    bottom: 0;

    img {
      width: 100%;
    }
  }
  .card__content {
    // padding: unquote('min(48px, 2.5vw)');
    padding: unquote('min(48px, 2.5vw)');
    position: relative;
    height: calc(100% - 35vw);
    @include media(767px) {
      padding: 16px;
      display: flex;
      flex-direction: column;
    }
  }
  .card__items {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 1vw;
    grid-row-gap: 1vw;
    margin-bottom: 3vw;
    @include media(767px) {
      grid-column-gap: 10px;
      grid-row-gap: 10px;
      margin-bottom: 32px;
    }

    &:nth-child(1) {
      grid-row: 1;
      grid-column: 1;
    }
    &:nth-child(2n) {
      grid-row: 1;
      grid-column: 1;
    }
    &:nth-child(3n) {
      grid-row: 2;
      grid-column: 2;
    }
    &:nth-child(4n) {
      grid-row: 2;
      grid-column: 2;
    }
  }
  .card__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: vw(145px);
    background: #ffffff;
    padding: vw(26px) vw(18px) vw(18px);
    @include media(1200px) {
      padding: 15px;
    }
    @include media(767px) {
      padding: 16px 10px;
    }
  }
  .card__item-icon {
    height: vw(42px);
    width: vw(42px);
    margin-bottom: vw(17px);
    @include media(1200px) {
      margin-bottom: 12px;
      height: 30px;
      width: auto;
    }
    svg path {
      stroke-width: 3;
      stroke-dasharray: 10;
      stroke-dashoffset: 0;
      transition: all 1s ease;
      animation: anim 4s linear forwards;
      animation-iteration-count: infinite;
    }
  }
  .card__item-title {
    font-family: $font-2b;
    font-size: vw(14px);
    line-height: 1.49;
    text-align: center;
    text-transform: uppercase;
    color: #041c30;
    @include media(1200px) {
      font-size: 10px;
    }
    @include media(767px) {
      font-size: 12px;
    }
  }
  .card__text {
    font-size: vw(16px);
    line-height: 1.75;
    text-align: justify;
    color: #0d314f;
    margin-bottom: 10vw;
    position: relative;
    @include media(1200px) {
      font-size: 12px;
    }
    @include media(767px) {
      display: none;
    }
  }
  .divider {
    display: block;
    position: absolute;
    left: 2.5vw;
    bottom: 7vw;
    width: calc(100% - 5vw);
    height: 2px;
    background: #efefef;
    @include media(767px) {
      position: static;
    }
  }
  .card__link {
    text-align: center;
    width: 100%;
    position: absolute;
    bottom: 3vw;
    left: 0;
    font-family: $font-2b;
    font-weight: bold;
    font-size: vw(20px);
    line-height: 1.25;
    color: $red;
    transition: color 0.5s ease;
    @include media(1200px) {
      font-size: 14px;
      bottom: 2.5vw;
    }
    @include media(767px) {
      position: static;
      font-size: 16px;
      margin: 24px 0 16px;
    }
    &:hover {
      color: #0d314f;
    }
  }
}

.scale-enter-active,
.scale-leave-active {
  transition: all 4s;
}
.scale-enter, .scale-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: scale(0);
}

@keyframes anim {
  from {
    stroke-dashoffset: 10;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>
