<template>
  <button class="btn btn--360"><Icon360 />360<span>&#176;</span> view</button>
</template>

<script>
import Icon360 from '~/assets/images/icons/icon360.svg';

export default {
  components: { Icon360 }
};
</script>

<style lang="scss">
.btn--360 {
  font-family: $font-1b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6em 0.9em;
  background: $red;
  color: #ffffff;
  font-size: vw(14px);
  line-height: 1.2;
  transition: color 0.3s ease, background-color 0.3s ease;
  @include media(1200px) {
    font-size: 12px;
  }
  span {
    margin-right: 5px;
  }
  .svg-icon {
    margin-right: 12px;
    fill: #ffffff;
    transition: fill 0.3s ease;
    @include media(767px) {
      width: 16px;
      height: 10px;
      margin-right: 10px;
    }
  }
  &:hover {
    color: $red;
    background: #ffffff;
    .svg-icon {
      fill: $red;
    }
  }
}
</style>
