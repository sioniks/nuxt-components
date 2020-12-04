<template>
  <section class="section stories-block">
    <div class="stories-item">
      <div class="block-photo">
        <div
          class="block-photo-pluses"
          :style="{ backgroundImage: `url(${plus})` }"
        ></div>
        <img
          :src="item.preview.conversions.original_webp || item.preview.url"
          :alt="item.preview.custom_properties.seo_alt"
          :class="[index % 2 ? 'gsapRightRefresh' : 'gsapLeftRefresh']"
          data-delay="0.4"
          class="stories-item-img"
        />
      </div>
    </div>
    <div class="stories-item">
      <h3 class="stories-item-title gsapBottomRefresh">{{ item.title }}</h3>
      <div
        class="stories-item-text gsapBottomRefresh"
        data-delay="0.2"
        v-html="item.description"
      ></div>
      <app-link
        :to="`/stories/${item.id}`"
        class="stories-item-link gsapBottomRefresh"
        data-delay="0.4"
      >
        Read the story <ArrowRight />
      </app-link>
    </div>
  </section>
</template>

<script>
import ArrowRight from '~/assets/images/icons/arrow-right.svg';
import plus from '~/assets/images/pluses.png';
export default {
  components: { ArrowRight },
  props: {
    item: {
      type: Object,
      default: null
    },
    index: {
      type: Number,
      default: null
    },
    flag: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      plus
    };
  },
  mounted() {
    if (this.flag) {
      setTimeout(() => {
        this.gsapTranslate();
      }, 500);
    } else {
      setTimeout(() => {
        this.gsapTranslate();
      }, 300);
    }
  },
  methods: {
    gsapTranslate() {
      Array.from(
        document.querySelectorAll(
          '.gsapBottomRefresh, .gsapLeftRefresh, .gsapRightRefresh'
        )
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
.stories {
  &-block {
    padding: vw(50px) 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include media(767px) {
      padding: 28px 32px;
      flex-direction: column;
    }
    &:nth-child(odd) {
      flex-direction: row-reverse;
      @include media(767px) {
        flex-direction: column;
      }
      .block-photo-pluses {
        display: none;
        @include media(767px) {
          display: block;
        }
      }
      .stories-item:last-child {
        padding-left: vw(175px);
        @include media(767px) {
          padding: 0;
        }
      }
      .stories-item:first-child {
        padding-left: 0;
      }
    }
  }
  &-item {
    width: 49%;
    @include media(767px) {
      width: 100%;
    }
    &:last-child {
      padding-left: vw(110px);
      @include media(767px) {
        padding: 0;
        &:last-child {
          margin-top: 32px;
        }
      }
    }
    &-img {
      width: 100%;
    }
    &-title {
      font-family: $font-2b;
      font-size: vw(36px);
      line-height: 1.3;
      max-width: vw(424px);
      margin-bottom: vw(24px);
      text-transform: uppercase;
      @include media(767px) {
        font-size: 24px;
        line-height: 1.25;
        margin-bottom: 20px;
        max-width: 100%;
      }
    }
    &-text {
      font-size: vw(16px);
      line-height: 1.75;
      margin-bottom: vw(24px);
      max-width: vw(424px);
      @include media(767px) {
        max-width: 100%;
        font-size: 16px;
        line-height: 1.625;
        margin-bottom: 0;
      }
    }
    &-link {
      display: inline-flex;
      align-items: center;
      margin-top: vw(40px);
      color: $red;
      font-size: vw(16px);
      text-transform: uppercase;
      font-family: $font-2b;
      @include media(767px) {
        font-size: 16px;
        margin-top: 32px;
      }
      &:hover {
        svg {
          transform: translateX(10px);
        }
      }
      svg {
        margin-left: vw(16px);
        width: vw(14px);
        height: auto;
        transition: transform 0.3s ease;
        fill: $red;
        @include media(767px) {
          width: 16px;
          margin-left: 16px;
        }
      }
    }
  }
}
.block-photo {
  position: relative;
  height: vw(550px);
  @include media(767px) {
    height: calc(100vw - 55px);
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &-pluses {
    position: absolute;
    width: calc(100% + 7vw);
    height: calc(100% + 16vw);
    left: 0;
    top: -8vw;
    z-index: -1;
    background-size: 100px;
    @include media(767px) {
      width: calc(100% + 64px);
      left: -32px;
      top: -30px;
      height: 100%;
      background-position: top center;
    }
  }
}
.gsapBottomRefresh {
  transform: translateY(100px);
  opacity: 0;
}
.gsapLeftRefresh {
  transform: translateX(-100px);
  opacity: 0;
}
.gsapRightRefresh {
  transform: translateX(100px);
  opacity: 0;
}
</style>
