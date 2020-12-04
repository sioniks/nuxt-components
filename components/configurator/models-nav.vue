<template>
  <nav class="models__nav">
    <template v-if="isMobile">
      <div class="models__nav-overlay"></div>
      <div class="models__nav-selected" @click="changeVisibleMenu">
        {{ current.name }} <CarretIcon />
      </div>
    </template>
    <ul class="models__nav-list">
      <li
        v-for="(item, index) in navItems"
        :key="index"
        class="models__nav-item"
      >
        <a
          :href="item.slug"
          class="models__nav-link"
          :class="{ 'models__nav-link--active': index === 0 }"
          @click.prevent="selectNav($event, item)"
        >
          {{ item.name }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import CarretIcon from '~/assets/images/icons/arrow-down.svg';
export default {
  components: { CarretIcon },
  props: {
    navItems: {
      type: Array,
      default: null
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visibleMenu: false,
      current: null
    };
  },
  mounted() {
    this.current = this.navItems[0];
  },
  methods: {
    changeVisibleMenu() {
      this.visibleMenu = !this.visibleMenu;
      const btn = document.querySelector('.models__nav');
      if (this.visibleMenu) {
        btn.classList.add('open');
      } else {
        btn.classList.remove('open');
      }
    },
    selectNav(event, item) {
      if (this.isMobile) {
        this.visibleMenu = false;
        this.current = item;
        const btn = document.querySelector('.models__nav');
        btn.classList.remove('open');
      }
      this.$emit('scroll-to-model', event);
    }
  }
};
</script>
<style lang="scss">
.models {
  &__nav {
    width: 100%;
    border-bottom: 1px solid #ebebeb;
    margin-bottom: vw(56px);
    padding: 0 0 vw(23px) 0;
    &-overlay {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background: rgba(4, 28, 48, 0.85);
      opacity: 0;
      z-index: -1;
      pointer-events: none;
    }
    @include media(767px) {
      position: sticky;
      top: 0;
      margin-bottom: 26px;
      padding: 0;
      border-bottom: none;
      z-index: 10;
    }
    &.fixed {
      @include media(767px) {
        width: calc(100% + 64px);
        margin-left: -32px;
        .models__nav-selected {
          border-top-color: transparent;
          border-left-color: transparent;
          border-right-color: transparent;
        }
      }
    }
    &-selected {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1.2px solid #e9ebed;
      height: 64px;
      padding: 10px 20px;
      font-size: 16px;
      font-family: $font-2b;
      background: #ffffff;
      svg {
        width: 11px;
        height: 5px;
      }
    }
    &-list {
      display: flex;
      justify-content: space-between;
      @include media(767px) {
        position: absolute;
        left: 0;
        top: calc(100% - 1px);
        opacity: 0;
        pointer-events: none;
        width: 100%;
        flex-direction: column;
        background: #ffffff;
        padding: 0 20px;
        transition: opacity 0.3s ease;
      }
    }
    &-item {
      @include media(767px) {
        padding: 22px 0;
        border-bottom: 1px solid #ececec;
        &:last-child {
          border-bottom: none;
        }
      }
    }

    &-link {
      font-size: vw(18px);
      line-height: vw(21px);
      color: $black;
      padding: 0 0 vw(23px) 0;
      cursor: pointer;
      position: relative;
      @include media(767px) {
        padding: 0;
        font-size: 16px;
        line-height: 1.25;
        font-family: $font-1b;
      }
      &--active {
        &:after {
          content: '';
          width: 100%;
          height: vw(4px);
          background-color: $red;
          display: block;
          position: absolute;
          left: 0;
          bottom: 0;
          @include media(767px) {
            display: none;
          }
        }
      }
    }
    &.open {
      z-index: 900;
      .models__nav-overlay {
        opacity: 1;
        pointer-events: auto;
      }
      .models__nav-list {
        opacity: 1;
        pointer-events: auto;
      }
      .models__nav-selected {
        color: $red;
        border-bottom-color: transparent;
      }
      svg {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
