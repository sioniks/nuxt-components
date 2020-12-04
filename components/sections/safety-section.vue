<template>
  <section
    v-observe-visibility="{
      callback: visibilityChangedSaf,
      once: true
    }"
    class="section section__safety"
  >
    <div class="container">
      <div class="gsapBottom">
        <div class="section__header" v-html="block.title"></div>
      </div>
      <div class="gsapBottom" data-delay="0.3">
        <div class="description" v-html="block.description"></div>
      </div>

      <div class="tabs">
        <div class="tabs__head">
          <div
            class="tab_button btn gsapLeft"
            :class="{ 'is-active': isActive('1') }"
            data-delay="0.6"
            @click="setActive(1)"
          >
            {{ block.tabs[0].title }}
          </div>
          <div
            class="tab_button btn gsapRight"
            :class="{ 'is-active': isActive('2') }"
            data-delay="0.9"
            @click="setActive(2)"
          >
            {{ block.tabs[1].title }}
          </div>
        </div>
        <div class="tabs__content">
          <transition name="fade">
            <div v-show="activeItem === 1" class="tab__block">
              <div
                v-for="(item, index) in block.tabs[0].items"
                :key="index"
                class="tab__item"
              >
                <img
                  :src="item.icon.url"
                  :alt="item.icon.custom_properties.seo_alt"
                  class="tab__icon"
                  :class="{ gsapTop: isAnimate }"
                  :data-delay="0.3 * (index + 1)"
                />
                <div class="tab__title">
                  <div v-html="item.title"></div>
                </div>
              </div>
            </div>
          </transition>
          <transition name="fade">
            <div v-show="activeItem === 2" class="tab__block">
              <div
                v-for="(item, index) in block.tabs[1].items"
                :key="index"
                class="tab__item"
              >
                <img
                  :src="item.icon.url"
                  :alt="item.icon.custom_properties.seo_alt"
                  class="tab__icon"
                />
                <div class="tab__title" v-html="item.title"></div>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <a
        v-if="activeItem === 1"
        :href="block.tabs[0].extra.see_more_link"
        class="link link--red"
        >{{ block.tabs[0].extra.see_more_label }}</a
      >
      <a
        v-if="activeItem === 2"
        :href="block.tabs[1].extra.see_more_link"
        class="link link--red"
        >{{ block.tabs[1].extra.see_more_label }}</a
      >
    </div>
  </section>
</template>

<script>
export default {
  props: {
    block: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      activeItem: 1,
      isAnimate: true
    };
  },
  computed: {
    prBlocks() {
      return this.block.tabs.filter((item) => item.tab_slug === ' ');
    },
    trBlocks() {
      return this.block.tabs.filter((item) => item.tab_slug === ' ');
    }
  },
  mounted() {
    // console.log('--------------------', this.$scrollmagic.scene.refresh());
    this.$nextTick(() => this.gsapTranslateSafety());
  },
  methods: {
    isActive(tab) {
      return this.activeItem === +tab;
    },
    setActive(tab) {
      this.activeItem = tab;
    },
    visibilityChangedSaf(isVisible) {
      if (isVisible) {
        setTimeout(() => {
          this.isAnimate = false;
        }, 5000);
      }
    },
    gsapTranslateSafety() {
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
.section__safety {
  padding: vw(90px) 0 vw(48px);
  background: #f9fafa;
  @include media(1200px) {
    padding: 48px 0 32px;
  }
  .section__header {
    text-transform: uppercase;
    margin-bottom: vw(24px);
    @include media(1200px) {
      margin-bottom: 30px;
    }
    @include media(767px) {
      text-align: left;
    }
  }
  .description {
    font-size: vw(16px);
    line-height: 1.62;
    text-align: center;
    color: #041c30;
    margin-bottom: vw(64px);
    @include media(1200px) {
      font-size: 16px;
      margin-bottom: 48px;
    }
    @include media(767px) {
      text-align: left;
    }
  }
  // .tabs {
  // }
  .tabs__head {
    display: flex;
    margin-bottom: vw(70px);
    @include media(1200px) {
      margin-bottom: 48px;
    }
  }
  .tab_button {
    font-family: $font-2b;
    width: 50%;
    transition: color 0.5s ease;
    font-size: vw(32px);
    line-height: 1.25;
    text-transform: uppercase;
    height: vw(71px);
    text-align: center;
    position: relative;
    color: #c2cfda;
    @include media(1200px) {
      height: 40px;
      font-size: 16px;
    }
    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      position: absolute;
      bottom: 0;
      left: 0;
      background: #c2cfda;
      transition: all 0.5s ease;
    }
    &:before {
      content: '';
      display: block;
      width: 0;
      height: 0;
      position: absolute;
      bottom: vw(-20px);
      left: 50%;
      transform: translateX(-50%);
      transition: all 0.5s ease;
      border-top: vw(10px) solid #c2cfda;
      border-right: vw(10px) solid transparent;
      border-bottom: vw(10px) solid transparent;
      border-left: vw(10px) solid transparent;
      opacity: 0;
      @include media(767px) {
        border-top: 8px solid #c2cfda;
        border-right: 9px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 9px solid transparent;
        bottom: -16px;
      }
    }
    &.is-active {
      color: $red;
      &:after {
        background: $red;
      }
      &:before {
        opacity: 1;
        border-top: vw(10px) solid $red;
        @include media(767px) {
          border-top: 8px solid $red;
        }
      }
      &:hover {
        &:before {
          opacity: 1;
        }
      }
    }
    &:hover {
      color: $red;
      // &:after {
      //   background: $red;
      // }
      &:before {
        opacity: 0;
      }
    }
  }

  .tab__block {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: minmax(100px, 1fr);
    grid-column-gap: 1vw;
    grid-row-gap: 1vw;
    margin-bottom: 3vw;
    @include media(1200px) {
      grid-column-gap: 10px;
      grid-row-gap: 10px;
      grid-template-columns: repeat(2, 1fr);
      margin-bottom: 32px;
    }
  }
  .tab__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 10vh;
    background: #ffffff;
    padding: 3vw;
    @include media(1200px) {
      padding: 16px;
      min-height: 128px;
    }
  }
  .tab__icon {
    height: vw(40px);
    margin-bottom: 1em;
    @include media(1200px) {
      height: 30px;
      margin-bottom: 12px;
    }
  }
  .tab__title {
    font-family: $font-2b;
    font-size: vw(14px);
    line-height: 1.5;
    text-align: center;
    text-transform: uppercase;
    color: #041c30;
    @include media(1200px) {
      font-size: 12px;
      line-height: 1.5;
    }
  }
  .link {
    margin: 0 auto;
  }
}
</style>
