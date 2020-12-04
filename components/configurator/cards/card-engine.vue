<template>
  <article class="card-engine" :class="{ 'card--active': options.is_active }">
    <CardRadio
      :option="options"
      :is-mobile="isMobile"
      :items-arr="itemsArr"
      class="card-engine__radio"
    />
    <img
      v-if="options.image"
      :src="options.image.url || ''"
      :alt="options.image.custom_properties.seo_alt || ''"
      class="card-engine__logo"
    />
    <div class="card-engine__name">
      <div class="card-engine__item">
        <span class="card-engine__title card-engine__item-name">
          {{ options.title }}
          <span
            class="card-engine__info"
            @mouseenter="currentGraphIndex = cardIndex"
            @mouseleave="currentGraphIndex = null"
          >
            <Info />
            <template v-if="!isMobile">
              <transition name="card-fade">
                <img
                  v-if="currentGraphIndex == cardIndex && options.engine_graph"
                  :src="options.engine_graph.url || ''"
                  :alt="options.engine_graph.custom_properties.seo_alt || ''"
                  class="card-engine__graph"
                />
              </transition>
            </template>
          </span>
        </span>
        <span v-if="options.description" class="card-engine__subtitle">
          {{ options.description }}
        </span>
      </div>
    </div>
    <div class="card-engine__item card-engine__power">
      <span class="card-engine__item-name">
        {{ options.meta.power_title.value }}
      </span>
      <span class="card-engine__subtitle">Power</span>
    </div>
    <div class="card-engine__item card-engine__torque">
      <span class="card-engine__item-name">
        {{ options.meta.torque_title.value }}
      </span>
      <span class="card-engine__subtitle">Torque</span>
    </div>
    <div class="card-engine__item card-engine__type">
      <span class="card-engine__item-name">
        {{ options.meta.emission_title.value }}
      </span>
    </div>
    <div class="card-engine__price">
      <span v-if="options.additional_price > 0" class="card-engine__item-name">
        +
      </span>
      <span class="card-engine__item-name">
        &euro;{{ options.additional_price | priceFormat }}
      </span>
    </div>
    <template v-if="isMobile">
      <transition name="card-fade">
        <img
          v-show="currentGraphIndex == cardIndex"
          :src="options.engine_graph.url || ''"
          :alt="options.engine_graph.custom_properties.seo_alt || ''"
          class="card-engine__graph"
        />
      </transition>
    </template>
  </article>
</template>

<script>
import CardRadio from '~/components/ui/configurator/inputs/radio';
import Info from '~/assets/images/icons/info.svg';
export default {
  components: {
    CardRadio,
    Info
  },
  props: {
    options: {
      type: Object,
      default: null
    },
    cardIndex: {
      type: Number,
      default: null
    },
    itemsArr: {
      type: Array,
      default: null
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentGraphIndex: null
    };
  }
};
</script>
<style lang="scss">
.card-engine {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ebebeb;
  padding: vw(30px, 1920px) vw(24px, 1920px);
  transition: background-color 0.35s ease;
  position: relative;
  @include media(1440px) {
    padding: vw(30px) vw(24px);
  }
  @include media(767px) {
    padding: 24px 32px 24px 68px;
    flex-direction: column;
    align-items: flex-start;
  }
  &:hover {
    background-color: #f4f5f6;

    .card-radio {
      span {
        border-color: $red;
      }
    }

    .card-engine__title {
      color: $red;
    }
  }

  &:first-child {
    border-top: 1px solid #ebebeb;
  }

  &.card--active {
    border-color: #f4f5f6;
  }

  &__radio {
    margin-right: vw(24px, 1920px);
    @include media(1440px) {
      margin-right: vw(24px);
    }
    @include media(767px) {
      margin: 0;
      position: absolute;
      left: 32px;
      top: 24px;
    }
  }

  &__logo {
    margin-right: vw(32px, 1920px);
    width: vw(72px, 1920px);
    max-width: vw(72px, 1920px);
    @include media(1440px) {
      margin-right: vw(32px);
      width: vw(72px);
      max-width: vw(72px);
    }
    @include media(767px) {
      width: 42px;
      height: auto;
      max-width: 42px;
      position: absolute;
      top: 24px;
      right: 32px;
      margin: 0;
    }
  }

  &__title {
    color: #000000;
    font-family: $font-1b;
    position: relative;
    padding-right: vw(30px, 1920px);
    transition: color 0.35s ease;
    @include media(1440px) {
      padding-right: vw(30px);
    }
    @include media(767px) {
      padding-right: 20px;
      text-transform: uppercase;
    }
  }

  &__subtitle {
    font-size: vw(14px, 1920px);
    line-height: vw(16px, 1920px);
    color: $gray;
    margin-top: vw(6px, 1920px);
    @include media(1440px) {
      font-size: vw(14px);
      line-height: vw(16px);
      margin-top: vw(6px);
    }
    @include media(767px) {
      margin-top: 4px;
      font-size: 14px;
      line-height: 1.17;
    }
  }

  &__info {
    background: #ffffff;
    border: 1px solid #eaeaea;
    width: vw(18px, 1920px);
    height: vw(18px, 1920px);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 0;
    transition: all 0.5s ease;
    @include media(1440px) {
      width: vw(18px);
      height: vw(18px);
    }
    @include media(767px) {
      width: 12px;
      height: 12px;
      top: 50%;
      transform: translateY(-50%);
    }
    &:hover {
      background: $red;
      border-color: $red;

      svg {
        path {
          fill: #ffffff;
        }
      }
    }

    svg {
      width: vw(4px);
      height: vw(8px);
      @include media(767px) {
        width: 2px;
        height: 5px;
      }
      path {
        transition: all 0.5s ease;
        fill: #929ba2;
      }
    }
  }

  &__graph {
    position: absolute;
    left: vw(-40px, 1920px);
    bottom: 100%;
    width: vw(400px, 1920px);
    z-index: 3;
    @include media(1440px) {
      left: vw(-40px);
      width: vw(400px);
    }
    @include media(767px) {
      position: absolute;
      width: calc(100vw - 64px);
      left: 32px;
      top: 0;
    }
  }

  &__name {
    display: flex;
    position: relative;
    padding-right: vw(10px, 1920px);
    width: 28.5%;
    @include media(1440px) {
      padding-right: vw(10px);
    }
    @include media(767px) {
      width: 100%;
      padding-right: 50px;
      margin-bottom: 16px;
      .card-engine__subtitle {
        margin-top: 0;
      }
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    &-name {
      font-size: vw(18px, 1920px);
      line-height: vw(21px, 1920px);
      color: $black;
      @include media(1440px) {
        font-size: vw(18px);
        line-height: vw(21px);
      }
      @include media(767px) {
        font-size: 16px;
        line-height: 1.17;
      }
    }
  }

  &__price {
    text-align: right;
    margin-left: auto;
    @include media(767px) {
      position: absolute;
      right: 32px;
      bottom: 24px;
    }
  }

  &__power,
  &__torque {
    width: 17.5%;
    padding-right: vw(10px, 1920px);
    @include media(1440px) {
      padding-right: vw(10px);
    }
    @include media(767px) {
      width: 100%;
      padding-right: 0;
      margin-bottom: 18px;
    }
  }

  &__type {
    width: 12%;
    padding-right: vw(10px, 1920px);
    @include media(1440px) {
      padding-right: vw(10px);
    }
    @include media(767px) {
      width: 50%;
      padding: 0;
    }
  }
}

.card-fade-enter-active {
  transition: all 0.35s ease;
}
.card-fade-leave,
.card-fade-enter-to {
  opacity: 1;
  transform: translate(0, 0);
}
.card-fade-enter {
  opacity: 0;
  transform: translate(0, 20%);
}
.card-fade-leave-to {
  opacity: 0;
  transform: translate(0, -20%);
}
</style>
