<template>
  <transition name="translate">
    <header
      v-if="headVisibility.show"
      ref="header"
      class="header"
      @mouseenter="showRegion()"
      @mouseleave="showRegion()"
    >
      <div
        class="header__navbar"
        :class="[!openMenu ? headVisibility.type : '']"
      >
        <div class="container">
          <app-link
            ref="logo"
            exact
            active-class="menu__link--active"
            no-prefetch
            to="/"
            class="header__logo"
            :class="{ 'is-animate': isAnimate }"
            ><Logo />
          </app-link>
          <nav class="header__menu-wr">
            <ul v-if="!isTablet" class="menu">
              <ModelSwitcher
                ref="model"
                class="menu__item"
                :class="{ 'is-animate': isAnimate }"
              />
              <li
                v-for="item in visibleMenu"
                :key="item.id"
                :ref="'item' + item.id"
                class="menu__item"
                :class="{ 'is-animate': isAnimate }"
              >
                <app-link
                  :to="item.url"
                  active-class="menu__link--active"
                  class="menu__link"
                  :target="item.target"
                >
                  {{ item.title }}
                </app-link>
              </li>
              <li
                v-if="hiddenMenu.length"
                ref="more"
                class="menu__item menu__item--dot"
                :class="{ 'is-animate': isAnimate }"
                @mouseenter="submenu.isOpen = true"
                @mouseleave="submenu.isOpen = false"
              >
                <DotsIcon class="dots-icon" />
                <transition name="fade-tr">
                  <ul v-if="submenu.isOpen" class="submenu">
                    <li
                      v-for="item in hiddenMenu"
                      :key="item.id"
                      class="menu__item"
                      @click="submenu.isOpen = false"
                    >
                      <app-link
                        :to="item.url"
                        active-class="menu__link--active"
                        class="menu__link"
                        :target="item.target"
                      >
                        {{ item.title }}
                      </app-link>
                    </li>
                  </ul>
                </transition>
              </li>
            </ul>
            <Button
              v-if="showConfig & !isTablet"
              ref="config"
              btn-text="Configure  "
              btn-type="tr"
              :class="{ 'is-animate': isAnimate }"
              @click.native="goToConfigurator"
            ></Button>
            <div class="setings">
              <div
                v-if="!isTablet"
                ref="find"
                class="menu__item"
                :class="{ 'is-animate': isAnimate }"
              >
                <app-link
                  to=""
                  active-class="menu__link--active"
                  class="menu__link"
                >
                  <FindIcon class="find-icon" />
                  Find dealers</app-link
                >
              </div>
              <!-- <div
                ref="reg"
                class="menu__item"
                :class="{ 'is-animate': isAnimate }"
              >
                Region
                <CarretIcon class="carret-icon" />
              </div> -->
              <RegionSwitcher
                v-if="!isTablet"
                ref="reg"
                class="menu__item"
                :class="{ 'is-animate': isAnimate }"
              />
              <LanguageSwitcher
                ref="lang"
                class="menu__item"
                :class="{ 'is-animate': isAnimate }"
              />
              <div v-if="isTablet" class="menu-btn" @click="openMenuEvent">
                <MenuIcon />
              </div>
            </div>
          </nav>
        </div>
      </div>
      <transition name="fade">
        <div v-if="isTablet && openMenu" class="mobile-head">
          <perfect-scrollbar>
            <ul class="mobile-head-list">
              <li
                v-for="(item, index) in mobileMenu"
                :key="index"
                class="mobile-head-item"
                :class="[
                  'models' in item ? 'models' : '',
                  'children' in item
                    ? item.children.length > 0
                      ? 'children'
                      : ''
                    : '',
                  subMenuIndex === index ? 'open' : '',
                  subMenuIndex - 1 === index ? 'before-open' : ''
                ]"
              >
                <div
                  class="mobile-head-title"
                  @click="openSubMenu(item, index)"
                >
                  {{ item.name }}
                  <IconArrow
                    v-if="
                      'models' in item ||
                      ('children' in item && item.children.length > 0)
                    "
                  />
                </div>
                <ul v-show="subMenuIndex === index" class="mobile-head-sublist">
                  <template v-if="'models' in item">
                    <span class="mobile-head-model">
                      <img
                        class="model__img"
                        :src="item.menu_image.url || ''"
                        :alt="item.menu_image.custom_properties.seo_alt || ''"
                      />
                      <a href="/">
                        {{ item.menu_button_title || '' }}
                        <ArrowIcon />
                      </a>
                    </span>
                    <li
                      v-for="model in item.models"
                      :key="model.id"
                      class="mobile-head-subitem"
                    >
                      <span class="mobile-head-img">
                        <img
                          :src="model.menu_image ? model.menu_image.url : ''"
                          :alt="
                            model.menu_image
                              ? model.menu_image.custom_properties.seo_alt
                              : ''
                          "
                        />
                      </span>
                      {{ model.name }}
                    </li>
                  </template>
                  <template v-if="'children' in item">
                    <li
                      v-for="children in item.children"
                      :key="children.id"
                      class="mobile-head-subitem"
                      @click="openMenuEvent"
                    >
                      <app-link class="st-link" :to="children.url">
                        {{ children.title }}
                      </app-link>
                    </li>
                  </template>
                </ul>
              </li>
              <li
                class="mobile-head-item children"
                :class="[subMenuIndex === mobileMenu.length ? 'open' : '']"
              >
                <div
                  class="mobile-head-title"
                  @click="openSubMenu('region', mobileMenu.length)"
                >
                  Region
                  <IconArrow />
                  <div v-if="activeRegion" class="active__region">
                    {{ activeRegion.name }}
                  </div>
                </div>
                <div
                  v-show="subMenuIndex === mobileMenu.length"
                  class="mobile-head-sublist"
                >
                  <div v-if="regions.length > 9" class="input__wr">
                    <input
                      v-model="search"
                      type="text"
                      class="regions__search"
                      placeholder="Search your country or region"
                      @click.prevent
                    />
                    <SearchIcon class="search-icon" />
                  </div>
                  <div v-if="search.length" class="regions__list">
                    <a
                      v-for="el in filteredRegions"
                      :key="el.id"
                      class="region"
                      :href="el.href"
                      @click="setCookieRegion(el)"
                    >
                      <country-flag
                        v-if="el.iso"
                        :country="el.iso"
                        size="normal"
                        class="country-flag"
                      />
                      <div v-else class="country-flag country-flag--empty" />
                      <span class="country-name">{{ el.name }}</span>
                    </a>
                    <div
                      v-if="search.length && !filteredRegions.length"
                      class="empty-filter"
                    >
                      No results were found for your search.
                    </div>
                  </div>
                  <div v-else class="regions__list">
                    <a
                      v-for="el in regions"
                      :key="el.id"
                      class="region"
                      :href="el.href"
                      @click="setCookieRegion(el)"
                    >
                      <country-flag
                        v-if="el.iso"
                        :country="el.iso"
                        size="normal"
                        class="country-flag"
                      />
                      <div v-else class="country-flag country-flag--empty" />
                      <span class="country-name">{{ el.name }}</span>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </perfect-scrollbar>
        </div>
      </transition>
    </header>
  </transition>
</template>

<script>
import { gsap } from 'gsap';
import { mapState } from 'vuex';
import Logo from '~/assets/images/icons/ -logo.svg';
import FindIcon from '~/assets/images/icons/find.svg';
import Button from '~/components/ui/btn/btn';
import DotsIcon from '~/assets/images/icons/dots-menu.svg';
import MenuIcon from '~/assets/images/icons/menu.svg';
import IconArrow from '~/assets/images/icons/arrow-top.svg';
import ArrowIcon from '~/assets/images/icons/right-arr.svg';
import SearchIcon from '~/assets/images/icons/search-icon.svg';
import LanguageSwitcher from '~/components/ui/langSwitcher/langSwitcher';
import RegionSwitcher from '~/components/ui/regionSwitcher/regionSwitcher';
import ModelSwitcher from '~/components/ui/modelSwitcher/modelSwitcher';

export default {
  components: {
    Logo,
    FindIcon,
    Button,
    DotsIcon,
    LanguageSwitcher,
    RegionSwitcher,
    ModelSwitcher,
    MenuIcon,
    IconArrow,
    ArrowIcon,
    SearchIcon
  },
  props: {
    visibility: {
      type: Object,
      default: null
    },
    showConfig: {
      type: Boolean,
      default: false
    },
    animDelay: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      submenu: {
        isOpen: false
      },
      isAnimate: true,
      regionVisibility: false,
      isTablet: false,
      tabletWidth: 1201,
      openMenu: false,
      subMenuIndex: null,
      scrollPosition: 0,
      search: ''
    };
  },

  computed: {
    ...mapState({
      menuItems: 'headerMenu',
      footerItems: 'footerMenu'
    }),
    regions() {
      const { name, query, params, hash } = this.$route;
      return this.$store.state.regions.items.map((region) => {
        const { href } = this.$router.resolve({
          name,
          params,
          query: { ...query, region: region.id },
          hash
        });
        return {
          ...region,
          href
        };
      });
    },
    activeRegion() {
      return this.$store.getters.region;
    },
    headVisibility() {
      return this.visibility;
    },

    visibleMenu() {
      return this.menuItems.slice(0, 2);
    },
    visibleMobileMenu() {
      return this.menuItems.slice(0, 1).map((z) => {
        return {
          ...z,
          name: z.title
        };
      });
    },
    visibleFooterItems() {
      const arr = this.footerItems.map((z) => {
        return {
          ...z,
          name: z.title
        };
      });
      arr.splice(0, 1);
      return arr;
    },
    hiddenMenu() {
      return this.menuItems.slice(2);
    },
    models() {
      return this.$store.state.busModels;
    },
    mobileMenu() {
      return [
        ...this.models,
        ...this.visibleMobileMenu,
        ...this.visibleFooterItems
      ];
    },
    filteredRegions() {
      return this.regions.filter((el) => {
        return el.name.toUpperCase().includes(this.search.toUpperCase());
      });
    }
  },
  mounted() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    setTimeout(() => {
      document.addEventListener('click', this.clickOutside);
    }, 0);
    setTimeout(() => {
      this.startAnimation();
    }, this.animDelay);
    this.$nuxt.$on('close-all-tooltips', () => {
      this.submenu.isOpen = false;
    });
    this.onResize();
    window.addEventListener('resize', this.onResize);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.clickOutside);
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    setCookieRegion({ id }) {
      this.$cookies.set('region', id, { maxAge: 60 * 60 * 24 });
    },
    onResize(event) {
      if (event) {
        this.isTablet = this.tabletWidth > event.target.innerWidth;
      } else {
        this.isTablet = this.tabletWidth > window.innerWidth;
      }
    },
    enableScroll() {
      const $body = document.querySelector('body');
      this.scrollPosition = window.pageYOffset;
      $body.style.overflow = 'hidden';
      $body.style.position = 'fixed';
      $body.style.top = `-${this.scrollPosition}px`;
      $body.style.width = '100%';
    },
    disableScroll() {
      const $body = document.querySelector('body');
      $body.style.removeProperty('overflow');
      $body.style.removeProperty('position');
      $body.style.removeProperty('top');
      $body.style.removeProperty('width');
      window.scrollTo(0, this.scrollPosition);
    },
    openMenuEvent() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      this.openMenu = !this.openMenu;
      if (this.openMenu) {
        this.enableScroll();
      } else {
        this.disableScroll();
      }
    },
    openSubMenu(item, index) {
      if (item === 'region') {
        if (this.subMenuIndex === index) {
          this.subMenuIndex = null;
        } else {
          this.subMenuIndex = index;
        }
      } else if (this.subMenuIndex === index) {
        this.subMenuIndex = null;
      } else if (
        'models' in item ||
        ('children' in item && item.children.length > 0)
      ) {
        this.subMenuIndex = index;
      } else {
        this.openMenuEvent();
        this.$router.replace({ path: item.url });
      }
    },
    closeTooltip() {
      this.submenu.isOpen = false;
    },
    clickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.closeTooltip();
      }
    },
    startAnimation() {
      const tl = gsap.timeline({
        defaults: { duration: 0.1, delay: 0.1 }
      });

      Array.from(document.querySelectorAll('.is-animate')).forEach((el) => {
        tl.to(el, 0.3, {
          transform: 'translate(0, 0)',
          opacity: 1
        });
      });
      setTimeout(() => {
        this.isAnimate = false;
      }, 6000);
    },
    showRegion() {
      this.regionVisibility = !this.regionVisibility;
      this.$nuxt.$emit('showActiveRegion', {
        regionVisibility: this.regionVisibility
      });
    },
    goToConfigurator() {
      this.$router.push({
        path: '/configurator'
      });
    }
  }
};
</script>
<style lang="scss">
.header {
  position: fixed;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 899;
  display: flex;
  align-items: center;

  .header__logo {
    width: vw(135px);
    height: vw(16px);
    margin-right: 7vw;
    margin-bottom: 3px;
    display: flex;
    align-items: center;
    @include media(1200px) {
      width: 135px;
      height: 16px;
      margin: 0;
      flex-shrink: 0;
    }
    .svg-icon {
      width: 100%;
      height: 100%;
      fill: $red;
      &:hover {
        fill: #041c30;
      }
    }
  }
  .language-switcher {
    @include media(1200px) {
      font-size: 14px;
    }
  }
  .header__navbar {
    position: relative;
    width: 100%;
    padding: 0;
    background: #ffffff;
    z-index: 2;
    height: 80px;
    &.white {
      box-shadow: 0 1px 0 rgba(236, 239, 242, 0.7);
      .active__region {
        color: #777777;
      }
    }

    //dark head style
    &.tr {
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.5) 0%,
        rgba(0, 0, 0, 5e-5) 100%
      );
      opacity: 1;
      .header__logo {
        svg {
          fill: #ffffff;
        }
        &:hover {
          svg {
            fill: $red;
          }
        }
      }
      .header__menu-wr {
        color: #ffffff;
        .menu-btn {
          .svg-icon {
            path {
              fill: #ffffff;
            }
          }
        }
      }

      .active__region {
        color: #ffffff;
      }

      .menu__item {
        color: inherit;

        .find-icon {
          position: absolute;
          left: vw(-22px);
          top: -2px;
          fill: #ffffff;
          // stroke: #ffffff;
          // fill: none;
          width: vw(12px);
          height: vw(18px);
          path:nth-child(1) {
            stroke: #ffffff;
            fill: none;
          }
          path:nth-child(2) {
            fill: #ffffff;
            stroke: none;
          }
        }
        .dots-icon {
          fill: #ffffff;
          position: absolute;
          display: block;
          top: 50%;
          transform: translateY(-50%);
          height: vw(4px);
          width: vw(18px);
          pointer-events: none;
        }
        .carret-icon {
          fill: #ffffff;
        }
        &:hover {
          color: $red;
          .svg-icon {
            fill: $red;
            // stroke: $red;
          }
          .find-icon {
            path:nth-child(1) {
              stroke: $red;
            }
            path:nth-child(2) {
              fill: $red;
            }
          }
        }
      }
    }
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 1;
    }
    .submenu {
      position: absolute;
      font-size: vw(14px);
      line-height: 1.14;
      text-align: left;
      color: #041c30;
      background: #ffffff;
      border: 1px solid #ebebeb;
      top: -0.9vw;
      left: 0;
      padding: vw(15px) vw(32px);
      transition: all 0.7s ease;
      .menu__item {
        transition: all 0.3s ease;
        padding: 15px 0;
        position: relative;
        min-width: fit-content;
        margin: 0;
        a {
          display: block !important;
          white-space: nowrap;
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
          margin: 0;
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
  }

  .header__menu-wr {
    font: vw(14px) $font-1b;
    font-weight: 700;
    line-height: 1.14;
    text-transform: uppercase;
    color: #041c30;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    position: relative;
    @include media(1200px) {
      width: auto;
    }
    .menu-btn {
      .svg-icon {
        path {
          fill: #041c30;
        }
      }
    }
    .btn.tr {
      position: absolute;
      right: vw(400px);
      padding: vw(16px) vw(24px);
      line-height: 1;
      font-size: vw(14px);
      height: vw(48px);
      border-width: 2px;
      &:hover {
        border-width: 2px;
      }
    }
  }
  .menu__link {
    text-decoration: none;
    color: inherit;
    position: relative;
  }
  .menu-btn {
    padding: 5px;
    cursor: pointer;
    margin: 0 -5px 0 40px;
  }
  //
  .find-icon {
    position: absolute;
    left: vw(-22px);
    top: -2px;
    stroke: #041c30;
    fill: none;
    width: vw(12px);
    height: vw(18px);
    path:nth-child(1) {
      stroke-width: 2.3px;
    }
    path:nth-child(2) {
      stroke: #041c30;
      fill: #041c30;
    }
  }
  .dots-icon {
    fill: #041c30;
    position: absolute;
    display: block;
    pointer-events: none;
    top: 50%;
    transform: translateY(-50%);
    height: vw(4px);
    width: vw(18px);
  }
  .menu__item {
    cursor: pointer;
    color: inherit;
    position: relative;
    transition: all 0.3s ease;
    padding: 0 vw(28px);
    @include media(1200px) {
      padding: 0 18px;
    }
    // * {
    //   transition: all 0.3s ease;
    // }

    .svg-icon {
      // fill: #041c30;
      transition: all 0.3s ease;
    }

    &:hover {
      color: $red;
      .svg-icon {
        fill: $red;
        // stroke: $red;
      }
      .find-icon {
        stroke: $red;
        fill: none;
        path:nth-child(2) {
          stroke: $red;
          fill: $red;
        }
      }
    }
  }

  .menu__item--dot {
    position: relative;
    height: 20px;
    span {
      position: relative;
      top: -5px;
    }
  }
  .menu {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    z-index: 2;
  }

  .setings {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    // margin-right: vw(16px);
    @include media(1200px) {
      margin-left: auto;
    }
    .menu__item {
      // margin-left: vw(36px);
      position: relative;
      transition: all 0.3s ease;
      cursor: pointer;
    }
    .menu__link {
      transition: unset;
    }
  }

  .translate-leave-active,
  .translate-enter-active {
    transition: all 0.5s ease;
  }
  .translate-leave,
  .translate-enter-to {
    transform: translate(0, 0);
  }
  .translate-enter,
  .translate-leave-to {
    transform: translate(0, -100%);
  }
  .fade-tr-leave-active,
  .fade-tr-enter-active {
    transition: all 1s ease;
  }
  .fade-tr-leave,
  .fade-tr-enter-to {
    opacity: 1;
    transform: translate(0, 0);
  }
  .fade-tr-enter,
  .fade-tr-leave-to {
    opacity: 0;
    transform: translate(0, -100%);
  }

  .is-animate {
    transition: all 0.7s ease;
    opacity: 0;
    transform: translate(0, -100px);
  }
  .mobile-head {
    height: calc(var(--vh, 1vh) * 100) !important;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    padding-top: 80px;
    background: #ffffff;
    z-index: 1;
    &-model {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 0 32px 32px;
      background: #fafbfb;
      a {
        width: 100px;
        margin-left: 40px;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        font-size: 14px;
        line-height: 1.3;
        color: $red;
        .svg-icon {
          width: 12px;
          height: 8px;
          margin-top: 12px;
          transform: rotate(0);
        }
      }
      img {
        width: calc(100% - 120px);
        max-width: 175px;
      }
    }
    .regions__list {
      padding: 0 32px;
    }
    &-sublist {
      background: #ffffff;
    }
    &-subitem {
      display: flex;
      align-items: center;
      padding: 9px 32px;
      position: relative;
      min-height: 68px;
      &:after {
        content: '';
        position: absolute;
        left: 32px;
        bottom: 0;
        width: calc(100% - 64px);
        height: 1px;
        background: #f4f5f6;
      }
      &:last-child {
        &:after {
          display: none;
        }
      }
    }
    &-img {
      height: 50px;
      width: 75px;
      margin-right: 20px;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    &-list {
      height: calc(100vh - 80px);
    }
    &-title {
      padding: 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
    }
    &-item {
      font-size: 20px;
      font-family: $font-2b;
      line-height: 1.25;
      text-transform: uppercase;
      position: relative;
      &.before-open {
        &:after {
          display: none;
        }
      }
      .svg-icon {
        transform: rotate(180deg);
      }
      &:after {
        content: '';
        position: absolute;
        left: 32px;
        bottom: 0;
        width: calc(100% - 64px);
        height: 1px;
        background: #f0f2f3;
      }
      &:last-child {
        &:after {
          display: none;
        }
      }
      &.models {
        background: #fafbfb;
        &.before-open {
          &:after {
            display: block;
          }
        }
        .svg-icon {
          path {
            fill: $red;
          }
        }
      }
      &.children {
        .svg-icon {
          path {
            fill: #c2cfda;
          }
        }
        &.open {
          background: #fafbfb;
          .mobile-head-sublist {
            background: #fafbfb;
          }
        }
        .mobile-head-subitem {
          font-family: $font-1b;
          &:after {
            top: 0;
          }
          &:last-child {
            &:after {
              display: block;
            }
          }
        }
      }
      &.open {
        &:after {
          display: none;
        }
        .svg-icon {
          transform: rotate(0);
          path {
            fill: #0d314f !important;
          }
        }
        &.models {
          .svg-icon {
            path {
              fill: $red;
            }
          }
        }
      }
      .input__wr {
        height: 50px;
        margin: 0 32px 15px 32px;
        position: relative;
        border: 1px solid #e2e9ee;
      }
      .regions__search {
        width: 100%;
        height: 100%;
        outline: none;
        border: none;
        padding: 0 40px 0 16px;
        line-height: 50px;
        font-size: 16px;
        font-weight: normal;
        font-family: $font-1r;
        color: #637482;
        &:active,
        &:focus,
        &:focus-within {
          &::placeholder {
            color: transparent;
          }
        }
        &::placeholder {
          color: #c2cfda;
          font-size: 12px;
        }
      }
      .search-icon {
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%) !important;
        path {
          fill: $red !important;
        }
      }
      .active__region {
        position: absolute;
        left: 32px;
        bottom: 10px;
        font-family: $font-1r;
        // color: #637482;
        color: #ffffff;
        font-size: 16px;
        text-transform: capitalize;
      }
      .region {
        display: flex;
        align-items: center;
        padding: 16px 32px;
        position: relative;
        text-transform: capitalize;
        &:after {
          content: '';
          width: calc(100% - 64px);
          height: 1px;
          position: absolute;
          bottom: 0;
          left: 32px;
          background: rgba(226, 232, 238, 0.5);
        }
        .country-flag--empty {
          width: 60px;
          height: 40px;
        }
        .country-flag {
          transform: translateX(-32px) scale(0.3);
          flex-shrink: 0;
        }
        .country-name {
          font-size: 16px;
          line-height: 1.19;
          font-family: $font-1r;
          color: #637482;
          transform: translateX(-28px);
        }
      }
    }
    .ps {
      position: relative;
      height: 100%;
      width: 100%;
      transition: unset !important;
      padding: 0;
    }
    .ps__rail-y {
      width: 6px;
      opacity: 1 !important;
      background: #ededed;
    }
    .ps__thumb-y {
      text-align: center;
      opacity: 1 !important;
      background: $red;
      border-radius: 0;
      width: 6px;
      right: 0;
    }
    .ps__rail-y:hover > .ps__thumb-y,
    .ps__rail-y:focus > .ps__thumb-y,
    .ps__rail-y.ps--clicking .ps__thumb-y {
      width: 6px;
      background: $red;
    }
    .ps .ps__rail-x:hover,
    .ps .ps__rail-y:hover,
    .ps .ps__rail-x:focus,
    .ps .ps__rail-y:focus,
    .ps .ps__rail-x.ps--clicking,
    .ps .ps__rail-y.ps--clicking {
      background: #ededed;
    }
  }
}
</style>
