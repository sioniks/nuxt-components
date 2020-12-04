<template>
  <div class="popup__wr">
    <IconClose @click="emitClosePopup" />
    <slot></slot>
  </div>
</template>

<script>
import IconClose from '~/assets/images/icons/close-icon.svg';

export default {
  components: { IconClose },

  methods: {
    emitClosePopup() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped lang="scss">
.popup__wr {
  position: fixed;
  z-index: 900;
  width: 100vw;
  height: 100vh;
  min-height: 50vw;
  background: rgba(#041c30, 0.85);
  top: 0;
  left: 0;
}
.svg-icon {
  position: absolute;
  right: 10vw;
  top: 1.5vw;
  cursor: pointer;
  fill: transparent;
  transition: fill 0.3s ease;
  @include media(767px) {
    top: 32px;
    right: 32px;
    width: 55px;
    height: 55px;
  }
  &:hover {
    fill: $red;
  }
}
</style>
