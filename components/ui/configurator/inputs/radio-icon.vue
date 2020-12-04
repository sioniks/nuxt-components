<template>
  <label class="card-radio-icon">
    <input
      class="card-radio-icon__input"
      type="radio"
      :name="option.name"
      :checked="option.is_active"
      @change="changeRadio(option, itemsArr, $event.target.checked)"
    />
    <span class="card-radio-icon__text">
      <span class="card-radio-icon__icon"><CheckMark /></span>
      <span v-show="!option.is_active">
        {{ defaultText || '' }}
      </span>
      <span v-show="option.is_active">
        {{ activeText || '' }}
      </span>
    </span>
  </label>
</template>

<script>
import CheckMark from '~/assets/images/icons/checkmark.svg';
export default {
  components: {
    CheckMark
  },
  props: {
    defaultText: {
      type: String,
      default: null
    },
    activeText: {
      type: String,
      default: null
    },
    option: {
      type: Object,
      default: null
    },
    itemsArr: {
      type: Array,
      default: null
    }
  },
  methods: {
    changeRadio(option, items, isChecked) {
      this.$nuxt.$emit('changeCardRadio', option, items, isChecked);
    }
  }
};
</script>
<style lang="scss">
.card-radio-icon {
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
      ~ .card-radio-icon__text {
        font-family: $font-1b;
        .card-radio-icon__icon {
          border-radius: 50%;
          background-color: $red;
          border-color: $red;
          display: flex;
          justify-content: center;
          align-items: center;
          svg {
            display: block;
            width: vw(16px, 1920px);
            height: vw(11px, 1920px);
            @include media(1440px) {
              width: vw(16px);
              height: vw(11px);
            }
            @include media(767px) {
              width: 10px;
              height: 7px;
            }
            path {
              fill: #ffffff;
            }
          }
        }
      }
    }
  }
  &__text {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    transition: color 0.35s ease;
    .card-radio-icon__icon {
      width: vw(32px, 1920px);
      height: vw(32px, 1920px);
      background: #ffffff;
      border: vw(2px) solid #dadada;
      border-radius: vw(3px, 1920px);
      margin-right: vw(12px, 1920px);
      transition: border-color 0.35s ease;
      @include media(1440px) {
        width: vw(32px);
        height: vw(32px);
        border-radius: vw(3px);
        margin-right: vw(12px);
      }
      @include media(767px) {
        width: 20px;
        height: 20px;
        border-width: 1px;
        margin-right: 12px;
      }
      svg {
        display: none;
      }
    }
  }
}
</style>
