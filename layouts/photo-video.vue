<template>
  <div v-scroll="handleScroll" class="page" :class="{ 'is-loaded': load }">
    <div class="wrapper">
      <Header
        :visibility="headerVisibility"
        :show-config="true"
        :anim-delay="10"
      />

      <main>
        <nuxt />
      </main>
    </div>
  </div>
</template>
<script>
import Header from '~/components/header/header';

export default {
  components: {
    Header
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
      isMobile: false,
      mobileWidth: 768
    };
  },
  watch: {
    $route() {
      this.load = true;
      this.hidePreload();
    }
  },
  mounted() {
    this.handleScroll();
    this.onResize();
    window.addEventListener('resize', this.onResize);
    this.$nuxt.$on('scrollTop', () => {
      this.functionScroll = true;
    });
  },
  destroyed() {
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
    handleScroll() {
      if (!this.functionScroll) {
        if (this.isMobile) {
          const btn = document.querySelector('.gallery-pin-btn');
          if (btn.getBoundingClientRect().top === 0) {
            this.headerVisibility.show = false;
            btn.classList.add('fixed');
          } else {
            this.headerVisibility.show = true;
            btn.classList.remove('fixed');
          }
        } else if (window.pageYOffset > 300) {
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
