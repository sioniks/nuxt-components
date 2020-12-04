/* eslint-disable vue/no-v-html */
<template>
  <section class="section section__service">
    <div class="container">
      <div class="gsapBottom">
        <div class="section__header" v-html="block.title"></div>
      </div>
      <div class="section__subheader gsapBottom">
        <div v-html="block.description"></div>
      </div>
      <div class="table">
        <div class="table__head">
          <div class="table__col table__col--start">
            <Logo class="table__logo gsapLeft" data-delay="0.3" />
          </div>
          <div class="table__col gsapBottom" data-delay="0.6">
            <img
              src="~/assets/images/icons/pret-icon.svg?inline"
              alt=""
              class="table__head-img"
            />
            <p class="table__head-title"></p>
          </div>
          <div class="table__col gsapBottom" data-delay="0.9">
            <img
              src="~/assets/images/icons/terra-icon.svg?inline"
              alt=""
              class="table__head-img"
            />
            <p class="table__head-title"></p>
          </div>
        </div>
        <div
          v-for="(item, index) in block.rows"
          :key="index"
          class="table__row"
        >
          <div class="table__col table__col--start gsapLeft" data-delay="0.3">
            <img
              v-if="!isMobile"
              :src="item.image_title.url"
              :alt="item.image_title.custom_properties.seo_alt"
              class="table__row-img"
            />
            <div class="table__row-title" v-html="item.cells.title"></div>
          </div>
          <div class="table__col gsapBottom" data-delay="0.6">
            <div class="table__row-text" v-html="item.cells._text"></div>
            <img
              v-if="item.image_"
              :src="item.image_.url"
              :alt="item.image_.custom_properties.seo_alt"
              class="table__row-img"
            />
          </div>
          <img
            v-if="isMobile"
            :src="item.image_title.url"
            :alt="item.image_title.custom_properties.seo_alt"
            class="table__row-img"
          />
          <div class="table__col gsapBottom" data-delay="0.9">
            <div class="table__row-text" v-html="item.cells._text"></div>
            <img
              v-if="item.image_"
              :src="item.image_.url"
              :alt="item.image_.custom_properties.seo_alt"
              class="table__row-img"
            />
          </div>
        </div>
      </div>
    </div>
    <Curve1 v-if="!isTablet" class="curve1" />
    <Curve2 v-if="!isTablet" class="curve2" />
  </section>
</template>

<script>
import Logo from '~/assets/images/icons/ -logo.svg';
import Curve1 from '~/assets/images/curve4.svg';
import Curve2 from '~/assets/images/curve5.svg';
export default {
  components: {
    Logo,
    Curve1,
    Curve2
  },
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
  mounted() {
    this.$nextTick(() => this.gsapTranslateService());
  },
  methods: {
    gsapTranslateService() {
      Array.from(
        this.$el.querySelectorAll(
          '.gsapOpacity, .gsapTop, .gsapBottom, .gsapLeft, .gsapRight'
        )
      ).forEach((item) => {
        const delay = +item.dataset.delay || 0;
        const duration = +item.dataset.duration || 0.8;
        const hook = item.dataset.hook || 0.6;
        const transform = item.dataset.transform || 'translate(0, 0)';
        const scene = this.$scrollmagic
          .scene({
            triggerElement: '.section__subheader',
            triggerHook: Number(hook),
            duration: 0,
            reverse: false
          })
          .setTween(item, duration, {
            delay,
            transform,
            opacity: 1,
            overwrite: false,
            lazy: true
          });
        // .addIndicators();
        this.$scrollmagic.addScene(scene);
      });
    }
  }
};
</script>

<style lang="scss">
.section__service {
  width: 100%;
  background: #041c30;
  padding: vw(80px) 0 vw(114px);
  color: #ffffff;
  @include media(1200px) {
    padding: 40px 0 30px;
  }
  @include media(767px) {
    width: calc(100% - 64px);
    margin-left: 32px;
    .container {
      padding: 0 16px;
    }
  }
  .container {
    z-index: 3;
    position: relative;
  }
  .section__header {
    color: #ffffff;
    text-transform: uppercase;
    margin-bottom: vw(31px);
    @include media(767px) {
      font-size: 32px;
      margin-bottom: 20px;
    }
  }
  .section__subheader {
    font-size: vw(18px);
    line-height: 1.78;
    text-align: center;
    color: #ffffff;
    margin: 0 auto vw(79px);
    width: 90%;
    @include media(1200px) {
      margin-bottom: 40px;
      font-size: 14px;
    }
    @include media(767px) {
      font-size: 16px;
      line-height: 1.2;
      width: 100%;
      margin-bottom: 48px;
    }
  }
  .table {
    position: relative;
    z-index: 1;
    @include media(767px) {
      &:after {
        content: '';
        position: absolute;
        width: 1px;
        height: 100%;
        background: rgba(56, 66, 75, 0.54);
        z-index: -1;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
      }
    }
  }
  .table__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: $font-2b;
    font-size: vw(22px);
    line-height: 1;
    text-transform: uppercase;
    color: #d2131c;
    padding: 0 0 vw(31px);
    border-bottom: 1px solid rgba(#384248, 0.4);
    &-img {
      @include media(767px) {
        height: 25px;
        width: auto;
      }
    }
    @include media(1200px) {
      font-size: 12px;
      padding-bottom: 20px;
    }
    @include media(767px) {
      flex-wrap: wrap;
    }
    .table__col--start {
      display: flex;
      align-items: center;
      @include media(767px) {
        width: 100%;
        padding-bottom: 50px;
        margin-bottom: 0;
        justify-content: center;
        background: #041c30;
        position: relative;
        z-index: 2;
      }
    }
    .table__col {
      .table__row-img {
        height: vw(50px);
      }
    }
  }
  .table__row-img {
    @include media(767px) {
      width: 25px;
      padding: 8px 0;
      position: relative;
      z-index: 2;
      background: #041c30;
    }
  }
  .table__logo {
    width: vw(295px);
    height: vw(35px);
    fill: $red;
    @include media(767px) {
      width: 200px;
      height: 24px;
    }
  }

  // .table__head-img {
  // }
  .table__head-title {
    margin-top: 1em;
    @include media(767px) {
      font-size: 14px;
      margin-top: 16px;
    }
  }
  .table__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: vw(38px) 0 vw(21px);
    border-bottom: 1px solid rgba(#384248, 0.4);
    font-size: vw(24px);
    line-height: 1.17;
    @include media(1200px) {
      font-size: 12px;
      padding: 10px 0;
    }
    @include media(767px) {
      padding: 12px 0 17px;
      flex-wrap: wrap;
      align-items: center;
      &:last-child {
        border: none;
      }
    }
    .table__col {
      display: flex;
      align-items: flex-end;
    }
    .table__col--start {
      display: flex;
      align-items: center;
      .table__row-img {
        margin-right: 2vw;
        @include media(1200px) {
          margin-right: 10px;
        }
      }
    }
  }
  .table__col {
    width: 27%;
    @include media(767px) {
      width: calc(50% - 12.5px);
      padding: 0 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    span {
      font-family: $font-1b;
    }
    .table__row-img {
      height: vw(30px);
      @include media(767px) {
        height: 24px;
        padding: 0;
        margin: 12px auto 0;
      }
    }
  }
  .table__col--start {
    width: 37%;
    @include media(767px) {
      width: 100%;
    }
  }
  .table__row-title {
    color: #818d97;
    @include media(767px) {
      padding: 8px 0;
      font-size: 16px;
      position: relative;
      z-index: 2;
      margin-bottom: 12px;
      background: #041c30;
      text-align: center;
    }
  }
  .table__row-text {
    text-transform: uppercase;
    margin-right: vw(24px);
    @include media(1200px) {
      margin-right: 10px;
    }
    @include media(767px) {
      margin: 0;
    }
    p strong {
      font-family: $font-1b;
    }
  }
  .curve1 {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: vw(905px);
    fill: #1a2a38;
  }
  .curve2 {
    fill: #1a2a38;
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 0;
    width: vw(914px);
  }
}
</style>
