<template>
  <section class="section section__form summary-section__form">
    <div class="summary-section__close" @click="$emit('close-popup')">
      <Close />
    </div>
    <div class="container">
      <div class="form__content">
        <div class="form__desc">
          <div>
            <div class="section__header" v-html="block.title"></div>
          </div>
          <div v-if="!isMobile" class="form__desc-text">
            <div class="" v-html="block.text"></div>
          </div>
        </div>
        <form class="form" @submit.prevent="">
          <div class="input__wr">
            <input
              id="form__name"
              v-model="name"
              type="text"
              name="name"
              class="input__field"
              :class="{ 'not-empty': name }"
            />
            <label for="name" class="input__label">Your name</label>
            <div class="input__error"></div>
          </div>
          <div class="input__wr">
            <input
              id="form__mail"
              v-model="mail"
              type="email"
              name="mail"
              class="input__field"
              :class="{ 'not-empty': mail }"
            />
            <label for="mail" class="input__label">Email</label>
            <div class="input__error"></div>
          </div>
          <div class="input__wr">
            <input
              id="form__tel"
              v-model="phone"
              type="tel"
              name="tel"
              class="input__field"
              :class="{ 'not-empty': phone }"
            />
            <label for="tel" class="input__label">Phone</label>
            <div class="input__error"></div>
          </div>
          <div class="input__wr form__textarea">
            <textarea
              id="form__request"
              v-model="message"
              type="textarea"
              name="request"
              class="input__field"
              :class="{ 'not-empty': message }"
            />
            <label for="request" class="input__label">Message</label>
            <div class="input__error"></div>
          </div>
          <Button
            type="red"
            :text="block.submit_btn_text"
            :upper="true"
            @click="submitForm"
          />
        </form>
        <div v-if="isMobile" class="form__desc-text">
          <div class="" v-html="block.text"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Button from '~/components/ui/configurator/buttons/btn-default';
import Close from '~/assets/images/icons/close-big.svg';

export default {
  components: {
    Button,
    Close
  },
  props: {
    block: {
      type: Object,
      default: null
    },
    isMobile: {
      type: Boolean,
      default: false
    },
    isTablet: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      name: '',
      phone: '',
      mail: '',
      message: ''
    };
  },
  methods: {
    submitForm() {
      console.log(1);
    }
  }
};
</script>

<style lang="scss" scoped>
.section__form {
  overflow: hidden;
  background: #041c30;
  @include media(767px) {
    padding: 56px 0;
  }
  .section__header {
    margin-bottom: vw(32px);
    color: #ffffff;
    text-transform: uppercase;
    text-align: left;
    font-size: vw(48px, 1920px);
    line-height: vw(61px, 1920px);
    @include media(1440px) {
      font-size: vw(48px);
      line-height: vw(61px);
    }
    @include media(767px) {
      margin: 0;
      text-align: center;
    }
  }
  .container {
    position: relative;
    z-index: 2;
    @include media(767px) {
      padding: 0 56px;
    }
  }
  .form__content {
    display: flex;
    align-items: flex-start;
    width: 100%;
    @include media(767px) {
      flex-direction: column;
    }
  }
  .form__desc {
    width: vw(400px, 1920px);
    margin-right: vw(160px, 1920px);
    @include media(1440px) {
      width: vw(400px);
      margin-right: vw(160px);
    }
    @include media(767px) {
      width: 100%;
      margin: 0 0 45px;
    }
  }
  .form__desc-text {
    font-size: vw(18px, 1920px);
    line-height: 1.5;
    color: #818d97;
    @include media(1440px) {
      font-size: vw(18px);
    }
    @include media(767px) {
      width: 100%;
      margin: 40px 0 0;
      font-size: 12px;
    }
    a {
      font-size: vw(18px, 1920px);
      line-height: 1.5;
      color: $red;
      @include media(1440px) {
        font-size: vw(18px);
      }
      @include media(767px) {
        font-size: 12px;
      }
      &:hover {
        color: #ffffff;
      }
    }
  }
  .form {
    width: vw(496px, 1920px);
    @include media(1440px) {
      width: vw(496px);
    }
    @include media(767px) {
      width: 100%;
    }
  }
  .input__wr {
    position: relative;
    height: vw(64px, 1920px);
    width: 100%;
    background: #ffffff;
    margin-bottom: vw(20px, 1920px);
    @include media(1440px) {
      height: vw(64px);
      margin-bottom: vw(20px);
    }
    @include media(767px) {
      height: 56px;
      margin-bottom: 12px;
    }
  }
  .input__label {
    width: fit-content;
    position: absolute;
    z-index: 2;
    font-size: vw(16px, 1920px);
    color: #919ba2;
    top: 50%;
    left: 2vw;
    transform: translate(0, -50%);
    transition: all 0.2s ease;
    pointer-events: none;
    @include media(1440px) {
      font-size: vw(16px);
    }
    @include media(767px) {
      font-size: 16px;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .input__field {
    width: 100%;
    height: 100%;
    padding-left: 2vw;
    font-size: vw(16px);
    line-height: vw(19px);
    color: #041c30;
    outline: none;
    border: none;
    @include media(1440px) {
      font-size: vw(16px, 1920px);
      line-height: vw(19px, 1920px);
    }
    @include media(767px) {
      text-align: center;
      font-size: 16px;
      padding: 0 10px;
      line-height: 1.2;
    }
    &:active,
    &:focus,
    &.not-empty {
      border: none;
      outline: none;
      & ~ .input__label {
        transform: translate(0, -180%);
        font-size: vw(12px, 1920px);
        color: #bbc4cc;
        @include media(1440px) {
          font-size: vw(12px);
        }
        @include media(767px) {
          font-size: 12px;
        }
      }
    }
  }
  .input__error {
    color: $red;
    width: fit-content;
    position: absolute;
    z-index: 2;
    font-size: vw(16px, 1920px);
    top: 50%;
    left: 2vw;
    transform: translate(0, -220%);
    transition: all 0.2s ease;
    pointer-events: none;
    @include media(1440px) {
      font-size: vw(16px);
    }
    @include media(767px) {
      font-size: 16px;
      left: 50%;
      transform: translate(-50%, 60%);
    }
  }
  .btn-red {
    width: 100%;
    &:hover {
      background-color: #ffffff;
      color: $red;
    }
  }
  .form__textarea {
    height: vw(146px, 1920px);
    @include media(1440px) {
      height: vw(146px);
    }
    @include media(767px) {
      height: 124px;
      margin-bottom: 20px;
    }
    .input__field {
      resize: none;
      padding-top: 2vw;
      @include media(767px) {
        padding-top: 18px;
      }
      &:active,
      &:focus,
      &.not-empty {
        outline: none;
        & ~ .input__label {
          transform: translate(0, -180%);
          @include media(767px) {
            transform: translate(-50%, 0);
            font-size: 12px;
          }
        }
      }
    }
    .input__label {
      top: 2vw;
      left: 2vw;
      transform: translate(0, 0);
      @include media(767px) {
        left: 50%;
        transform: translate(-50%, 80%);
      }
    }
  }
}

.summary-section {
  &__form {
    padding: vw(127px, 1920px) vw(130px, 1920px) vw(127px, 1920px)
      vw(60px, 1920px);
    @include media(1440px) {
      padding: vw(127px) vw(130px) vw(127px) vw(60px);
    }
  }

  &__close {
    position: absolute;
    width: vw(63px, 1920px);
    height: vw(63px, 1920px);
    background-color: transparent;
    border: 1px solid #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    right: vw(40px, 1920px);
    top: vw(32px, 1920px);
    cursor: pointer;
    @include media(1440px) {
      width: vw(63px);
      height: vw(63px);
      right: vw(40px);
      top: vw(32px);
    }

    svg {
      width: vw(16px, 1920px);
      height: vw(16px, 1920px);
      fill: #ffffff;
      @include media(1440px) {
        width: vw(16px);
        height: vw(16px);
      }
    }
  }
}
</style>
