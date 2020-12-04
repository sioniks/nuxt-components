<template>
  <section class="section efficiency-section">
    <div
      v-if="!isMobile"
      class="plusses-bg"
      :style="{ backgroundImage: `url(${plus})` }"
    ></div>
    <div class="container">
      <div class="section__header">{{ block.title }}</div>
      <div class="calc-wr">
        <div class="calc-header">{{ block.extra.form_title }}</div>

        <div class="calc-body">
          <div class="input-wr">
            <span class="title">{{ block.extra.fuel_per_km_label }}</span>
            <input
              type="text"
              name="100km"
              value="15 liters"
              class="input disabled"
              disabled
            />
          </div>
          <div class="input-wr">
            <span class="title">{{ block.extra.km_per_month_label }}</span>
            <div
              ref="dropdown"
              class="dropdown"
              :class="{ 'is-open': dropValue.isOpen }"
            >
              <div
                class="dropdown__label"
                @click="dropValue.isOpen = !dropValue.isOpen"
              >
                {{ dropValue.value }}
                <ArrowIcon class="drop-arrow-icon" />
              </div>
              <div v-if="dropValue.isOpen" class="dropdown__list">
                <div
                  v-for="el in dropelements"
                  :key="el.id"
                  class="dropdown__el"
                  @click="setActiveElement(el)"
                >
                  {{ el.value }}
                </div>
              </div>
            </div>
          </div>
          <div class="input-wr">
            <span class="title">{{
              block.extra.maintenance_per_year_label
            }}</span>
            <input
              type="text"
              name="month"
              value="5 / € 1 250"
              class="input disabled"
              disabled
            />
          </div>

          <div class="total-cost total-cost--year">
            <div class="title">{{ block.extra.total_cost_per_year_label }}</div>
            <div class="value">6250$</div>
          </div>
        </div>
        <div class="calc-bottom">
          <div class="total-cost total-cost--km">
            <div class="title">{{ block.extra.total_cost_per_km_label }}</div>
            <div class="value">125$</div>
          </div>

          <div class="descr" v-html="block.extra.form_footer_text"></div>
        </div>
      </div>
    </div>
    <Curve1 v-if="!isMobile" class="curve1" />
  </section>
</template>

<script>
import Curve1 from '~/assets/images/curve-ef-sec.svg';
import ArrowIcon from '~/assets/images/icons/drop-arr.svg';
import plus from '~/assets/images/pluses.png';

export default {
  components: { Curve1, ArrowIcon },
  props: {
    block: {
      type: Object,
      default: null
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      plus,
      dropValue: {
        id: 1,
        value: '0 - 50',
        isOpen: false
      },
      dropelements: [
        {
          id: 1,
          value: '0 - 50'
        },
        {
          id: 2,
          value: '50 - 150'
        },
        {
          id: 3,
          value: '150 - 250'
        }
      ]
    };
  },
  computed: {},
  mounted() {
    setTimeout(() => {
      document.addEventListener('click', this.clickOutside);
    }, 0);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.clickOutside);
  },
  methods: {
    clickOutside(event) {
      if (!this.$refs.dropdown.contains(event.target)) {
        this.dropValue.isOpen = false;
      }
    },
    setActiveElement(el) {
      this.dropValue.isOpen = false;
      this.dropValue.id = el.id;
      this.dropValue.value = el.value;
    }
  }
};
</script>

<style lang="scss">
.efficiency-section {
  padding-top: vw(88px);
  @include media(767px) {
    padding-top: 0;
  }
  .curve1 {
    position: absolute;
    right: 0;
    bottom: vw(-450px);
    width: vw(500px);
    z-index: -1;
  }
  .section__header {
    margin-bottom: vw(48px);
    text-transform: uppercase;
    @include media(767px) {
      margin-bottom: 32px;
      text-align: left;
    }
  }
  .calc-wr {
    width: vw(871px);
    margin: 0 auto;
    background: #ffffff;
    @include media(767px) {
      width: calc(100% + 64px);
      margin-left: -32px;
    }
  }

  .calc-body {
    padding: 0;
    border: 1px solid #ebebeb;
    border-top: none;
  }
  .calc-header {
    font-family: $font-1b;
    font-size: vw(24px);
    line-height: 1.2;
    text-transform: uppercase;
    color: #0d314f;
    width: 100%;
    display: flex;
    align-items: center;
    padding: vw(64px) 0 vw(50px) vw(88px);
    position: relative;
    border-top: 1px solid #ebebeb;
    border-right: 1px solid #ebebeb;
    border-left: 1px solid #ebebeb;
    @include media(767px) {
      padding: 40px 32px 16px;
      font-size: 18px;
      line-height: 1.5;
    }
  }
  .input-wr {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 176px);
    margin: 0 auto;
    padding: vw(15px) 0;
    @include media(767px) {
      width: 100%;
      padding: 16px 32px;
      flex-direction: column;
    }
    .title {
      width: 50%;
      font-size: vw(19px);
      line-height: 1.7;
      color: #000000;
      font-family: $font-1r;
      @include media(767px) {
        width: 100%;
        font-size: 16px;
        line-height: 1.18;
        margin-bottom: 5px;
      }
    }
    .input {
      font-family: $font-1b;
      width: 40%;
      background: #ffffff;
      border: 1px solid #dbdbdb;
      padding: 0 10px;
      font-size: vw(16px);
      height: vw(48px);
      line-height: vw(48px);
      outline: none;
      @include media(767px) {
        padding: 0 20px;
        height: 48px;
        line-height: 48px;
        width: 100%;
        font-size: 16px;
      }
    }
  }
  .dropdown {
    font-family: $font-1b;
    width: 40%;
    background: #ffffff;
    padding: 0 10px;
    font-size: vw(16px);
    height: vw(48px);
    line-height: vw(48px);
    outline: none;
    position: relative;
    text-align: left;
    border: 1px solid #dbdbdb;
    box-sizing: border-box;
    transition: all 0.3s ease;
    @include media(767px) {
      font-size: 16px;
      height: 48px;
      line-height: 48px;
      width: 100%;
      padding: 0 20px;
    }
    &:hover {
      border: 1px solid #041c30;
      .drop-arrow-icon {
        fill: $red;
      }
    }
    &.is-open {
      border: 1px solid #041c30;
      .dropdown__list {
        border: 0.5px solid #041c30;
        border-top: none;
      }
      .drop-arrow-icon {
        fill: $red;
        transform: translate(0, -50%) rotate(180deg);
      }
    }
  }
  .dropdown__label {
    z-index: 1;
    position: relative;
  }
  .drop-arrow-icon {
    transition: all 0.5s ease;
    position: absolute;
    display: block;
    top: 50%;
    right: 2%;
    transform: translate(0, -50%);
    width: vw(15px);
    height: vw(8px);
    fill: #000000;
    @include media(767px) {
      width: 11px;
      height: 5px;
    }
  }
  .dropdown__list {
    z-index: 0;
    position: absolute;
    left: -0.5px;
    top: vw(47px);
    width: calc(100% + 2px);
    height: auto;
    border: 0.5px solid #dbdbdb;
    border-top: none;
    background: #ffffff;
    box-sizing: border-box;
    padding: 0 10px;
    transition: all 0.3s ease;
  }
  .dropdown__el {
    transition: all 0.3s ease;
    box-sizing: border-box;
    border-bottom: 0.5px solid #dbdbdb;
    height: vw(55px);
    line-height: vw(55px);
    &:nth-last-child(1) {
      border: none;
    }
    &:hover {
      color: $red;
    }
  }
  .total-cost {
    padding: vw(50px) vw(88px) vw(39px);
    border-top: 1px solid #ebebeb;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: $font-1r;
    @include media(767px) {
      padding: 26px 32px;
    }
    &--year {
      margin-top: vw(35px);
      padding: vw(55px) vw(88px) vw(41px);
      @include media(767px) {
        margin-top: 24px;
        margin-left: 32px;
        width: calc(100% - 64px);
        padding: 25px 0 36px;
      }
    }
    .title {
      font-size: vw(19px);
      line-height: 1.7;
      color: #000000;
      @include media(767px) {
        font-size: 16px;
        line-height: 1.18;
        width: 50%;
      }
    }
    .value {
      font-size: vw(24px);
      line-height: 1.2;
      color: #000000;
      @include media(767px) {
        font-size: 22px;
        white-space: nowrap;
      }
    }
  }
  .calc-bottom {
    background: #041c30;
    .title {
      font-size: vw(19px);
      line-height: 1.7;
      color: $gray;
      font-family: $font-1r;
      @include media(767px) {
        font-size: 16px;
        line-height: 1.18;
        max-width: 50%;
      }
    }
    .value {
      font-family: $font-2b;
      font-size: vw(40px);
      line-height: 1.1;
      color: #ffffff;
      @include media(767px) {
        font-size: 30px;
      }
    }
    .descr {
      padding: vw(31px) vw(88px) vw(35px);
      position: relative;
      color: $gray;
      @include media(767px) {
        padding: 20px 32px;
      }
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 9%;
        width: 82%;
        height: 2px;
        opacity: 0.1;
        background: #ebebeb;
        @include media(767px) {
          width: calc(100% - 64px);
          left: 32px;
        }
      }
      a {
        font-size: vw(19px);
        line-height: 1.7;
        color: $red;
        position: relative;
        @include media(767px) {
          font-size: 16px;
          line-height: 1.18;
        }
        &:after {
          content: '➔';
          position: absolute;
          right: -25px;
          top: 50%;
          transform: translateY(-48%);
          transition: all 0.5s ease;
        }
        &:hover {
          &:after {
            right: -35px;
          }
        }
      }
    }
  }

  .plusses-bg {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 60%;
    height: 90%;
    overflow: hidden;
    background-position: 0 0;
    background-size: 100px 100px;
    opacity: 0.5;
  }
}
</style>
