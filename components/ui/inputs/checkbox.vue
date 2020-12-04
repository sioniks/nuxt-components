<template>
  <label class="check">
    <input
      class="check-input"
      type="checkbox"
      :name="
        option.attribute_option_category
          ? option.attribute_option_category.slug
          : name
      "
      @change="changeCheckbox($event, option, name)"
    />
    <span class="check-text">
      <span><CheckIcon /></span>
      {{ option ? option.name : '' }}
    </span>
  </label>
</template>

<script>
import CheckIcon from '~/assets/images/icons/check.svg';
export default {
  components: { CheckIcon },
  props: {
    name: {
      type: String,
      default: null
    },
    option: {
      type: Object,
      default: null
    }
  },
  methods: {
    changeCheckbox(event, option, name) {
      this.$nuxt.$emit('changeCheckbox', option, name, event.target.checked);
    }
  }
};
</script>
<style lang="scss" scoped>
.check {
  position: relative;
  padding: vw(6px) 0;
  display: block;
  cursor: pointer;
  @include media(767px) {
    padding: 0;
  }
  &-input {
    position: absolute;
    width: 0;
    height: 0;
    visibility: hidden;
    &:checked {
      ~ .check-text {
        color: $red;
        span {
          background-color: $red;
          border-color: $red;
        }
      }
    }
  }
  &-text {
    font-size: vw(16px);
    cursor: pointer;
    display: inline-flex;
    align-items: flex-end;
    @include media(767px) {
      font-size: 14px;
    }
    span {
      width: vw(16px);
      height: vw(16px);
      min-width: 16px;
      min-height: 16px;
      border-radius: vw(3px);
      border: 1px solid $gray;
      margin-right: vw(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      @include media(767px) {
        width: 16px;
        height: 16px;
        margin-right: 12px;
      }
    }
    svg {
      width: vw(9px);
      @include media(767px) {
        width: 9px;
      }
    }
  }
}
</style>
