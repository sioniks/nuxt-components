<template>
  <div
    v-scroll="handleScroll"
    class="home-page page"
    :class="{ 'is-loaded': load }"
  >
    <main>
      <nuxt />
    </main>
    <!-- <transition name="fade">
      <Preloader v-if="load" />
    </transition> -->
    <!-- <div class="wrapper">
      <Header :visibility="headerVisibility" />
      <main>
        <nuxt />
      </main>
      <Footer />
    </div> -->
  </div>
</template>
<script>
import { mapState } from 'vuex';
// import Header from '~/components/header/header';
// import Footer from '~/components/footer/footer';
// import Preloader from '~/components/ui/preloader/preloader';

export default {
  components: {
    // Header,
    // Footer,
    // Preloader
  },
  middleware: ['locale'],
  data() {
    return {
      load: true,
      headerVisibility: {
        value: 0,
        show: true,
        type: 'tr'
      }
    };
  },
  computed: {
    ...mapState(['language'])
  },
  mounted() {
    this.hidePreload();
    this.$nextTick(() => this.gsapTranslate());
  },
  methods: {
    hidePreload() {
      setTimeout(() => {
        this.load = false;
      }, 2600);
    },
    gsapTranslate() {
      Array.from(
        document.querySelectorAll(
          '.gsapTop, .gsapBottom, .gsapLeft, .gsapRight'
        )
      ).forEach((item) => {
        const delay = +item.dataset.delay || 0;
        const duration = +item.dataset.duration || 0.8;
        const hook = +item.dataset.hook || 0.6;
        const transform = item.dataset.transform || 'translate(0, 0)';
        const scene = this.$scrollmagic
          .scene({
            triggerElement: item,
            triggerHook: hook,
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
        this.$scrollmagic.addScene(scene);
      });
    },
    handleScroll() {
      if (window.pageYOffset > 20 && window.pageYOffset <= 1000) {
        this.headerVisibility.show = false;
      } else if (window.pageYOffset > 1000) {
        if (this.headerVisibility.value < window.pageYOffset) {
          this.headerVisibility.show = false;
        } else {
          this.headerVisibility.show = true;
        }
        this.headerVisibility.type = '';
        this.headerVisibility.value = window.pageYOffset;
      } else {
        this.headerVisibility.show = true;
        this.headerVisibility.type = 'tr';
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.page.is-loaded {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  pointer-events: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
