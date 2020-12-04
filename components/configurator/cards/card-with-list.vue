<template>
  <article
    class="card-list card"
    :class="{ 'card--active': options.is_active }"
  >
    <header class="card-list__header">
      <div class="card-list__about">
        <p class="card-list__title card__title">{{ options.title }}</p>
        <p class="card-list__subtitle">{{ options.subtitle || '' }}</p>
      </div>
      <img
        v-if="options.image"
        :src="options.image.url || ''"
        :alt="options.image.custom_properties.alt_seo || ''"
        class="card-list__logo"
      />
    </header>
    <main class="card-list__main">
      <ul v-if="options.meta" class="card-list__list card__text">
        <li
          v-for="(item, index) in options.meta.list_item.value"
          :key="index"
          class="card-list__item"
        >
          <CheckMark class="card-list__check" />
          {{ item }}
        </li>
      </ul>
    </main>
    <footer class="card__footer">
      <CardRadioIcon
        :option="options"
        default-text="Select"
        :active-text="options.is_included ? 'Included' : 'Selected'"
        :items-arr="itemsArr"
      />
      <span class="card-list__price">
        <span v-if="options.additional_price > 0">+</span>
        <span>&euro;{{ options.additional_price | priceFormat }}</span>
      </span>
    </footer>
  </article>
</template>

<script>
import CheckMark from '~/assets/images/icons/checkmark.svg';
import CardRadioIcon from '~/components/ui/configurator/inputs/radio-icon';
export default {
  components: {
    CheckMark,
    CardRadioIcon
  },
  props: {
    options: {
      type: Object,
      default: null
    },
    itemsArr: {
      type: Array,
      default: null
    }
  }
};
</script>
<style lang="scss">
.card-list {
  min-height: vw(375px, 1920px);
  @include media(1440px) {
    min-height: vw(375px);
  }
  @include media(767px) {
    min-height: 235px;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: vw(29px, 1920px);
    min-height: vw(40px, 1920px);
    @include media(1440px) {
      margin-bottom: vw(29px);
      min-height: vw(40px);
    }
    @include media(767px) {
      margin-bottom: 20px;
      min-height: auto;
    }
  }

  &__title {
    margin-bottom: vw(6px, 1920px);
    @include media(1440px) {
      margin-bottom: vw(6px);
    }
    @include media(767px) {
      margin-bottom: 0;
    }
  }

  &__subtitle {
    font-size: vw(16px, 1920px);
    line-height: vw(19px, 1920px);
    color: $gray;
    @include media(1440px) {
      font-size: vw(16px);
      line-height: vw(19px);
    }
    @include media(767px) {
      margin-top: 4px;
      font-size: 14px;
      line-height: 1.17;
    }
  }

  &__logo {
    margin-left: vw(5px, 1920px);
    width: vw(75px, 1920px);
    @include media(1440px) {
      margin-left: vw(5px);
      width: vw(75px);
    }
  }

  &__item {
    position: relative;
    padding-left: vw(48px, 1920px);
    @include media(1440px) {
      padding-left: vw(48px);
    }
    @include media(767px) {
      padding-left: 32px;
    }
    &:not(:last-child) {
      margin-bottom: vw(25px, 1920px);
      @include media(1440px) {
        margin-bottom: vw(25px);
      }
      @include media(767px) {
        margin-bottom: 15px;
      }
    }
  }

  &__check {
    position: absolute;
    width: vw(16px, 1920px);
    height: vw(11px, 1920px);
    left: vw(8px, 1920px);
    top: vw(7.5px, 1920px);
    @include media(1440px) {
      width: vw(16px);
      height: vw(11px);
      left: vw(8px);
      top: vw(7.5px);
    }
    @include media(767px) {
      width: 16px;
      height: 11px;
      left: 0;
      top: 0;
    }
    path {
      fill: $black;
    }
  }

  &__main {
    margin-bottom: vw(15px, 1920px);
    @include media(1440px) {
      margin-bottom: vw(15px);
    }
    @include media(767px) {
      margin-bottom: 20px;
    }
  }

  &.card--active {
    .card-list__check {
      path {
        fill: $red;
      }
    }
  }
}
</style>
