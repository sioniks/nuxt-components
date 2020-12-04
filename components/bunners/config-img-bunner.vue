<template>
  <section class="section section__img">
    <div class="container">
      <div class="section__img-content">
        <div class="img-section-header gsapBottom" v-html="block.title">
          <div v-html="block.title"></div>
        </div>
        <div v-if="isMobile" class="section__img-images">
          <img
            :src="require(`~/assets/images/${img1}`)"
            alt=""
            class="img-section-bg"
          />

          <picture
            class="img--bw img__back gsapRight"
            data-delay="1.2"
            data-transform="translate(0, 0)"
          >
            <source
              v-if="block.bg_.conversions.original_webp"
              :srcset="block.bg_.conversions.original_webp"
              type="image/webp"
            />
            <img
              :src="block.bg_.url"
              :alt="block.bg_.custom_properties.seo_alt"
            />
          </picture>

          <picture
            class="img--bw img__front gsapRight"
            data-delay="0.5"
            data-transform="translate(0, 0)"
          >
            <source
              v-if="block.bg_.conversions.original_webp"
              :srcset="block.bg_.conversions.original_webp"
              type="image/webp"
            />
            <img
              :src="block.bg_.url"
              :alt="block.bg_.custom_properties.seo_alt"
            />
          </picture>
        </div>
        <Button
          :btn-text="block.button_text"
          btn-type="red"
          class="gsapBottom"
        />
      </div>
    </div>
    <template v-if="!isMobile">
      <img
        :src="require(`~/assets/images/${img1}`)"
        alt=""
        class="img-section-bg"
      />
      <picture
        class="img--bw img__back gsapRight"
        data-delay="1.2"
        data-transform="translate(0, -50%)"
      >
        <source
          v-if="block.bg_.conversions.original_webp"
          :srcset="block.bg_.conversions.original_webp"
          type="image/webp"
        />
        <img :src="block.bg_.url" :alt="block.bg_.custom_properties.seo_alt" />
      </picture>
      <picture
        class="img--bw img__front gsapRight"
        data-delay="0.5"
        data-transform="translate(0, -50%)"
      >
        <source
          v-if="block.bg_.conversions.original_webp"
          :srcset="block.bg_.conversions.original_webp"
          type="image/webp"
        />
        <img :src="block.bg_.url" :alt="block.bg_.custom_properties.seo_alt" />
      </picture>
    </template>
  </section>
</template>

<script>
import Button from '~/components/ui/btn/btn';

export default {
  components: { Button },
  props: {
    block: {
      type: Object,
      default: null
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      img1: 'gridbg.png',
      img2: 'torsimgbw.png',
      img3: 'torsimgbw.png',
      animate: false
    };
  },
  computed: {},
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
            triggerElement: item,
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
    visibilityChanged(isVisible) {
      this.animate = isVisible;
    }
  }
};
</script>

<style scoped lang="scss">
.section__img {
  height: 45vw;
  // overflow: hidden;
  margin: vw(159px) auto 0;
  position: relative;
  @include media(1200px) {
    margin-top: 64px;
  }
  @include media(767px) {
    height: auto;
    padding-bottom: 32px;
  }
  &-images {
    width: calc(100% + 64px);
    margin-left: -32px;
    margin-bottom: 48px;
    position: relative;
  }
  &-content {
    width: 40%;
    z-index: 1;
    text-align: left;
    position: absolute;
    left: 4vw;
    top: 50%;
    transform: translate(0, -50%);
    height: fit-content;
    @include media(1200px) {
      left: 32px;
    }
    @include media(767px) {
      position: static;
      width: 100%;
      transform: none;
      display: flex;
      flex-direction: column;
    }
  }
}
.img-section-bg {
  width: 100%;
  object-fit: contain;
  object-position: 50% 50%;
  z-index: -1;
  position: absolute;
  top: 0;
  @include media(767px) {
    position: static;
    height: 58vw;
    object-fit: cover;
  }
}

.img-section-header {
  font-family: $font-2b;
  font-size: vw(48px);
  line-height: 1.33;
  text-transform: uppercase;
  color: #041c30;
  margin-bottom: 1em;
  @include media(1200px) {
    font-size: 32px;
  }
  @include media(767px) {
    text-align: center;
    margin-bottom: 56px;
  }
  // span {
  //   padding: 3px;
  //   background-color: #ffffff;
  // }
}

.img--bw {
  position: absolute;
  top: 50%;
  right: -12%;

  img {
    height: 100%;
  }
  // transform: translate(0, -50%);
}
.img__front {
  height: 110%;
  z-index: 3;
  transform: translate(50%, -50%);
  will-change: scroll-position;
  @include media(767px) {
    transform: translate(100px, 0);
    right: 10vw;
    height: calc(100% + 2px);
    top: 4px;
  }
}
.img__back {
  height: 80%;
  right: 20%;
  z-index: 2;
  transform: translate(50%, -50%);
  will-change: scroll-position;
  @include media(767px) {
    transform: translate(100px, 0);
    left: 10vw;
    height: calc(100% - 32px);
    top: 38px;
  }
}

.go-enter-active,
.go-leave-active {
  transition: all 2s;
}
.go-enter, .go-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translate(100%, -50%);
}
.go2-enter-active,
.go2-leave-active {
  transition: all 4s;
}
.go2-enter, .go2-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translate(80%, -50%);
}
</style>
<style lang="scss">
.section__img {
  .btn {
    height: 56px;
    line-height: 56px;
    font-size: 16px;
    @include media(767px) {
      width: 100%;
      max-width: 100%;
      display: block;
    }
  }
}
</style>
