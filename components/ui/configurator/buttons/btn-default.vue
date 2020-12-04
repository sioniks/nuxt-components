<template>
  <button
    :class="{
      'btn-red': type === 'red',
      'btn-upper': upper
    }"
    @click="$emit('click')"
  >
    <slot name="icon"></slot>
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'default'
    },
    text: {
      type: String,
      default: ''
    },
    upper: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  border: 1px solid #ebebeb;
  background-color: #ffffff;
  font-size: vw(16px, 1920px);
  line-height: vw(19px, 1920px);
  color: $black;
  outline: none;
  padding: 0 vw(20px, 1920px);
  height: vw(60px, 1920px);
  transition: border-color 0.35s, background-color 0.35s, color 0.35s;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: $font-1b;
  margin: 0;
  @include media(1440px) {
    font-size: vw(16px);
    line-height: vw(19px);
    padding: 0 vw(20px);
    height: vw(60px);
  }

  svg {
    margin-right: vw(12px, 1920px);
    fill: $black;
    transition: fill 0.35s;
    @include media(1440px) {
      margin-right: vw(12px);
    }
  }

  &:hover {
    border-color: $red;
    color: $red;

    svg {
      fill: $red;
    }
  }

  &.btn-red {
    background-color: $red;
    border-color: $red;
    color: #ffffff;

    svg {
      fill: #ffffff;
    }
  }

  &.btn-upper {
    text-transform: uppercase;
  }
}
</style>
