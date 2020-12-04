<template>
  <section class="bus-head__slider">
    <div class="container">
      <div class="head-slide">
        <img :src="sliderData.media[0].url" />
      </div>
      <div v-swiper:mySwiper="options">
        <div class="swiper-wrapper">
          <div
            v-for="(slide, index) in sliderData.categories"
            :key="index"
            class="img-wrapper swiper-slide"
          >
            <picture>
              <source
                v-if="slide.models[0].media[0].conversions.original_webp"
                :srcset="slide.models[0].media[0].conversions.original_webp"
                type="image/webp"
              />
              <img
                :srcset="slide.models[0].media[0].url"
                :alt="slide.models[0].media[0].custom_properties.seo_alt"
                class="swiper-slide-img"
              />
            </picture>
          </div>
        </div>
        <div class="buttons">
          <div slot="button-next" class="swiper-button swiper-button-prev">
            <ArrowIcon />
          </div>
          <div class="swiper-pagination"></div>
          <div slot="button-prev" class="swiper-button swiper-button-next">
            <ArrowIcon />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import ArrowIcon from '~/assets/images/icons/left-arr.svg';

export default {
  components: { ArrowIcon },
  props: {
    sliderData: { type: Object, default: null }
  },
  data() {
    return {
      options: {
        slidesPerView: 5,
        spaceBetween: 50,
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
  computed: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.bus-head__slider {
  height: 100vh;
  position: relative;
  .swiper-container {
    width: 78%;
    height: 100vh;
    position: relative;
  }
  .swiper-wrapper {
    position: absolute;
    // width: 100%;
    left: 0;
    bottom: 0;
    height: vw(120px);
  }
  .swiper-slide {
    overflow: hidden;
  }
  .swiper-slide-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
}
.head-slide {
  width: 20%;
  height: vw(120px);
  position: absolute;
  left: 0;
  bottom: 0;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
