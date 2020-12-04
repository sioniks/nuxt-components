<template>
  <section class="summary-total">
    <div
      v-for="(option, index) in summary.data"
      :key="index"
      class="summary-total__wr"
    >
      <div class="summary-total__header" @click="accordionToggle">
        <span class="summary-total__option-type">
          {{ option.type }}
          <strong v-if="option.type === 'vehicle'">{{ summary.name }}</strong>
        </span>
        <span v-if="option.price > 0" class="summary-total__price">
          &euro;{{ option.price | priceFormat }}
          <ArrowTop class="summary-total__arrow" />
        </span>
        <span v-else class="summary-total__price">
          No Cost
          <ArrowTop class="summary-total__arrow" />
        </span>
      </div>
      <div class="summary-total__content">
        <div class="summary-total__left">Options</div>
        <div v-if="option.items.length" class="summary-total__right">
          <div
            v-for="(item, rowIndex) in option.items"
            :key="rowIndex"
            class="summary-total__row"
          >
            <span class="summary-total__row-title">{{ item.title }}</span>
            <span class="summary-total__row-value">
              &euro;{{ item.additional_price | priceFormat }}
            </span>
          </div>
        </div>
        <div v-else class="summary-total__right">No options selected</div>
      </div>
    </div>
    <div class="summary-total__value">
      <span>Total Build</span>
      <span>&euro;{{ summary.totalPrice | priceFormat }}</span>
    </div>
  </section>
</template>

<script>
import ArrowTop from '~/assets/images/icons/arrow-top.svg';
export default {
  components: {
    ArrowTop
  },
  props: {
    summary: {
      type: Object,
      default: null
    }
  },
  methods: {
    accordionToggle(e) {
      const wrap = e.target.closest('.summary-total__wr');
      if (wrap) {
        wrap.classList.toggle('opened');
        if (wrap.style.maxHeight) {
          wrap.style.maxHeight = null;
        } else {
          wrap.style.maxHeight =
            (wrap.scrollHeight / window.innerWidth) * 100 + 'vw';
        }
      }
    }
  }
};
</script>
<style lang="scss">
.summary-total {
  &__wr {
    border-bottom: 1px solid #ebebeb;
    display: flex;
    flex-direction: column;
    max-height: vw(88px, 1920px);
    overflow: hidden;
    transition: max-height 0.5s ease;
    @include media(1440px) {
      max-height: vw(88px);
    }
    @include media(767px) {
      max-height: 87px;
      padding: 12px 0;
    }
    &:first-child {
      border-top: 1px solid #ebebeb;
    }

    &.opened {
      .summary-total__price {
        color: $black;
        svg {
          transform: rotate(0deg);
          path {
            fill: $red;
          }
        }
      }

      .summary-total__content {
        opacity: 1;
      }
    }
  }

  &__header {
    padding: vw(32px, 1920px) 0;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    @include media(1440px) {
      padding: vw(32px) 0;
    }
    @include media(767px) {
      padding: 20px 0;
    }
    &:hover {
      .summary-total__option-type {
        color: $red;

        strong {
          color: $gray;
        }
      }

      .summary-total__price {
        color: $black;
        svg {
          path {
            fill: $red;
          }
        }
      }
    }
  }

  &__option-type {
    font-size: vw(22px, 1920px);
    line-height: vw(24px, 1920px);
    color: $black;
    font-family: $font-2b;
    transition: color 0.35s ease;
    @include media(1440px) {
      font-size: vw(22px);
      line-height: vw(24px);
    }
    @include media(767px) {
      font-size: 18px;
      line-height: 1.33;
    }
    strong {
      color: $gray;
    }
  }

  &__price {
    font-size: vw(18px, 1920px);
    line-height: vw(21px, 1920px);
    color: $gray;
    display: flex;
    align-items: center;
    transition: color 0.35s ease;
    @include media(1440px) {
      font-size: vw(18px);
      line-height: vw(21px);
    }
    @include media(767px) {
      font-size: 16px;
      line-height: 1.17;
    }
    svg {
      margin-left: vw(12px, 1920px);
      width: vw(12px, 1920px);
      height: vw(5px, 1920px);
      transform: rotate(-180deg);
      transition: transform 0.35s ease;
      @include media(1440px) {
        margin-left: vw(12px);
        width: vw(12px);
        height: vw(5px);
      }
      @include media(767px) {
        width: 12px;
        height: 5px;
        margin-left: 12px;
      }
      path {
        fill: $gray;
        transition: fill 0.35s ease;
      }
    }
  }

  &__content {
    display: flex;
    padding-bottom: vw(32px, 1920px);
    opacity: 0;
    transition: opacity 0.4s ease;
    @include media(1440px) {
      padding-bottom: vw(32px);
    }
    @include media(767px) {
      padding-bottom: 20px;
      flex-direction: column;
    }
  }

  &__left {
    width: 34%;
    color: $black;
    font-family: $font-1b;
    font-size: vw(20px, 1920px);
    line-height: vw(23px, 1920px);
    @include media(1440px) {
      font-size: vw(20px);
      line-height: vw(23px);
    }
    @include media(767px) {
      width: 100%;
      font-size: 16px;
      line-height: 1.17;
      margin-bottom: 8px;
    }
  }

  &__right {
    width: 66%;
    padding-right: vw(25px, 1920px);
    @include media(1440px) {
      padding-right: vw(25px);
    }
    @include media(767px) {
      width: 100%;
      margin: 0;
    }
  }

  &__row {
    margin-bottom: vw(16px, 1920px);
    display: flex;
    align-items: center;
    @include media(1440px) {
      margin-bottom: vw(16px);
    }
    @include media(767px) {
      margin-bottom: 12px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    &:last-child {
      margin-bottom: 0;
    }

    &-title {
      color: $black;
      font-size: vw(18px, 1920px);
      line-height: vw(28px, 1920px);
      @include media(1440px) {
        font-size: vw(18px);
        line-height: vw(28px);
      }
      @include media(767px) {
        font-size: 16px;
        line-height: 1.17;
        padding-right: 10px;
      }
    }

    &-value {
      color: $black;
      font-size: vw(16px, 1920px);
      line-height: vw(19px, 1920px);
      margin-left: auto;
      @include media(1440px) {
        font-size: vw(16px);
        line-height: vw(19px);
      }
      @include media(767px) {
        font-size: 16px;
        line-height: 1.17;
        white-space: nowrap;
        flex-shrink: 0;
      }
    }
  }

  &__value {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: vw(80px, 1920px);
    margin-bottom: vw(80px, 1920px);
    @include media(1440px) {
      margin-top: vw(80px);
      margin-bottom: vw(80px);
    }
    @include media(767px) {
      margin: 32px 0 64px;
    }
    span {
      color: $black;
      font-size: vw(32px, 1920px);
      line-height: 1;
      font-family: $font-1b;
      @include media(1440px) {
        font-size: vw(32px);
      }
      @include media(767px) {
        font-size: 20px;
        line-height: 1.25;
      }
    }
  }
}
</style>
