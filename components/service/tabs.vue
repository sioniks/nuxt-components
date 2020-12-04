<template>
  <div class="tabs">
    <div
      v-for="(tab, index) in tabs"
      :key="tab"
      class="tabs-item"
      :class="{ active: index === currentIndex }"
      @click="changeTab(index)"
    >
      {{ tab }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      tabs: [' ', ' ']
    };
  },
  methods: {
    changeTab(index) {
      this.currentIndex = index;
    }
  }
};
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  margin-top: vw(60px);
  &-item {
    font-size: vw(32px);
    color: #c2cfda;
    font-family: $font-2b;
    font-weight: bold;
    text-transform: uppercase;
    padding: 0 vw(105px) vw(30px) 0;
    border-bottom: vw(2px) solid #c2cfda;
    cursor: pointer;
    transition: color 0.5s ease;
    &.active {
      color: #d2131c;
      border-color: #d2131c;
    }
  }
}
</style>
