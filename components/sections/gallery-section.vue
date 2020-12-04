<template>
  <section class="section gallery__section container-fluid">
    <div class="container">
      <div class="content-wr">
        <div class="gsapLeft">
          <div class="section__header" v-html="block.title || ''"></div>
        </div>
        <div class="btn-wr">
          <BigBtn
            btn-text="View all photos"
            class="gsapBottom"
            data-hook="0.8"
            data-delay="0.1"
          />
          <BigBtn
            btn-text="View all videos"
            class="gsapBottom"
            data-hook="0.8"
            data-delay="0.2"
          />
        </div>
      </div>
      <Gallery :images="block.gallery" :is-mobile="isMobile" />
    </div>
    <template v-if="buses">
      <Lines v-if="!isTablet" />
    </template>
    <template v-else>
      <Curve1 v-if="!isTablet" class="curve1" />
      <Curve2 v-if="!isTablet" class="curve2" />
    </template>
  </section>
</template>
<script>
import BigBtn from '~/components/ui/btn/btn-big.vue';
import Gallery from '~/components/gallery/gallery.vue';
import Curve1 from '~/assets/images/curve2.svg';
import Curve2 from '~/assets/images/curve3.svg';
import Lines from '~/components/ui/lines/lines';
export default {
  components: {
    BigBtn,
    Gallery,
    Curve1,
    Curve2,
    Lines
  },
  props: {
    block: {
      type: Object,
      default: null
    },
    buses: {
      type: Boolean,
      default: false
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
    return {};
  },
  computed: {},
  mounted() {
    this.$nextTick(() => {
      this.animGallery();
      this.gsapTranslateG();
    });
  },
  methods: {
    animGallery() {
      Array.from(this.$el.querySelectorAll('.gallery-item')).forEach((item) => {
        const delay = +item.dataset.delay || 0;
        const duration = +item.dataset.duration || 0.7;
        const scene = this.$scrollmagic
          .scene({
            triggerElement: item,
            triggerHook: 1,
            duration: 0,
            reverse: false
          })
          .setTween(item, duration, {
            delay,
            opacity: 1,
            overwrite: false,
            lazy: true
          });
        this.$scrollmagic.addScene(scene);
      });
    },
    gsapTranslateG() {
      Array.from(
        this.$el.querySelectorAll(
          '.gsapOpacity, .gsapTop, .gsapBottom, .gsapLeft, .gsapRight'
        )
      ).forEach((item) => {
        const delay = +item.dataset.delay || 0;
        const duration = +item.dataset.duration || 0.8;
        const hook = item.dataset.hook || 0.6;
        const transform = item.dataset.transform || 'translate(0, 0)';
        const scene2 = this.$scrollmagic
          .scene({
            triggerElement: '.gallery-box',
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
        this.$scrollmagic.addScene(scene2);
      });
    }
  }
};
</script>
<style lang="scss">
.gallery__section {
  margin-bottom: 5em;
  .lines {
    left: vw(-140px);
    top: inherit;
    bottom: vw(-160px);
    svg {
      top: 0;
      left: 0;
    }
  }
  @include media(1200px) {
    margin-bottom: 64px;
  }
  @include media(767px) {
    position: relative;
    padding-bottom: 170px;
  }
  .content-wr {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 100px;
    @include media(1200px) {
      margin-bottom: 40px;
    }
    @include media(767px) {
      .gsapLeft {
        width: 100%;
      }
    }
  }
  .btn-wr {
    display: flex;
    @include media(1200px) {
      margin-top: 26px;
    }
    @include media(767px) {
      flex-direction: column;
      position: absolute;
      bottom: 0;
      left: 32px;
      width: calc(100% - 64px);
      margin: 0;
    }
    .btn.btn--big {
      @include media(767px) {
        margin: 0 0 8px 0;
        background: transparent;
        border: 1px solid #e9ebed;
        padding: 24px;
        min-height: auto;
        width: 100%;
        min-width: auto;
        &:hover {
          background-color: $red;
        }
        &:before {
          display: none;
        }
      }
      &:last-child {
        margin-right: 0;
        @include media(767px) {
          margin: 0;
        }
      }
    }
  }
  .section__header {
    text-transform: uppercase;
    display: block;
    @include media(767px) {
      width: 100%;
      text-align: center;
    }
  }
  .container {
    z-index: 1;
  }
  .curve1 {
    position: absolute;
    z-index: -1;
    top: -31vw;
    right: 0;
  }
  .curve2 {
    position: absolute;
    z-index: -1;
    top: -18vw;
    left: 0;
  }
}
</style>
