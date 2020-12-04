<template>
  <section class="section configure">
    <div class="container">
      <img
        :src="require(`~/assets/images/${bgImg}`)"
        alt=""
        class="configure-bg"
      />
      <div class="configure-content">
        <div class="configure-left">
          <h2 class="configure-left-title section__header">
            Configure your
            <br />
            WORLD’S FIRST HEAVY DUTY 4×4 OFF ROAD BUS
          </h2>
          <Button btn-type="red" btn-text="Configure  " />
        </div>
        <div class="configure-right">
          <img
            :src="require(`~/assets/images/${carImg}`)"
            alt=""
            class="configure-right-img"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Button from '~/components/ui/btn/btn';
export default {
  components: { Button },
  data() {
    return {
      carImg: ' -car.png',
      bgImg: 'gridbg.png'
    };
  }
};
</script>
<style lang="scss" scoped>
.configure {
  min-height: 45vw;
  margin: vw(128px) 0 vw(40px);
  display: flex;
  align-items: center;
  &-bg {
    height: vw(674px);
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    object-fit: contain;
    object-position: 50% 50%;
    z-index: -1;
    position: absolute;
  }
  &-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &-left {
    &-title {
      text-transform: uppercase;
      max-width: vw(650px);
      text-align: left;
      margin-bottom: vw(40px);
    }
  }
  &-right {
    width: vw(570px);
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    img {
      width: 100%;
    }
  }
}
</style>
