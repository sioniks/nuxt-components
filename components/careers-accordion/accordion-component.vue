<template>
  <div>
    <div
      v-for="(item, index) in items"
      :key="index"
      class="accordion-component"
    >
      <div class="accordion-component-title">{{ item.title }}</div>
      <ul class="accordion-component-list">
        <li
          v-for="(listItem, listIndex) in item.items"
          :key="listIndex"
          class="accordion-component-item"
        >
          {{ listItem.content }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.accordion {
  &-component {
    &-title {
      font-family: $font-2b;
      font-size: vw(20px);
      line-height: 1.25;
      @include media(767px) {
        font-size: 20px;
      }
    }
    &-list {
      margin: vw(16px) 0 vw(32px);
      @include media(767px) {
        margin: 10px 0 22px;
      }
    }
    &-item {
      font-size: vw(18px);
      line-height: 1.3;
      position: relative;
      padding: vw(16px) 0 vw(16px) vw(26px);
      @include media(767px) {
        padding: 10px 0 10px 26px;
        font-size: 14px;
        line-height: 1.5;
      }
      &:after {
        content: '';
        width: vw(8px);
        height: vw(8px);
        background: #ebebeb;
        position: absolute;
        left: 0;
        top: vw(26px);
        @include media(767px) {
          width: 8px;
          height: 8px;
          top: 15px;
        }
      }
    }
  }
}
</style>
