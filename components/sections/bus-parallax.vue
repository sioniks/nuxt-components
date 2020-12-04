<template>
  <section class="section start-section">
    <div class="section__header" v-html="block.title"></div>

    <picture>
      <source
        :srcset="block.main_images[0].conversions.original_webp"
        type="image/webp"
      />

      <source
        :srcset="block.main_images[0].conversions.medium"
        media="(max-width: 1200px)"
      />

      <img
        :srcset="block.main_images[0].url"
        :alt="block.main_images[0].custom_properties.seo_alt"
        class="bg"
        :class="{ toleft: toLeft }"
      />
    </picture>
    <div class="hover__box" :class="{ toleft: toLeft }">
      <div
        class="hover__side hover__side--left"
        :class="{ active: !toLeft }"
        :data-bus="'pr'"
        @click="setActiveBus"
        @mousemove="showLink"
        @mouseleave="hideLink"
      >
        <div v-if="!toLeft && !isTablet" class="info__link">
          <span class="info__link-icon">
            <IconEye />
          </span>
          <span class="info__link-text">View this model</span>
        </div>
        <div class="hover__box-title" :class="{ active: !toLeft }"></div>
      </div>
      <div
        class="hover__side hover__side--right"
        :data-bus="'tr'"
        :class="{ active: toLeft }"
        @click="setActiveBus"
        @mousemove="showLink"
        @mouseleave="hideLink"
      >
        <div v-if="toLeft && !isTablet" class="info__link">
          <span class="info__link-icon">
            <IconEye />
          </span>
          <span class="info__link-text">View this model</span>
        </div>
        <div class="hover__box-title" :class="{ active: toLeft }"></div>
      </div>
    </div>
    <Button v-if="isMobile" btn-type="red" btn-text="View Buses" />
    <ScrollBtn class="scroll-box" @click.native="scrollDown" />
  </section>
</template>

<script>
import { TimelineMax } from 'gsap';

import ScrollBtn from '~/components/ui/scroll-down/scroll-down';
import IconEye from '~/assets/images/icons/eye-icon.svg';
import Button from '~/components/ui/btn/btn';

export default {
  name: 'BusesHome',
  components: {
    ScrollBtn,
    IconEye,
    Button
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
      activeBus: 'pr'
    };
  },

  computed: {
    toLeft() {
      return this.activeBus === 'tr';
    },
    winWid() {
      return window.innerWidth / 2 - 100;
    }
  },
  mounted() {
    this.startAnimation();
  },

  methods: {
    setActiveBus(event) {
      const dataBus = event.target.getAttribute('data-bus');
      if (this.activeBus !== dataBus) {
        this.activeBus = dataBus;
      } else {
        const id = dataBus === 'pr' ? ' ' : ' ';
        this.$nextTick(() =>
          document.getElementById(id).scrollIntoView({
            behavior: 'smooth'
          })
        );
      }
    },
    showLink(ev) {
      const link = ev.target.querySelector('.info__link');
      if (link) {
        link.style.transform = `translateX(${
          ev.offsetX - 32 + 'px'
        }) translateY(${ev.offsetY - 32 + 'px'})`;
        // link.style.left = ev.offsetX + 'px';
        // link.style.top = ev.offsetY + 'px';

        link.style.opacity = 1;
      }
    },
    hideLink(ev) {
      const link = ev.target.querySelector('.info__link');
      if (link) {
        link.style.opacity = 0;
      }
    },
    scrollDown() {
      window.scrollTo({
        top: this.winWid,
        left: 0,
        behavior: 'smooth'
      });
    },
    startAnimation() {
      const tl = new TimelineMax({ delay: 3 });

      tl.to('.section__header', { transform: 'translateX(0)', opacity: 1 });
      tl.to('.hover__side--right', {
        transform: 'translateX(0)',
        opacity: 1
      });
      tl.to('.hover__side--left', {
        transform: 'translateX(0)',
        opacity: 1
      });
      tl.to('.scroll-box', { transform: 'translateX(0)', opacity: 1 });

      // const scene = this.$scrollmagic
      //   .scene({
      //     triggerElement: '.section',
      //     triggerHook: 0,
      //     duration: '100%'
      //   })
      //   .setTween(tl);

      // this.$scrollmagic.addScene(scene);
    }
  }
};
</script>
<style lang="scss" scoped>
.start-section {
  height: 50vw;
  width: 100vw;
  background: #cccccc;
  position: relative;
  overflow: hidden;
  @include media(1200px) {
    height: 500px;
  }
  @include media(767px) {
    height: 612px;
  }
  .scroll-btn {
    bottom: 5.3vw;
    left: 2.5%;
    @include media(1200px) {
      display: none;
    }
  }
}

.bg {
  position: absolute;
  left: 0;
  bottom: -1vw;
  width: 127%;
  transition: transform 0.5s ease;
  @include media(767px) {
    width: auto;
    height: 100%;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  }
  &.toleft {
    transform: translateX(-25%) scale(1.2);
    @include media(767px) {
      transform: translateX(-60%) scale(1);
    }
  }
}

.section__header {
  width: 70%;
  position: relative;
  transform: translateY(100px);
  opacity: 0;
  margin: vw(120px) auto 0;
  color: #ffffff;
  line-height: 1.33;
  text-transform: uppercase;
  @include media(1200px) {
    font-size: 32px;
    line-height: 1.1;
    margin-top: 88px;
  }
  @include media(767px) {
    width: 100%;
    padding: 0 32px;
    text-align: left;
  }
}
.hover__box {
  position: absolute;
  bottom: 4vw;
  left: 5vw;
  width: 120%;
  transition: transform 0.5s ease;
  display: flex;
  align-items: flex-end;
  height: 30vw;
  @include media(767px) {
    bottom: 110px;
    left: 0;
    padding: 0 32px;
    height: auto;
    width: 100%;
  }
  &.toleft {
    transform: translateX(-25%) scale(1.15);
    @include media(767px) {
      transform: translateX(0) scale(1);
    }
    .hover__side--left {
      cursor: pointer;
    }
    .hover__side--right {
      cursor: none;
    }
    .hover__side--left .hover__box-title,
    .hover__side--right .hover__box-title {
      @include media(767px) {
        transform: translateX(-35vw) scale(1);
      }
    }
  }
  .hover__side--left {
    cursor: none;
  }
  .hover__side--right {
    cursor: pointer;
  }
  &-title {
    font-family: $font-3;
    font-weight: 800;
    font-size: vw(32px);
    line-height: 2;
    text-align: center;
    text-transform: uppercase;
    color: #ffffff;
    position: absolute;
    bottom: 0;
    opacity: 0.5;
    transition: opacity 0.5s ease, transform 0.5s ease;
    pointer-events: none;
    @include media(1200px) {
      font-size: 16px;
    }
    @include media(767px) {
      position: static;
    }
    &.active {
      opacity: 1;
    }
  }
}
.hover__side {
  width: 44%;
  height: 100%;
  position: relative;
  @include media(767px) {
    width: 50%;
  }
  &--left {
    transform: translateY(100px);
    left: 7%;
    opacity: 0;
    @include media(767px) {
      left: 0;
      width: 50%;
      padding-bottom: 30px;
      &:after {
        content: '';
        width: 64px;
        height: 2px;
        position: absolute;
        bottom: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.5);
        transition: background-color 0.3s ease;
      }
      &.active {
        &:after {
          background-color: #ffffff;
        }
      }
    }
    .hover__box-title {
      transform: translateX(90%) scale(0.9);
      @include media(767px) {
        transform: none;
      }
      &.active {
        transform: translateX(85%) scale(0.9);
        @include media(767px) {
          transform: none;
        }
      }
    }
  }
  &--right {
    transform: translateY(100px);
    left: 12%;
    opacity: 0;
    height: 80%;
    width: 30%;
    @include media(767px) {
      left: 0;
      width: 50%;
      height: auto;
      padding-bottom: 30px;
      padding-left: 64px;
      &:after {
        content: '';
        width: 64px;
        height: 2px;
        position: absolute;
        bottom: 0;
        left: 0;
        background: rgba(255, 255, 255, 0.5);
        transition: background-color 0.3s ease;
      }
      &.active {
        &:after {
          background-color: #ffffff;
        }
      }
    }
    .hover__box-title {
      transform: translateX(-7%) scale(0.9);
      &.active {
        transform: translateX(25%) scale(0.9);
      }
    }
  }
}

.info__link {
  // margin: 20px;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  line-height: 1;
  color: #ffffff;
  transition: color 0.2s ease-out, transform 0.2s ease-out;
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  padding: 2px;
  @include media(767px) {
    position: static;
  }
}
.info__link-icon {
  position: relative;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ffffff;
  border-radius: 50%;
  overflow: visible;
  // .border {
  //   position: absolute;
  // }
}
.info__link-text {
  position: relative;
  top: 3px;
  left: -14px;
}
.scroll-box {
  transform: translateX(-100px);
  opacity: 0;
}
</style>
<style lang="scss">
.start-section {
  .btn {
    @include media(767px) {
      position: absolute;
      width: calc(100% - 64px);
      left: 32px;
      bottom: 30px;
      height: 56px;
      line-height: 56px;
      font-size: 16px;
    }
  }
}
</style>
