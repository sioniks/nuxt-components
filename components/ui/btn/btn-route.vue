<template>
  <button class="btn">
    <ArrowIcon />
    <div class="btn-text">Get Google Maps Route</div>
  </button>
</template>

<script>
import ArrowIcon from '~/assets/images/icons/arrow-btn.svg';
export default {
  components: {
    ArrowIcon
  }
};
</script>
<style lang="scss" scoped>
.btn {
  display: flex;
  align-items: center;
  font-size: vw(14px);
  font-family: $font-1b;
  border: 1px solid #ebebeb;
  padding: vw(22px) vw(25px);
  background: #ffffff;
  transition: color 0.3s ease, background-color 0.3s ease,
    border-color 0.3s ease;
  &:hover {
    background-color: $red;
    border-color: $red;
    color: #ffffff;
  }
  svg {
    width: vw(17px);
    margin-right: vw(16px);
  }
}
</style>
