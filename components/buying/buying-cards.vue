<template>
  <section class="buying-list">
    <div class="container">
      <div
        v-for="(item, index) in block.items"
        :key="index"
        class="buying-list-item item"
      >
        <div class="item-overlay gsapHeightInCard"></div>
        <div class="item-left">
          <h3 class="item-left-title gsapBottomInCard" data-delay="0.2">
            {{ item.title }}
          </h3>
          <p class="item-left-text gsapBottomInCard" data-delay="0.4">
            {{ item.description }}
          </p>
        </div>
        <div class="item-right gsapBottomInCard" data-delay="0.6">
          <a :href="item.extra.button_link" target="_blank">
            <Button
              :btn-text="item.extra.button_title"
              :chain="true"
              btn-type="red btn_buying"
            />
          </a>
        </div>
      </div>
      <div
        v-if="!isMobile"
        class="buying-list-plus"
        :style="{ backgroundImage: `url(${plus})` }"
      ></div>
    </div>
  </section>
</template>

<script>
import Button from '~/components/ui/btn/btn';
import plus from '~/assets/images/pluses.png';
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
      plus
    };
  },
  mounted() {
    setTimeout(() => {
      this.gsapTranslate();
      this.gsapHeight();
    }, 500);
  },
  methods: {
    gsapTranslate() {
      Array.from(document.querySelectorAll('.gsapBottomInCard')).forEach(
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
    },
    gsapHeight() {
      Array.from(document.querySelectorAll('.gsapHeightInCard')).forEach(
        (item) => {
          const delay = item.dataset.delay || 0;
          const duration = item.dataset.duration || 0.8;
          const hook = item.dataset.hook || 1;
          const scene = this.$scrollmagic
            .scene({
              offset: -100,
              triggerElement: item.parentNode,
              triggerHook: hook,
              duration: 0,
              reverse: false
            })
            .setTween(item, duration, {
              delay,
              height: '100%',
              overwrite: false,
              lazy: true
            });
          this.$scrollmagic.addScene(scene);
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.buying {
  &-list {
    padding: 0 0 vw(90px);
    position: relative;
    @include media(767px) {
      padding-bottom: 38px;
    }
    .container {
      @include media(767px) {
        padding: 0;
      }
    }
    &-plus {
      width: vw(873px);
      height: vw(747px);
      background-size: 100px;
      position: absolute;
      left: vw(-160px);
      bottom: vw(-550px);
      z-index: -1;
    }
  }
}
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: vw(56px) vw(68px) vw(56px) vw(60px);
  margin-bottom: vw(24px);
  position: relative;
  z-index: 1;
  @include media(767px) {
    padding: 40px 32px 32px 32px;
    margin-bottom: 24px;
    flex-direction: column;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &-overlay {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: -1;
    background: rgba(249, 250, 250, 0.9);
  }
  &-left {
    max-width: vw(724px);
    @include media(767px) {
      max-width: 100%;
    }
    &-title {
      font-family: $font-2b;
      font-size: vw(36px);
      line-height: 1.25;
      text-transform: uppercase;
      color: $darkBlue;
      @include media(767px) {
        font-size: 24px;
      }
    }
    &-text {
      margin-top: vw(20px);
      font-size: vw(16px);
      line-height: 1.625;
      @include media(767px) {
        margin-top: 20px;
        font-size: 16px;
        line-height: 1.5;
      }
    }
  }
  &-right {
    @include media(767px) {
      width: 100%;
      margin-top: 32px;
      a {
        display: block;
      }
    }
  }
}
.gsapBottomInCard {
  opacity: 0;
  transform: translateY(100px);
}
</style>
