<template>
  <div class="page__wr">
    <Lines v-if="!isMobile" />
    <TopSection :title="title" :text="text" :tabs="false" />
    <component
      :is="block.component_name | componentValidName"
      v-for="(block, index) in componentsList"
      :key="`component_${index}`"
      :block="block"
      :type="block.component_name"
      :is-mobile="isMobile"
    ></component>
  </div>
</template>

<script>
import TopSection from '~/components/dealers/top-section';
import BecomeDealer from '~/components/dealers/become-list';
import Cards from '~/components/provide/provide';
import Lines from '~/components/ui/lines/lines';
export default {
  components: {
    TopSection,
    BecomeDealer,
    Cards,
    Lines
  },
  async asyncData({ $axios, $config: { baseAPI } }) {
    const [contentRes, itemsRes] = await Promise.all([
      $axios.get(`${baseAPI}/become_partner`),
      $axios.get(`${baseAPI}/become_partner/components`)
    ]);

    return {
      title: contentRes.data.title,
      text: contentRes.data.extra.description,
      componentsList: itemsRes.data.become_partner
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
      this.gsapHeight();
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
        document.querySelectorAll('.gsapTop, .gsapBottom, .gsapLeft, gsapRight')
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
    },
    gsapHeight() {
      Array.from(document.querySelectorAll('.gsapHeight')).forEach((item) => {
        const delay = +item.dataset.delay || 0;
        const duration = +item.dataset.duration || 0.8;
        const hook = item.dataset.hook || 1;
        const scene2 = this.$scrollmagic
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
        this.$scrollmagic.addScene(scene2);
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
</style>
