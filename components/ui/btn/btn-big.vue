<template>
  <button class="btn btn--big">
    <div class="btn-text">{{ btnText }}</div>
    <ArrRightIcon />
  </button>
</template>
<script>
import ArrRightIcon from '~/assets/images/icons/right-arr.svg';
export default {
  components: {
    ArrRightIcon
  },
  props: {
    btnText: {
      type: String,
      default: 'Go'
    }
  }
};
</script>
<style lang="scss" scope>
.btn.btn--big {
  font-family: $font-2b;
  font-size: vw(16px);
  line-height: 1;
  text-transform: uppercase;
  background: #f9fafa;
  color: #041c30;
  cursor: pointer;
  padding: 70px 24px 24px;
  min-height: 110px;
  min-width: 310px;
  position: relative;
  margin-right: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // grid-template-columns: 2fr 1fr;
  transition: color 0.3s ease, background-color 0.3s ease;
  @include media(1200px) {
    margin-right: 10px;
    width: 50%;
    font-size: 16px;
    &:last-child {
      margin-right: 0;
    }
  }
  &:before {
    content: '';
    position: absolute;
    left: 24px;
    top: 24px;
    width: 24px;
    height: 2px;
    background: $red;
  }
  &:hover {
    background: $red;
    color: #ffffff;
    &:before {
      background: #ffffff;
    }
    .svg-icon {
      fill: #ffffff;
    }
  }
  .btn-text {
    height: fit-content;
  }
  .svg-icon {
    width: 24px;
    height: auto;
    display: flex;
    fill: #919aa1;
    margin-left: 10px;
    margin-bottom: 3px;
  }
}
</style>
