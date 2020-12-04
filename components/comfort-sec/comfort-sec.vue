<template>
  <section class="section section-comfort">
    <template v-if="!isMobile">
      <Curve1 class="curve1" />
      <Curve2 class="curve2" />
      <Curve3 class="curve3" />
    </template>
    <div class="container">
      <div class="section__header comfort__header">{{ block.title }}</div>
    </div>
    <div v-if="!isMobile" class="elements-wr">
      <template v-for="(tab, index) in block.items">
        <component
          :is="component(tab.type)"
          :key="index"
          :block="tab"
        ></component>
      </template>
    </div>
    <div
      v-else
      v-swiper:mySwiperComfort="optionsMain"
      @transitionEnd="slideChangeMain"
    >
      <div class="swiper-wrapper">
        <template v-for="(tab, index) in block.items">
          <component
            :is="component(tab.type)"
            :key="index"
            :block="tab"
            :slider="true"
          ></component>
        </template>
      </div>
      <div class="buttons" data-delay="0.2">
        <div slot="button-prev" class="swiper-button swiper-button-prev">
          <IconArrowMobile />
        </div>
        <div slot="button-next" class="swiper-button swiper-button-next">
          <IconArrowMobile />
        </div>
        <div class="progress-line">
          <span :style="{ width: `${progressWidth}%` }"></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Element from '~/components/comfort-sec/comfort-element';
import ElementTabs from '~/components/comfort-sec/comfort-element-tabs';
import IconArrowMobile from '~/assets/images/icons/team-mobile-arrow.svg';
import Curve1 from '~/assets/images/curve-comfort-sec.svg';
import Curve2 from '~/assets/images/curve-comfort-sec2.svg';
import Curve3 from '~/assets/images/curve-comfort-sec3.svg';
export default {
  components: { Element, ElementTabs, Curve1, Curve2, Curve3, IconArrowMobile },
  props: {
    block: {
      type: Object,
      default: null
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      optionsMain: {
        slidesPerView: 'auto',
        loop: false,
        lazyLoading: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      progressWidth: null,
      currentIndex: 1
    };
  },
  mounted() {
    this.progressWidth = 100 / this.block.items.length;
  },
  methods: {
    component(type) {
      if (type === 'simple_with_tabs') {
        return 'ElementTabs';
      } else {
        return 'Element';
      }
    },
    slideChangeMain() {
      const flag = this.$el.querySelector(
        '.swiper-button-next.swiper-button-disabled'
      );
      if (flag) {
        this.currentIndex = this.mySwiperComfort.slides.length;
      } else {
        this.currentIndex = this.mySwiperComfort.activeIndex + 1;
      }
      this.progressWidth =
        (100 / this.mySwiperComfort.slides.length) * this.currentIndex;
    }
  }
};
</script>

<style lang="scss">
.section-comfort {
  padding-top: vw(88px);
  position: relative;
  @include media(767px) {
    padding-top: 64px;
  }
  .swiper-container {
    padding-bottom: 50px;
  }
  .buttons {
    position: absolute;
    padding: 0 32px;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    width: 100%;
    .swiper-button {
      position: static;
      width: 27px;
      height: 10px;
      margin: 0 12px 0 0;
      background: none;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        width: 100%;
        height: 100%;
        fill: $red;
      }
      &-next {
        transform: rotate(180deg);
      }
      &.swiper-button-disabled {
        opacity: 1;
        svg {
          fill: #e8ecef;
        }
      }
    }
    .progress-line {
      width: 100%;
      margin-left: 8px;
      height: 2px;
      background: #f3f3f3;
      position: relative;
      span {
        position: absolute;
        left: 0;
        top: 0;
        width: 0;
        height: 100%;
        background: $red;
        transition: width 0.3s ease;
      }
    }
  }
  .curve1 {
    position: absolute;
    right: 0;
    top: 0;
    transform: rotate(-15deg) translate(10%, -22%);
    z-index: -1;
  }
  .curve2 {
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translateY(50%);
    z-index: -1;
  }
  .curve3 {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(10%, 65%);
    fill: transparent;
    z-index: -1;
    path {
      fill: transparent;
    }
  }
  &:nth-child(odd) {
    .curve1,
    .curve2,
    .curve3 {
      display: none;
    }
  }
  .comfort__header {
    text-align: left;
    margin-bottom: vw(77px);
    text-transform: uppercase;
    @include media(767px) {
      margin-bottom: 32px;
    }
  }
  .elements-wr {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  // якщо не зручно тут писати стилі, то можеш перенести їх в компонент елемента comfot-element.vue
  .element {
    position: relative;
    display: flex;
    justify-content: space-between;
    min-height: unquote('min(30vw, 400px)');
    width: 50%;
    padding: vw(64px) vw(20px) vw(45px) vw(60px);
    overflow: hidden;
    @include media(767px) {
      width: 250px;
      height: 515px;
      margin-right: 8px;
      padding: 32px;
      min-height: auto;
      border: 1px solid #f4f5f6;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
    }
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: calc(100% - 4vw);
      height: 2px;
      background: #f4f5f6;
      @include media(767px) {
        display: none;
      }
    }
    &:nth-child(odd) {
      padding-left: 4vw;
      @include media(767px) {
        padding-left: 32px;
      }
      &:after {
        left: 4vw;
      }
      &:before {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        width: 2px;
        height: 100%;
        background: #f4f5f6;
        @include media(767px) {
          display: none;
        }
      }
    }
    &:nth-child(even) {
      padding-right: 4vw;
      @include media(767px) {
        padding-right: 32px;
      }
    }
    &:nth-last-child(1),
    &:nth-last-child(2) {
      &:after {
        display: none;
      }
    }
    &.with--bg {
      .element_title {
        color: #ffffff;
      }
      .element_subtitle {
        color: #ffffff;
      }
      &:after {
        width: 100%;
      }
    }

    .element-descr {
      width: 45%;
      @include media(767px) {
        width: 100%;
      }
    }
    .element-img {
      width: 55%;
      position: relative;
      @include media(767px) {
        width: 100%;
        height: 220px;
        margin-top: 27px;
      }
      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
        object-position: 50% 50%;
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .element-img__bg {
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: 50% 50%;
      z-index: -1;
      position: absolute;
      top: 0;
      left: 0;
    }
    .element_title {
      font-family: $font-2b;
      font-size: vw(32px);
      line-height: 1.2;
      text-transform: uppercase;
      color: #041c30;
      margin-bottom: vw(62px);
      position: relative;
      @include media(767px) {
        font-size: 22px;
        margin-bottom: 34px;
      }
      &:after {
        content: '';
        position: absolute;
        bottom: vw(-39px);
        width: vw(40px);
        left: 0;
        height: 2px;
        background: $red;
        @include media(767px) {
          bottom: -12px;
          width: 40px;
        }
      }
    }
    .element_subtitle {
      font-family: $font-1r;
      font-size: vw(16px);
      line-height: 1.5;
      color: #000000;
      @include media(767px) {
        font-size: 14px;
        line-height: 1.3;
      }
    }
    .element_tabs {
      font-family: $font-1r;
      position: absolute;
      bottom: vw(32px);
      left: 4vw;
      font-size: vw(16px);
      line-height: 1.62;
      color: #000000;
      display: flex;
      @include media(767px) {
        position: static;
        margin-top: auto;
        font-size: 16px;
      }
    }
    .element_tab {
      margin-right: vw(14px);
      opacity: 0.5;
      @include media(767px) {
        margin-right: 20px;
      }
      &.active {
        opacity: 1;
      }
    }
  }

  // .curve1 {
  //   position: absolute;
  //   top: 0;
  //   right: 0;
  //   width: 100px;
  //   height: 100px;
  //   z-index: -1;
  // }
  // .curve2 {
  //   position: absolute;
  //   bottom: 0;
  //   left: 0;
  //   width: 100px;
  //   height: 100px;
  //   z-index: -1;
  // }
  // .curve3 {
  //   position: absolute;
  //   bottom: 0;
  //   right: 0;
  //   width: 100px;
  //   height: 100px;
  //   z-index: -1;
  // }
}
</style>
