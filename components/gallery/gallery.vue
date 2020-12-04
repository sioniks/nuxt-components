/* eslint-disable vue/no-v-html */
<template>
  <client-only>
    <div class="img_wrap">
      <transition name="fade">
        <Popup
          v-show="sliderPopup"
          class="slider-popup"
          @close="closePopupSlider"
        >
          <div class="slider-popup-content">
            <div v-swiper:mySwiper="optionsMain" @slideChange="slideChangeMain">
              <div class="swiper-wrapper swiper-wrapper_gallery">
                <div
                  v-for="(slide, index) in images"
                  :key="index"
                  class="swiper-slide"
                >
                  <div class="img-wrapper">
                    <picture v-if="slide.type === 'image'">
                      <source
                        :srcset="
                          slide.type === 'image'
                            ? slide.image.conversions.medium
                            : slide.video_preview.conversions.medium
                        "
                      />
                      <source
                        :srcset="
                          slide.type === 'image'
                            ? slide.image.conversions.original_webp
                            : slide.video_preview.conversions.original_webp
                        "
                        media="(max-width: 1200px)"
                      />
                      <img
                        :srcset="
                          slide.type === 'image'
                            ? slide.image.url
                            : slide.video_preview.url
                        "
                        :alt="
                          slide.type === 'image'
                            ? slide.image.custom_properties.seo_alt
                            : slide.video_preview.custom_properties.seo_alt
                        "
                        class="swiper-slide-img"
                      />
                    </picture>
                    <youtube
                      v-else
                      :video-id="getVideoId(slide.video_link)"
                      :player-vars="videoOptions"
                      player-width="100%"
                      player-height="100%"
                      class="video"
                      @ready="ready"
                    ></youtube>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="buttons">
            <div slot="button-prev" class="swiper-button swiper-button-prev">
              <IconBtn />
            </div>
            <div slot="button-next" class="swiper-button swiper-button-next">
              <IconBtn />
            </div>
          </div>
        </Popup>
      </transition>
      <div class="gallery-box">
        <div
          v-for="(elem, i) in getGalleryItems"
          :key="i"
          class="gallery-item"
          :class="{ 'video-item': elem.type == 'video' }"
          @click="setIndex(i)"
        >
          <template v-if="elem.type === 'video'">
            <div
              class="gallery__title"
              v-html="elem.video_preview.custom_properties.media_title || ''"
            ></div>

            <picture>
              <source
                :srcset="elem.video_preview.conversions.medium"
                media="(max-width: 1200px)"
              />
              <source
                v-if="elem.video_preview.conversions.original_webp"
                :srcset="elem.video_preview.conversions.original_webp"
                type="image/webp"
              />
              <img
                :srcset="elem.video_preview.url"
                :alt="elem.video_preview.custom_properties.seo_alt"
              />
            </picture>
          </template>
          <template v-else>
            <picture>
              <source
                :srcset="elem.image.conversions.medium"
                media="(max-width: 1200px)"
              />
              <source
                v-if="elem.image.conversions.original_webp"
                :srcset="elem.image.conversions.original_webp"
                type="image/webp"
              />
              <img
                :srcset="elem.image.url"
                :alt="elem.image.custom_properties.seo_alt"
              />
            </picture>
          </template>

          <button v-if="elem.type == 'video'" class="play-btn">
            <PlayIcon />
            <span>Play</span>
          </button>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import PlayIcon from '~/assets/images/icons/play-g.svg';
import IconBtn from '~/assets/images/icons/arrow-top.svg';
export default {
  components: { PlayIcon, IconBtn },
  props: {
    images: {
      type: Array,
      default: null
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      imgIndex: null,
      sliderPopup: false,
      optionsMain: {
        slidesPerView: 1,
        loop: false,
        lazyLoading: true,
        speed: 500,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      players: [],
      videoOptions: {
        autoplay: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        showinfo: 0
      }
    };
  },
  computed: {
    urls() {
      const newArr = [];
      this.images.forEach((e) => {
        newArr.push({
          src: e.image
            ? e.image.conversions.large
            : e.video_preview.conversions.large
        });
      });
      return newArr;
    },
    getGalleryItems() {
      return this.isMobile ? this.images.slice(0, 4) : this.images;
    }
  },
  // mounted() {
  //   this.images.forEach((e) => {
  //     console.log(e.image ? e.image.url : e.video_preview.url || '');
  //   });
  // },
  methods: {
    setIndex(index) {
      this.imgIndex = index;
      this.sliderPopup = true;
      this.mySwiper.slideTo(index);
    },
    closePopupSlider() {
      this.imgIndex = null;
      this.sliderPopup = false;
      this.stop();
    },
    getVideoId(link) {
      const videoUrl = link;
      if (videoUrl) {
        const arr = videoUrl.split('/');
        return arr[arr.length - 1];
      } else {
        return null;
      }
    },
    ready(event) {
      this.players.push(event.target);
    },
    stop() {
      this.players.forEach((item) => {
        item.stopVideo();
      });
    },
    slideChangeMain() {
      this.players.forEach((item) => {
        item.stopVideo();
      });
    }
  }
};
</script>

<style scoped lang="scss">
.gallery-box {
  width: calc(100% + 4px);
  margin-right: -2px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: vw(5px);
  @include media(767px) {
    grid-auto-rows: vw(5px, 375px);
  }
}
.gallery-item {
  overflow: hidden;
  position: relative;
  opacity: 0;
  padding: 2px;
  display: flex;
  picture {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    &:before {
      content: '';
      display: block;
      opacity: 0;
      width: 100%;
      height: 100%;
      @include center();
      background: rgba(#000000, 0.3);
      transition: all 0.5s ease;
      z-index: 2;
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: all 0.3s ease;
    z-index: 1;
  }
  &:nth-child(11n + 1) {
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row-start: 1;
    grid-row-end: 82;
    @include media(767px) {
      grid-column-start: 1;
      grid-column-end: 13;
      grid-row-start: 1;
      grid-row-end: 74;
    }
  }
  &:nth-child(11n + 2) {
    grid-column-start: 5;
    grid-column-end: 8;
    grid-row-start: 1;
    grid-row-end: 41;
    @include media(767px) {
      grid-column-start: 1;
      grid-column-end: 6;
      grid-row-start: 74;
      grid-row-end: 96;
      .gallery__title,
      .play-btn span {
        display: none;
      }
    }
  }
  &:nth-child(11n + 3) {
    grid-column-start: 8;
    grid-column-end: 13;
    grid-row-start: 1;
    grid-row-end: 41;
    @include media(767px) {
      grid-column-start: 6;
      grid-column-end: 13;
      grid-row-start: 74;
      grid-row-end: 96;
      .gallery__title,
      .play-btn span {
        display: none;
      }
    }
  }
  &:nth-child(11n + 4) {
    grid-column-start: 5;
    grid-column-end: 10;
    grid-row-start: 41;
    grid-row-end: 82;
    @include media(767px) {
      grid-column-start: 1;
      grid-column-end: 13;
      grid-row-start: 96;
      grid-row-end: 126;
    }
  }
  &:nth-child(11n + 5) {
    grid-column-start: 10;
    grid-column-end: 13;
    grid-row-start: 41;
    grid-row-end: 82;
  }
  &:nth-child(11n + 6) {
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row-start: 82;
    grid-row-end: 144;
  }
  &:nth-child(11n + 7) {
    grid-column-start: 5;
    grid-column-end: 8;
    grid-row-start: 82;
    grid-row-end: 144;
  }
  &:nth-child(11n + 8) {
    grid-column-start: 8;
    grid-column-end: 13;
    grid-row-start: 82;
    grid-row-end: 144;
  }
  &:nth-child(11n + 9) {
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row-start: 144;
    grid-row-end: 182;
  }
  &:nth-child(11n + 10) {
    grid-column-start: 5;
    grid-column-end: 9;
    grid-row-start: 144;
    grid-row-end: 182;
  }
  &:nth-child(11n + 11) {
    grid-column-start: 9;
    grid-column-end: 13;
    grid-row-start: 144;
    grid-row-end: 182;
  }
  &:hover {
    cursor: pointer;
    picture:before {
      opacity: 1;
    }
    img {
      transform: scale(1.1);
    }
  }
}
.play-btn {
  position: absolute;
  left: 2vw;
  bottom: 2vw;
  z-index: 2;
  display: flex;
  align-items: center;
  background: none;
  font-family: $font-1b;
  font-size: vw(16px);
  line-height: 2;
  text-transform: uppercase;
  color: #ffffff;
  transition: all 0.3s ease;
  // cursor: url('/cursor1.svg'), pointer;
  cursor: pointer;
  @include media(1200px) {
    font-size: 14px;
  }
  @include media(767px) {
    font-size: 16px;
    left: 16px;
    bottom: 16px;
    padding: 0;
  }

  &:hover {
    color: $red;
    .svg-icon {
      fill: $red;
    }
  }

  .svg-icon {
    fill: #ffffff;
    margin-right: 10px;
    width: vw(34px);
    height: vw(52px);
    @include media(1200px) {
      width: 14px;
    }
    @include media(767px) {
      width: 24px;
      height: 38px;
    }
  }
}
.gallery__title {
  font-family: $font-1b;
  position: absolute;
  left: 2vw;
  top: 2vw;
  z-index: 2;
  font-weight: bold;
  font-size: vw(30px);
  line-height: 1.16;
  text-transform: uppercase;
  color: #ffffff;
  @include media(1200px) {
    font-size: 14px;
  }
  @include media(767px) {
    top: 16px;
    left: 16px;
    font-size: 24px;
    padding-right: 16px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
<style lang="scss">
.img_wrap {
  .slider-popup {
    width: 100%;
    height: 100vh;
    min-height: 100vh;
    &-buttons {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      bottom: vw(15px);
      z-index: 3;
      .slider-popup-btn {
        margin: 0 vw(12px);
        width: vw(147px);
        height: vw(48px);
        line-height: vw(48px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
        cursor: pointer;
        color: #ffffff;
        font-size: vw(16px);
        font-family: $font-2b;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background: transparent;
        transition: background-color 0.4s ease;
        &:hover {
          background-color: $red;
          .svg-icon {
            path {
              fill: #ffffff;
            }
          }
        }
        .svg-icon {
          position: static;
          margin-right: vw(8px);
          path {
            fill: $red;
            transition: fill 0.3s ease;
          }
        }
      }
    }
    &-content {
      width: 100%;
    }
    .img-wrapper {
      width: vw(1125px);
      padding: vw(80px) 0;
      height: 100vh;
      margin: 0 auto;
      text-align: center;
      overflow: hidden;
      @include media(767px) {
        padding: 110px 0;
        width: calc(100% - 64px);
        display: flex;
        align-items: center;
      }
      img,
      picture {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        @include media(767px) {
          object-fit: contain;
        }
      }
      .video {
        width: 100%;
        height: 100%;
        @include media(767px) {
          height: auto;
        }
      }
    }
    &.popup__wr {
      .svg-icon {
        top: vw(30px);
        right: vw(60px);
        z-index: 3;
        @include media(767px) {
          top: 32px;
          right: 32px;
        }
      }
    }
    .buttons {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
      padding: 0 vw(88px);
      height: vw(84px);
      z-index: 2;
      display: flex;
      justify-content: space-between;
      pointer-events: none;
      @include media(767px) {
        height: 44px;
        padding: 0 24px;
        transform: translateY(calc(-50% + 22px));
      }
      .svg-icon {
        fill: #ffffff;
        height: vw(5px);
        width: vw(12px);
        position: static;
        @include media(767px) {
          width: 12px;
          height: 5px;
        }
        path {
          fill: #ffffff;
          transition: fill 0.3s ease;
        }
      }
      .swiper-button {
        width: vw(100px);
        height: vw(84px);
        position: static;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        background: $red;
        transition: background-color 0.3s ease;
        outline: none;
        pointer-events: auto;
        @include media(767px) {
          height: 44px;
          width: 53px;
        }
        &:hover {
          background-color: #ffffff;
          .svg-icon {
            path {
              fill: $red;
            }
          }
        }
        &-prev {
          left: vw(88px);
          @include media(767px) {
            left: 24px;
          }
          .svg-icon {
            transform: rotate(-90deg);
          }
        }
        &-next {
          right: vw(88px);
          @include media(767px) {
            right: 24px;
          }
          .svg-icon {
            transform: rotate(90deg);
          }
        }
      }
    }
  }
}
</style>
