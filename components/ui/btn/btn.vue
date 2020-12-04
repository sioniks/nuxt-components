<template>
  <button class="btn" :class="btnType">
    <IconChain v-if="chain" /> <IconArrow v-if="arrow" />{{ btnText }}
  </button>
</template>
<script>
import IconChain from '~/assets/images/icons/chain.svg';
import IconArrow from '~/assets/images/icons/arrow-right.svg';

export default {
  components: {
    IconChain,
    IconArrow
  },
  props: {
    btnType: {
      type: String,
      default: ''
    },
    chain: {
      type: Boolean,
      default: false
    },
    arrow: {
      type: Boolean,
      default: false
    },
    btnText: {
      type: String,
      default: 'Go'
    }
  }
};
</script>
<style lang="scss">
.btn {
  font-family: $font-2b;
  font-size: vw(16px);
  line-height: vw(60px);
  text-transform: uppercase;
  height: vw(60px);
  min-width: unquote('min(8vw, 150px)');
  background: none;
  transition: color 0.5s ease, background-color 0.5s ease,
    border-color 0.5s ease;
  padding: 0 vw(36px);
  border: 1px solid transparent;
  outline: none;
  cursor: pointer;
  @include media(767px) {
    height: 56px;
    line-height: 56px;
    font-size: 16px;
    padding: 0 10px;
  }
  &_buying {
    background: blue;
    height: vw(60px);
    width: vw(356px);
    white-space: nowrap;
    @include media(767px) {
      height: 64px;
      line-height: 64px;
      width: 100%;
      padding: 0 10px;
    }
  }
  &_banner {
    min-width: unquote('min(21vw, 287px)');
    height: vw(64px);
    line-height: vw(64px);
    @include media(767px) {
      min-width: 100%;
      height: 64px;
      line-height: 64px;
    }
  }
  &.red {
    background: $red;
    color: #ffffff;
    &:hover {
      background: #ffffff;
      color: $red;
      border: 1px solid $red;

      .svg-icon {
        fill: $red;
      }
    }
    .svg-icon {
      fill: #ffffff;
      margin-right: vw(20px);
      width: vw(12px);
      height: vw(12px);
      @include media(767px) {
        width: 12px;
        height: 12px;
        margin-right: 10px;
      }
    }
  }
  &_arrow {
    min-width: unquote('min(20vw, 295px)');
    &.red {
      .svg-icon {
        transform: rotate(180deg);
        width: vw(16px);
        height: vw(11px);
        path {
          fill: #ffffff;
        }
      }
    }
  }
  &.red-black {
    background: $red;
    color: #ffffff;
    &:hover {
      background: #ffffff;
      color: $red;
      border: 1px solid transparent;

      .svg-icon {
        fill: $red;
      }
    }
    .svg-icon {
      fill: #ffffff;
      margin-right: 1em;
    }
  }
  &.tr-w {
    color: #ffffff;
    border: 1px solid #ebebeb;
    &:hover {
      border: 1px solid $red;
      background: $red;
      color: #041c30;
    }
  }
  &.tr {
    color: #041c30;
    border: 1px solid #c2cfda;
    &:hover {
      border: 1px solid $red;
      background: $red;
      color: #ffffff;
    }
  }
}
</style>
