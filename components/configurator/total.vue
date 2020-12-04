<template>
  <div class="bus-total" :class="{ pdf: toPdf }">
    <header class="bus-total__header">
      <span class="bus-total__name">{{ data.name }}</span>
      <span class="bus-total__base-price">
        {{ toPdf ? 'EUR ' : '&euro;' }}{{ data.busPrice | priceFormat }}
      </span>
    </header>
    <main class="bus-total__main">
      <perfect-scrollbar>
        <div
          v-for="(option, index) in data.options"
          :key="index"
          class="bus-total__option"
          :class="{
            'bus-total__option--last': index === data.options.length - 1
          }"
        >
          <div class="bus-total__option-title">
            {{ option.title }}
          </div>
          <div
            v-for="(item, itemIndex) in option.items"
            :key="itemIndex"
            class="bus-total__option-type"
          >
            <span>{{ item.title }}</span>
            <span class="bus-total__option-active">
              {{ activeText(option, item) }} - {{ toPdf ? 'EUR ' : '&euro;'
              }}{{ item.additional_price | priceFormat }}
            </span>
          </div>
        </div>
      </perfect-scrollbar>
    </main>
    <footer class="bus-total__footer">
      <span class="bus-total__footer-total">Total Build</span>
      <span class="bus-total__calculate">
        <span class="bus-total__calculate-price">
          {{ toPdf ? 'EUR ' : '&euro;' }}{{ data.totalPrice | priceFormat }}
        </span>
        <span class="bus-total__calculate-leasing">
          {{ toPdf ? 'EUR ' : '&euro;'
          }}{{ +data.leasing.toFixed(0) | priceFormat }} /month
        </span>
      </span>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    },
    toPdf: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    activeText(option, item) {
      if (item.is_included) {
        return 'Included';
      } else if (['select', 'radiobutton'].includes(option.selection_type)) {
        return 'Selected';
      } else {
        return 'Added';
      }
    }
  }
};
</script>

<style lang="scss">
.bus-total {
  background-color: #ffffff;
  width: 100%;
  &.pdf {
    width: 600px;
    .bus-total {
      &__main {
        height: auto;
      }
      &__header,
      &__footer {
        padding: 0 25px;
        height: 72px;
      }

      &__footer-total {
        font-size: 16px;
        line-height: 18px;
      }

      &__name {
        font-size: 25px;
        line-height: 32px;
      }

      &__base-price {
        font-size: 24px;
        line-height: 28px;
      }

      &__calculate {
        &-price {
          font-size: 18px;
          line-height: 21px;
        }

        &-leasing {
          font-size: 12px;
          line-height: 14px;
        }
      }

      &__option {
        padding: 20px 0 24px 0;
        &-title {
          font-size: 16px;
          line-height: 24px;
          margin-bottom: 13px;
        }

        &-type {
          font-size: 12px;
          line-height: 14px;
          &:not(:nth-last-of-type(1)) {
            margin-bottom: 13px;
          }
        }
      }
    }

    .ps {
      padding: 0 25px;
    }
  }

  &__header,
  &__footer {
    background-color: rgba(238, 243, 248, 0.5);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 vw(40px);
  }

  &__header {
    height: vw(84px);
  }

  &__footer {
    height: vw(65px);
    &-total {
      font-size: vw(18px);
      line-height: vw(21px);
      color: $black;
      font-family: $font-1b;
    }
  }

  &__name {
    font-family: $font-2b;
    color: $black;
    font-size: vw(25px);
    line-height: vw(32px);
    text-transform: uppercase;
  }

  &__base-price {
    font-size: vw(24px);
    line-height: vw(28px);
    color: #000000;
    font-family: $font-1b;
  }

  &__calculate {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    &-price {
      font-size: vw(18px);
      line-height: vw(21px);
      color: #000000;
      font-family: $font-1b;
      margin-bottom: vw(4px);
    }

    &-leasing {
      color: $gray;
      font-size: vw(12px);
      line-height: vw(14px);
    }
  }

  &__main {
    height: 37vh;
    position: relative;
  }

  &__option {
    padding: vw(20px) 0 vw(24px) 0;
    border-bottom: 1px solid #ebebeb;
    &--last {
      border-bottom: none;
    }
    &-active {
      flex-shrink: 0;
    }
    &-title {
      color: $darkBlue;
      font-size: vw(16px);
      line-height: vw(24px);
      font-family: $font-2b;
      text-transform: uppercase;
      margin-bottom: vw(13px);
    }

    &-type {
      font-size: vw(12px);
      line-height: vw(14px);
      display: flex;
      justify-content: space-between;
      &:not(:nth-last-of-type(1)) {
        margin-bottom: vw(13px);
      }
    }
  }

  .ps {
    height: 100%;
    padding: 0 vw(40px);
    &__rail-y {
      opacity: 1 !important;
      width: vw(3px);
      max-width: vw(3px);
      background-color: #f0f3f6 !important;
    }

    &__thumb-y {
      background: $red !important;
      border-radius: 0;
      opacity: 1;
      width: vw(3px);
      max-width: vw(3px);
      position: absolute;
      right: 0;
    }
  }
}
</style>
