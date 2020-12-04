<template>
  <section class="mandatory section">
    <div class="container">
      <h2 class="mandatory-title">
        Dealership mandatory<br />
        requirements
      </h2>
      <div class="mandatory-list">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="mandatory-list-item"
        >
          <div class="mandatory-list-number">
            {{ index + 1 > 9 ? index + 1 : `0${index + 1}` }}
          </div>
          <div class="mandatory-list-text">{{ item }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  }
};
</script>
<style lang="scss" scoped>
.mandatory {
  padding: vw(120px) 0 vw(45px);
  position: relative;
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 13vw;
    left: 0;
    top: 0;
    background: url('~@/assets/images/pluses.png');
    z-index: -1;
  }
  &-title {
    font-size: vw(40px);
    line-height: 1.3;
    font-family: $font-2b;
    text-transform: uppercase;
    color: $darkBlue;
  }
  &-list {
    margin-top: vw(64px);
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    &-item {
      width: 37%;
      padding-right: 11%;
      margin-bottom: vw(44px);
      &:nth-child(3n + 3) {
        width: 26%;
        padding-right: 0;
      }
    }
    &-number {
      font-size: vw(32px);
      line-height: 1.15;
      color: #d2131c;
      margin-bottom: vw(10px);
    }
    &-text {
      font-size: vw(18px);
      line-height: 1.78;
      color: #586774;
    }
  }
}
</style>
