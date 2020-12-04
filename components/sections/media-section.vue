<template>
  <section class="section section__media">
    <div class="container">
      <div class="section__top">
        <div class="gsapLeft">
          <div class="section__header" v-html="block.title"></div>
        </div>
        <div class="gsapBottom">
          <div class="description" v-html="block.description"></div>
        </div>
        <Button
          v-if="!isTablet"
          btn-text="view all articles"
          class="gsapBottom"
          data-delay="0.9"
          data-hook="1.1"
        />
      </div>
      <div class="section__content">
        <Article
          v-for="(item, index) in block.media_coverages"
          :key="index"
          :content="item"
          :is-mobile="isMobile"
          class="gsapBottom"
          :data-delay="0.3 * (index + 1)"
          data-hook="1.5"
        />
      </div>
      <Button
        v-if="isTablet"
        btn-text="view all articles"
        class="gsapBottom"
        data-delay="0.9"
        data-hook="1.1"
      />
    </div>
    <Curve1 v-if="!isTablet" class="curve1" />
  </section>
</template>

<script>
import Button from '~/components/ui/btn/btn-big';
import Article from '~/components/media-says/article';
import Curve1 from '~/assets/images/curve9.svg';

export default {
  components: { Button, Article, Curve1 },
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
    this.$nextTick(() => this.gsapTranslateService());
  },
  methods: {
    gsapTranslateService() {
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

<style scoped lang="scss">
.section__media {
  padding: vw(90px) 0 5vw;
  overflow-y: hidden;
  @include media(1200px) {
    padding: 64px 0 46px;
  }
  @include media(767px) {
    padding-bottom: 64px;
  }
  .btn {
    position: absolute;
    right: 0;
    bottom: 2vw;
    z-index: 2;
    @include media(1200px) {
      position: static;
    }
  }
}
.section__top {
  position: relative;
  padding-right: 50%;
  margin-bottom: 3vw;
  @include media(1200px) {
    padding-right: 0;
    margin-bottom: 56px;
  }
}
.section__header {
  text-transform: uppercase;
  text-align: left;
  margin-bottom: 0.75em;
  @include media(767px) {
    margin-bottom: 30px;
  }
}
.description {
  font-size: vw(22px);
  line-height: 1.5;
  color: #818d97;
  @include media(767px) {
    font-size: 16px;
    line-height: 1.2;
  }
}
.section__content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
  z-index: 2;
  @include media(767px) {
    flex-direction: column;
    margin-bottom: 32px;
  }
}
.curve1 {
  position: absolute;
  z-index: 0;
  top: -19vw;
  right: 0;
}
</style>
<style lang="scss">
.section__media .btn--big {
  @include media(767px) {
    margin: 0;
    background: transparent;
    border: 1px solid #e9ebed;
    padding: 24px;
    min-height: auto;
    width: 100%;
    min-width: auto;
    &:hover {
      background-color: $red;
    }
    &:before {
      display: none;
    }
  }
}
</style>
