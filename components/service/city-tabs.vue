<template>
  <section class="tabs section">
    <div class="container">
      <div class="tabs-content">
        <div
          class="tabs-item"
          :class="{ active: currentIndex === 0 }"
          @click="changeAll"
        >
          All service
        </div>
        <div ref="scrollContent" class="tabs-content-list">
          <div
            ref="scrollBlock"
            class="tabs-content-overflow"
            :style="translate"
          >
            <div
              v-for="(item, index) in items"
              :key="index"
              class="tabs-item"
              :class="{ active: currentIndex === index + 1 }"
              @click="changeCity(index)"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <div class="tabs-btn">
          <div
            class="tabs-btn-item left"
            :class="{ disabled: disabledStart }"
            @click="back"
          >
            <ArrowIcon />
          </div>
          <div
            class="tabs-btn-item right"
            :class="{ disabled: disabledEnd }"
            @click="next"
          >
            <ArrowIcon />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ArrowIcon from '~/assets/images/icons/arrow-top.svg';
export default {
  components: { ArrowIcon },
  props: {
    items: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0,
      xValue: 0,
      contentWidth: null,
      scrollWidth: null,
      disabledStart: true,
      disabledEnd: false,
      scrollIndex: 0,
      direction: null
    };
  },
  computed: {
    translate() {
      return `transform: translateX(${this.xValue}px)`;
    },
    recalculate() {
      const content = this.$refs.scrollContent;
      const currentElem = content.getElementsByClassName('tabs-item')[
        this.direction === 'next' ? this.scrollIndex - 1 : this.scrollIndex
      ];
      const width = currentElem.clientWidth;
      const margin = window.getComputedStyle(currentElem).marginRight;
      const value = width + parseFloat(margin);
      return value;
    }
  },
  mounted() {
    const content = this.$refs.scrollContent;
    this.contentWidth = content.clientWidth + 200;
    this.scrollWidth = content.scrollWidth;
  },
  methods: {
    changeCity(index) {
      this.currentIndex = index + 1;
    },
    changeAll() {
      this.currentIndex = 0;
    },
    next() {
      if (!this.disabledEnd) {
        this.scrollIndex++;
        this.direction = 'next';
        this.xValue -= this.recalculate;
        this.disabledStart = false;
        if (this.scrollWidth < this.contentWidth - this.xValue) {
          this.disabledEnd = true;
        }
      }
    },
    back() {
      if (this.scrollIndex > 0) {
        this.scrollIndex--;
        this.direction = 'back';
        this.xValue += this.recalculate;
        this.disabledEnd = false;
        if (this.scrollIndex === 0) {
          this.disabledStart = true;
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.tabs {
  &-content {
    display: flex;
    border-bottom: 1px solid #ebebeb;
    position: relative;
    &-list {
      width: auto;
      overflow: hidden;
      display: flex;
    }
    &-overflow {
      display: flex;
      transition: transform 0.5s ease;
    }
  }
  &-btn {
    position: absolute;
    height: 100%;
    top: 0;
    right: 0;
    display: flex;
    &:after {
      content: '';
      position: absolute;
      width: vw(120px);
      height: 100%;
      left: 0;
      top: 0;
      transform: translateX(-100%) rotate(-180deg);
      pointer-events: none;
      background: linear-gradient(
        270deg,
        rgba(255, 255, 255, 0) -34.19%,
        #ffffff 100%
      );
    }
    &-item {
      width: vw(40px);
      background: #d2131c;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.5s ease;
      &.disabled {
        background: #ebebeb;
      }
      &.left {
        svg {
          transform: rotate(-90deg);
        }
      }
      &.right {
        svg {
          transform: rotate(90deg);
        }
      }
      &:not(.disabled) {
        &:hover {
          background: $black;
        }
      }
    }
  }
  &-item {
    padding: vw(18px) 0;
    font-size: vw(18px);
    margin-right: vw(140px);
    white-space: nowrap;
    cursor: pointer;
    position: relative;
    transition: color 0.5s ease;
    &:before {
      content: '';
      width: 0;
      height: 3px;
      background: #d2131c;
      position: absolute;
      left: 0;
      bottom: -1px;
      transition: width 0.5s ease;
    }
    &.active {
      &:before {
        width: 100%;
      }
    }
    &:hover {
      color: $red;
    }
  }
}
</style>
