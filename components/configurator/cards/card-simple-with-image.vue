<template>
  <article
    class="card-simple-img card"
    :class="{ 'card--active': options.is_active }"
  >
    <div class="card-simple-img__top">
      <img
        v-if="options.image"
        :src="options.image.url || ''"
        :alt="options.image.custom_properties.alt_seo || ''"
      />
    </div>
    <div class="card-simple-img__content">
      <header class="card-simple-img__header">
        <p class="card-simple-img__title card__title">{{ options.title }}</p>
      </header>
      <main class="card-simple-img__main">
        <div
          class="card-simple-img__text card__text"
          v-html="options.description"
        />
        <div class="card-simple-img__shadow"></div>
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
    </div>
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
.card-simple-img {
  &.card {
    padding: 0;
    border: none;
    &:hover {
      .card-simple-img__content {
        border-color: $red;
      }
    }
  }

  &__top {
    height: vw(215px, 1920px);
    width: 100%;
    border: 1px solid #eaeaea;
    background: #ffffff;
    transition: border-color 0.35s;
    @include media(1440px) {
      height: vw(215px);
    }
    @include media(767px) {
      height: 58vw;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__content {
    padding: vw(32px, 1920px) vw(32px, 1920px) 0;
    min-height: vw(248px, 1920px);
    flex-grow: 1;
    display: flex;
    border: 1px solid #eaeaea;
    border-top: none;
    flex-direction: column;
    transition: border-color 0.35s;
    @include media(1440px) {
      padding: vw(32px) vw(32px) 0;
      min-height: vw(248px);
    }
    @include media(767px) {
      padding: 24px 32px;
      min-height: 210px;
    }
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
    .card-simple-img__shadow {
      background: linear-gradient(
        180deg,
        rgba(244, 245, 246, 0.699492) 0%,
        #f4f5f6 100%
      );
    }

    .card-simple-img__content {
      border-color: #f4f5f6;
    }

    .card__text {
      color: $gray;
    }
  }
}
</style>
