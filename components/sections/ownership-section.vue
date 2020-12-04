<template>
  <section class="section section__ovnership">
    <div class="container">
      <div class="section__top">
        <div class="gsapLeft">
          <div class="section__header" v-html="block.title"></div>
        </div>

        <div class="description gsapBottom" data-delay="0.5">
          <div v-html="block.description"></div>
        </div>
      </div>

      <div class="section__content">
        <div v-for="(card, index) in block.cards" :key="index" class="option">
          <div
            class="option__title gsapBottom"
            :data-delay="0.3 * (index + 1)"
            @click="showInfo(index)"
          >
            {{ card.title }}
            <ArrowIcon v-if="isMobile" />
          </div>
          <div
            v-show="isMobile ? hideInfo.includes(index) : true"
            class="hide-block"
          >
            <div
              class="option__text gsapBottom"
              :data-delay="0.6 * (index + 1)"
            >
              <div v-html="card.description"></div>
            </div>
            <app-link :to="card.btn_link" class="option-link">
              <Button
                btn-type="red"
                :btn-text="card.btn_title"
                :chain="true"
                class="gsapBottom"
              />
            </app-link>
          </div>
        </div>
      </div>
    </div>
    <Curve1 v-if="!isTablet" class="curve--anim curve1" />
    <Curve2 v-if="!isTablet" class="curve--anim curve2" />
  </section>
</template>

<script>
import Button from '~/components/ui/btn/btn';
import ArrowIcon from '~/assets/images/icons/arrow-top.svg';
import Curve1 from '~/assets/images/curve6.svg';
import Curve2 from '~/assets/images/curve7.svg';

export default {
  components: {
    Button,
    Curve1,
    Curve2,
    ArrowIcon
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
  data() {
    return {
      hideInfo: []
    };
  },
  mounted() {
    this.$nextTick(() => this.gsapTranslateOw());
  },
  methods: {
    gsapTranslateOw() {
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
            triggerElement: '.section__ovnership',
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
    },
    showInfo(index) {
      if (this.isMobile) {
        if (this.hideInfo.includes(index)) {
          this.hideInfo = this.hideInfo.filter((item) => {
            return item !== index;
          });
        } else {
          this.hideInfo.push(index);
        }
      }
    }
  }
};
</script>

<style lang="scss">
.section__ovnership {
  padding: 5vw 0 3vw;
  @include media(1200px) {
    padding: 64px 0 40px;
  }
  .section__header {
    // width: 45%;
    text-align: left;
    position: relative;
    @include media(767px) {
      width: 100%;
      margin-bottom: 24px;
      font-size: 32px;
    }
  }
  .section__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: vw(80px);
    position: relative;
    @include media(1200px) {
      margin-bottom: 40px;
    }
    @include media(767px) {
      flex-direction: column;
      margin-bottom: 35px;
    }
    & > div {
      width: 45%;
      @include media(767px) {
        width: 100%;
      }
    }
  }
  .description {
    width: 42%;
    font-size: vw(22px);
    line-height: 1.5;
    color: #818d97;
    @include media(1200px) {
      font-size: 14px;
    }
    @include media(767px) {
      font-size: 16px;
      line-height: 1.2;
    }
  }
  .section__content {
    display: flex;
    justify-content: space-between;
    @include media(767px) {
      width: calc(100% + 64px);
      margin-left: -32px;
      flex-direction: column;
    }
  }
  .option {
    width: 49%;
    background: rgba(#f9fafa, 0.9);
    padding: vw(40px) vw(60px) vw(135px);
    position: relative;
    display: flex;
    flex-direction: column;
    @include media(1200px) {
      padding: 20px 32px 32px;
    }
    @include media(767px) {
      width: 100%;
      padding: 20px 32px;
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    &-link {
      @include media(1200px) {
        margin-top: auto;
      }
    }
  }
  .option__title {
    font-family: $font-2b;
    font-size: vw(32px);
    line-height: 1.3;
    text-transform: uppercase;
    color: #0d314f;
    margin-bottom: vw(16px);
    @include media(1200px) {
      margin-bottom: 10px;
      font-size: 18px;
    }
    @include media(767px) {
      padding: 20px 0;
      margin: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 24px;
      .svg-icon {
        transform: rotate(180deg);
      }
    }
  }
  .option__text {
    font-size: vw(16px);
    line-height: 1.75;
    color: #041c30;
    @include media(1200px) {
      font-size: 12px;
      margin-bottom: 26px;
    }
    @include media(767px) {
      font-size: 16px;
      margin-bottom: 32px;
    }
  }
  .btn.red {
    position: absolute;
    left: vw(60px);
    bottom: vw(48px);
    min-width: vw(268px);
    height: vw(60px);
    line-height: vw(60px);
    @include media(1200px) {
      position: static;
      line-height: 56px;
      height: 56px;
      min-width: 180px;
      font-size: 14px;
    }
    @include media(767px) {
      min-width: 100%;
    }
    .svg-icon {
      height: vw(12px);
      width: vw(12px);
      @include media(1200px) {
        width: 12px !important;
        height: 12px !important;
      }
      @include media(767px) {
        margin-right: 20px;
      }
    }
  }
  .curve1 {
    position: absolute;
    z-index: -1;
    bottom: 0;
    left: 0;
  }
  .curve2 {
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
  }

  .go-enter-active,
  .go-leave-active {
    transition: all 1s;
  }
  .go-enter, .go-leave-to /* .list-leave-active до версии 2.1.8 */ {
    opacity: 0;
    transform: translateX(300px);
  }

  .from-right-enter-active,
  .from-right-leave-active {
    transition: all 2s;
  }
  .from-right-enter, .from-right-leave-to /* .list-leave-active до версии 2.1.8 */ {
    opacity: 0;
    transform: translateX(500px);
  }
  .from-left-enter-active,
  .from-left-leave-active {
    transition: all 2s;
  }
  .from-left-enter, .from-left-leave-to /* .list-leave-active до версии 2.1.8 */ {
    opacity: 0;
    transform: translateX(-500px);
  }
  .from-top-enter-active,
  .from-top-leave-active {
    transition: all 2s;
  }
  .from-top-enter, .from-top-leave-to /* .list-leave-active до версии 2.1.8 */ {
    opacity: 0;
    transform: translateY(-500px);
  }
  .from-bottom-enter-active,
  .from-bottom-leave-active {
    transition: all 3s;
  }
  .from-bottom-enter, .from-bottom-leave-to /* .list-leave-active до версии 2.1.8 */ {
    opacity: 0;
    transform: translateY(500px);
  }
}
</style>
<style lang="scss">
.section__ovnership .option__title .svg-icon path {
  fill: $red;
}
</style>
