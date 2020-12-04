<template>
  <section class="section section__contactus">
    <div class="container">
      <div class="block-contactUs">
        <div class="gsapBottom block-contactUs-top">
          <div class="section__header" v-html="block.title"></div>
        </div>
        <template class="gsapBottom">
          <app-link to="/contacts">
            <Button btn-type="red-black" :btn-text="block.button_text" />
          </app-link>
        </template>
        <slot name="icon">
          <Curve1 class="curve1" />
        </slot>
      </div>
    </div>
  </section>
</template>

<script>
import Button from '~/components/ui/btn/btn';

import Curve1 from '~/assets/images/curve8.svg';

export default {
  components: { Button, Curve1 },
  props: {
    block: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.$nextTick(() => this.gsapTranslateBC());
  },
  methods: {
    gsapTranslateBC() {
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
    }
  }
};
</script>

<style lang="scss">
.block-contactUs {
  background: #041c30;
  border: 1px solid #041c30;
  padding: vw(80px) 4vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  @include media(1200px) {
    padding: 80px 28px;
  }
  @include media(767px) {
    border: none;
    width: calc(100% + 64px);
    margin-left: -32px;
    padding: 80px 58px;
  }
  &-top {
    position: relative;
    z-index: 1;
  }
  .btn {
    width: vw(260px);
    height: vw(72px);
    line-height: vw(72px);
    position: relative;
    z-index: 1;
    @include media(1200px) {
      height: 56px;
      line-height: 56px;
      font-size: 14px;
      width: 100%;
      max-width: 150px;
    }
    @include media(767px) {
      font-size: 16px;
      max-width: 300px;
    }
  }
  .section__header {
    margin-bottom: vw(61px);
    line-height: vw(61px);
    color: #ffffff;
    text-transform: uppercase;
    position: relative;
    z-index: 1;
    @include media(1200px) {
      margin-bottom: 30px;
      line-height: 1.25;
    }
    @include media(767px) {
      font-size: 28px;
    }
  }
  .curve1 {
    position: absolute;
    z-index: 0;
    bottom: 0;
    right: 0;
    @include media(767px) {
      bottom: -10%;
      right: -25%;
    }
  }
}
</style>
