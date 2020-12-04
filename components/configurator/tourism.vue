<template>
  <section class="section tourism-section">
    <div class="container">
      <div class="tourism-section__header">Tourism Business Case</div>
      <div class="calc-wr">
        <div class="calc-body">
          <div class="input-wr">
            <span class="title">Country of operation</span>
            <div
              ref="countryDropdown"
              class="dropdown"
              :class="{ 'is-open': countryDropValue.isOpen }"
            >
              <div
                class="dropdown__label"
                @click="countryDropValue.isOpen = !countryDropValue.isOpen"
              >
                {{ countryDropValue.value }}
                <ArrowIcon class="drop-arrow-icon" />
              </div>
              <div v-if="countryDropValue.isOpen" class="dropdown__list">
                <div
                  v-for="el in countryElements"
                  :key="el.id"
                  class="dropdown__el"
                  @click="setCountry(el)"
                >
                  {{ el.value }}
                </div>
              </div>
            </div>
          </div>
          <div class="input-wr">
            <span class="title">Distance Travelled per Day</span>
            <div
              ref="distanceDropdown"
              class="dropdown"
              :class="{ 'is-open': distanceDropValue.isOpen }"
            >
              <div
                class="dropdown__label"
                @click="distanceDropValue.isOpen = !distanceDropValue.isOpen"
              >
                {{ distanceDropValue.value }}
                <ArrowIcon class="drop-arrow-icon" />
              </div>
              <div v-if="distanceDropValue.isOpen" class="dropdown__list">
                <div
                  v-for="el in distanceElements"
                  :key="el.id"
                  class="dropdown__el"
                  @click="setDistance(el)"
                >
                  {{ el.value }}
                </div>
              </div>
            </div>
          </div>
          <div class="input-wr">
            <span class="title">Days per week Bus works</span>
            <div class="input-number__wr">
              <div class="input-inc" @click="incValue($event, 1)">
                <Inc />
              </div>
              <div class="input-dec" @click="decValue($event, -1)">
                <Dec />
              </div>
              <input
                type="text"
                name="days"
                class="input input-number"
                value="5"
                data-min="0"
                data-max="7"
                @input="allowOnlyNumbers"
              />
            </div>
          </div>
          <div class="input-wr">
            <span class="title">Weeks per year Bus works</span>
            <div class="input-number__wr">
              <div class="input-inc" @click="incValue($event, 1)">
                <Inc />
              </div>
              <div class="input-dec" @click="decValue($event, -1)">
                <Dec />
              </div>
              <input
                type="text"
                name="weeks"
                class="input input-number"
                value="48"
                data-min="0"
                data-max="53"
                @input="allowOnlyNumbers"
              />
            </div>
          </div>
          <div class="input-wr">
            <span class="title">Estimated Ticket Price</span>
            <input type="text" name="price" class="input" value="€ 20" />
          </div>
        </div>
        <div class="total-cost">
          <div class="total-cost__row">
            <div class="title">Bus Service Cost per year</div>
            <div class="value service">- €890</div>
          </div>
          <div class="total-cost__row">
            <div class="title">Estimated charge per month</div>
            <div class="value">- €1,287</div>
          </div>
        </div>
        <div class="calc-bottom">
          <div class="total-cost">
            <div class="total-cost__row">
              <div class="title">Estimated earnings per month</div>
              <div class="value">€2,461</div>
            </div>
            <div class="descr">
              <span class="title"
                >If you are interested in this conditions then
              </span>
              <ArrowLink
                :to="'link'"
                link-text="contact dealer or distributors"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ArrowLink from '~/components/ui/links/arrow-link';
import ArrowIcon from '~/assets/images/icons/drop-arr.svg';
import Inc from '~/assets/images/icons/inc.svg';
import Dec from '~/assets/images/icons/dec.svg';
export default {
  components: {
    ArrowLink,
    ArrowIcon,
    Inc,
    Dec
  },
  data() {
    return {
      distanceDropValue: {
        id: 1,
        value: '0 - 50 km',
        isOpen: false
      },
      countryDropValue: {
        id: 1,
        value: 'Portugal',
        isOpen: false
      },
      distanceElements: [
        {
          id: 1,
          value: '0 - 50 km'
        },
        {
          id: 2,
          value: '50 - 150 km'
        },
        {
          id: 3,
          value: '150 - 250 km'
        }
      ],
      countryElements: [
        {
          id: 1,
          value: 'Portugal'
        },
        {
          id: 2,
          value: 'Ukraine'
        },
        {
          id: 3,
          value: 'Germany'
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
      if (!this.$refs.distanceDropdown.contains(event.target)) {
        this.distanceDropValue.isOpen = false;
      }
      if (!this.$refs.countryDropdown.contains(event.target)) {
        this.countryDropValue.isOpen = false;
      }
    },
    setDistance(el) {
      this.distanceDropValue.isOpen = false;
      this.distanceDropValue.id = el.id;
      this.distanceDropValue.value = el.value;
    },
    setCountry(el) {
      this.countryDropValue.isOpen = false;
      this.countryDropValue.id = el.id;
      this.countryDropValue.value = el.value;
    },
    incValue(e, val) {
      const input = e.target
        .closest('.input-number__wr')
        .querySelector('input');
      if (input) {
        const max = input.dataset.max;
        if (max) {
          if (+input.value + +val > max) {
            return false;
          }
        }
        input.value = +input.value + +val;
      }
    },
    decValue(e, val) {
      const input = e.target
        .closest('.input-number__wr')
        .querySelector('input');
      if (input) {
        const min = input.dataset.min;
        if (min) {
          if (+input.value + +val < min) {
            return false;
          }
        }
        input.value = +input.value + +val;
      }
    },
    allowOnlyNumbers(e) {
      const input = e.target;
      input.value = input.value.replace(/[^\d]+/, '');
    }
  }
};
</script>

<style scoped lang="scss">
.tourism-section {
  &__header {
    margin-bottom: vw(69px, 1920px);
    text-align: left;
    text-transform: uppercase;
    font-family: $font-2b;
    font-size: vw(48px, 1920px);
    line-height: vw(61px, 1920px);
    color: $darkBlue;
    z-index: 2;
    @include media(1440px) {
      margin-bottom: vw(69px);
      font-size: vw(48px);
      line-height: vw(61px);
    }
    @include media(767px) {
      margin-bottom: 16px;
    }
  }
}

.calc-wr {
  width: vw(1280px, 1920px);
  margin: 0 auto;
  @include media(1440px) {
    width: vw(871px);
  }
  @include media(767px) {
    width: calc(100% + 64px);
    margin-left: -32px;
  }
}
.calc-body {
  padding: vw(50px, 1920px) vw(140px, 1920px);
  border: 1.2px solid #ebebeb;
  @include media(1440px) {
    padding: vw(50px) vw(80px);
  }
  @include media(767px) {
    padding: 40px 32px 50px;
  }
  .total-cost {
    margin-top: 2vw;
    @include media(767px) {
      margin-top: 0;
    }
  }
}
.input-wr {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  &:not(:last-child) {
    margin-bottom: vw(30px, 1920px);
    @include media(1440px) {
      margin-bottom: vw(30px);
    }
    @include media(767px) {
      padding: 0;
      margin-bottom: 32px;
      flex-direction: column;
      align-items: flex-start;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .title {
    width: 50%;
    font-size: vw(19px, 1920px);
    line-height: 1.7;
    color: #000000;
    font-family: $font-1r;
    @include media(1440px) {
      font-size: vw(19px);
    }
    @include media(767px) {
      font-size: 16px;
      line-height: 1.2;
      margin-bottom: 5px;
      width: 100%;
    }
  }
  .input {
    font-family: $font-1b;
    width: 40%;
    background: #ffffff;
    border: 1px solid #dbdbdb;
    padding: 0 vw(19px, 1920px);
    font-size: vw(16px, 1920px);
    height: vw(48px, 1920px);
    line-height: vw(48px, 1920px);
    outline: none;
    transition: border-color 0.3s ease;
    position: relative;
    @include media(1440px) {
      padding: 0 vw(19px);
      font-size: vw(16px);
      height: vw(48px);
      line-height: vw(48px);
    }
    @include media(767px) {
      height: 48px;
      width: 100%;
      line-height: 48px;
      padding: 0 19px;
      font-size: 16px;
    }
    &:hover {
      border-color: $black;
    }

    &-number {
      text-align: center;
      padding: 0 vw(50px, 1920px);
      width: 100%;
      @include media(1440px) {
        padding: 0 vw(50px);
      }
      @include media(767px) {
        padding: 0 50px;
      }
      &__wr {
        width: 40%;
        position: relative;
        @include media(767px) {
          width: 100%;
        }
        &:hover {
          input {
            border-color: $black;
          }
        }
      }
      .svg-icon {
        fill: $black;
        transition: fill 0.35s;
      }
    }

    &-inc,
    &-dec {
      width: vw(50px, 1920px);
      height: 100%;
      position: absolute;
      z-index: 2;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      @include media(1440px) {
        width: vw(50px);
      }
      @include media(767px) {
        width: 51px;
        padding: 0 19px;
      }
      svg {
        fill: $black;
        transition: fill 0.35s;
        @include media(767px) {
          width: 100%;
        }
      }
      &:hover {
        svg {
          fill: $red;
        }
      }
    }

    &-inc {
      right: 0;
      svg {
        width: vw(13px, 1920px);
        height: vw(13px, 1920px);
        @include media(1440px) {
          width: vw(13px);
          height: vw(13px);
        }
        @include media(767px) {
          width: 100%;
          height: auto;
        }
      }
    }

    &-dec {
      left: 0;
      svg {
        width: vw(13px, 1920px);
        height: vw(2px, 1920px);
        @include media(1440px) {
          width: vw(13px);
          height: vw(2px);
        }
        @include media(767px) {
          width: 100%;
          height: auto;
        }
      }
    }
  }
  .dropdown {
    font-family: $font-1b;
    width: 40%;
    background: #ffffff;
    padding: 0 vw(19px, 1920px);
    font-size: vw(16px, 1920px);
    height: vw(48px, 1920px);
    line-height: vw(48px, 1920px);
    outline: none;
    position: relative;
    text-align: left;
    border: 1px solid #dbdbdb;
    box-sizing: border-box;
    transition: border-color 0.3s ease;
    @include media(1440px) {
      padding: 0 vw(19px);
      font-size: vw(16px);
      height: vw(48px);
      line-height: vw(48px);
    }
    @include media(767px) {
      padding: 0 19px;
      height: 48px;
      line-height: 48px;
      width: 100%;
      font-size: 16px;
    }
    &:hover {
      border: 1px solid #041c30;
      .drop-arrow-icon {
        fill: $red;
      }
    }
    &.is-open {
      border-color: #041c30;
      .dropdown__list {
        border-color: #041c30;
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
    width: vw(15px, 1920px);
    height: vw(8px, 1920px);
    fill: #000000;
    @include media(1440px) {
      width: vw(15px);
      height: vw(8px);
    }
    @include media(767px) {
      width: 11px;
      height: 5px;
    }
  }
  .dropdown__list {
    z-index: 4;
    position: absolute;
    left: -1px;
    top: vw(47px, 1920px);
    width: calc(100% + 2px);
    height: auto;
    border: 1px solid #dbdbdb;
    border-top: none;
    background: #ffffff;
    box-sizing: border-box;
    padding: 0 vw(19px, 1920px);
    transition: all 0.3s ease;
    @include media(1440px) {
      top: vw(47px);
      padding: 0 vw(19px);
    }
    @include media(767px) {
      padding: 0 19px;
      top: 48px;
    }
  }
  .dropdown__el {
    transition: all 0.3s ease;
    box-sizing: border-box;
    border-bottom: 0.5px solid #dbdbdb;
    height: vw(55px, 1920px);
    line-height: vw(55px, 1920px);
    cursor: pointer;
    @include media(1440px) {
      height: vw(55px);
      line-height: vw(55px);
    }
    @include media(767px) {
      height: 48px;
      line-height: 48px;
    }
    &:nth-last-child(1) {
      border: none;
    }
    &:hover {
      color: $red;
    }
  }
}
.total-cost {
  padding: vw(50px, 1920px) vw(140px, 1920px);
  border-left: 1.2px solid #ebebeb;
  border-right: 1.2px solid #ebebeb;
  @include media(1440px) {
    padding: vw(50px) vw(80px);
  }
  @include media(767px) {
    padding: 24px 32px 40px;
  }
  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:not(:last-child) {
      margin-bottom: vw(32px, 1920px);
      @include media(1440px) {
        margin-bottom: vw(32px);
      }
      @include media(767px) {
        margin-bottom: 22px;
      }
    }
  }
  .title {
    font-size: vw(19px, 1920px);
    line-height: 1.7;
    color: #000000;
    font-family: $font-1r;
    @include media(1440px) {
      font-size: vw(19px);
    }
    @include media(767px) {
      width: 50%;
      font-size: 16px;
      line-height: 1.2;
    }
  }
  .value {
    font-family: $font-1b;
    font-size: vw(24px, 1920px);
    line-height: 1.2;
    color: #000000;
    @include media(1440px) {
      font-size: vw(24px);
    }
    @include media(767px) {
      font-size: 22px;
    }
    &.service {
      font-family: $font-1r;
      font-size: vw(20px, 1920px);
      line-height: vw(23px, 1920px);
      @include media(1440px) {
        font-size: vw(20px);
        line-height: vw(23px);
      }
      @include media(767px) {
        font-size: 16px;
        line-height: 1.2;
      }
    }
  }
}
.calc-bottom {
  background: #041c30;
  .title {
    font-size: vw(19px, 1920px);
    line-height: 1.7;
    color: $gray;
    font-family: $font-1r;
    @include media(1440px) {
      font-size: vw(19px);
    }
    @include media(767px) {
      font-size: 16px;
      line-height: 1.2;
      width: 50%;
      padding-right: 10px;
    }
  }
  .value {
    font-family: $font-1b;
    font-size: vw(56px, 1920px);
    line-height: 1.1;
    color: #ffffff;
    @include media(1440px) {
      font-size: vw(56px);
    }
    @include media(767px) {
      font-size: 30px;
      flex-shrink: 0;
    }
  }
  .descr {
    position: relative;
    padding-top: vw(26px, 1920px);
    font-family: $font-acumin-r;
    @include media(1440px) {
      padding-top: vw(26px);
    }
    @include media(767px) {
      padding-top: 20px;
    }
    .title {
      @include media(767px) {
        padding-right: 0;
      }
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      opacity: 0.1;
      background: #ebebeb;
    }
  }
  .arrow-link {
    font-size: vw(19px, 1920px);
    line-height: 1.7;
    font-family: $font-acumin-r;
    @include media(1440px) {
      font-size: vw(19px);
    }
    @include media(767px) {
      font-size: 16px;
      line-height: 1.2;
    }
    .svg-icon {
      margin-left: 0 !important;
    }
  }

  .total-cost {
    padding: vw(44px, 1920px) vw(140px, 1920px);
    @include media(1440px) {
      padding: vw(44px) vw(80px);
    }
    @include media(767px) {
      padding: 24px 32px;
    }
    &__row {
      margin-bottom: vw(19px, 1920px);
      @include media(1440px) {
        margin-bottom: vw(19px);
      }
      @include media(767px) {
        margin-bottom: 26px;
      }
    }
  }
}
</style>
