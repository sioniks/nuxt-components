<template>
  <div class="page__wr">
    <Lines v-if="!isMobile" />
    <section class="section buying">
      <div class="container">
        <h1 class="buying-title section__header gsapLeftTitle">{{ title }}</h1>
      </div>
    </section>
    <component
      :is="block.component_name | componentValidName"
      v-for="(block, index) in componentsList"
      :key="`component_${index}`"
      :block="block"
      :is-mobile="isMobile"
      :type="block.component_name"
    ></component>
  </div>
</template>

<script>
import Banner from '~/components/bunners/bg-img-banner.vue';
import Cards from '~/components/buying/buying-cards.vue';
import Lines from '~/components/ui/lines/lines';
export default {
  components: {
    Banner,
    Lines,
    Cards
  },
  async asyncData({ $axios, $config: { baseAPI } }) {
    const [contentRes, componentsRes] = await Promise.all([
      $axios.get(`${baseAPI}/buying_option`),
      $axios.get(`${baseAPI}/buying_option/components`)
    ]);
    return {
      title: contentRes.data.title,
      componentsList: componentsRes.data.buying_option
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
    gsapTranslate() {
      Array.from(document.querySelectorAll('.gsapLeftTitle')).forEach(
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
    onResize(event) {
      if (event) {
        this.isMobile = this.mobileWidth > event.target.innerWidth;
      } else {
        this.isMobile = this.mobileWidth > window.innerWidth;
      }
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
.buying {
  padding: vw(65px) 0 vw(64px);
  @include media(767px) {
    padding: 48px 0 32px;
  }
  &-title {
    text-align: left;
    text-transform: uppercase;
  }
}
.gsapLeftTitle {
  opacity: 0;
  transform: translateX(100px);
}
</style>
