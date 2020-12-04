<template>
  <section
    v-observe-visibility="{
      callback: startAnimation,
      once: true,
      threshold: 0.8
    }"
    class="section section__quote"
  >
    <Curve class="curve_s" />

    <div class="container">
      <div class="quote__block">
        <div class="quote__head">
          <IconQuotes class="before gsapTop" />
          <div class="gsapLeft" data-hook="0.5">
            <div
              class="quote__title section__header"
              v-html="block.title"
            ></div>
          </div>

          <IconQuotes class="after gsapBottom" data-hook="0.6" />
        </div>
        <div
          v-if="isMobile"
          class="quote__more"
          :class="{ active: !hideDescription }"
          @click="seeDescription"
        >
          <ArrowIcon />
          <span>See description</span>
          <ArrowIcon />
        </div>
        <div
          v-show="isMobile ? !hideDescription : true"
          class="quote__content gsapRight"
          data-hook="0.7"
        >
          <div class="" v-html="block.quote"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import { gsap } from 'gsap';
import IconQuotes from '~/assets/images/icons/quote.svg';
import Curve from '~/assets/images/curve.svg';
import ArrowIcon from '~/assets/images/icons/arrow-top.svg';

export default {
  components: { IconQuotes, Curve, ArrowIcon },
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
      hideDescription: true
      // animate: false
    };
  },
  created() {
    // console.log(this.$refs);
  },
  mounted() {
    this.$nextTick(() => this.gsapTranslate3());
  },
  methods: {
    visibilityChanged(isVisible) {
      this.animate = isVisible;
    },
    startAnimation() {
      // gsap.from('#cur77', { drawSVG: 100, duration: 20 });
      // gsap.to('#cur77_c', {
      //   duration: 34,
      //   repeat: 0,
      //   ease: 'power1.inOut',
      //   motionPath: {
      //     path: '#cur77_p',
      //     align: '#cur77_p',
      //     alignOrigin: [0.5, 0.5]
      //   }
      // });
    },
    gsapTranslate3() {
      Array.from(
        this.$el.querySelectorAll(
          '.gsapOpacity, .gsapTop, .gsapBottom, .gsapLeft, .gsapRight'
        )
      ).forEach((item) => {
        const delay = +item.dataset.delay || 0;
        const duration = +item.dataset.duration || 0.8;
        const hook = item.dataset.hook || 0.6;
        const transform = item.dataset.transform || 'translate(0, 0)';
        const scene = this.$scrollmagic
          .scene({
            triggerElement: '.section__quote',
            triggerHook: Number(hook),
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
    },
    seeDescription() {
      this.hideDescription = !this.hideDescription;
    }
  }
};
</script>

<style lang="scss">
.section__quote {
  margin: 2vw 0;
  @include media(1200px) {
    margin: 36px 0 32px;
  }
  .quote__block {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(245, 245, 246, 0.7);
    padding: 4vw 5vw;
    @include media(1200px) {
      padding: 20px;
    }
    @include media(767px) {
      width: calc(100% + 64px);
      margin-left: -32px;
      padding: 40px 32px;
      flex-direction: column;
    }
  }
  .quote__head {
    width: 50%;
    padding-right: 7vw;
    @include media(767px) {
      width: 100%;
      padding: 0;
      margin-bottom: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .before {
      width: vw(30px);
      height: vw(22px);
      margin-bottom: 5vw;
      @include media(1200px) {
        width: 18px;
        height: 14px;
        margin-bottom: 30px;
      }
      @include media(767px) {
        margin-bottom: 20px;
      }
    }
    .after {
      width: vw(30px);
      height: vw(22px);
      margin-top: 5vw;
      // transform: rotate(180deg);
      @include media(1200px) {
        width: 18px;
        height: 14px;
        margin-top: 30px;
      }
      @include media(767px) {
        margin-top: 20px;
      }
    }
  }
  .quote__content {
    width: 50%;
    font-size: vw(16px);
    line-height: 1.75;
    color: #0d314f;
    padding-left: 0.5vw;
    text-align: justify;
    position: relative;
    @include media(1200px) {
      font-size: 12px;
    }
    @include media(767px) {
      font-size: 16px;
      width: 100%;
      padding: 0;
      text-align: left;
      margin-top: 20px;
    }
  }
  .quote__title {
    font-size: vw(42px);
    line-height: 1.57;
    color: #0d314f;
    text-align: left;
    position: relative;
    @include media(1200px) {
      font-size: 24px;
    }
    @include media(767px) {
      font-size: 21px;
      line-height: 1.28;
      text-align: center;
    }
  }
  .quote__more {
    font-size: 16px;
    line-height: 1.25;
    font-family: $font-2b;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    span {
      margin: 0 16px;
    }
    .svg-icon {
      transform: rotate(180deg);
      path {
        fill: $red;
      }
    }
    &.active {
      .svg-icon {
        transform: rotate(0);
      }
    }
  }
  .curve_s {
    position: absolute;
    top: 0;
    z-index: -1;
    width: 35vw;
    left: -15vw;
    .cls-3 {
      fill: #f4f5f6;
    }
    #cur77 {
      width: 110%;
      fill: none;
      stroke: $red;
      stroke-width: 4px;
    }
    #cur77_p {
      fill: none;
      stroke: none;
      // stroke: blue;
      stroke-width: 1px;
    }
    // #cur77_c {
    //   transform: translateX(-5px);
    // }
  }
}
</style>
