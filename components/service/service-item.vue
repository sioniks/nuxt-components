<template>
  <div class="block">
    <div class="block-content">
      <img
        :src="require(`~/assets/images/icons/${item.icon}?inline`)"
        alt=""
        class="block-content-img"
      />
      <h4 class="block-content-title">
        {{ item.title }}
      </h4>
    </div>
    <div class="block-photo">
      <div
        class="block-photo-pluses"
        :style="{ backgroundImage: `url(${plus})` }"
      ></div>
      <img
        :src="require(`~/assets/images/${item.img}?inline`)"
        alt=""
        class="block-photo-img"
      />
    </div>
  </div>
</template>

<script>
import plus from '~/assets/images/pluses.png';
export default {
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      plus
    };
  }
};
</script>
<style lang="scss" scoped>
.block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: vw(50px) vw(100px) vw(50px) vw(110px);
  &:nth-child(even) {
    flex-direction: row-reverse;
    .block-content {
      padding-right: 0;
      padding-left: vw(135px);
    }
    .block-photo {
      position: relative;
      width: vw(538px);
      &-pluses {
        position: absolute;
        width: calc(100% + 12vw);
        height: calc(100% + 6vw);
        left: -6vw;
        top: -3vw;
        z-index: -1;
      }
    }
  }
  &-content {
    width: 50%;
    &-title {
      max-width: vw(400px);
      font-size: vw(36px);
      font-family: $font-2b;
      line-height: 1.3;
      text-transform: uppercase;
    }
    img {
      height: unquote('max(10%, 75px)');
      width: auto;
      margin-bottom: vw(40px);
    }
  }
  &-photo {
    width: 50%;
    &-img {
      width: 100%;
    }
  }
}
</style>
