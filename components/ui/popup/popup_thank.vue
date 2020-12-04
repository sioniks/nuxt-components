<template>
  <div class="popup__wr">
    <div class="popup_thank-content">
      <div class="section__header">Thank you for contacting us</div>
      <div class="section__subheader">Our manager will contact you shortly</div>
      <Button btn-type="red" btn-text="Ok" @click.native="emitClosePopup()" />
    </div>

    <Curve1 class="curve1" />
    <Curve2 class="curve2" />
  </div>
</template>

<script>
import Button from '~/components/ui/btn/btn';

import Curve1 from '~/assets/images/curve13.svg';
import Curve2 from '~/assets/images/curve14.svg';

export default {
  components: { Button, Curve1, Curve2 },
  methods: {
    emitClosePopup() {
      this.$nuxt.$emit('openThankPopup', { isOpen: false });
    }
  }
};
</script>

<style scoped lang="scss">
.popup__wr {
  position: fixed;
  z-index: 9000;
  width: 100vw;
  height: 100vh;
  min-height: 50vw;
  overflow: hidden;
  background: #041c30;
  padding: vw(80px) 0;
  top: 0;
  left: 0;
  .popup_thank-content {
    width: 50%;
    margin: 0 auto;
    text-align: center;
    padding-top: vw(120px);
    z-index: 5;
    position: relative;
  }
  .section__header {
    color: #ffffff;
    text-transform: uppercase;
    font-size: vw(48px);
    margin-bottom: vw(20px);
  }
  .section__subheader {
    color: #ffffff;
    font-size: vw(24px);
    margin-bottom: vw(48px);
  }
  .btn {
    min-width: vw(259px);
  }
  .curve1 {
    position: absolute;
    z-index: 0;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: vw(717px);
    height: vw(492px);
  }
  .curve2 {
    position: absolute;
    z-index: 0;
    bottom: 0;
    left: 0;
    width: vw(716px);
    height: vw(443px);
  }
}
</style>
