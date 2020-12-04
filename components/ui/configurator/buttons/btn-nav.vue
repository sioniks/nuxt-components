<template>
  <button
    :class="{ 'btn-prev': !options.isNext, 'btn-next': options.isNext }"
    @click="$emit('click-handler')"
  >
    {{ options.text }}
    <ArrowLeft v-if="!options.isNext" />
    <ArrowRight v-if="options.isNext" />
  </button>
</template>

<script>
import ArrowLeft from '~/assets/images/icons/arrow-left-conf.svg';
import ArrowRight from '~/assets/images/icons/arrow-right-conf.svg';
export default {
  components: {
    ArrowLeft,
    ArrowRight
  },
  props: {
    options: {
      type: Object,
      default: null
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  font-family: $font-2b;
  position: relative;
  min-width: vw(282px, 1920px);
  min-height: vw(80px, 1920px);
  font-size: vw(16px, 1920px);
  line-height: vw(20px, 1920px);
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: vw(30px, 1920px) vw(55px, 1920px);
  cursor: pointer;
  @include media(1440px) {
    min-width: vw(282px);
    min-height: vw(80px);
    font-size: vw(16px);
    line-height: vw(20px);
    padding: vw(30px) vw(55px);
  }
  @include media(767px) {
    min-width: auto;
    min-height: 40px;
    font-size: 16px;
    line-height: 40px;
    padding: 0;
  }
  svg {
    width: vw(19px, 1920px);
    height: vw(12px, 1920px);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    @include media(1440px) {
      width: vw(19px);
      height: vw(12px);
    }
    @include media(767px) {
      width: 17px;
      height: auto;
      position: static;
      margin-right: 10px;
      transform: none;
    }
  }
}
.btn-prev {
  background: #ffffff;
  border: 1px solid $gray;
  color: $gray;
  @include media(767px) {
    border: none;
    flex-direction: row-reverse;
    margin-right: 10px;
    &:hover {
      border: none;
    }
  }
  &:hover {
    border-color: $red;
    color: $red;
    svg {
      fill: $red;
    }
  }
  svg {
    left: vw(30px, 1920px);
    fill: $gray;
    @include media(1440px) {
      left: vw(30px);
    }
  }
}
.btn-next {
  border: 1px solid $red;
  background-color: $red;
  color: #ffffff;
  @include media(767px) {
    white-space: nowrap;
    padding: 0 20px;
    width: 150px;
  }
  &:hover {
    background-color: #ffffff;
    color: $red;
    svg {
      fill: $red;
    }
  }
  svg {
    right: vw(30px, 1920px);
    fill: #ffffff;
    @include media(1440px) {
      right: vw(30px);
    }
    @include media(767px) {
      display: none;
    }
  }
}
.btn-prev,
.btn-next {
  transition: background-color 0.35s ease, color 0.35s ease,
    border-color 0.35s ease;

  svg {
    transition: fill 0.35s ease;
  }
}
</style>
