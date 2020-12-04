<template>
  <div
    v-scroll="handleScroll"
    class="home-page page"
    :class="{ 'is-loaded': load }"
  >
    <transition name="fade">
      <Preloader v-if="load" />
    </transition>
    <div class="wrapper">
      <Header :visibility="headerVisibility" />
      <main>
        <nuxt />
      </main>
      <Footer />
    </div>
    <transition name="fade">
      <PopupThank v-if="formSuccess" />
    </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import Header from '~/components/header/header';
import Footer from '~/components/footer/footer';
import Preloader from '~/components/ui/preloader/preloader';
import PopupThank from '~/components/ui/popup/popup_thank';

export default {
  components: {
    Header,
    Footer,
    Preloader,
    PopupThank
  },
  middleware: ['locale'],
  data() {
    return {
      load: true,
      headerVisibility: {
        value: 0,
        show: true,
        type: 'tr'
      },
      formSuccess: false
    };
  },
  computed: {
    ...mapState(['language'])
  },
  mounted() {
    this.hidePreload();
    // this.$nextTick(() => this.gsapTranslate());
    this.$nuxt.$on('openThankPopup', (e) => {
      this.formSuccess = e.isOpen;
    });
  },
  methods: {
    hidePreload() {
      setTimeout(() => {
        this.load = false;
      }, 2600);
    },
    handleScroll() {
      console.log('----', document.body.style.height);
      this.$nuxt.$emit('close-all-tooltips');
      if (window.pageYOffset > 20 && window.pageYOffset <= 1000) {
        this.headerVisibility.show = false;
      } else if (window.pageYOffset > 1000) {
        if (this.headerVisibility.value < window.pageYOffset) {
          this.headerVisibility.show = false;
        } else {
          this.headerVisibility.show = true;
        }
        this.headerVisibility.type = 'white';
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
