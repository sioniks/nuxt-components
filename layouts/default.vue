<template>
  <div v-scroll="handleScroll" class="page" :class="{ 'is-loaded': load }">
    <!-- <transition name="fade">
      <Preloader v-if="load" />
    </transition> -->
    <div class="wrapper">
      <Header
        :visibility="headerVisibility"
        :show-config="true"
        :anim-delay="10"
      />

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
import Header from '~/components/header/header';
import Footer from '~/components/footer/footer';
import PopupThank from '~/components/ui/popup/popup_thank';
// import Preloader from '~/components/ui/preloader/preloader';

export default {
  components: {
    Header,
    Footer,
    PopupThank
  },
  data() {
    return {
      load: true,
      headerVisibility: {
        value: 0,
        show: true,
        type: ''
      },
      functionScroll: false,
      formSuccess: false
    };
  },
  watch: {
    $route() {
      this.load = true;
      this.hidePreload();
    }
  },
  mounted() {
    // this.hidePreload();

    this.handleScroll();
    this.$nuxt.$on('scrollTop', () => {
      this.functionScroll = true;
    });
    // this.$nuxt.$on('changePaginationPage', () => {
    //   this.gsapTranslate();
    //   this.gsapHeight();
    // });
    // this.$nextTick(() => {
    //   setTimeout(() => {
    //     this.gsapTranslate();
    //     this.gsapHeight();
    //   }, 2600);
    // });

    this.$nuxt.$on('openThankPopup', (e) => {
      this.formSuccess = e.isOpen;
    });
  },
  methods: {
    handleScroll() {
      if (!this.functionScroll) {
        if (window.pageYOffset > 300) {
          if (this.headerVisibility.value < window.pageYOffset) {
            this.headerVisibility.show = false;
          } else {
            this.headerVisibility.show = true;
          }
          this.headerVisibility.type = '';
          this.headerVisibility.value = window.pageYOffset;
        } else {
          this.headerVisibility.show = true;
          this.headerVisibility.type = 'white';
        }
      } else {
        this.headerVisibility.show = false;
        this.functionScroll = false;
      }
    },
    hidePreload() {
      setTimeout(() => {
        this.load = false;
      }, 2600);
    }
  }
};
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
