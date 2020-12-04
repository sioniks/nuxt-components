<template>
  <article
    class="card-simple card"
    :class="{ 'card--active': options.is_active }"
  >
    <header class="card-simple__header">
      <p class="card-simple__title card__title">{{ options.title }}</p>
    </header>
    <main class="card-simple__main">
      <div class="card-simple__text card__text" v-html="options.description" />
      <div class="card-simple__shadow"></div>
    </main>
    <footer class="card__footer">
      <CardCheckboxIcon
        default-text="Add"
        :active-text="options.is_included ? 'Included' : 'Added'"
        :option="options"
      />
      <span class="card-list__price">
        <span v-if="options.additional_price > 0">+</span>
        <span>&euro;{{ options.additional_price | priceFormat }}</span>
      </span>
    </footer>
  </article>
</template>

<script>
import CardCheckboxIcon from '~/components/ui/configurator/inputs/checkbox';
export default {
  components: {
    CardCheckboxIcon
  },
  props: {
    options: {
      type: Object,
      default: null
    }
  }
};
</script>
<style lang="scss">
.card-simple {
  min-height: vw(315px, 1920px);
  @include media(1440px) {
    min-height: vw(315px);
  }
  @include media(767px) {
    min-height: 217px;
  }
  &__header {
    display: flex;
    margin-bottom: vw(14px, 1920px);
    @include media(1440px) {
      margin-bottom: vw(14px);
    }
    @include media(767px) {
      margin-bottom: 4px;
    }
  }

  &__main {
    position: relative;
    flex-grow: 1;
  }

  &__shadow {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.534227) 0%,
      #ffffff 100%
    );
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: vw(32px, 1920px);
    @include media(1440px) {
      height: vw(32px);
    }
    @include media(767px) {
      height: 32px;
    }
  }

  &.card--active {
    .card-simple__shadow {
      background: linear-gradient(
        180deg,
        rgba(244, 245, 246, 0.699492) 0%,
        #f4f5f6 100%
      );
    }
  }
}
</style>
