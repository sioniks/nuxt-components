<template>
  <section class="section section__award">
    <div class="container">
      <div class="gsapBottom">
        <div class="supheader">{{ block.extra.sub_title }}</div>
      </div>
      <div class="gsapBottom">
        <div class="section__header">{{ block.title }}</div>
      </div>
      <div class="awards__wr">
        <AwardCard
          v-for="(item, index) in block.items"
          :key="index"
          :item="item"
          class="gsapBottom"
          :data-delay="0.3 * (index + 1)"
        />
      </div>
    </div>
    <Curve1 v-if="!isTablet || !isMobile" class="curve1" />
    <Curve2 v-if="!isTablet || !isMobile" class="curve2" />
  </section>
</template>

<script>
import AwardCard from '~/components/award/award-card';
import Curve1 from '~/assets/images/curve10.svg';
import Curve2 from '~/assets/images/curve11.svg';

export default {
  components: { AwardCard, Curve1, Curve2 },
  props: {
    block: {
      type: Object,
      default: null
    },
    isTablet: {
      type: Boolean,
      default: false
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.$nextTick(() => this.gsapTranslateAward());
  },
  methods: {
    gsapTranslateAward() {
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
            triggerElement: item,
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
    }
  }
};
</script>

<style lang="scss">
.section__award {
  padding: vw(80px) 0 0;
  @include media(1200px) {
    padding-top: 64px;
  }
  .supheader {
    font-family: $font-1b;
    font-size: vw(16px);
    font-weight: bold;
    line-height: 1.19;
    text-transform: uppercase;
    color: #919aa1;
    margin: 0 auto vw(31px);
    width: fit-content;
    @include media(1200px) {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
  .section__header {
    margin-bottom: vw(80px);
    @include media(1200px) {
      margin-bottom: 40px;
    }
  }
  .awards__wr {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-gap: vw(24px);
    z-index: 2;
    position: relative;
    @include media(1200px) {
      grid-gap: 20px;
    }
    @include media(767px) {
      grid-template-columns: repeat(1, 1fr);
      grid-template-rows: repeat(1, 1fr);
    }
  }
  .curve1 {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
  }
  .curve2 {
    position: absolute;
    z-index: 0;
    top: 0;
    right: 0;
  }
}
</style>
