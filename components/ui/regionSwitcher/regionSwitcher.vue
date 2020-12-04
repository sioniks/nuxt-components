<template>
  <div class="region-switcher" @click.self="openMenu()">
    <div class="region-label" :class="{ 'is-open': isOpen }">
      Region
      <CarretIcon class="carret-icon" />
    </div>
    <transition name="fade2">
      <div v-if="isOpen" class="regions" :class="{ more: shadow }">
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
        <perfect-scrollbar :options="scrollOptions">
          <div v-if="search.length" class="regions__list">
            <a
              v-for="el in filteredRegions"
              :key="el.code"
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
              :key="el.code"
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
              <span v-else class="country-flag country-flag--empty" />
              <span class="country-name">{{ el.name }}</span>
            </a>
          </div>
        </perfect-scrollbar>
      </div>
    </transition>
    <div v-if="showRegion && activeRegion" class="active__region">
      {{ activeRegion.name }}
    </div>
  </div>
</template>

<script>
import CarretIcon from '~/assets/images/icons/arrow-down.svg';
import SearchIcon from '~/assets/images/icons/search-icon.svg';

export default {
  components: { CarretIcon, SearchIcon },
  props: {
    item: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      search: '',
      isOpen: false,
      scrollOptions: {
        // minScrollbarLength: 47,
        // maxScrollbarLength: 47
        wheelPropagation: false
      },
      showRegion: false
    };
  },
  computed: {
    regions() {
      return this.$store.state.regions.items.map((region) => {
        const { href } = this.$router.resolve({
          query: { ...this.$route.query, region: region.id }
        });
        return {
          ...region,
          href
        };
      });
    },
    activeRegion() {
      return this.regions.filter((el) => {
        return el.id === Number(this.$route.query.region);
      })[0];
    },
    filteredRegions() {
      return this.regions.filter((el) => {
        return el.name.toUpperCase().includes(this.search.toUpperCase());
      });
    },
    shadow() {
      if (this.filteredRegions.length) {
        return this.filteredRegions.length > 9;
      } else if (!this.filteredRegions.length && this.search.length) {
        return false;
      } else {
        return this.regions.length > 9;
      }
    }
  },
  mounted() {
    setTimeout(() => {
      document.addEventListener('click', this.clickOutside);
    }, 0);
    this.$nuxt.$on('showActiveRegion', (e) => {
      this.showRegion = e.regionVisibility;
    });
  },
  beforeDestroy() {
    document.removeEventListener('click', this.clickOutside);
  },
  methods: {
    setCookieRegion(el) {
      this.$cookies.set('region', el.code, { maxAge: 60 * 60 * 24 });
      this.$cookies.set('regionName', el.name, { maxAge: 60 * 60 * 24 });
    },
    closeTooltip() {
      this.isOpen = false;
      this.search = '';
    },
    clickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.closeTooltip();
        document.documentElement.style.overflow = '';
      } else if (event.target.classList.contains('regions__search')) {
        document.documentElement.style.overflow = 'hidden';
      }
    },
    openMenu() {
      this.isOpen = !this.isOpen;
      setTimeout(() => {
        this.isOpen
          ? (document.documentElement.style.overflow = 'hidden')
          : (document.documentElement.style.overflow = '');
      }, 100);
    }
  }
};
</script>

<style lang="scss">
.region-switcher {
  position: relative;
  .active__region {
    position: absolute;
    left: vw(28px);
    bottom: -20px;
    font-family: $font-1r;
    font-weight: normal;
    font-size: vw(10px);
    line-height: 12px;
    color: #bcbcbc;
    text-transform: capitalize;
  }
  .empty-filter {
    padding: 6px 34px;
    position: relative;
    font-family: $font-1r;
    font-size: vw(12px);
    line-height: 1.14;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #637482;
  }
  .region-label {
    position: relative;
    padding: 0 28px 0 0;
    pointer-events: none;
    &:before {
      content: '';
      left: -35%;
      width: 165%;
      height: 300%;
      top: -100%;
      position: absolute;
      z-index: -1;
      background: #ffffff;
      opacity: 0;
      transition: all 0.7s ease;
    }
    &.is-open {
      color: #0d314f;
      &:before {
        opacity: 1;
      }
      .carret-icon {
        fill: $red;
        transform: translateY(-50%) rotate(180deg);
      }
    }
    .carret-icon {
      // fill: #ffffff;
      pointer-events: none;
      width: vw(11px);
      height: vw(6px);
      right: 0;
      position: absolute;
      display: block;
      top: 48%;
      transform: translateY(-50%);
    }
  }
  .input__wr {
    position: relative;
    width: calc(100% - 68px);
    height: vw(40px);
    border: 1px solid #e2e9ee;
    margin: 34px 34px 13px 34px;
  }
  .regions__search {
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    padding: 12px;
    line-height: vw(40px);
    font-size: vw(16px);
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
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    path {
      fill: $red;
    }
  }
  .regions {
    position: absolute;
    display: flex;
    flex-direction: column;
    text-transform: uppercase;
    background: #ffffff;
    // border: 1px solid #ebebeb;
    top: 200%;
    right: vw(-83px);
    padding: 0;
    transition: all 0.7s ease;
    width: vw(347px);
    max-height: 530px;
    overflow-y: hidden;
    &.more {
      &:after {
        content: '';
        width: 100%;
        height: 2px;
        position: absolute;
        left: 0;
        bottom: -3px;
        box-shadow: 0 -10px 50px 40px #ffffff;
      }
    }
    .ps {
      position: relative;
      height: 100%;
      width: 100%;
      transition: unset !important;
      padding: 0;
      .ps__thumb-y {
        opacity: 1 !important;
        background: $red;
        border-radius: 0;
        width: 2px;
      }
    }
    .regions__list {
      padding: 0;
    }
    .region {
      height: 52px;
      padding: 6px 34px;
      position: relative;
      font-family: $font-1r;
      font-size: vw(16px);
      line-height: 1.14;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: #637482;
      text-transform: capitalize;
      transition: all 0.3s ease !important;
      &:nth-last-child(1) {
        margin-bottom: 50px;
      }
      .country-flag {
        display: block;
        // margin-right: 20px;
        transform: translateX(0) scale(0.3);
        overflow: hidden;
        &--empty {
          width: 25px;
          height: 25px;
          margin-right: 5px;
          background-image: url('~@/assets/images/icons/earth-region.png');
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          background-color: transparent;
          transform: none;
        }
      }
      &:hover {
        background: rgba(226, 232, 238, 0.4);
      }
      .country-name {
        display: block;
      }
      &.active {
        display: none;
      }
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 34px;
        height: 1px;
        width: calc(100% - 68px);
        background: #ebebeb;
      }

      &:first-child {
        &:before {
          display: none;
        }
      }
      &:last-child {
        &:after {
          display: none;
        }
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
