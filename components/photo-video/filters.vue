<template>
  <div
    class="filters"
    :class="{ filters_hide: queryParams, active: mobileFiltersFlag }"
  >
    <div v-if="isMobile" class="filters-header">
      <div @click="closeFilters"><CloseIcon /> Close filter</div>
    </div>
    <perfect-scrollbar @ps-y-reach-end="endScroll" @ps-scroll-up="topScroll">
      <div class="filters-scroll">
        <div class="filters-top">
          <div class="filters-top-all" @click="showAll()">
            <Eye />
            Show all
          </div>
          <div
            v-if="search && search.length > 0"
            class="filters-top-clear"
            @click="clearAll"
          >
            Clear
          </div>
        </div>
        <div v-if="isMobile" class="filters-result">
          <div class="filters-result-btn" @click="showResult">Show results</div>
        </div>
        <div
          v-for="(item, indexFilter) in getFilters"
          :key="item.id"
          class="filters-item"
        >
          <div
            class="filters-item-name"
            :class="{ close: !item.open }"
            @click="changeVisible(indexFilter)"
          >
            {{ item.name }}
            <ArrowIcon />
          </div>
          <template v-if="item.categories && item.categories.length > 0">
            <div v-show="item.open" class="filters-item-options">
              <div
                v-for="(category, index) in item.categories"
                :key="index"
                class="filters-item-category"
                @mouseenter="hoverIndex = index"
                @mouseleave="hoverIndex = null"
              >
                <div class="filters-item-block">
                  {{ category.name }}
                  <span
                    v-if="hoverIndex === index"
                    @click="showAllCategory(item, category.slug)"
                  >
                    show all
                  </span>
                </div>
                <div
                  v-for="option in getOptions(item, category)"
                  :key="option.id"
                >
                  <div class="filters-item-option">
                    <template v-if="item.type === 'checkbox'">
                      <CheckBox :name="item.slug" :option="option" />
                    </template>
                    <template v-else>
                      <RadioBox :name="item.slug" :option="option" />
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div v-show="item.open" class="filters-item-options">
              <div
                v-for="option in item.options"
                :key="option.id"
                class="filters-item-option"
              >
                <template v-if="item.type === 'checkbox'">
                  <CheckBox :name="item.slug" :option="option" />
                </template>
                <template v-else>
                  <RadioBox :name="item.slug" :option="option" />
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>
    </perfect-scrollbar>
    <transition name="fade">
      <div v-show="scrollFlag" class="filters-overlay"></div>
    </transition>
  </div>
</template>

<script>
import Eye from '~/assets/images/icons/eye-icon2.svg';
import ArrowIcon from '~/assets/images/icons/arrow-top.svg';
import CloseIcon from '~/assets/images/icons/close-big.svg';
import RadioBox from '~/components/ui/inputs/radiobox';
import CheckBox from '~/components/ui/inputs/checkbox';
export default {
  components: {
    Eye,
    ArrowIcon,
    RadioBox,
    CheckBox,
    CloseIcon
  },
  props: {
    filters: {
      type: Array,
      default: null
    },
    checkbox: {
      type: Object,
      default: null
    },
    search: {
      type: String,
      default: ''
    },
    queryParams: {
      type: Boolean,
      default: false
    },
    scrollFlag: {
      type: Boolean,
      default: false
    },
    mobileFiltersFlag: {
      type: Boolean,
      default: false
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hoverIndex: null
    };
  },
  computed: {
    getFilters() {
      this.filters.forEach((item) => {
        const arr = [];
        item.options.map((option) => {
          if (option.attribute_option_category) {
            if (
              !arr.find(
                (item) => item.id === option.attribute_option_category.id
              )
            ) {
              arr.push(option.attribute_option_category);
            }
            item.categories = arr;
          }
        });
      });
      return this.filters;
    }
  },
  mounted() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    if (!this.isMobile) {
      setTimeout(() => {
        this.gsapTranslate();
      }, 500);
    }
  },
  methods: {
    gsapTranslate() {
      Array.from(
        document.querySelectorAll(
          '.filters-top, .filters-item-name, .filters-item-option, .filters-item-block'
        )
      ).forEach((item) => {
        const delay = item.dataset.delay || 0;
        const duration = item.dataset.duration || 0.8;
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
    changeVisible(index) {
      this.filters[index].open = !this.filters[index].open;
    },
    getOptions(item, option) {
      const arr = this.filters
        .filter((el) => {
          return el.slug === item.slug;
        })[0]
        .options.filter((optionItem) => {
          return optionItem.attribute_option_category.slug === option.slug;
        });
      return arr;
    },
    showAllCategory(item, category) {
      this.$emit('showCategory', item, category);
      const inputs = document.querySelectorAll(`[name=${category}]`);
      Array.from(inputs).forEach((item) => {
        item.checked = true;
      });
    },
    clearAll() {
      this.$emit('clearAll');
    },
    showAll() {
      this.$emit('showAll');
    },
    endScroll() {
      this.$emit('endScroll');
    },
    topScroll() {
      this.$emit('topScroll');
    },
    closeFilters() {
      this.$emit('closeFilters');
    },
    showResult() {
      this.$emit('showResult');
    }
  }
};
</script>
<style lang="scss" scoped>
.filters {
  width: 27.43vw;
  border-top: 1px solid #ededed;
  flex-shrink: 0;
  position: sticky;
  height: 100vh;
  top: 0;
  &-result {
    display: none;
    @include media(767px) {
      display: block;
      position: fixed;
      left: 0;
      bottom: 0;
      width: calc(100% - 6px);
      padding: 12px 26px 12px 32px;
      background: #ffffff;
      z-index: 2;
      &-btn {
        width: 100%;
        background: $red;
        font-size: 16px;
        font-family: $font-1r;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #ffffff;
        text-transform: uppercase;
      }
    }
  }
  &-header {
    font-size: 18px;
    font-family: $font-1b;
    position: fixed;
    left: 0;
    top: 0;
    width: calc(100% - 6px);
    height: 64px;
    display: flex;
    align-items: center;
    padding: 0 56px;
    border: 1.2px solid #ffffff;
    border-bottom-color: #e9ebed;
    background: #ffffff;
    z-index: 2;
    .svg-icon {
      width: 14px;
      height: 14px;
      margin-right: 15px;
    }
  }
  @include media(767px) {
    width: 100%;
    left: 0;
    top: 0;
    position: fixed;
    pointer-events: none;
    opacity: 0;
    z-index: 900;
    height: calc(var(--vh, 1vh) * 100) !important;
    background: #ffffff;
    transform: translateY(100px);
    transition: all 0.3s ease;
    &.active {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
      .filters-scroll {
        height: 100vh !important;
        padding: 64px 0 0;
        margin-bottom: 64px;
      }
    }
  }
  &_hide {
    &:after {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(255, 255, 255, 0.93);
      z-index: 1;
    }
  }
  &-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: vw(64px);
    color: $gray;
    font-size: vw(14px);
    padding: 0 vw(35px) 0 4vw;
    opacity: 0;
    transform: translateY(100px);
    @include media(767px) {
      padding: 0 56px;
      height: 64px;
      font-size: 14px;
      opacity: 1;
      transform: none;
    }
    &-all {
      cursor: pointer;
      display: flex;
      align-items: center;
      svg {
        width: vw(16px);
        margin-right: vw(12px);
        @include media(767px) {
          width: 16px;
          margin-right: 12px;
        }
      }
    }
    &-clear {
      cursor: pointer;
    }
  }
  &-item {
    &-name {
      padding: 10px vw(35px) 10px 4vw;
      background: #f9f9f9;
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: vw(70px);
      font-family: $font-1b;
      font-size: vw(22px);
      cursor: pointer;
      opacity: 0;
      transform: translateY(100px);
      @include media(767px) {
        min-height: 70px;
        padding: 22px 56px;
        font-size: 22px;
        opacity: 1;
        transform: none;
      }
      &.close {
        svg {
          transform: rotate(180deg);
        }
      }
    }
    &-options {
      margin: vw(12px) 0;
      @include media(767px) {
        margin: 8px 0;
      }
    }
    &-option {
      padding: vw(6px) vw(35px) vw(6px) 4vw;
      opacity: 0;
      transform: translateY(100px);
      position: relative;
      @include media(767px) {
        opacity: 1;
        transform: none;
        padding: 16px 56px;
        &:after {
          content: '';
          position: absolute;
          width: calc(100% - 112px);
          height: 1px;
          left: 56px;
          bottom: 0;
          background: #f4f5f6;
        }
        &:last-child {
          &:after {
            display: none;
          }
        }
      }
    }
    &-block {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: $font-1b;
      font-size: vw(16px);
      color: $gray;
      padding: vw(12px) vw(35px) vw(12px) 4vw;
      opacity: 0;
      transform: translateY(100px);
      @include media(767px) {
        opacity: 1;
        transform: none;
        padding: 8px 56px;
        margin-top: 8px;
        font-size: 16px;
      }
      span {
        cursor: pointer;
        font-family: $font-1r;
        font-size: vw(14px);
        @include media(767px) {
          font-size: 14px;
        }
      }
    }
    &-category {
      border-bottom: 1px solid #f4f5f6;
      padding-bottom: vw(12px);
      @include media(767px) {
        padding: 0;
      }
      &:last-child {
        border-bottom: none;
      }
    }
    &:last-child {
      @include media(767px) {
        margin-bottom: 64px;
      }
    }
  }
  &-overlay {
    position: absolute;
    left: 0;
    bottom: 0;
    background: linear-gradient(transparent, #ffffff);
    width: 100%;
    height: vw(100px);
    pointer-events: none;
    @include media(767px) {
      height: 64px;
      display: none;
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
<style lang="scss">
.filters {
  &-header {
    path {
      fill: #919aa1;
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
</style>
