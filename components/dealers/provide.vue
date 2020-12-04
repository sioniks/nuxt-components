<template>
  <section class="provide section">
    <div class="container">
      <h3 class="provide-title">will provide</h3>
      <div class="provide-list">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="provide-list-item"
        >
          <img
            :src="require(`~/assets/images/icons/${item.svg}?inline`)"
            alt=""
            class="provide-list-img"
          />
          <h4 class="provide-list-title">{{ item.title }}</h4>
          <p class="provide-list-description" v-html="item.text"></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          svg: 'provide1.svg',
          title: 'lorem',
          text:
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta, inventore?'
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.provide {
  padding: vw(110px) 0 vw(64px);
  background: #f9fafa;
  &-title {
    font-size: vw(40px);
    text-align: center;
    line-height: 1.3;
    font-family: $font-2b;
    text-transform: uppercase;
    color: $darkBlue;
  }
  &-list {
    margin-top: vw(58px);
    display: flex;
    flex-wrap: wrap;
    &-item {
      background: #ffffff;
      width: calc(95% / 3);
      margin: 0 2.5% vw(32px) 0;
      padding: vw(54px) vw(32px) vw(40px);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      min-height: vw(277px);
      &:nth-child(3n + 3) {
        margin-right: 0;
      }
    }
    &-img {
      height: vw(62px);
      width: auto;
      margin-bottom: vw(16px);
    }
    &-title {
      font-size: vw(18px);
      line-height: 1.3;
      font-family: $font-2b;
      text-transform: uppercase;
    }
    &-description {
      margin-top: vw(8px);
      color: $gray;
      font-size: vw(14px);
      line-height: 1.7;
    }
  }
}
</style>
