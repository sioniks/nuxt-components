<template>
  <label class="card-radio">
    <input
      class="card-radio__input"
      type="radio"
      :name="option.name"
      :checked="option.is_active"
      @change="changeRadio(option, itemsArr, $event)"
    />
    <span>
      <span class="card-radio__inner"></span>
    </span>
  </label>
</template>

<script>
export default {
  props: {
    option: {
      type: Object,
      default: null
    },
    itemsArr: {
      type: Array,
      default: null
    },
    callback: {
      type: Function,
      default: null
    }
  },
  methods: {
    changeRadio(option, items, e) {
      this.$nuxt.$emit('changeCardRadio', option, items, e.target.checked);
      if (typeof this.callback === 'function') {
        this.callback(e);
      }
    }
  }
};
</script>
<style lang="scss">
.card-radio {
  position: relative;
  display: inline-flex;
  cursor: pointer;
  &__input {
    position: absolute;
    width: 0;
    height: 0;
    visibility: hidden;
    opacity: 0;
    &:checked {
      ~ span {
        .card-radio__inner {
          background-color: $red;
        }
      }
    }
  }
  span {
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: vw(32px, 1920px);
    height: vw(32px, 1920px);
    min-width: 32px;
    min-height: 32px;
    background: #ffffff;
    border: 1px solid #dbdbdb;
    transition: border-color 0.35s ease;
    @include media(1440px) {
      width: vw(32px);
      height: vw(32px);
    }
    @include media(767px) {
      width: 22px;
      height: 22px;
      min-width: auto;
      min-height: auto;
    }
    .card-radio__inner {
      width: vw(16px, 1920px);
      height: vw(16px, 1920px);
      min-width: 16px;
      min-height: 16px;
      background-color: transparent;
      display: block;
      border: none;
      @include media(1440px) {
        width: vw(16px);
        height: vw(16px);
      }
      @include media(767px) {
        width: 10px;
        height: 10px;
        min-width: auto;
        min-height: auto;
      }
    }
  }
}
</style>
