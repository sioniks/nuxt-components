<template>
  <section
    v-observe-visibility="{
      callback: visibilityChanged,
      once: true,
      threshold: 0.8
    }"
    class="section section__map"
  >
    <div class="container">
      <div class="section-content">
        <div class="gsapLeft">
          <div class="section__header" v-html="block.title"></div>
        </div>
        <div class="subheader gsapLeft">
          <div class="" v-html="block.sub_title"></div>
        </div>
        <div class="map__descr gsapLeft">
          <div class="" v-html="block.text"></div>
          <!-- <a href="" class="link--inline">
            Download   dealership form here</a
          >

          <br />
          <br />

          Send filled form to
          <a href="mailto:distribution@ .eu" class="link--mail"
            >distribution@ .eu</a
          > -->
        </div>
        <div v-if="!isMobile" class="btn-box gsapBottom">
          <Button :btn-text="block.title_btn_dealer" btn-type="red" />
          <Button :btn-text="block.title_btn_service" btn-type="tr" />
        </div>
      </div>
    </div>
    <div class="section__map-block">
      <Map
        class="section__bg gsapOpacity"
        :data-transform="isMobile ? null : 'translate(0, -50%)'"
      />
      <!-- <Dots class="svg-dots" /> -->
      <!-- <transition animate name="go">
        <Dots v-if="animate" class="svg-dots" />
      </transition> -->
      <transition-group name="list" tag="div">
        <Dot
          v-for="(item, index) in items"
          :key="index + 1"
          class="svg-dot"
          :data-index="index"
        />
      </transition-group>
    </div>
  </section>
</template>

<script>
import Button from '~/components/ui/btn/btn';
// import Dots from '~/assets/images/icons/dots-on-map.svg';
import Dot from '~/assets/images/icons/red-map.svg';
import Map from '~/assets/images/icons/map.svg';
export default {
  components: { Button, Dot, Map },
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
      animate: false,
      items: []
    };
  },
  computed: {},
  mounted() {
    const links = document.querySelectorAll('.map__descr a');
    links[0].classList.add('link--inline');
    links[links.length - 1].classList.add('link--mail');
    this.$nextTick(() => this.gsapTranslateMap());
  },
  methods: {
    visibilityChanged(isVisible) {
      this.animate = isVisible;
      if (this.animate) {
        setInterval(() => {
          this.add();
        }, 300);
      }
    },
    add() {
      if (this.items.length < 24) {
        this.items.push(1);
      }
    },
    gsapTranslateMap() {
      Array.from(
        this.$el.querySelectorAll(
          '.gsapOpacity, .gsapTop, .gsapBottom, .gsapLeft, .gsapRight'
        )
      ).forEach((item) => {
        const delay = +item.dataset.delay || 0;
        const duration = +item.dataset.duration || 0.2;
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
.section__map {
  height: vw(721px);
  width: 100%;
  position: relative;
  padding: vw(96px) 0;
  @include media(767px) {
    padding: 56px 0 64px;
    height: auto;
  }
  &-block {
    @include media(767px) {
      position: relative;
      margin: 40px 32px 0 32px;
    }
  }
  .btn {
    min-width: 16vw;
    margin-right: vw(20px);
    padding: 0 vw(38px);
  }
  .section__bg {
    position: absolute;
    z-index: -2;
    right: vw(60px);
    top: 50%;
    height: vw(513px);
    transform: translate(0, -50%);
    width: vw(897px);
    @include media(767px) {
      position: static;
      transform: none;
      width: 100%;
      height: auto;
    }
  }
  .svg-dots {
    position: absolute;
    z-index: -1;
    right: vw(153px);
    height: vw(329px);
    top: 52%;
    transform: translateY(-50%);
    width: vw(646px);
  }
  .svg-dot {
    position: absolute;
    z-index: -1;
    transition: all 0.3s ease;
    transform: translateY(-50%);
    width: vw(16px);
    height: vw(23px);
    fill: $red;
    @include media(767px) {
      width: 6px;
      height: 8px;
      z-index: 2;
    }
    &:nth-child(1) {
      right: vw(772px);
      top: vw(253px);
      width: vw(13px);
      height: vw(18px);
      @include media(767px) {
        left: 18.5%;
        top: 27%;
        width: 5px;
        height: 7px;
      }
    }
    &:nth-child(2) {
      right: vw(785px);
      top: vw(290px);
      @include media(767px) {
        left: 18%;
        top: 37%;
      }
    }
    &:nth-child(3) {
      right: vw(789px);
      top: vw(336px);
      @include media(767px) {
        left: 17%;
        top: 49%;
      }
    }
    &:nth-child(4) {
      right: vw(521px);
      top: vw(272px);
      @include media(767px) {
        left: 47%;
        top: 32.5%;
      }
    }
    &:nth-child(5) {
      right: vw(366px);
      top: vw(284px);
      @include media(767px) {
        left: 65%;
        top: 33%;
      }
    }
    &:nth-child(6) {
      right: vw(268px);
      top: vw(303px);
      @include media(767px) {
        left: 75.5%;
        top: 39%;
      }
    }
    &:nth-child(7) {
      right: vw(435px);
      top: vw(286px);
      @include media(767px) {
        left: 57%;
        top: 34%;
      }
    }
    &:nth-child(8) {
      right: vw(644px);
      top: vw(452px);
      @include media(767px) {
        left: 33%;
        top: 66%;
      }
    }
    &:nth-child(9) {
      right: vw(466px);
      top: vw(436px);
      @include media(767px) {
        left: 53.5%;
        top: 64.5%;
      }
    }
    &:nth-child(10) {
      right: vw(487px);
      top: vw(301px);
      @include media(767px) {
        left: 51%;
        top: 38%;
      }
    }
    &:nth-child(11) {
      right: vw(178px);
      top: vw(495px);
      @include media(767px) {
        left: 85.5%;
        top: 76%;
      }
    }
    &:nth-child(12) {
      right: vw(438px);
      top: vw(317px);
      @include media(767px) {
        left: 56%;
        top: 39%;
      }
    }
    &:nth-child(13) {
      right: vw(677px);
      top: vw(532px);
      @include media(767px) {
        left: 30%;
        top: 78.5%;
      }
    }
    &:nth-child(14) {
      right: vw(442px);
      top: vw(379px);
      @include media(767px) {
        left: 58%;
        top: 55.5%;
      }
    }
    &:nth-child(15) {
      right: vw(491px);
      top: vw(251px);
      @include media(767px) {
        left: 50.5%;
        top: 22.5%;
      }
    }
    &:nth-child(16) {
      right: vw(298px);
      top: vw(214px);
      @include media(767px) {
        left: 72.5%;
        top: 20%;
      }
    }
    &:nth-child(17) {
      right: vw(504px);
      top: vw(385px);
      @include media(767px) {
        left: 49%;
        top: 54.5%;
      }
    }
    &:nth-child(18) {
      right: vw(444px);
      top: vw(238px);
      @include media(767px) {
        left: 51%;
        top: 28.5%;
      }
    }
    &:nth-child(19) {
      right: vw(313px);
      top: vw(360px);
      @include media(767px) {
        left: 70.6%;
        top: 50%;
      }
    }
    &:nth-child(20) {
      right: vw(456px);
      top: vw(206px);
      @include media(767px) {
        left: 54.5%;
        top: 20%;
      }
    }
    &:nth-child(21) {
      right: vw(412px);
      top: vw(345px);
      @include media(767px) {
        left: 59.5%;
        top: 47%;
      }
    }
    &:nth-child(22) {
      right: vw(156px);
      top: vw(308px);
      @include media(767px) {
        left: 88%;
        top: 37%;
      }
    }
    &:nth-child(23) {
      right: vw(694px);
      top: vw(432px);
      @include media(767px) {
        left: 26%;
        top: 64%;
      }
    }
    &:nth-child(24) {
      right: vw(238px);
      top: vw(393px);
      @include media(767px) {
        left: 78.5%;
        top: 53%;
      }
    }
  }
  .section-content {
    width: 45vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @include media(767px) {
      width: 100%;
      text-align: center;
    }
  }
  .section__header {
    color: $red;
    margin-bottom: vw(45px);
    text-align: left;
    text-transform: uppercase;
    @include media(767px) {
      margin-bottom: 22px;
      text-align: center;
    }
  }
  .subheader {
    font-size: vw(31.2px);
    font-family: $font-1b;
    line-height: 1.18;
    text-transform: uppercase;
    color: #0d314f;
    margin-bottom: vw(66px);
    @include media(767px) {
      font-size: 24px;
      margin-bottom: 40px;
    }
  }
  .map__descr {
    font-size: vw(26px);
    line-height: 1.23;
    color: #041c30;
    margin-bottom: vw(60px);
    @include media(767px) {
      margin-bottom: 0;
      font-size: 18px;
      line-height: 1.78;
    }
    .link--inline,
    a {
      font-size: vw(26px);
      line-height: 1.23;
      text-decoration-line: underline;
      color: $red;
      @include media(767px) {
        font-size: 18px;
        line-height: 1.78;
      }
    }
    .link--mail {
      font-size: vw(26px);
      line-height: 1.23;
      color: #919aa1;
      @include media(767px) {
        font-size: 18px;
        line-height: 1.78;
      }
    }
  }

  .go-enter-active,
  .go-leave-active {
    transition: all 1s;
  }
  .go-enter, .go-leave-to /* .list-leave-active до версии 2.1.8 */ {
    opacity: 0;
    transform: translateY(-500px);
  }

  .list-enter-active,
  .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(-300px);
  }
}
</style>
