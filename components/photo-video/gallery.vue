<template>
  <div class="gallery-box">
    <div
      v-for="elem in items"
      :key="elem.id"
      class="gallery-item"
      :class="{
        'video-item': elem.type == 'video',
        active: selected.find((item) => item.id === elem.id),
        select: selected && selected.length > 0
      }"
      @click="openSliderPopup(elem)"
    >
      <div
        v-if="!queryParams"
        class="gallery-btn"
        @click.stop="selectItem(elem)"
      >
        <div class="gallery-btn-icon">
          <CheckIcon />
        </div>
        <div class="gallery-btn-text">Select</div>
      </div>
      <div class="gallery-item-content">
        <div
          v-if="elem.type == 'video'"
          class="gallery__title"
          v-html="elem.video_preview.custom_properties.media_title || ''"
        ></div>
        <div
          v-if="selected && selected.length > 0"
          class="gallery-zoom"
          @click.stop="openSliderPopup(elem, true)"
        >
          <IconZoom />
        </div>
        <picture v-if="elem.type == 'image'" class="img-wr">
          <source
            :srcset="elem.image.conversions.original_webp"
            type="image/webp"
          />
          <source
            :srcset="elem.image.conversions.medium"
            media="(max-width: 1200px)"
          />
          <img
            :srcset="elem.image.url"
            :alt="elem.image.custom_properties.seo_alt"
            class="award__img"
          />
        </picture>
        <picture v-else class="img-wr">
          <source
            :srcset="elem.video_preview.conversions.original_webp"
            type="image/webp"
          />
          <source
            :srcset="elem.video_preview.conversions.medium"
            media="(max-width: 1200px)"
          />
          <img
            :srcset="elem.video_preview.url"
            :alt="elem.video_preview.custom_properties.seo_alt"
            class="award__img"
          />
        </picture>
        <button v-if="elem.type == 'video'" class="play-btn">
          <PlayIcon />
          <span>Play</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import PlayIcon from '~/assets/images/icons/play-g.svg';
import CheckIcon from '~/assets/images/icons/check.svg';
import IconZoom from '~/assets/images/icons/zoom.svg';
export default {
  components: {
    PlayIcon,
    CheckIcon,
    IconZoom
  },
  props: {
    items: {
      type: Array,
      default: null
    },
    selected: {
      type: Array,
      default: null
    },
    queryParams: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    selectItem(index) {
      this.$emit('selectItem', index);
    },
    openSliderPopup(elem, flag) {
      this.$emit('openSliderPopup', elem, flag);
    }
  }
};
</script>
<style lang="scss" scoped>
.gallery {
  &-box {
    width: calc(100% + 4px);
    margin-left: -2px;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-auto-rows: vw(5px);
    @include media(767px) {
      grid-auto-rows: vw(5px, 375px);
    }
  }
  &-item {
    display: flex;
    position: relative;
    font-size: 0;
    padding: 2px;
    opacity: 0;
    &:hover {
      img,
      source {
        transform: scale(1.1);
      }
      .gallery-zoom {
        opacity: 1;
      }
      .gallery-btn {
        opacity: 1;
        pointer-events: auto;
      }
      picture:before {
        opacity: 1;
      }
    }
    &.select {
      cursor: pointer;
      .gallery-btn {
        background: transparent;
        pointer-events: auto;
        opacity: 1;
        &-icon {
          svg {
            opacity: 0;
          }
        }
        &-text {
          display: none;
        }
      }
      .gallery-zoom {
        @include media(767px) {
          opacity: 1;
        }
      }
      &.active,
      &:hover {
        .gallery-btn {
          &-icon {
            svg {
              opacity: 1;
              @include media(767px) {
                opacity: 0;
              }
            }
          }
        }
      }
      &.active {
        .gallery-btn {
          &-icon {
            svg {
              @include media(767px) {
                opacity: 1;
              }
            }
          }
        }
      }
    }
    &.active {
      .gallery-btn {
        background: transparent;
        opacity: 1;
        pointer-events: auto;
        &-icon {
          background: $red;
          border-color: $red;
        }
        &-text {
          display: none;
        }
      }
      .gallery-item-content {
        border: 8px solid #dde5f3;
        @include media(767px) {
          border-width: 14px;
        }
      }
      img,
      source {
        border-radius: 2px;
        @include media(767px) {
          border-radius: 4px;
        }
      }
    }
    &-content {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 100%;
    }
    picture {
      width: 100%;
      height: 100%;
      &:before {
        content: '';
        display: block;
        opacity: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.3);
        transition: all 0.5s ease;
        z-index: 2;
      }
    }
    img,
    source {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transition: all 0.3s ease;
      z-index: 1;
    }
    &:nth-child(21n + 1) {
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
    &:nth-child(21n + 2) {
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
    &:nth-child(21n + 3) {
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
    &:nth-child(21n + 4) {
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
    &:nth-child(21n + 5) {
      grid-column-start: 10;
      grid-column-end: 13;
      grid-row-start: 41;
      grid-row-end: 82;
      @include media(767px) {
        grid-column-start: 1;
        grid-column-end: 13;
        grid-row-start: 126;
        grid-row-end: 169;
      }
    }
    &:nth-child(21n + 6) {
      grid-column-start: 1;
      grid-column-end: 5;
      grid-row-start: 82;
      grid-row-end: 144;
      @include media(767px) {
        grid-column-start: 1;
        grid-column-end: 8;
        grid-row-start: 169;
        grid-row-end: 200;
        .gallery__title,
        .play-btn span {
          display: none;
        }
      }
    }
    &:nth-child(21n + 7) {
      grid-column-start: 5;
      grid-column-end: 8;
      grid-row-start: 82;
      grid-row-end: 144;
      @include media(767px) {
        grid-column-start: 8;
        grid-column-end: 13;
        grid-row-start: 169;
        grid-row-end: 200;
        .gallery__title,
        .play-btn span {
          display: none;
        }
      }
    }
    &:nth-child(21n + 8) {
      grid-column-start: 8;
      grid-column-end: 13;
      grid-row-start: 82;
      grid-row-end: 144;
      @include media(767px) {
        grid-column-start: 1;
        grid-column-end: 13;
        grid-row-start: 200;
        grid-row-end: 234;
      }
    }
    &:nth-child(21n + 9) {
      grid-column-start: 1;
      grid-column-end: 5;
      grid-row-start: 144;
      grid-row-end: 182;
      @include media(767px) {
        grid-column-start: 1;
        grid-column-end: 6;
        grid-row-start: 234;
        grid-row-end: 252;
        .gallery__title,
        .play-btn span {
          display: none;
        }
      }
    }
    &:nth-child(21n + 10) {
      grid-column-start: 5;
      grid-column-end: 9;
      grid-row-start: 144;
      grid-row-end: 182;
      @include media(767px) {
        grid-column-start: 6;
        grid-column-end: 13;
        grid-row-start: 234;
        grid-row-end: 252;
        .gallery__title,
        .play-btn span {
          display: none;
        }
      }
    }
    &:nth-child(21n + 11) {
      grid-column-start: 9;
      grid-column-end: 13;
      grid-row-start: 144;
      grid-row-end: 182;
      @include media(767px) {
        grid-column-start: 1;
        grid-column-end: 8;
        grid-row-start: 252;
        grid-row-end: 275;
        .gallery__title,
        .play-btn span {
          display: none;
        }
      }
    }
    &:nth-child(21n + 12) {
      grid-column-start: 1;
      grid-column-end: 4;
      grid-row-start: 182;
      grid-row-end: 220;
      @include media(767px) {
        grid-column-start: 8;
        grid-column-end: 13;
        grid-row-start: 252;
        grid-row-end: 275;
        .gallery__title,
        .play-btn span {
          display: none;
        }
      }
    }
    &:nth-child(21n + 13) {
      grid-column-start: 4;
      grid-column-end: 7;
      grid-row-start: 182;
      grid-row-end: 220;
      @include media(767px) {
        grid-column-start: 1;
        grid-column-end: 13;
        grid-row-start: 275;
        grid-row-end: 322;
      }
    }
    &:nth-child(21n + 14) {
      grid-column-start: 7;
      grid-column-end: 10;
      grid-row-start: 182;
      grid-row-end: 220;
      @include media(767px) {
        grid-column-start: 1;
        grid-column-end: 6;
        grid-row-start: 322;
        grid-row-end: 342;
        .gallery__title,
        .play-btn span {
          display: none;
        }
      }
    }
    &:nth-child(21n + 15) {
      grid-column-start: 10;
      grid-column-end: 13;
      grid-row-start: 182;
      grid-row-end: 220;
      @include media(767px) {
        grid-column-start: 6;
        grid-column-end: 13;
        grid-row-start: 322;
        grid-row-end: 342;
        .gallery__title,
        .play-btn span {
          display: none;
        }
      }
    }
    &:nth-child(21n + 16) {
      grid-column-start: 1;
      grid-column-end: 7;
      grid-row-start: 220;
      grid-row-end: 278;
      @include media(767px) {
        grid-column-start: 1;
        grid-column-end: 13;
        grid-row-start: 342;
        grid-row-end: 377;
      }
    }
    &:nth-child(21n + 17) {
      grid-column-start: 7;
      grid-column-end: 13;
      grid-row-start: 220;
      grid-row-end: 278;
      @include media(767px) {
        grid-column-start: 1;
        grid-column-end: 6;
        grid-row-start: 377;
        grid-row-end: 395;
        .gallery__title,
        .play-btn span {
          display: none;
        }
      }
    }
    &:nth-child(21n + 18) {
      grid-column-start: 1;
      grid-column-end: 5;
      grid-row-start: 278;
      grid-row-end: 338;
      @include media(767px) {
        grid-column-start: 6;
        grid-column-end: 13;
        grid-row-start: 377;
        grid-row-end: 395;
        .gallery__title,
        .play-btn span {
          display: none;
        }
      }
    }
    &:nth-child(21n + 19) {
      grid-column-start: 5;
      grid-column-end: 8;
      grid-row-start: 278;
      grid-row-end: 338;
      @include media(767px) {
        grid-column-start: 1;
        grid-column-end: 8;
        grid-row-start: 395;
        grid-row-end: 418;
        .gallery__title,
        .play-btn span {
          display: none;
        }
      }
    }
    &:nth-child(21n + 20) {
      grid-column-start: 8;
      grid-column-end: 13;
      grid-row-start: 278;
      grid-row-end: 338;
      @include media(767px) {
        grid-column-start: 8;
        grid-column-end: 13;
        grid-row-start: 395;
        grid-row-end: 418;
        .gallery__title,
        .play-btn span {
          display: none;
        }
      }
    }
  }
  &-zoom {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: vw(5px);
    cursor: pointer;
    z-index: 3;
    opacity: 0;
    @include media(767px) {
      padding: 5px;
    }
    svg {
      width: vw(18px);
      height: vw(18px);
      @include media(767px) {
        width: 18px;
        height: 18px;
      }
    }
  }
  &-btn {
    position: absolute;
    left: 2px;
    top: 2px;
    background: rgba(4, 28, 48, 0.6);
    padding: 5px;
    display: flex;
    align-items: center;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 3;
    @include media(767px) {
      opacity: 1;
      pointer-events: auto;
      padding: 10px;
      min-width: 90px;
    }
    &-text {
      font-family: $font-1b;
      font-size: vw(12px);
      text-transform: uppercase;
      color: #ffffff;
      margin-left: vw(8px);
      @include media(767px) {
        margin-left: 8px;
        font-size: 12px;
      }
    }
    &-icon {
      width: vw(22px);
      height: vw(22px);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(255, 255, 255, 0.14);
      @include media(767px) {
        width: 20px;
        height: 20px;
      }
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
  cursor: pointer;
  padding: 0;
  @include media(767px) {
    left: 16px;
    bottom: 16px;
    font-size: 16px;
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
    width: vw(24px);
    height: vw(38px);
    @include media(767px) {
      margin-right: 12px;
      width: 24px;
      height: 38px;
    }
  }
}
.gallery__title {
  position: absolute;
  left: 2vw;
  top: 2vw;
  z-index: 2;
  font-weight: bold;
  font-size: vw(30px);
  line-height: 1.2;
  text-transform: uppercase;
  color: #ffffff;
  max-width: calc(100% - 2vw);
  padding-right: 2vw;
  @include media(767px) {
    left: 16px;
    top: 16px;
    max-width: calc(100% - 16px);
    padding-right: 16px;
    font-size: 24px;
    line-height: 1.17;
  }
}
</style>
