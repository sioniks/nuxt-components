<template>
  <div
    v-if="count > 1"
    class="pagination gsapBottomPagination"
    :class="`pagination_${type}`"
  >
    <button
      v-if="current !== count"
      class="btn btn-pagination red"
      @click="showMore"
    >
      <ReloadIcon />
      <div class="btn-text">Show more publications</div>
    </button>
    <div class="pagination-list">
      <div
        class="pagination-item pagination-prev"
        :class="{ disabled: current === 1 }"
        @click="changePage(current - 1)"
      >
        <ArrL />
      </div>
      <template v-if="!isMobile">
        <div
          class="pagination-item"
          :class="{
            'pagination-active': 1 === current || currentArr.includes(1)
          }"
          @click="changePage(1)"
        >
          1
        </div>
        <span
          v-if="current > 3 && count > 5"
          class="pagination-item pagination-item_points"
        >
          ...
        </span>
        <div
          v-for="item in centerList"
          :key="item"
          class="pagination-item"
          :class="{
            'pagination-active': item === current || currentArr.includes(item)
          }"
          @click="changePage(item)"
        >
          {{ item }}
        </div>
        <span
          v-if="current < count - 3 && count > 5"
          class="pagination-item pagination-item_points"
        >
          ...
        </span>
        <div
          class="pagination-item"
          :class="{
            'pagination-active': count === current || currentArr.includes(count)
          }"
          @click="changePage(count)"
        >
          {{ count }}
        </div>
      </template>
      <template v-else>
        <div class="pagination-item pagination-active">
          {{ current }}
        </div>
      </template>
      <div
        class="pagination-item pagination-next"
        :class="{ disabled: current === count }"
        @click="changePage(current + 1)"
      >
        <ArrR />
      </div>
    </div>
  </div>
</template>

<script>
import ArrL from '~/assets/images/icons/arr-l.svg';
import ArrR from '~/assets/images/icons/arr-r.svg';
import ReloadIcon from '~/assets/images/icons/reload.svg';
export default {
  components: {
    ArrL,
    ArrR,
    ReloadIcon
  },
  props: {
    count: {
      type: Number,
      required: true
    },
    current: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      default: ''
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentArr: [],
      counter: 0,
      startPage: 0
    };
  },
  computed: {
    centerList() {
      if (this.count < 5) {
        return this.count === 2 ? [] : this.count === 3 ? [2] : [2, 3];
      } else if (this.current < 3) {
        return this.current === 1
          ? [this.current + 1, this.current + 2, this.current + 3]
          : [this.current, this.current + 1, this.current + 2];
      } else if (this.current >= 3 && this.current < this.count - 3) {
        return [this.current - 1, this.current, this.current + 1];
      } else {
        return [this.count - 3, this.count - 2, this.count - 1];
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.gsapTranslate();
    }, 500);
  },
  methods: {
    changePage(page) {
      if (page === this.current || page === 0 || page === this.count + 1)
        return;
      if (page >= this.count) {
        this.$emit('change', this.count);
        this.currentArr = [];
        this.counter = 0;
        this.$nuxt.$emit('changePaginationPage');
      } else if (page <= 1) {
        this.$emit('change', 1);
        this.currentArr = [];
        this.counter = 0;
        this.$nuxt.$emit('changePaginationPage');
      } else {
        this.$emit('change', page);
        this.currentArr = [];
        this.counter = 0;
        this.$nuxt.$emit('changePaginationPage');
      }
    },
    gsapTranslate() {
      Array.from(document.querySelectorAll('.gsapBottomPagination')).forEach(
        (item) => {
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
        }
      );
    },
    showMore() {
      const currentArr = [];
      if (this.counter === 0) {
        this.startPage = this.current;
      }
      if (this.current === this.count) {
        return;
      }
      this.counter++;
      for (let i = this.startPage; i <= this.startPage + this.counter; i++) {
        currentArr.push(i);
      }
      this.currentArr = currentArr;
      this.$emit('showMore', this.current);
    }
  }
};
</script>
<style lang="scss" scoped>
.pagination {
  margin: vw(85px) 0 vw(120px);
  display: flex;
  align-items: center;
  justify-content: center;
  @include media(767px) {
    flex-wrap: wrap;
    margin: 0 0 56px;
  }
  &_stories {
    margin: vw(40px) 0 vw(120px);
    position: relative;
    z-index: 2;
    .btn-pagination {
      background-color: #ffffff;
    }
    @include media(767px) {
      margin: 32px 0 56px;
    }
  }
  &-list {
    display: flex;
    align-items: center;
    justify-content: center;
    @include media(767px) {
      width: 100%;
    }
  }
  &-item {
    font-family: $font-1b;
    font-size: vw(13px);
    line-height: vw(60px);
    text-transform: uppercase;
    height: vw(60px);
    width: vw(60px);
    transition: all 0.5s ease;
    border: 1px solid #ebebeb;
    background-color: #ffffff;
    outline: none;
    margin: 0 vw(6px);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1px;
    @include media(767px) {
      width: 60px;
      height: 60px;
      margin: 0 20px;
      font-size: 13px;
      line-height: 60px;
    }
    svg {
      width: vw(12px);
      height: vw(10px);
      @include media(767px) {
        width: 12px;
        height: 10px;
      }
    }
    &_points {
      border: none;
      color: $red;
      width: auto;
      white-space: nowrap;
    }
    &.disabled {
      cursor: not-allowed;
    }
    &:not(.disabled):hover {
      border-color: $red;
      color: $red;
    }
    &.pagination-active {
      color: #ffffff;
      background-color: $red;
      border-color: $red;
      &:hover {
        color: #ffffff;
      }
    }
    &:first-child {
      width: vw(90px);
      @include media(767px) {
        margin: 0;
        width: calc((100% - 100px) / 2);
      }
    }
    &:last-child {
      width: vw(90px);
      @include media(767px) {
        margin: 0;
        width: calc((100% - 100px) / 2);
      }
    }
  }
}
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: vw(14px);
  font-family: $font-1b;
  border: 1px solid #ebebeb;
  padding: 0 vw(45px);
  background: transparent;
  transition: all 0.5s ease;
  height: vw(60px);
  line-height: vw(60px);
  margin-right: vw(54px);
  @include media(767px) {
    width: 100%;
    order: 1;
    margin: 32px 0 0 0;
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
    font-size: 16px;
  }
  &:hover {
    background-color: $red;
    border-color: $red;
    color: #ffffff;
    svg {
      transform: rotate(45deg);
    }
  }
  svg {
    width: vw(20px);
    height: vw(20px);
    margin-right: vw(28px);
    transition: transform 0.3s ease;
    @include media(767px) {
      width: 20px;
      height: 20px;
      margin-right: 16px;
    }
  }
}
.gsapBottomPagination {
  opacity: 0;
  transform: translateY(100px);
}
</style>
