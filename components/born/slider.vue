<template>
  <section
    class="section slider"
    :class="[
      type === 'slider_quote'
        ? 'slider_quote'
        : type === 'slider_team'
        ? 'slider_team'
        : ''
    ]"
  >
    <template v-if="type === 'slider_quote'" class="slider_quote">
      <div v-swiper:mySwiper="optionsMain" @slideChange="slideChangeMain">
        <div class="swiper-wrapper swiper-wrapper_main">
          <div
            v-for="(slide, index) in content.items"
            :key="index"
            class="img-wrapper swiper-slide"
          >
            <div class="swiper-slide-bg">
              <div class="swiper-slide-overlay gsapHeightBorn"></div>
              <div class="swiper-slide-content">
                <div class="swiper-slide-svg gsapTopBorn" data-delay="0.2">
                  <QuoteIcon />
                </div>
                <blockquote
                  class="swiper-slide-quote gsapLeftBorn"
                  data-delay="0.4"
                >
                  {{ slide.extra.quote }}
                </blockquote>
                <div class="swiper-slide-svg gsapBottomBorn" data-delay="0.2">
                  <QuoteIcon />
                </div>
              </div>
              <div class="swiper-slide-img">
                <picture class="gsapBottomBorn" data-delay="0.4">
                  <source
                    :srcset="slide.image.conversions.medium"
                    media="(max-width: 1200px)"
                  />
                  <img
                    :srcset="slide.image.url"
                    :alt="slide.image.custom_properties.seo_alt"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-swiper:mySwiper2="optionsPaginate"
        @slideChange="slideChangePagination"
      >
        <div class="swiper-wrapper swiper-wrapper_pagination">
          <div
            v-for="(slide, index) in content.items"
            :key="index"
            class="img-wrapper swiper-slide"
          >
            <svg
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 40 40"
              class="svg-loader"
            >
              <circle
                class="svg-loader-circle"
                fill="none"
                stroke-linecap="round"
                cx="20"
                cy="20"
                r="15.915494309"
              />
            </svg>
          </div>
        </div>
      </div>
    </template>
    <template v-if="type === 'slider_team'" class="slider_team">
      <div class="container">
        <div class="team-top">
          <h2 class="team-title gsapLeftBorn">{{ content.title }}</h2>
          <div
            class="team-description gsapBottomBorn"
            data-delay="0.2"
            v-html="content.description"
          ></div>
        </div>
      </div>
      <div v-swiper:mySwiper3="optionsTeam" @transitionEnd="slideChangeTeam">
        <div class="swiper-wrapper">
          <div
            v-for="(slide, index) in content.items"
            :key="index"
            class="img-wrapper swiper-slide"
          >
            <div class="swiper-slide-img gsapBottomBorn" data-delay="0.2">
              <picture>
                <source
                  :srcset="slide.image.conversions.medium"
                  media="(max-width: 1200px)"
                />
                <source
                  v-if="slide.image.conversions.original_webp"
                  :srcset="slide.image.conversions.original_webp"
                  type="image/webp"
                />
                <img
                  :srcset="slide.image.url"
                  :alt="slide.image.custom_properties.seo_alt"
                />
              </picture>
            </div>
            <div class="swiper-slide-content">
              <h6 class="slide-name gsapBottomBorn" data-delay="0.3">
                {{ slide.extra.full_name }}
              </h6>
              <p class="slide-position gsapBottomBorn" data-delay="0.4">
                {{ slide.extra.company_position }}
              </p>
              <div class="slide-link gsapBottomBorn" data-delay="0.5">
                {{ slide.extra.btn_title }}
                <a
                  class="slide-link-btn"
                  :href="slide.extra.btn_link"
                  target="_blank"
                >
                  <IconArrow />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="buttons gsapLeftBorn" data-delay="0.2">
          <div slot="button-prev" class="swiper-button swiper-button-prev">
            <IconArrowMobile v-if="isMobile" />
            <IconBtn v-else />
          </div>
          <div slot="button-next" class="swiper-button swiper-button-next">
            <IconArrowMobile v-if="isMobile" />
            <IconBtn v-else />
          </div>
          <div v-if="isMobile" class="progress-line">
            <span :style="{ width: `${progressWidth}%` }"></span>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
import QuoteIcon from '~/assets/images/icons/quote.svg';
import IconArrow from '~/assets/images/icons/arrow-right.svg';
import IconArrowMobile from '~/assets/images/icons/team-mobile-arrow.svg';
import IconBtn from '~/assets/images/icons/arrow-slider2.svg';
export default {
  components: {
    QuoteIcon,
    IconArrow,
    IconBtn,
    IconArrowMobile
  },
  props: {
    content: {
      type: Object,
      default: null
    },
    type: {
      type: String,
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
        speed: 1000,
        autoplay: {
          delay: 7500,
          disableOnInteraction: false
        },
        breakpoints: {
          768: {
            autoHeight: true
          }
        }
      },
      optionsPaginate: {
        slidesPerView: 'auto',
        loop: false,
        lazyLoading: true,
        centeredSlides: true,
        slideToClickedSlide: true
      },
      optionsTeam: {
        slidesPerView: 'auto',
        loop: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        lazyLoading: true
      },
      progressWidth: null,
      currentIndex: 1
    };
  },
  mounted() {
    setTimeout(() => {
      this.gsapTranslateBorn();
      this.gsapHeight();
    }, 500);
    this.progressWidth = 100 / this.content.items.length;
  },
  methods: {
    slideChangePagination() {
      this.mySwiper.slideTo(this.mySwiper2.activeIndex);
    },
    slideChangeMain() {
      if (this.mySwiper.activeIndex === 0) {
        this.mySwiper.params.autoplay.reverseDirection = false;
      }
      if (this.mySwiper.activeIndex === this.mySwiper.slides.length - 1) {
        this.mySwiper.params.autoplay.reverseDirection = true;
      }
      this.mySwiper2.slideTo(this.mySwiper.activeIndex);
    },
    slideChangeTeam() {
      const flag = document.querySelector(
        '.slider_team .swiper-button-next.swiper-button-disabled'
      );
      if (flag) {
        this.currentIndex = this.mySwiper3.slides.length;
      } else {
        this.currentIndex = this.mySwiper3.activeIndex + 1;
      }
      this.progressWidth =
        (100 / this.mySwiper3.slides.length) * this.currentIndex;
    },
    gsapTranslateBorn() {
      Array.from(
        document.querySelectorAll(
          '.gsapBottomBorn, .gsapTopBorn, .gsapLeftBorn'
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
    },
    gsapHeight() {
      Array.from(document.querySelectorAll('.gsapHeightBorn')).forEach(
        (item) => {
          const delay = +item.dataset.delay || 0;
          const duration = +item.dataset.duration || 0.8;
          const hook = item.dataset.hook || 1;
          const scene2 = this.$scrollmagic
            .scene({
              offset: -100,
              triggerElement: item.parentNode,
              triggerHook: hook,
              duration: 0,
              reverse: false
            })
            .setTween(item, duration, {
              delay,
              height: '100%',
              overwrite: false,
              lazy: true
            });
          this.$scrollmagic.addScene(scene2);
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.slider {
  &.slider_quote {
    padding-bottom: vw(28px);
    overflow: hidden;
    @include media(767px) {
      padding-bottom: 26px;
    }
    .swiper-container {
      position: relative;
      &:first-child {
        margin-bottom: vw(44px);
        @include media(767px) {
          margin-bottom: 30px;
        }
      }
      &:last-child {
        padding: vw(11px) 0;
        @include media(767px) {
          padding: 10px 0;
        }
      }
    }
    .swiper {
      &-wrapper {
        &_main {
          .swiper-slide {
            padding: 0 4%;
            @include media(767px) {
              padding: 0;
            }
            &-bg {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: vw(77px) vw(112px) vw(77px) vw(80px);
              position: relative;
              @include media(767px) {
                padding: 40px 32px;
                flex-direction: column;
              }
            }
            picture {
              position: relative;
              display: block;
            }
            &-overlay {
              position: absolute;
              left: 0;
              bottom: 0;
              width: 100%;
              height: 0;
              z-index: -1;
              background: rgba(245, 245, 246, 0.7);
            }
            &-content {
              @include media(767px) {
                width: 100%;
              }
            }
            &-img {
              width: vw(553px);
              height: vw(445px);
              flex-shrink: 0;
              margin-left: vw(80px);
              @include media(767px) {
                width: 100%;
                height: auto;
                margin: 40px 0 0 0;
              }
              img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                @include media(767px) {
                  object-fit: cover;
                }
              }
            }
            &-quote {
              margin: vw(64px) 0;
              font-family: $font-2b;
              font-size: vw(42px);
              line-height: 1.5;
              color: $darkBlue;
              @include media(767px) {
                margin: 20px 0;
                text-align: center;
                font-size: 21px;
                line-height: 1.28;
              }
            }
            &-svg {
              @include media(767px) {
                text-align: center;
              }
              svg {
                width: vw(30px);
                height: vw(22px);
                @include media(767px) {
                  width: 18px;
                  height: 14px;
                }
              }
              &:last-child {
                svg {
                  transform: rotate(180deg);
                }
              }
            }
          }
        }
        &_pagination {
          .svg-loader {
            transform: scale(1);
            transition: transform 0.5s ease;
            width: vw(52px);
            height: vw(52px);
            @include media(767px) {
              width: 52px;
              height: 52px;
            }
            &-circle {
              stroke: $red;
              stroke-width: 1px;
              stroke-dasharray: 100;
              stroke-dashoffset: 100;
              transform-origin: center;
              transform: rotate(-90deg);
            }
          }
          .swiper-slide {
            width: vw(64px);
            height: vw(64px);
            margin: 0 vw(76px);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            position: relative;
            @include media(767px) {
              width: 64px;
              height: 64px;
              margin: 0 10px;
            }
            &:after {
              content: '';
              width: vw(6px);
              height: vw(6px);
              border-radius: 50%;
              background: #e8ecef;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              transition: background-color 0.3s ease, transform 0.3s ease;
              @include media(767px) {
                width: 6px;
                height: 6px;
              }
            }
            &:hover {
              border-color: $red;
              .svg-loader-circle {
                stroke-dashoffset: 0;
                transition: stroke-dashoffset 0.5s ease;
                @include media(767px) {
                  stroke-dashoffset: 100;
                }
              }
              &:after {
                background-color: $red;
                @include media(767px) {
                  background: #e8ecef;
                }
              }
            }
            &.swiper-slide-active {
              .svg-loader {
                transform: scale(1.55);
                &-circle {
                  animation: fake-load 8s linear;
                  animation-delay: 0s;
                  animation-fill-mode: forwards;
                }
              }
              &:after {
                background-color: $red;
                transform: translate(-50%, -50%) scale(1.67);
              }
            }
          }
        }
      }
    }
  }
  &.slider_team {
    margin-top: vw(28px);
    overflow: hidden;
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
    @include media(767px) {
      margin-top: 20px;
    }
    .team {
      &-top {
        display: flex;
        @include media(767px) {
          flex-direction: column;
        }
      }
      &-title {
        width: vw(448px);
        font-size: vw(40px);
        font-family: $font-2b;
        line-height: 1.25;
        color: $darkBlue;
        @include media(767px) {
          width: 100%;
          font-size: 24px;
        }
      }
      &-description {
        width: vw(760px);
        font-size: vw(24px);
        line-height: 1.42;
        color: $gray;
        @include media(767px) {
          width: 100%;
          font-size: 16px;
          line-height: 1.5;
          margin-top: 20px;
        }
      }
    }
    .swiper-slide {
      width: vw(447px);
      @include media(767px) {
        width: 240px;
        padding-right: 13px;
      }
      &-img {
        width: vw(310px);
        height: vw(360px);
        @include media(767px) {
          width: 100%;
          height: 252px;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      &-content {
        width: vw(310px);
        margin-top: vw(40px);
        @include media(767px) {
          width: 100%;
          margin-top: 28px;
        }
      }
    }
    .swiper-container {
      padding-left: 4%;
      overflow: visible;
      margin-top: vw(64px);
      @include media(767px) {
        margin-top: 32px;
        padding-left: 32px;
        padding-bottom: 56px;
      }
    }
    .slide {
      &-name {
        font-family: $font-2b;
        font-size: vw(26px);
        line-height: 1.27;
        margin-bottom: vw(14px);
        color: #000000;
        @include media(767px) {
          font-size: 16px;
          line-height: 1.25;
          margin-bottom: 10px;
        }
      }
      &-position {
        font-size: vw(16px);
        line-height: 1.18;
        color: #808080;
        margin-bottom: vw(4px);
        @include media(767px) {
          font-size: 12px;
          margin-bottom: 6px;
        }
      }
      &-link {
        display: flex;
        align-items: center;
        color: rgba(4, 28, 48, 0.5);
        font-size: vw(14px);
        @include media(767px) {
          font-size: 12px;
        }
        &-btn {
          width: vw(56px);
          height: vw(56px);
          border-radius: 50%;
          border: 1px solid #e8ecef;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: vw(-12px);
          transition: border-color 0.3s ease;
          @include media(767px) {
            width: 39px;
            height: 39px;
            margin-left: -4px;
          }
          svg {
            fill: $red;
            width: vw(16px);
            height: vw(11px);
            @include media(767px) {
              width: 11px;
              height: 8px;
            }
          }
          &:hover {
            border-color: $red;
          }
        }
      }
    }
    .buttons {
      position: absolute;
      left: 4%;
      top: vw(-105px);
      display: flex;
      align-items: center;
      z-index: 1;
      svg {
        fill: $black;
        @include media(767px) {
          fill: $red;
        }
      }
      @include media(767px) {
        left: 32px;
        top: calc(100% - 30px);
        width: calc(100% - 64px);
      }
      .swiper-button {
        background: transparent;
        position: static;
        width: vw(30px);
        height: vw(34px);
        margin-right: vw(24px);
        outline: none;
        @include media(767px) {
          left: 32px;
          top: calc(100% - 30px);
          width: 27px;
          height: 10px;
          margin: 0 12px 0 0;
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        &-next {
          @include media(767px) {
            transform: rotate(180deg);
          }
        }
        &-prev {
          transform: rotate(180deg);
          @include media(767px) {
            transform-origin: center;
            transform: rotate(0deg);
          }
        }
        &.swiper-button-disabled {
          opacity: 1;
          svg {
            fill: #e8ecef;
          }
        }
        &:not(.swiper-button-disabled):hover {
          svg {
            fill: $red;
          }
        }
        svg {
          width: 100%;
          height: 100%;
          transition: fill 0.3s ease;
        }
      }
    }
  }
}
.gsapTopBorn {
  opacity: 0;
  transform: translateY(-100px);
}
.gsapBottomBorn {
  opacity: 0;
  transform: translateY(100px);
}
.gsapLeftBorn {
  opacity: 0;
  transform: translateX(-100px);
}
.gsapHeightBorn {
  height: 0;
}

@keyframes fake-load {
  // Animate progress and other stuff too :)
  from {
    stroke-dashoffset: 100;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>
