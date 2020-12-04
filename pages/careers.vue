<template>
  <div class="page__wr">
    <Lines v-if="!isMobile" />
    <section class="section careers">
      <div class="container">
        <h2 class="careers-title section__header gsapLeftTitle">{{ title }}</h2>
        <div
          class="careers-description gsapBottomDescription"
          v-html="description"
        ></div>
      </div>
    </section>
    <Accordion :vacancies="vacancies" />
  </div>
</template>

<script>
import Lines from '~/components/ui/lines/lines';
import Accordion from '~/components/careers-accordion/accordion';
export default {
  components: {
    Lines,
    Accordion
  },
  async asyncData({ $axios, $config: { baseAPI } }) {
    const response = await $axios.$get(`${baseAPI}/careers`);
    return {
      title: response.title,
      description: response.extra.description,
      vacancies: response.vacancies.map((item) => {
        return {
          ...item,
          open: false
        };
      })
    };
  },
  data() {
    return {
      isMobile: false,
      mobileWidth: 768
    };
  },
  mounted() {
    setTimeout(() => {
      this.gsapTranslate();
    }, 500);
    this.onResize();
    window.addEventListener('resize', this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize(event) {
      if (event) {
        this.isMobile = this.mobileWidth > event.target.innerWidth;
      } else {
        this.isMobile = this.mobileWidth > window.innerWidth;
      }
    },
    gsapTranslate() {
      Array.from(
        document.querySelectorAll('.gsapLeftTitle, .gsapBottomDescription')
      ).forEach((item) => {
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
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.page__wr {
  padding-top: 90px;
  overflow: hidden;
  position: relative;
  @include media(767px) {
    padding-top: 80px;
  }
}
.careers {
  padding: vw(65px) 0 vw(40px);
  position: relative;
  @include media(767px) {
    padding: 48px 0;
  }
  &-title {
    text-transform: uppercase;
    text-align: left;
    margin-bottom: vw(20px);
    @include media(767px) {
      margin-bottom: 8px;
    }
  }
  &-description {
    font-size: vw(24px);
    line-height: 1.3;
    @include media(767px) {
      font-size: 18px;
      line-height: 1.44;
    }
  }
}
.gsapLeftTitle {
  opacity: 0;
  transform: translateX(-100px);
}
.gsapBottomDescription {
  opacity: 0;
  transform: translateY(100px);
}
</style>
