<template>
  <section class="section feature">
    <div class="container">
      <div class="feature-content">
        <h2 class="feature-content-title section__header">service features</h2>
        <ServiceItem
          v-for="(item, index) in blocksItems"
          :key="index"
          :item="item"
        />
      </div>
    </div>
  </section>
</template>

<script>
import ServiceItem from '~/components/service/service-item';

export default {
  components: {
    ServiceItem
  },
  data() {
    return {
      blocksItems: [
        {
          img: 'service-img1.jpg',
          title: '  provides up to 30 years warranty on rust',
          icon: 'warranty.svg'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.feature {
  &-list {
    display: flex;
    justify-content: space-between;
    &-item {
      padding: vw(32px);
      background: #f9fafa;
      margin-right: vw(24px);
      width: 100%;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &-content {
    padding: vw(72px) 0 0;
    &-title {
      text-align: left;
      text-transform: uppercase;
    }
  }
}
.item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &-top {
    display: flex;
    justify-content: flex-start;
    margin-bottom: vw(52px);
    &-img {
      margin-left: auto;
    }
    &-info {
      color: #041c30;
      font-size: vw(16px);
      font-weight: bold;
      font-family: $font-2b;
      display: flex;
      align-items: center;
      svg {
        width: vw(12px);
        height: vw(18px);
        margin-right: vw(8px);
      }
    }
  }
  &-bottom {
    &-description {
      font-size: vw(16px);
      line-height: 1.18;
      margin-bottom: vw(13px);
    }
    &-title {
      font-size: vw(24px);
      line-height: 1.25;
      font-family: $font-2b;
    }
  }
  &:first-child {
    .item-top-img {
      width: vw(72px);
      height: vw(62px);
    }
  }
  &:nth-child(2) {
    .item-top-img {
      width: vw(63px);
      height: vw(63px);
    }
  }
  &:last-child {
    .item-top-img {
      width: vw(112px);
      height: vw(38px);
    }
  }
}
</style>
