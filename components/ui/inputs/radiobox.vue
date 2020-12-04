<template>
  <label class="radio">
    <input
      class="radio-input"
      type="radio"
      :name="
        option.attribute_option_category
          ? option.attribute_option_category.slug
          : name
      "
      :data-all="option.is_all_option"
      @change="changeRadiobox(option, name)"
    />
    <span class="radio-text">
      <span></span>
      {{ option ? option.name : '' }}
    </span>
  </label>
</template>

<script>
export default {
  components: {},
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
    changeRadiobox(option, name) {
      this.$nuxt.$emit('changeRadiobox', option, name);
    }
  }
};
</script>
<style lang="scss" scoped>
.radio {
  position: relative;
  padding: vw(6px) 0;
  display: block;
  cursor: pointer;
  @include media(767px) {
    padding: 0;
  }
  &-input {
    position: absolute;
    visibility: hidden;
    width: 0;
    height: 0;
    &:checked {
      ~ .radio-text {
        color: $red;
        span {
          border-width: 4px;
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
      border-radius: 50%;
      border: 1px solid $gray;
      margin-right: vw(12px);
      @include media(767px) {
        width: 16px;
        height: 16px;
        margin-right: 12px;
      }
    }
  }
}
</style>
