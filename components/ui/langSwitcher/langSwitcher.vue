<template>
  <div class="language-switcher" @click="isOpen = !isOpen">
    <div class="languages-label">
      {{ currentLanguage.iso3 }}
      <CarretIcon v-if="!isOpen" class="carret-icon" />
    </div>
    <transition name="fade2">
      <div v-if="isOpen" class="languages">
        <a
          v-for="el in languages"
          :key="el.code"
          :href="el.href"
          class="language"
          @click="setCookieLocale(el)"
        >
          <span>{{ el.iso3 }}</span>
        </a>
      </div>
    </transition>
  </div>
</template>

<script>
import CarretIcon from '~/assets/images/icons/arrow-down.svg';

export default {
  components: { CarretIcon },
  props: {
    item: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      isOpen: false
    };
  },
  computed: {
    languages() {
      return this.$store.state.languages.items.map((lang) => {
        const { href } = this.$router.resolve({
          params: { ...this.$route.params, language: lang.code },
          query: this.$route.query
        });
        return {
          ...lang,
          href
        };
      });
    },
    currentLanguage() {
      return this.$store.getters.language;
    }
  },
  mounted() {
    setTimeout(() => {
      document.addEventListener('click', this.clickOutside);
    }, 0);
    // this.$nuxt.$on('close-all-tooltips', () => {
    //   !this.isOpen ? (this.isOpen = true) : (this.isOpen = false);
    // });
  },
  beforeDestroy() {
    document.removeEventListener('click', this.clickOutside);
  },
  methods: {
    setCookieLocale({ code }) {
      this.$cookies.set('locale', code, { maxAge: 60 * 60 * 24 });
    },
    tooltipHandler() {
      this.$nuxt.$emit('close-all-tooltips');
      // this.isOpen = !this.isOpen;
    },
    clickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
      }
    }
  }
};
</script>

<style lang="scss">
.language-switcher {
  .carret-icon {
    // fill: #ffffff;
    pointer-events: none;
    width: vw(11px);
    height: vw(6px);
    right: 10%;
    position: absolute;
    display: block;
    top: 48%;
    transform: translateY(-50%);
    @include media(1200px) {
      width: 10px;
      height: 5px;
      right: 0;
    }
  }
}
.languages {
  position: absolute;
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  font-size: vw(14px);
  line-height: 1.14;
  text-align: right;
  color: #041c30;
  background: #ffffff;
  border: 1px solid #ebebeb;
  top: vw(-15px);
  right: vw(7px);
  padding: vw(15px) vw(19px);
  transition: all 0.7s ease;
  @include media(1200px) {
    top: 0;
    right: 0;
    font-size: 14px;
    padding: 10px;
  }
  .language {
    padding: 8px 0;
    position: relative;
    transition: all 0.3s ease;
    &:hover {
      color: $red;
    }
    &.active {
      display: none;
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 1px;
      width: 100%;
      background: #ebebeb;
    }
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 1px;
      width: 100%;
      background: #ebebeb;
    }
    &:first-child {
      padding-top: 0;
      &:before {
        display: none;
      }
    }
    &:last-child {
      padding-bottom: 0;
      &:after {
        display: none;
      }
    }
  }
}

.fade2-leave-active,
.fade2-enter-active {
  transition: all 0.7s ease;
}
.fade2-leave,
.fade2-enter-to {
  opacity: 1;
  transform: translate(0, 0);
}
.fade2-enter,
.fade2-leave-to {
  opacity: 0;
  transform: translate(0, -50%);
}
</style>
