<template>
  <label class="card-checkbox">
    <input
      class="card-checkbox__input"
      type="checkbox"
      :name="option.name"
      :checked="option.is_active"
      @change="changeCheckbox(option, $event.target.checked)"
    />
    <span class="card-checkbox__text">
      <span v-show="option.is_active" class="card-checkbox__icon">
        <CheckMark />
      </span>
      <span
        v-show="!option.is_active"
        class="card-checkbox__icon card-checkbox__icon--plus"
      >
        <Plus />
      </span>
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
import Plus from '~/assets/images/icons/plus.svg';
export default {
  components: {
    CheckMark,
    Plus
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
    }
  },
  methods: {
    changeCheckbox(option, isChecked) {
      this.$nuxt.$emit('changeCardCheckbox', option, isChecked);
    }
  }
};
</script>
<style lang="scss">
.card-checkbox {
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
      ~ .card-checkbox__text {
        font-family: $font-1b;
        .card-checkbox__icon {
          background-color: $red;
          border-color: $red;
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
    .card-checkbox__icon {
      width: vw(32px, 1920px);
      height: vw(32px, 1920px);
      background: #ffffff;
      border: vw(2px) solid #dadada;
      border-radius: 50%;
      margin-right: vw(12px, 1920px);
      display: flex;
      justify-content: center;
      align-items: center;
      transition: border-color 0.35s ease;
      @include media(1440px) {
        width: vw(32px);
        height: vw(32px);
        margin-right: vw(12px);
      }
      @include media(767px) {
        width: 20px;
        height: 20px;
        margin-right: 12px;
        border-width: 1px;
      }
      svg {
        width: vw(16px, 1920px);
        height: vw(16px, 1920px);
        @include media(1440px) {
          width: vw(16px);
          height: vw(16px);
        }
        @include media(767px) {
          width: 10px;
          height: 10px;
        }
        path {
          fill: #dfdfdf;
          transition: fill 0.35s ease;
        }
      }
    }
  }
}
</style>
