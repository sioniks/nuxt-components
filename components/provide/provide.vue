<template>
  <section class="section provide">
    <div
      v-if="!isMobile"
      class="provide-photo gsapBottomProvide"
      :style="{ backgroundImage: `url(${plus})` }"
    ></div>
    <div class="container">
      <h4 class="provide-title gsapLeftProvide">{{ block.title }}</h4>
      <div class="provide-list">
        <div
          v-for="(item, index) in block.items"
          :key="index"
          class="provide-list-item"
        >
          <img
            :src="item.icon.url"
            :alt="item.icon.custom_properties.seo_alt"
            class="provide-list-img gsapBottomProvide"
          />
          <h6 class="provide-list-title gsapBottomProvide" data-delay="0.2">
            {{ item.title }}
          </h6>
          <div
            class="provide-list-text gsapBottomProvide"
            data-delay="0.4"
            v-html="item.description"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import plus from '~/assets/images/pluses.png';
export default {
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
      plus
    };
  },
  mounted() {
    setTimeout(() => {
      this.gsapTranslate();
    }, 500);
  },
  methods: {
    gsapTranslate() {
      Array.from(
        document.querySelectorAll('.gsapBottomProvide, .gsapLeftProvide')
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
.provide {
  padding: vw(112px) 0 vw(64px);
  position: relative;
  @include media(767px) {
    padding: 56px 0 40px;
  }
  &-photo {
    width: vw(670px);
    height: vw(360px);
    background-size: 100px;
    position: absolute;
    top: vw(112px);
    right: 0;
    z-index: -1;
  }
  &-title {
    font-size: vw(40px);
    font-family: $font-2b;
    line-height: 1.3;
    text-transform: uppercase;
    color: $darkBlue;
    @include media(767px) {
      font-size: 32px;
      line-height: 1.25;
    }
  }
  &-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: vw(58px);
    @include media(767px) {
      margin-top: 40px;
      flex-direction: column;
    }
    &-item {
      width: calc(100% / 3 - 66px / 3);
      margin: 0 33px 33px 0;
      border: 1px solid #f2f2f2;
      padding: vw(40px) vw(40px) vw(36px) vw(32px);
      background: #ffffff;
      @include media(767px) {
        width: 100%;
        margin: 0 0 16px 0;
        padding: 24px 24px 32px 24px;
        &:last-child {
          margin-bottom: 0;
        }
      }
      &:nth-child(3n + 3) {
        margin-right: 0;
      }
    }
    &-img {
      height: vw(62px);
      margin-bottom: vw(24px);
      @include media(767px) {
        height: 56px;
        margin-bottom: 24px;
      }
    }
    &-title {
      font-family: $font-2b;
      font-size: vw(18px);
      line-height: 1.3;
      margin-bottom: vw(16px);
      text-transform: uppercase;
      @include media(767px) {
        font-size: 18px;
        margin-bottom: 20px;
      }
    }
    &-text {
      color: $gray;
      font-size: vw(16px);
      line-height: 1.5;
      @include media(767px) {
        font-size: 16px;
        line-height: 1.43;
      }
    }
  }
}
.gsapBottomProvide {
  opacity: 0;
  transform: translateY(100px);
}
.gsapLeftProvide {
  opacity: 0;
  transform: translateX(-100px);
}
</style>
