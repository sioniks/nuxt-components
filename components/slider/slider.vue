<template>
  <section class="section slider-section" :class="type">
    <div
      v-if="!isMobile"
      class="pluses"
      :style="{ backgroundImage: `url(${plus})` }"
    ></div>
    <div class="container">
      <div
        v-if="type === 'story_slider'"
        class="slider-section-title gsapLeftSlider"
        data-delay="0.2"
        v-html="block.title"
      ></div>
      <div v-swiper:mySwiper="options">
        <div
          class="swiper-wrapper"
          @mouseenter="stopAutoplay"
          @mouseleave="startAutoplay"
        >
          <div
            v-for="(slide, index) in block.items"
            :key="index"
            class="img-wrapper swiper-slide"
          >
            <div class="swiper-slide-left gsapBottomSlider" data-delay="0.2">
              <picture>
                <source
                  :srcset="slide.preview.conversions.medium"
                  media="(max-width: 1200px)"
                />
                <source
                  v-if="slide.preview.conversions.original_webp"
                  :srcset="slide.preview.conversions.original_webp"
                  type="image/webp"
                />
                <img
                  :srcset="slide.preview.url"
                  :alt="slide.preview.custom_properties.seo_alt"
                />
              </picture>
            </div>
            <div class="swiper-slide-right">
              <h4 class="swiper-slide-title gsapRightSlider" data-delay="0.2">
                {{ slide.title }}
              </h4>
              <div
                class="swiper-slide-descr gsapRightSlider"
                data-delay="0.2"
                v-html="slide.description"
              ></div>
              <div class="gsapRightSlider" data-delay="0.2">
                <Link
                  link-text="Read the story"
                  :to="`stories/${slide.preview.id}`"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="buttons gsapBottomSlider" data-delay="0.2">
          <div slot="button-next" class="swiper-button swiper-button-prev">
            <ArrowLong v-if="isMobile" />
            <ArrowIcon v-else />
          </div>
          <div class="swiper-pagination"></div>
          <div slot="button-prev" class="swiper-button swiper-button-next">
            <ArrowLong v-if="isMobile" />
            <ArrowIcon v-else />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ArrowIcon from '~/assets/images/icons/left-arr.svg';
import ArrowLong from '~/assets/images/icons/arrow-long.svg';
import Link from '~/components/ui/links/arrow-link';
import plus from '~/assets/images/pluses.png';
export default {
  components: {
    ArrowIcon,
    Link,
    ArrowLong
  },
  props: {
    block: {
      type: Object,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    delay: {
      type: Number,
      default: null
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      plus,
      options: {
        slidesPerView: 'auto',
        loop: true,
        autoHeight: true,
        centeredSlides: true,
        // autoplay: {
        //   delay: 6000
        // },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
          formatFractionCurrent: (number) => {
            return number > 9 ? number : `0${number}`;
          },
          formatFractionTotal: (number) => {
            return number > 9 ? number : `0${number}`;
          }
        },
        lazyLoading: true
      }
    };
  },
  mounted() {
    setTimeout(() => {
      this.gsapTranslateSlider();
    }, this.delay || 2600);
  },
  methods: {
    stopAutoplay() {
      this.mySwiper.autoplay.stop();
    },
    startAutoplay() {
      this.mySwiper.autoplay.start();
    },
    gsapTranslateSlider() {
      Array.from(
        document.querySelectorAll(
          '.gsapLeftSlider, .gsapBottomSlider, .gsapRightSlider'
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
.swiper {
  // &-container {
  //   padding: vw(90px) vw(110px) vw(110px);
  // }
  &-slide {
    // margin: 0 vw(85px);
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: vw(120px) vw(170px) vw(110px) vw(170px);
    width: 100vw;
    @include media(1200px) {
      padding: 60px;
    }
    @include media(767px) {
      padding: 40px 32px;
      flex-direction: column;
    }
    &-title {
      font-family: $font-2b;
      font-size: vw(36px);
      line-height: 1.3;
      margin-bottom: vw(24px);
      text-transform: uppercase;
      @include media(1200px) {
        font-size: 18px;
        line-height: 1.25;
        margin-bottom: 20px;
      }
      @include media(767px) {
        font-size: 24px;
      }
    }
    &-descr {
      margin-bottom: vw(64px);
      font-size: vw(16px);
      font-family: $font-1r;
      line-height: 1.75;
      @include media(1200px) {
        font-size: 12px;
        line-height: 1.62;
        margin-bottom: 20px;
      }
      @include media(767px) {
        font-size: 16px;
        margin-bottom: 40px;
      }
    }
    &-left {
      width: vw(536px);
      height: vw(551px);
      @include media(1200px) {
        width: 37vw;
        height: 38vw;
        flex-shrink: 0;
      }
      @include media(767px) {
        width: 100%;
        height: 85vw;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &-right {
      margin-left: vw(137px);
      padding: vw(60px) 0 0;
      width: vw(442px);
      @include media(1200px) {
        padding-top: 32px;
        margin-left: 10vw;
        width: 100%;
      }
      @include media(767px) {
        padding: 0;
        margin: 96px 0 0;
      }
    }
  }
}
.arrow-link {
  text-transform: uppercase;
}
.buttons {
  position: absolute;
  left: vw(835px);
  top: vw(135px);
  color: $gray;
  display: flex;
  align-items: center;
  z-index: 20;
  @include media(1200px) {
    left: calc(47vw + 30px);
    top: 60px;
  }
  @include media(767px) {
    left: 0;
    top: calc(80px + 85vw);
  }
  .swiper-button {
    outline: none;
    background: transparent;
    position: static;
    width: vw(16px);
    height: vw(11px);
    font-size: 0;
    transform: none;
    margin: 0;
    @include media(1200px) {
      width: 16px;
      height: 11px;
    }
    @include media(767px) {
      width: 48px;
      height: 10px;
    }
    svg {
      width: 100%;
      height: 100%;
      fill: $gray;
      transition: fill 0.3s ease;
    }
    &:hover {
      svg {
        fill: $red;
      }
    }
    &-next {
      transform: rotate(180deg);
    }
  }
  .swiper-pagination {
    font-size: vw(14px);
    margin: 0 vw(16px);
    position: static;
    display: flex;
    align-items: center;
    width: auto;
    font-family: $font-1b;
    @include media(1200px) {
      font-size: 14px;
      margin: 0 16px;
    }
    @include media(767px) {
      font-size: 16px;
    }
  }
}
.slider-section {
  position: relative;
  @include media(767px) {
    background: #f9fafa;
  }
  &-title {
    font-family: $font-2b;
    font-size: vw(48px);
    line-height: 1.27;
    text-transform: uppercase;
    padding: 0 vw(170px);
    @include media(1200px) {
      padding: 0 28px;
    }
    @include media(767px) {
      padding: 0;
      font-size: 32px;
      line-height: 1.25;
    }
  }
  .container {
    width: 100%;
  }
}
.pluses {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: vw(360px);
  background-size: 100px;
  @include media(1200px) {
    height: 50%;
  }
}
.story_slider {
  background: #f9fafa;
  padding-top: vw(80px);
  @include media(767px) {
    padding-top: 32px;
  }
  .swiper-slide {
    padding-top: vw(48px);
    @include media(767px) {
      padding-top: 32px;
    }
  }
  .buttons {
    top: vw(70px);
    @include media(1200px) {
      top: vw(35px);
    }
    @include media(767px) {
      top: calc(80px + 85vw);
    }
  }
}
.gsapBottomSlider {
  opacity: 0;
  transform: translateY(100px);
}
.gsapLeftSlider {
  opacity: 0;
  transform: translateX(-100px);
}
.gsapRightSlider {
  opacity: 0;
  transform: translateX(100px);
}
</style>
