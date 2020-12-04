<template>
  <nav class="configurator__nav">
    <ul class="configurator__nav-list">
      <li
        v-for="(item, index) in navItems"
        :key="index"
        ref="nav-item"
        class="configurator__nav-item"
        :class="{
          'configurator__nav-item--current': item.slug === currentStep
        }"
      >
        <a class="configurator__nav-link" @click.prevent="goToStep(item.to)">
          <template v-if="isMobile">{{ index + 1 }}</template>
          <template v-else>{{ item.title }}</template>
        </a>
        <ArrowRight v-if="!isMobile" />
        <span v-else></span>
      </li>
    </ul>
  </nav>
</template>

<script>
import ArrowRight from '~/assets/images/icons/arrow-right-small.svg';
export default {
  components: {
    ArrowRight
  },
  props: {
    navItems: {
      type: Array,
      default: null
    },
    currentStep: {
      type: String,
      default: null
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    currentStep: {
      handler: 'initNav',
      immediate: true
    }
  },
  methods: {
    initNav() {
      this.$nextTick(() => {
        if (typeof window !== 'undefined') {
          const currentLink = document.querySelector(
            '.configurator__nav-item--current'
          );
          const prev = this.getPrevSiblings(currentLink);
          const next = this.getNextSiblings(currentLink);
          prev.forEach((element) => {
            element.classList.add('configurator__nav-item--prev');
          });
          next.forEach((element) => {
            element.classList.add('configurator__nav-item--next');
          });
        }
      });
    },
    goToStep(to) {
      if (to) {
        this.$router.push(to);
      }
    },
    getNextSiblings(el) {
      const siblings = [];
      while ((el = el.nextElementSibling)) {
        siblings.push(el);
      }
      return siblings;
    },
    getPrevSiblings(el) {
      const siblings = [];
      while ((el = el.previousElementSibling)) {
        siblings.push(el);
      }
      return siblings;
    }
  }
};
</script>
<style lang="scss">
.configurator {
  &__nav {
    padding: vw(32px, 1920px) 0 vw(23px, 1920px);
    border-bottom: 1px solid #ebebeb;
    margin-bottom: vw(56px, 1920px);
    @include media(1440px) {
      padding: vw(32px) 0 vw(23px);
      border-bottom: 1px solid #ebebeb;
      margin-bottom: vw(56px);
    }
    @include media(767px) {
      padding: 24px 0;
      border: none;
      margin-bottom: 8px;
    }
    &-list {
      display: flex;
      justify-content: space-between;
    }

    &-item {
      position: relative;
      @include media(767px) {
        padding: 0 11px 0 0;
        width: 100%;
        display: flex;
        align-items: center;
        &:last-child {
          margin-right: 0;
          padding-right: 0;
          width: 31px;
          span {
            display: none;
          }
        }
        span {
          width: 100%;
          height: 1px;
          margin: 0 2px;
          background: #e9ebed;
        }
      }
      &:not(:last-child) {
        padding-right: vw(100px, 1920px);
        @include media(1440px) {
          padding-right: vw(67px);
        }
        @include media(767px) {
          padding: 0;
        }
      }

      &:last-child {
        svg {
          display: none;
        }
      }

      &--prev {
        a {
          color: $red;
        }
        &:hover {
          a {
            color: $black;
          }
        }

        svg path {
          fill: $red;
        }
        span {
          @include media(767px) {
            background-color: $red;
          }
        }
        .configurator__nav-link {
          @include media(767px) {
            color: #ffffff;
            border-color: $red;
            background-color: $red;
          }
        }
      }

      &--current {
        .configurator__nav-link {
          color: $black;
          @include media(767px) {
            color: $red;
            border-color: $red;
          }
          &:after {
            content: '';
            width: 100%;
            height: vw(4px, 1920px);
            background-color: $red;
            display: block;
            position: absolute;
            left: 0;
            bottom: 0;
            @include media(1440px) {
              height: 4px;
            }
            @include media(767px) {
              display: none;
            }
          }
        }

        svg path {
          fill: $gray;
        }
      }

      &--next {
        pointer-events: none;
        a {
          color: $gray;
        }

        svg path {
          fill: $gray;
        }
      }

      svg {
        width: vw(5px, 1920px);
        height: vw(10px, 1920px);
        top: 50%;
        transform: translateY(-50%);
        position: absolute;
        right: 0;
        @include media(1440px) {
          width: vw(5px);
          height: vw(10px);
        }
      }
    }

    &-link {
      position: relative;
      font-size: vw(18px, 1920px);
      line-height: vw(21px, 1920px);
      padding-bottom: vw(23px, 1920px);
      @include media(1440px) {
        font-size: vw(18px);
        line-height: vw(21px);
        padding-bottom: vw(23px);
      }
      transition: color 0.5s ease;
      @include media(767px) {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        line-height: 1.17;
        padding: 0;
        flex-shrink: 0;
        width: 31px;
        height: 31px;
        border-radius: 50%;
        border: 1px solid #e9ebed;
        color: #919aa1;
      }
    }
  }
}
</style>
