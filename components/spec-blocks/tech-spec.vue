<template>
  <section class="techspec-section section">
    <div v-if="!isTablet" class="techspec-section-curve">
      <Curve />
    </div>
    <div class="container">
      <div class="section-top">
        <div class="section__header">{{ block.title }}</div>
        <LoadLink
          :link-text="block.file_btn_title"
          :file-url="block.file_specification.url"
        />
        <div class="img-box">
          <div class="one-img">
            <img
              :src="block.width.image_width.url"
              :alt="block.width.image_width.custom_properties.seo_alt"
              class="one-img_img"
            />
            <div class="one-img_title">{{ block.width.title }}</div>
            <div class="one-img_subtitle">{{ block.width.value }}</div>
          </div>
          <div class="one-img">
            <img
              :src="block.length.image_length.url"
              :alt="block.length.image_length.custom_properties.seo_alt"
              class="one-img_img"
            />
            <div class="one-img_title">{{ block.length.title }}</div>
            <div class="one-img_subtitle">{{ block.length.value }}</div>
          </div>
        </div>
      </div>
      <div ref="test" class="section-center">
        <div class="items-wr">
          <div
            v-if="isMobile"
            class="items-wr-btn"
            :class="{ active: !itemsListFlag }"
            @click="showItems"
          >
            Show all characteristics <CarretIcon />
          </div>
          <transition name="fade">
            <div v-if="!itemsListFlag || !isMobile" class="items-wr-list">
              <div
                class="items-wr-list-content"
                :class="{ 'hide-down': endScrollFlag }"
              >
                <div v-if="isMobile" class="items-wr-list-top">
                  <LoadLink
                    :link-text="block.file_btn_title"
                    :file-url="block.file_specification.url"
                  />
                  <div class="close-icon" @click="closeItems">
                    <IconClose />
                  </div>
                </div>
                <perfect-scrollbar
                  @ps-y-reach-end="endScroll"
                  @ps-scroll-up="topScroll"
                >
                  <div class="items-wr-list-bottom">
                    <div
                      v-for="(item, index) in block.features"
                      :key="index"
                      class="tech-item"
                    >
                      <div class="tech-item_name">{{ item.title }}</div>
                      <div class="spec-box">
                        <div
                          v-for="(spec, ind) in item.items"
                          :key="ind"
                          class="spec-field"
                        >
                          <span class="field-title">{{ spec.name }}: </span>
                          {{ spec.value }}
                        </div>
                      </div>
                    </div>
                  </div>
                </perfect-scrollbar>
              </div>
            </div>
          </transition>
        </div>
        <div v-if="isMobile" class="bus-shema">
          <!-- <template v-for="(item, index) in block.image_sequence.original">
            <componentA :key="index" :test2="item"></componentA>
          </template> -->
          <img
            :src="images[0].url ? images[0].url : ''"
            alt=""
            class="shema_image"
          />
        </div>
        <div v-else class="bus-shema">
          <!-- <template v-for="(item, index) in block.image_sequence.original">
            <componentA :key="index" :test2="item"></componentA>
          </template> -->
          <template v-for="(item, index) in images">
            <img
              :key="index"
              :src="item.url"
              alt=""
              class="shema_image"
              :class="{ visible: index === test }"
            />
          </template>
        </div>
      </div>
      <div class="section-bottom">
        <div class="img-block big-img">
          <div class="img-block_text">
            <div class="title">{{ block.items[0].title }}</div>
            <LineIcon v-if="!isMobile" class="from-right" />
            <div class="subtitle">{{ block.items[0].description }}</div>
          </div>
          <img
            :src="block.items[0].image.url"
            :alt="block.items[0].image.custom_properties.seo_alt"
          />
        </div>
        <div class="img-block small-img">
          <div class="img-block_text">
            <div class="title">{{ block.items[1].title }}</div>
            <LineIcon v-if="!isMobile" class="from-left" />
            <div class="subtitle">
              {{ block.items[1].description }}
            </div>
          </div>
          <img
            :src="block.items[1].image.url"
            :alt="block.items[1].image.custom_properties.seo_alt"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { gsap } from 'gsap';
import LoadLink from '~/components/ui/load-link/load-link';
import LineIcon from '~/assets/images/icons/line.svg';
import Curve from '~/assets/images/curve-techspec.svg';
import CarretIcon from '~/assets/images/icons/arrow-down.svg';
import IconClose from '~/assets/images/icons/close-icon.svg';
export default {
  components: { LoadLink, LineIcon, Curve, CarretIcon, IconClose },
  props: {
    block: {
      type: Object,
      default: null
    },
    isTablet: {
      type: Boolean,
      default: false
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      itemsListFlag: true,
      endScrollFlag: false,
      test: 0,
      images: []
    };
  },

  mounted() {
    this.$nextTick(() => {
      if (!this.isMobile) {
        this.startAnimation();
      }
    });

    this.images = this.block.image_sequence.original.map((e) => {
      return { url: e, visible: false };
    });

    this.images[this.test].visible = true;
  },
  methods: {
    showItems() {
      this.itemsListFlag = !this.itemsListFlag;
      if (!this.itemsListFlag) {
        this.enableScroll();
      }
    },
    closeItems() {
      this.itemsListFlag = true;
      this.disableScroll();
    },
    endScroll() {
      this.endScrollFlag = true;
    },
    topScroll() {
      this.endScrollFlag = false;
    },
    enableScroll() {
      const $body = document.querySelector('body');
      this.scrollPosition = window.pageYOffset;
      $body.style.overflow = 'hidden';
      $body.style.position = 'fixed';
      $body.style.top = `-${this.scrollPosition}px`;
      $body.style.width = '100%';
    },
    disableScroll() {
      const $body = document.querySelector('body');
      $body.style.removeProperty('overflow');
      $body.style.removeProperty('position');
      $body.style.removeProperty('top');
      $body.style.removeProperty('width');
      window.scrollTo(0, this.scrollPosition);
    },
    startAnimation() {
      const tl = gsap.timeline({ onUpdate: updatePercentage });
      const _this = this;
      const scene = this.$scrollmagic
        .scene({
          triggerElement: '.bus-shema',
          triggerHook: 0,
          duration: '120%'
        })
        .setPin('.bus-shema')
        .on('progress', function (e) {
          const progress = Math.floor(0 * (1 - e.progress) + 36 * e.progress);
          _this.test = progress;
        });
      this.$scrollmagic.addScene(scene);
      function updatePercentage() {
        tl.progress();
      }
    }
  }
};
</script>
<style lang="scss">
.techspec-section {
  padding-top: 0;
  &-curve {
    width: vw(490px);
    height: vw(730px);
    position: absolute;
    right: 0;
    top: vw(-365px);
    z-index: -1;
    svg {
      width: 100%;
      height: 100%;
    }
  }
  .section-top {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-bottom: vw(30px);
    @include media(767px) {
      margin-bottom: 0;
      flex-direction: column;
    }
  }
  .section__header {
    text-transform: uppercase;
    text-align: left;
  }

  .load-link {
    position: absolute;
    left: 0;
    top: 8em;
    font-size: vw(14px);
    z-index: 2;
    @include media(767px) {
      display: none;
    }
  }
  .img-box {
    display: flex;
    width: 50%;
    @include media(767px) {
      width: 100%;
      justify-content: space-between;
      margin: 86px 0 42px;
    }
  }
  .one-img {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: bold;
    font-size: vw(18px);
    line-height: 1.22;
    @include media(767px) {
      font-size: 18px;
    }
    &:first-child {
      margin-right: 10vw;
      width: vw(105px);
      @include media(767px) {
        margin: 0;
        width: 30%;
      }
    }
    &:last-child {
      width: vw(280px);
      @include media(767px) {
        width: 60%;
      }
    }

    .one-img_img {
      margin-bottom: 30px;
      height: auto;
      width: 100%;
      @include media(767px) {
        width: auto;
        height: 85px;
        margin-bottom: 20px;
      }
    }
    .one-img_title {
      margin-bottom: 24px;
      margin-top: auto;
      @include media(767px) {
        margin-bottom: 5px;
      }
    }
    .one-img_subtitle {
      color: #d2131c;
    }
  }
  .section-center {
    display: flex;
    justify-content: space-between;
    height: auto;
    @include media(767px) {
      flex-direction: column;
    }
  }
  .items-wr {
    height: auto;
    width: vw(536px);
    @include media(767px) {
      width: 100%;
      &-btn {
        width: 100%;
        cursor: pointer;
        padding: 22px;
        font-size: 16px;
        line-height: 1.25;
        border: 1.2px solid #e9ebed;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: $font-2b;
        svg {
          width: 11px;
          height: 5px;
        }
        path {
          fill: $red;
        }
        &.active {
          svg {
            transform: rotate(180deg);
          }
        }
      }
    }
  }
  .bus-shema {
    width: 60%;
    height: 500px;
    margin-top: 100px;
    position: relative;
    @include media(767px) {
      width: calc(100% + 64px);
      margin-left: -32px;
      height: auto;
      margin-top: 0;
    }

    .shema_image {
      width: 100%;
      height: 100%;
      position: absolute;
      // transition: opacity 0.5s ease;
      top: 0;
      left: 0;
      object-fit: contain;
      opacity: 0;
      @include media(767px) {
        position: static;
        width: 100%;
        height: auto;
        opacity: 1;
      }
      &.visible {
        opacity: 1;
      }
    }
  }
  .items-wr-list {
    .ps {
      position: relative;
      height: 100%;
      width: 100%;
      transition: unset !important;
      padding: 0;
    }
    .ps__rail-y {
      width: 4px;
      opacity: 1 !important;
      background: #ededed;
    }
    .ps__thumb-y {
      text-align: center;
      opacity: 1 !important;
      background: $red;
      border-radius: 0;
      width: 4px;
      right: 0;
    }
    .ps__rail-y:hover > .ps__thumb-y,
    .ps__rail-y:focus > .ps__thumb-y,
    .ps__rail-y.ps--clicking .ps__thumb-y {
      width: 4px;
      background: $red;
    }
    .ps .ps__rail-x:hover,
    .ps .ps__rail-y:hover,
    .ps .ps__rail-x:focus,
    .ps .ps__rail-y:focus,
    .ps .ps__rail-x.ps--clicking,
    .ps .ps__rail-y.ps--clicking {
      background: #ededed;
    }
    @include media(767px) {
      position: fixed;
      z-index: 900;
      left: 0;
      top: 0;
      width: 100%;
      height: calc(var(--vh, 1vh) * 100);
      background: rgba(4, 28, 48, 0.85);
      padding: 16px;
      display: flex;
    }
    &-content {
      @include media(767px) {
        width: 100%;
        height: 100%;
        background: #ffffff;
        padding: 16px 0 0 24px;
        position: relative;
        display: flex;
        flex-direction: column;
        &:after {
          content: '';
          position: absolute;
          width: 100%;
          height: 52px;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0) 0%,
            #ffffff 100%
          );
          left: 0;
          bottom: 0;
          opacity: 1;
          pointer-events: none;
        }
      }
      &.hide-down {
        &:after {
          opacity: 0;
        }
      }
    }
    &-top {
      @include media(767px) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
        background: #ffffff;
        flex-shrink: 0;
        padding-right: 24px;
      }
    }
    &-bottom {
      @include media(767px) {
        height: calc(100% - 0px);
      }
    }
    .load-link {
      display: block;
      position: static;
      font-size: 14px;
    }
    .close-icon {
      font-size: 0;
      width: 55px;
      height: 55px;
      margin-right: -8px;
      .svg-icon {
        fill: transparent;
        width: 100%;
        height: 100%;
        path {
          stroke: #041c30;
          &:last-child {
            fill: #041c30;
          }
        }
      }
    }
  }
  .tech-item {
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    margin-bottom: vw(48px);
    @include media(767px) {
      margin-bottom: 0;
      padding-bottom: 32px;
      flex-direction: column;
      padding-right: 24px;
    }
  }
  .tech-item_name {
    font-family: $font-2b;
    width: 40%;
    font-size: vw(20px);
    line-height: 1.2;
    letter-spacing: 0.333333px;
    position: relative;
    @include media(767px) {
      font-size: 20px;
      line-height: 1.2;
      width: 100%;
      margin-bottom: 28px;
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      bottom: -14px;
      width: 24px;
      height: 2px;
      background: #d2131c;
    }
  }
  .spec-box {
    font-family: $font-1r;
    width: 55%;
    font-size: vw(16px);
    line-height: 1.75;
    letter-spacing: -0.222222px;
    color: #000000;
    @include media(767px) {
      font-size: 14px;
      line-height: 1.57;
      width: 100%;
    }
  }
  .field-title {
    color: #808080;
  }
  .section-bottom {
    margin: vw(60px) auto vw(153px);
    @include media(767px) {
      margin: 20px 0;
    }
  }
  .img-block {
    width: 75%;
    margin: 0 auto vw(20px);
    position: relative;
    @include media(767px) {
      width: 100%;
      margin: 0;
    }
    .img-block_text {
      width: 31%;
      position: absolute;
      right: -7%;
      top: vw(-50px);
      z-index: 1;
      line-height: 1.3;
      @include media(767px) {
        position: static;
        width: 100%;
      }
      .title {
        font-family: $font-2b;
        font-size: vw(32px);
        text-transform: uppercase;
        color: #041c30;
        margin-bottom: 1em;
        position: relative;
        @include media(767px) {
          margin-bottom: 43px;
          font-size: 24px;
          line-height: 1.25;
          text-align: center;
        }
        &:before {
          content: '';
          width: 24px;
          height: 2px;
          background: $red;
          position: absolute;
          left: 0;
          bottom: -0.3em;
          @include media(767px) {
            left: calc(50% - 12px);
            bottom: -14px;
          }
        }
      }
      .subtitle {
        font-family: $font-1r;
        font-size: vw(18px);
        color: #000000;
        text-transform: capitalize;
        @include media(767px) {
          font-size: 18px;
          text-align: center;
        }
      }
    }
    img {
      position: relative;
      width: 95%;
      left: 0;
      bottom: 0;
      @include media(767px) {
        width: 100%;
      }
    }
    .svg-icon {
      fill: none;
      stroke: #ebebeb;
      position: absolute;
      left: vw(-105px);
      top: vw(30px);
      width: vw(90px);
      height: vw(140px);
    }

    &.small-img {
      padding-top: 5em;
      @include media(767px) {
        padding-top: 60px;
      }
      img {
        width: 45%;
        left: 50%;
        transform: translateX(-50%);
        @include media(767px) {
          width: 100%;
        }
      }
      .img-block_text {
        right: unset;
        left: 10%;
      }
      .svg-icon {
        transform: rotateY(180deg);
        left: unset;
        right: -4em;
        top: 2em;
      }
    }
  }
}
</style>
