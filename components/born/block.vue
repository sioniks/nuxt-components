<template>
  <section class="section block" :style="{ height: totalHeight }">
    <div class="block-sticky">
      <div class="container">
        <h2 class="block-title">{{ content.title }}</h2>
        <div class="block-list">
          <div class="block-before"></div>
          <div class="block-list-content">
            <div
              v-for="(item, index) in content.items"
              :key="index"
              class="block-list-item"
              :class="[index === 0 ? 'active' : '', index !== 0 ? 'down' : '']"
            >
              <div class="block-list-text" v-html="item.content"></div>
            </div>
          </div>
          <div class="block-after"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: null
    },
    scrollNumber: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      totalHeight: null
    };
  },
  mounted() {
    setTimeout(() => {
      this.gsapTranslate();
    }, 500);
    this.totalHeight =
      document.documentElement.clientHeight +
      this.scrollNumber * this.content.items.length +
      'px';
  },
  methods: {
    gsapTranslate() {
      Array.from(
        document.querySelectorAll('.block-title, .block-list-content')
      ).forEach((item) => {
        const delay = +item.dataset.delay || 0;
        const duration = +item.dataset.duration || 0.8;
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
.block {
  margin-top: vw(53px);
  min-height: 100vh;
  position: relative;
  z-index: 1;
  @include media(767px) {
    margin-top: 16px;
  }
  &:last-child {
    margin-top: 0;
  }
  &-after {
    content: '';
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: linear-gradient(#ffffff, transparent);
    pointer-events: none;
  }
  &-before {
    content: '';
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background: linear-gradient(transparent, #ffffff);
    pointer-events: none;
  }
  &-sticky {
    padding: vw(80px) 0 vw(28px);
    display: block;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow: hidden;
    z-index: 100;
    @include media(767px) {
      padding: 40px 0;
    }
  }
  &:nth-child(even) {
    background: #fafbfb;
    padding-bottom: vw(72px);
    @include media(767px) {
      padding-bottom: 0;
    }
    .block-sticky {
      background: #fafbfb;
    }
    .block-after {
      background: linear-gradient(#fafbfb, transparent);
    }
    .block-before {
      background: linear-gradient(transparent, #fafbfb);
    }
  }
  &-title {
    font-size: vw(40px);
    font-family: $font-2b;
    line-height: 1.25;
    opacity: 0;
    transform: translateX(-100px);
    position: relative;
    z-index: 1;
    @include media(767px) {
      font-size: 24px;
    }
  }
  &-list {
    display: flex;
    height: 100%;
    &-content {
      position: relative;
      height: 100%;
      width: 100%;
      opacity: 0;
      transform: translateY(100px);
    }
    &-item {
      position: absolute;
      padding: vw(48px) vw(178px) vw(48px) 0;
      display: flex;
      justify-content: flex-end;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      transition: transform 0.8s ease, opacity 0.4s ease;
      @include media(767px) {
        padding: 80px 96px 80px 0;
      }
      &.down {
        transform: translateY(100vh);
        opacity: 0;
      }
      &.up {
        transform: translateY(-100vh);
        opacity: 0;
      }
      &:after {
        content: '';
        position: absolute;
        width: vw(150px);
        height: 2px;
        background: $red;
        right: -4vw;
        top: 50%;
        transform: translateY(-50%);
        transition: width 0.5s ease, background-color 0.5s ease;
        @include media(767px) {
          width: 118px;
          right: -32px;
        }
      }
      &.active {
        padding-right: vw(178px);
        transform: translateY(-50%);
        opacity: 1;
        @include media(767px) {
          padding-right: 96px;
        }
        &.down {
          transform: translateY(100vh);
          opacity: 0;
        }
      }
    }
    &-text {
      font-family: $font-1r;
      line-height: 1.37;
      max-width: 100%;
      font-size: vw(48px);
      color: $red;
      @include media(767px) {
        font-size: 28px;
      }
    }
  }
}
</style>
