<template>
  <div class="select" :class="{ open: open }">
    <div class="select-title" @click="openSelect">
      {{ newTitle ? newTitle : title }} <ArrowIcon />
    </div>
    <ul v-show="open" class="select-list">
      <li
        v-for="(item, index) in getItems"
        :key="index"
        class="select-list-item"
        :class="{ active: item.id === active }"
        @click="changeItem(item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import ArrowIcon from '~/assets/images/icons/arrow-top.svg';
export default {
  components: { ArrowIcon },
  props: {
    items: {
      type: Array,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    loadId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      open: false,
      active: null,
      newTitle: null
    };
  },
  computed: {
    getItems() {
      const arrItem = {
        id: null,
        name: this.title
      };
      return [arrItem, ...this.items];
    }
  },
  mounted() {
    setTimeout(() => {
      document.addEventListener('click', this.clickOutside);
    }, 0);
    if (this.loadId) {
      const item = this.getItems.filter((item) => item.id === +this.loadId)[0];
      this.changeItem(item);
    }
  },
  beforeDestroy() {
    document.removeEventListener('click', this.clickOutside);
  },
  methods: {
    openSelect() {
      this.open = !this.open;
    },
    changeItem(item) {
      if (this.active !== item.id) {
        this.open = false;
        this.active = item.id;
        this.newTitle = item.name;
        this.$emit('changeSelect', item.id);
      }
    },
    clickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.open = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.select {
  position: relative;
  padding: 0 vw(23px);
  border: 1px solid transparent;
  border-bottom: none;
  @include media(767px) {
    padding: 0 16px;
  }
  &-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #ececec;
    font-family: $font-2b;
    font-size: vw(24px);
    line-height: 1.25;
    text-transform: uppercase;
    color: $red;
    cursor: pointer;
    padding: vw(29px) 0;
    @include media(767px) {
      padding: 7px 0;
      font-size: 16px;
    }
    &:hover {
      svg {
        transform: rotate(0);
      }
    }
    svg {
      width: vw(22px);
      height: vw(10px);
      transform: rotate(180deg);
      @include media(767px) {
        width: 9px;
        height: 4px;
      }
    }
  }
  &-list {
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    z-index: 2;
    background: #ffffff;
    overflow: auto;
    border: 1px solid transparent;
    border-top: none;
    padding: 0 vw(23px);
    @include media(767px) {
      padding: 0 16px;
    }
    &-item {
      padding: vw(29px) 0;
      cursor: pointer;
      border-bottom: 2px solid #ececec;
      font-family: $font-2b;
      font-size: vw(24px);
      line-height: 1.25;
      text-transform: uppercase;
      transition: color 0.3s ease;
      @include media(767px) {
        padding: 7px 0;
        font-size: 16px;
      }
      &:hover {
        color: $red;
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
  &.open {
    border: 1px solid #ececec;
    border-bottom: none;
    background: #ffffff;
    .select-list {
      border: 1px solid #ececec;
      border-top: none;
    }
    svg {
      transform: rotate(0);
    }
    path {
      fill: $red;
    }
  }
  path {
    transition: fill 0.3s ease;
  }
}
</style>
