<template>
  <section v-if="block" class="section section__img">
    <div class="container">
      <div class="section__img-content">
        <div
          class="img-section-header gsapBottomInBanner"
          v-html="block.title"
        ></div>
        <app-link :to="block.link" class="gsapBottomInBanner">
          <Button :btn-text="block.button_text" btn-type="red btn_banner" />
        </app-link>
      </div>
      <div class="section__img-bus">
        <img
          v-if="block.bus_image && block.bus_image.url"
          :src="block.bus_image.url"
          alt=""
          class="bus-img gsapBottomInBanner"
        />
      </div>
    </div>
    <img
      v-if="block.background && block.background.url"
      :src="block.background.url"
      alt=""
      class="img-section-bg gsapBottomInBanner"
    />
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
    delay: {
      type: Number,
      default: null
    }
  },
  mounted() {
    setTimeout(() => {
      this.gsapTranslateBanner();
    }, this.delay || 2600);
    console.log(this.block);
  },
  methods: {
    gsapTranslateBanner() {
      Array.from(document.querySelectorAll('.gsapBottomInBanner')).forEach(
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
    }
  }
};
</script>

<style scoped lang="scss">
.section__img {
  min-height: vw(600px);
  position: relative;
  padding: 50px 0 30px;
  display: flex;
  @include media(767px) {
    height: auto;
    display: flex;
    flex-direction: column;
    padding: 52px 0 70px;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: auto;
    @include media(767px) {
      flex-direction: column;
    }
  }
  &-content {
    width: 40%;
    flex-shrink: 0;
    z-index: 1;
    text-align: left;
    @include media(767px) {
      position: static;
      transform: none;
      width: 100%;
    }
  }
  &-bus {
    width: 60%;
    margin-right: calc(-4vw + 5px);
    @include media(767px) {
      margin: 94px 0 0 0;
      width: 100%;
    }
    img {
      width: 100%;
    }
  }
}
.img-section-bg {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: 50% 50%;
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
}

.img-section-header {
  font-family: $font-2b;
  font-size: vw(48px);
  line-height: 1.33;
  text-transform: uppercase;
  color: #ffffff;
  margin-bottom: 1em;
  @include media(767px) {
    font-size: 30px;
    line-height: 1.27;
    margin-bottom: 48px;
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
  transform: translate(0, -50%);
}
.img__front {
  height: 110%;
  z-index: 3;
}
.img__back {
  height: 80%;
  right: 20%;
  z-index: 2;
}
.gsapBottomInBanner {
  display: inline-block;
  opacity: 0;
  transform: translateY(100px);
  @include media(767px) {
    width: 100%;
  }
}
</style>
