<template>
  <section class="dealers section">
    <div class="container">
      <h2 class="dealers-title section__header gsapLeftTitle">{{ title }}</h2>
      <h6 class="dealers-description gsapBottomDescription">{{ text }}</h6>
      <template v-if="tabs">
        <Tabs />
      </template>
    </div>
  </section>
</template>

<script>
import Tabs from '~/components/service/tabs';
export default {
  components: {
    Tabs
  },
  props: {
    title: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: null
    },
    tabs: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.gsapTranslate();
    }, 500);
  },
  methods: {
    gsapTranslate() {
      Array.from(
        document.querySelectorAll('.gsapLeftTitle, .gsapBottomDescription')
      ).forEach((item) => {
        const delay = item.dataset.delay || 0;
        const duration = item.dataset.duration || 0.8;
        const hook = item.dataset.hook || 1;
        const scene = this.$scrollmagic
          .scene({
            offset: -100,
            triggerElement: item,
            triggerHook: hook,
            duration: 0,
            reverse: false
          })
          .setTween(item, duration, {
            delay,
            transform: 'translate(0, 0)',
            opacity: 1,
            overwrite: false,
            lazy: true
          });
        this.$scrollmagic.addScene(scene);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.dealers {
  padding: vw(65px) 0 vw(40px);
  position: relative;
  overflow: hidden;
  @include media(767px) {
    padding: 48px 0;
  }
  &-title {
    text-align: left;
    text-transform: uppercase;
    margin-bottom: vw(21px);
    max-width: vw(870px);
    @include media(767px) {
      max-width: 100%;
      margin-bottom: 12px;
    }
  }
  &-description {
    font-size: vw(16px);
    line-height: 1.69;
    color: $gray;
    max-width: vw(870px);
    @include media(767px) {
      font-size: 16px;
      line-height: 1.19;
      max-width: 100%;
    }
  }
}
.gsapLeftTitle {
  opacity: 0;
  transform: translateX(-100px);
}
.gsapBottomDescription {
  opacity: 0;
  transform: translateY(100px);
}
</style>
