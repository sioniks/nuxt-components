<template>
  <section
    class="section story"
    :class="[
      content.type === 'story_slider_content'
        ? 'story_slider'
        : 'story_pictures'
    ]"
  >
    <template v-if="content.type === 'story_slider_content'">
      <div v-swiper:mySwiper="options">
        <div class="swiper-wrapper">
          <div
            v-for="(slide, index) in content.items"
            :key="index"
            class="img-wrapper swiper-slide"
          >
            <picture class="gsapBottomPicture" data-delay="0.2">
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
        <div
          slot="button-next"
          class="swiper-button swiper-button-next gsapBottomBtn"
          data-delay="0.4"
        >
          <ArrowIcon />
        </div>
        <div
          slot="button-prev"
          class="swiper-button swiper-button-prev gsapBottomBtn"
          data-delay="0.4"
        >
          <ArrowIcon />
        </div>
        <div
          slot="pagination"
          class="swiper-pagination gsapBottomPicture"
          data-delay="0.2"
        ></div>
      </div>
    </template>
    <template v-else>
      <div class="story-content story-content_fluid left-padding">
        <div class="pictures-list">
          <div
            v-for="(item, index) in content.items"
            :key="index"
            class="pictures-list-item"
          >
            <picture class="gsapBottomPicture" :data-delay="0.1 * (index + 1)">
              <source
                :srcset="item.image.conversions.medium"
                media="(max-width: 1200px)"
              />
              <img
                :srcset="item.image.url"
                :alt="item.image.custom_properties.seo_alt"
                class="image"
              />
            </picture>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
import ArrowIcon from '~/assets/images/icons/arrow-slider.svg';
export default {
  components: { ArrowIcon },
  props: {
    content: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      options: {
        slidesPerView: 'auto',
        loop: true,
        centeredSlides: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        lazyLoading: true
      }
    };
  },
  mounted() {
    setTimeout(() => {
      this.gsapTranslate();
    }, 500);
  },
  methods: {
    gsapTranslate() {
      Array.from(document.querySelectorAll('.gsapBottomPicture')).forEach(
        (item) => {
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
        }
      );
      Array.from(document.querySelectorAll('.gsapBottomBtn')).forEach(
        (item) => {
          const delay = +item.dataset.delay || 0;
          const duration = +item.dataset.duration || 0.8;
          const hook = item.dataset.hook || 1;
          const scene2 = this.$scrollmagic
            .scene({
              offset: -100,
              triggerElement: item,
              triggerHook: hook,
              duration: 0,
              reverse: false
            })
            .setTween(item, duration, {
              delay,
              transform: 'translate(0, -50%)',
              opacity: 1,
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
.story {
  &_pictures {
    padding: vw(24px) 0 vw(36px);
    @include media(767px) {
      padding: 16px 0;
    }
  }
  &_slider {
    padding: vw(38px) 0 vw(70px);
    @include media(767px) {
      padding: 32px 0 62px;
    }
  }
  picture {
    width: 100%;
    height: 100%;
    display: block;
  }
  source,
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .swiper-slide {
    margin: 0 vw(105px);
    width: vw(624px);
    height: vw(344px);
    transition: transform 0.3s ease;
    @include media(767px) {
      width: calc(100vw - 64px);
      height: 45vw;
      margin: 0 8px;
    }
    &.swiper-slide-active {
      transform: scale(1.4);
      @include media(767px) {
        transform: none;
      }
    }
  }
  .swiper-container {
    padding: vw(70px) 0 vw(70px);
    overflow: visible;
    @include media(767px) {
      padding: 0;
    }
  }
  .swiper-button {
    width: vw(64px);
    height: vw(64px);
    background: $red;
    border: 1px solid $red;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    @include media(767px) {
      display: none;
    }
    svg {
      width: vw(19px);
      height: vw(16px);
    }
    &-prev {
      left: 17.5%;
      transform: translateY(-50%);
      top: 54%;
    }
    &-next {
      right: 17.5%;
      transform: translateY(-50%);
      top: 54%;
      svg {
        transform: rotate(180deg);
      }
    }
    &:hover {
      background: #ffffff;
    }
  }
  .swiper-pagination-bullets {
    bottom: vw(-30px);
    z-index: 2;
    @include media(767px) {
      bottom: -40px;
    }
  }
}
.pictures {
  &-list {
    display: flex;
    @include media(767px) {
      flex-direction: column;
    }
    &-item {
      margin-right: vw(12px);
      height: vw(470px);
      width: 100%;
      @include media(767px) {
        margin: 0 0 8px 0;
        height: 90vw;
        &:last-child {
          margin-bottom: 0;
        }
      }
      &:last-child {
        margin-right: 0;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
.gsapBottomPicture,
.gsapBottomBtn {
  opacity: 0;
  transform: translateY(100px);
}
</style>
<style lang="scss">
.story {
  .swiper-button {
    path {
      transition: fill 0.3s ease;
    }
    &:hover {
      svg {
        path {
          fill: $red;
        }
      }
    }
  }
  .swiper-pagination-bullet {
    width: vw(6px);
    height: vw(6px);
    border-radius: 0;
    cursor: pointer;
    background: #ebebeb;
    transition: background-color 0.3s ease;
    margin: 0 vw(4px);
    opacity: 1;
    outline: none;
    @include media(767px) {
      width: 6px;
      height: 6px;
      margin: 0 4px;
    }
    &.swiper-pagination-bullet-active {
      background-color: $red;
    }
    &:hover {
      background-color: $darkBlue;
    }
  }
}
</style>
