<template>
  <li class="model-switcher" @click.self="openMenu()">
    <div class="model-label" :class="{ 'is-open': isOpen }">
      Models
      <CarretIcon class="carret-icon" />
    </div>
    <transition name="fade2">
      <div v-if="isOpen" class="model__wr">
        <div class="models">
          <div
            v-for="model in models"
            :key="model.id"
            class="model__item"
            :class="[activeBus === model.id ? 'is-active' : '']"
            @click="switchModel(model.id)"
          >
            <div class="model__name">{{ model.name }}</div>
            <CircleIcon class="circle-icon" />
            <img
              class="model__img"
              :src="model.menu_image.url || ''"
              :alt="model.menu_image.custom_properties.seo_alt || ''"
            />
            <a href="/" class="model__link"
              >{{ model.menu_button_title || '' }}
              <ArrowIcon />
            </a>
          </div>
        </div>
        <div class="submodels">
          <perfect-scrollbar ref="submodels" :options="options">
            <div
              v-for="submodel in submodels"
              :key="submodel.id"
              class="submodel__item"
              @click="switchSubModels()"
            >
              <div class="submodel__name">{{ submodel.name || '' }}</div>
              <div class="img-wr">
                <img
                  class="submodel__img"
                  :src="submodel.menu_image ? submodel.menu_image.url : ''"
                  :alt="
                    submodel.menu_image
                      ? submodel.menu_image.custom_properties.seo_alt
                      : ''
                  "
                />
              </div>
              <div class="submodel__info">
                <div
                  class="submodel__price"
                  v-html="submodel.menu_price_text || ''"
                ></div>
                <div
                  class="submodel__description"
                  v-html="submodel.menu_description || ''"
                ></div>
              </div>
            </div>
          </perfect-scrollbar>
        </div>
      </div>
    </transition>
  </li>
</template>

<script>
import CarretIcon from '~/assets/images/icons/arrow-down.svg';
import ArrowIcon from '~/assets/images/icons/right-arr.svg';
import CircleIcon from '~/assets/images/icons/circle.svg';

export default {
  components: { CarretIcon, CircleIcon, ArrowIcon },
  props: {
    item: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      isOpen: false,
      activeBus: 1,
      options: {
        minScrollbarLength: 67,
        maxScrollbarLength: 67,
        wheelSpeed: 0.5,
        swipeEasing: true,
        wheelPropagation: false
      }
    };
  },
  computed: {
    models() {
      return this.$store.state.busModels;
    },
    submodels() {
      return this.models.find((el) => el.id === this.activeBus).models;
    }
  },
  mounted() {
    setTimeout(() => {
      document.addEventListener('click', this.clickOutside);
    }, 0);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.clickOutside);
  },
  methods: {
    switchSubModels() {
      this.isOpen = !this.isOpen;
    },
    closeTooltip() {
      this.isOpen = false;
    },
    clickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.closeTooltip();
        document.documentElement.style.overflow = '';
      }
    },
    switchModel(id) {
      this.activeBus = id;
      this.$refs.submodels.$el.scrollTop = 0;
    },
    openMenu() {
      this.isOpen = !this.isOpen;
      setTimeout(() => {
        this.isOpen
          ? (document.documentElement.style.overflow = 'hidden')
          : (document.documentElement.style.overflow = '');
      }, 100);
    }
  }
};
</script>

<style lang="scss">
.model-switcher {
  position: relative;
  .model-label {
    position: relative;
    pointer-events: none;
    &:before {
      content: '';
      width: 220%;
      left: -45%;
      height: 300%;
      top: -100%;
      position: absolute;
      z-index: -1;
      background: #ffffff;
      opacity: 0;
      transition: all 0.7s ease;
    }
    &.is-open {
      color: #0d314f;
      &:before {
        opacity: 1;
      }
      .carret-icon {
        fill: $red !important;
        transform: translateY(-50%) rotate(180deg);
      }
    }
    .carret-icon {
      // fill: #ffffff;
      pointer-events: none;
      width: vw(11px);
      height: vw(6px);
      right: -40%;
      position: absolute;
      display: block;
      top: 48%;
      transform: translateY(-50%);
    }
  }
  .model__wr {
    // padding: 40px;
    display: flex;
    justify-content: space-between;
    background: #ffffff;
    width: 92vw;
    position: absolute;
    height: 90vh;
    left: -15.7vw;
    top: 2vw;
    overflow: hidden;
    border: 1px solid rgba(226, 232, 238, 0.5);
  }
  .models {
    width: 33%;
    padding: 40px 0 27px 40px;
  }
  .model__item {
    background: #ffffff;
    border: 1px solid #e6edf2;
    box-sizing: border-box;
    width: 100%;
    height: 48%;
    margin-bottom: 16px;
    position: relative;
    &.is-active {
      border: 1px solid #d2131c;
      .model__name {
        color: $red;
      }
      .model__link {
        background: $red;
      }
      .circle-icon {
        stroke: $red;
        stroke-width: 4px;
      }
    }
    &:hover {
      border: 1px solid #d2131c;
      .model__name {
        color: $red;
      }
      .model__link {
        background: $red;
      }
      .circle-icon {
        stroke: $red;
        stroke-width: 4px;
      }
    }
    .circle-icon {
      position: absolute;
      top: 7%;
      right: 7%;
      stroke: #e6edf2;
      stroke-width: 1px;
      width: 28px;
      height: 28px;
      fill: none !important;
      overflow: visible;
      transition: all 0.2s ease;
    }
  }
  .model__name {
    font-size: vw(20px);
    line-height: 1.4;
    position: absolute;
    left: 10%;
    top: 5%;
    font-family: $font-2b;
    color: #0d314f;
  }
  .model__img {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 70%;
    transform: translate(-55%, -50%);
  }
  .model__link {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: vw(48px);
    line-height: vw(48px);
    color: #ffffff;
    text-align: center;
    background: #e6edf2;
    font-family: $font-2b;
    font-size: vw(16px);
    .svg-icon {
      margin-left: vw(12px) !important;
      fill: white !important;
      width: vw(16px) !important;
      height: vw(11px) !important;
    }
  }
  .submodels {
    height: 90vh;
    width: 65%;
    padding: 0;
    overflow: hidden;
    font-weight: normal;
    .ps {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      position: relative;
      // overflow: scroll;
      height: 100%;
      width: 100%;
      padding: 40px 23px 40px 0;
      transition: unset;
      .ps__thumb-y {
        background: $red;
        border-radius: 0;
        opacity: 1;
        max-width: 6px;
        position: absolute;
      }
      .ps__rail-y {
        opacity: 0.6;
        width: 6px;
        max-width: 6px;
        background: #dde3e8;
        height: 100%;
      }
    }

    // .ps--active-x > .ps__rail-x {
    //   background: #dde3e8;
    // }
  }
  .submodel__item {
    background: #ffffff;
    border: 1px solid #e6edf2;
    box-sizing: border-box;
    width: 32%;
    height: 21vw;
    min-height: 318px;
    margin-bottom: 16px;
    position: relative;
    padding: 20px 32px;
    margin-right: 16px;
    &:nth-child(3n) {
      margin-right: 0;
    }
    &.is-active {
      border: 1px solid #d2131c;
      .submodel__name {
        color: $red;
      }
    }
    &:hover {
      border: 1px solid #d2131c;
      .submodel__name {
        color: $red;
      }
    }
    .img-wr {
      width: 110%;
      height: 50%;
      position: relative;
      left: -5%;
      margin-top: vw(45px);
    }
  }

  .submodel__img {
    // position: absolute;
    // left: 50%;
    // top: 50%;
    // width: 70%;
    // transform: translate(-55%, -80%);
    width: 100%;
    height: 100%;
    object-position: 50% 50%;
    object-fit: contain;
  }
  .submodel__name {
    font-size: vw(20px);
    line-height: 1.4;
    position: absolute;
    left: 32px;
    top: 20px;
    width: calc(100% - 42px);
    font-family: $font-2b;
    color: #0d314f;
  }
  .submodel__info {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 30%;
    width: 100%;
    font-size: vw(12px);
    line-height: 1.12;
    color: #041c30;
    padding: 0 32px 32px 32px;
    font-family: $font-1r;
    text-transform: none;
  }
  .submodel__price {
    margin-bottom: 24px;
    color: #919aa1;
    strong {
      color: #041c30;
    }
  }
}
.fade2-leave-active,
.fade2-enter-active {
  transition: all 0.7s ease;
}
.fade2-leave,
.fade2-enter-to {
  opacity: 1;
  transform: translate(0, 0);
}
.fade2-enter,
.fade2-leave-to {
  opacity: 0;
  transform: translate(0, -50%);
}
</style>
