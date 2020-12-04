<template>
  <div class="container">
    <section class="package">
      <div
        v-for="(pack, index) in getPackages"
        :key="index"
        class="package__block"
        :class="{ 'package__block--active': pack.is_active }"
      >
        <div class="package__header">
          <CardRadio
            :option="pack"
            :is-mobile="isMobile"
            :items-arr="getPackages"
            class="package__radio"
            :callback="setPackage"
          />
          <div class="package__info">
            <span class="package__name">
              {{ pack.title }}
            </span>
            <span class="package__description">
              {{ pack.description }}
            </span>
          </div>
          <div class="package__price">
            <span v-if="pack.additional_price > 0">+</span>
            &euro;{{ pack.additional_price | priceFormat }}
          </div>
        </div>
        <div class="package__content">
          <div
            v-for="(step, stepIdx) in pack.steps"
            :key="stepIdx"
            :class="{ package__step: step.components.length }"
          >
            <template v-if="step.components.length">
              <div class="package__step-title">
                {{ step.title }}
              </div>
              <div class="package__step-wr">
                <template v-for="comp in step.components">
                  <div
                    v-for="(item, itemIdx) in comp.items"
                    :key="itemIdx + Math.random() * Math.random()"
                    class="package__item"
                  >
                    <img
                      v-if="item.image"
                      :src="item.image.url"
                      :alt="item.image.custom_properties.seo_alt"
                      class="package__item-img"
                    />
                    <p class="package__item-description">
                      {{ item.description }}
                    </p>
                  </div>
                </template>
              </div>
            </template>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CardRadio from '~/components/ui/configurator/inputs/radio';
export default {
  components: {
    CardRadio
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters('configurator', [
      'getPackages',
      'getAllItems',
      'getActivePackage'
    ])
  },
  methods: {
    ...mapActions('configurator', ['changePackage']),
    setPackage(e) {
      this.changePackage();
      this.accordionToggle(e);
    },
    accordionToggle(e) {
      const wrap = e.target.closest('.package__block');
      if (wrap) {
        const active = document.querySelector('.package__block--active');
        if (active) {
          active.classList.remove('package__block--active');
          active.style.maxHeight = null;
        }
        wrap.classList.add('package__block--active');
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
.package {
  &__block {
    padding: vw(48px, 1920px);
    max-height: vw(148px, 1920px);
    background-color: #ffffff;
    border: 1px solid #eaeaea;
    overflow: hidden;
    transition: max-height 0.5s ease;
    @include media(1440px) {
      padding: vw(48px);
      max-height: vw(148px);
    }
    &:not(:last-child) {
      margin-bottom: vw(32px, 1920px);
      @include media(1440px) {
        margin-bottom: vw(32px);
      }
    }

    &--active {
      background-color: #f4f5f6;
      border-color: transparent;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: vw(45px, 1920px);
    @include media(1440px) {
      padding-bottom: vw(45px);
    }
  }

  &__radio {
    margin-right: vw(24px, 1920px);
    @include media(1440px) {
      margin-right: vw(24px);
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
  }

  &__name {
    font-family: $font-1b;
    color: $black;
    font-size: vw(24px, 1920px);
    line-height: vw(24px, 1920px);
    margin-bottom: vw(10px, 1920px);
    text-transform: uppercase;
    @include media(1440px) {
      font-size: vw(24px);
      line-height: vw(24px);
      margin-bottom: vw(10px);
    }
  }

  &__description {
    color: $gray;
    font-size: vw(20px, 1920px);
    line-height: vw(23px, 1920px);
    @include media(1440px) {
      font-size: vw(20px);
      line-height: vw(23px);
    }
  }

  &__price {
    margin-left: auto;
    color: $gray;
    font-size: vw(24px, 1920px);
    line-height: vw(24px, 1920px);
    @include media(1440px) {
      font-size: vw(24px);
      line-height: vw(24px);
    }
  }

  &__content {
    padding-top: vw(40px, 1920px);
    border-top: 1px solid #eaeaea;
    @include media(1440px) {
      padding-top: vw(40px);
    }
  }

  &__step {
    margin-top: vw(20px, 1920px);
    @include media(1440px) {
      margin-top: vw(20px);
    }
    &:first-child {
      margin-top: 0;
    }
    &-title {
      font-size: vw(16px, 1920px);
      line-height: vw(24px, 1920px);
      margin-bottom: vw(30px, 1920px);
      color: $black;
      text-transform: uppercase;
      font-family: $font-1b;
      @include media(1440px) {
        font-size: vw(16px);
        line-height: vw(24px);
        margin-bottom: vw(30px);
      }
    }

    &-wr {
      display: flex;
      flex-wrap: wrap;
    }
  }

  &__item {
    width: calc(33.33% - 20px);
    &:not(:nth-child(3n)) {
      margin-right: 24px;
    }
    margin-bottom: 24px;
    display: flex;
    align-items: flex-start;

    &-img {
      width: 100%;
      max-width: vw(90px, 1920px);
      margin-right: vw(24px, 1920px);
      @include media(1440px) {
        max-width: vw(90px);
        margin-right: vw(24px);
      }
    }

    &-description {
      flex-grow: 1;
      font-size: vw(14px, 1920px);
      line-height: vw(24px, 1920px);
      @include media(1440px) {
        font-size: vw(14px);
        line-height: vw(24px);
      }
      color: #3d454c;
    }
  }
}
</style>
