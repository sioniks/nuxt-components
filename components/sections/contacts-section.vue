<template>
  <section class="section section__form">
    <div class="container">
      <div class="form__content">
        <div class="form__desc">
          <div class="gsapLeft">
            <div class="section__header" v-html="block.title"></div>
          </div>
          <div v-if="!isMobile" class="form__desc-text gsapLeft">
            <div class="" v-html="block.text"></div>
            <!-- <a href="/" class="form__desc-link">Privacy Policy</a> -->
          </div>
        </div>
        <form class="form" @submit.prevent="validateForm">
          <div
            class="input__wr gsapBottom"
            :class="[
              { 'has-warning': attemptSubmit && missingName },
              { focus: name.focus }
            ]"
          >
            <input
              id="form__name"
              v-model="name.value"
              type="text"
              name="name"
              class="input__field"
              maxlength="50"
              :class="{ 'not-empty': name.value }"
              @focus="name.focus = true"
              @blur="name.focus = false"
            />
            <label for="name" class="input__label">Your name</label>
            <div class="input__error">Test error</div>
          </div>
          <div
            class="input__wr gsapBottom"
            :class="[
              { 'has-warning': attemptSubmit && missingMail },
              { focus: mail.focus }
            ]"
          >
            <input
              id="form__mail"
              v-model="mail.value"
              name="mail"
              class="input__field"
              :class="{ 'not-empty': mail.value }"
              @focus="activeMailInput"
              @blur="activeMailInput"
              @validate="validationMail"
            />
            <label for="mail" class="input__label">Email</label>
            <div class="input__error">Test error</div>
          </div>
          <div
            class="input__wr gsapBottom"
            :class="[
              { 'has-warning': attemptSubmit && wrongNumber },
              { focus: phone.focus }
            ]"
          >
            <client-only>
              <vue-tel-input
                v-model="phone.value"
                :class="{ 'not-empty': phone.value }"
                v-bind="bindProps"
                @focus="activePhoneInput"
                @blur="activePhoneInput"
                @validate="validationPhone"
              ></vue-tel-input>
            </client-only>
            <label
              for="tel"
              class="input__label tel"
              :class="[{ anim: anim }, { 'not-empty': phone.value }]"
              >Phone</label
            >
            <div class="input__error tel">Test error</div>
          </div>
          <div class="input__wr form__textarea gsapBottom">
            <textarea
              id="form__request"
              v-model="message"
              type="textarea"
              name="request"
              class="input__field"
              :class="{ 'not-empty': message }"
            />
            <label for="request" class="input__label">Message</label>
            <div class="input__error">Test error</div>
          </div>
          <Button
            btn-type="red"
            :btn-text="block.submit_btn_text"
            class="gsapBottom"
            :class="{ 'non-active': missingName || wrongNumber }"
          />
        </form>
        <div v-if="isMobile" class="form__desc-text gsapBottom">
          <div class="" v-html="block.text"></div>
          <!-- <a href="/" class="form__desc-link">Privacy Policy</a> -->
        </div>
      </div>
    </div>
    <Curve1 v-if="!isTablet" class="curve1" />
    <Curve2 v-if="!isTablet" class="curve2" />
  </section>
</template>

<script>
import Button from '~/components/ui/btn/btn';
import Curve1 from '~/assets/images/curve13.svg';
import Curve2 from '~/assets/images/curve14.svg';

export default {
  components: { Button, Curve1, Curve2 },
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
      anim: false,
      attemptSubmit: false,
      name: {
        value: '',
        focus: false
      },
      phone: {
        value: '',
        valid: false,
        focus: false
      },
      mail: {
        value: '',
        valid: false,
        focus: false
      },
      message: '',
      bindProps: {
        mode: 'international',
        defaultCountry: 'UA',
        disabledFetchingCountry: false,
        disabled: false,
        disabledFormatting: false,
        placeholder: '',
        required: false,
        enabledCountryCode: false,
        enabledFlags: true,
        preferredCountries: ['ua'],
        onlyCountries: [],
        ignoredCountries: [],
        autocomplete: 'on',
        name: 'phone',
        maxLen: 13,
        wrapperClasses: '',
        inputClasses: '',
        dropdownOptions: {
          disabledDialCode: true
        },
        inputOptions: {
          showDialCode: false
        },
        validCharactersOnly: true
      }
    };
  },
  computed: {
    missingName() {
      return this.name.value === '';
    },
    missingMail() {
      return this.mail.value === '' || !this.mail.valid;
    },
    wrongNumber() {
      return this.phone.value.length < 15 || !this.phone.valid;
    }
  },
  mounted() {
    this.$nextTick(() => this.gsapTranslateForm());
    this.$nuxt.$on('openThankPopup', () => {
      this.clearForm();
    });
  },
  methods: {
    gsapTranslateForm() {
      Array.from(
        this.$el.querySelectorAll(
          '.gsapOpacity, .gsapTop, .gsapBottom, .gsapLeft, .gsapRight'
        )
      ).forEach((item) => {
        const delay = +item.dataset.delay || 0;
        const duration = +item.dataset.duration || 0.8;
        const hook = item.dataset.hook || 0.6;
        const transform = item.dataset.transform || 'translate(0, 0)';
        const scene = this.$scrollmagic
          .scene({
            triggerElement: item,
            triggerHook: Number(hook),
            duration: 0,
            reverse: false
          })
          .setTween(item, duration, {
            delay,
            transform,
            opacity: 1,
            overwrite: false,
            lazy: true
          });
        // .addIndicators();
        this.$scrollmagic.addScene(scene);
      });
    },
    async validateForm(e) {
      this.validationMail();
      this.attemptSubmit = true;
      if (!this.missingName || !this.wrongNumber || !this.missingMail) {
        const formData = {
          name: this.name.value,
          phone: this.phone.value,
          message: this.message,
          form_type: 'contact_us_form',
          from_page: 'home_page',
          id: this.block.id
        };

        const _this = this;

        await this.$axios
          .post(`${this.$config.baseAPI}/feedback`, formData)
          .then((response) => {
            if (response) _this.$nuxt.$emit('openThankPopup', { isOpen: true });
          })
          .catch(function (error) {
            _this.$nuxt.$emit('openThankPopup', {
              isOpen: false,
              message: error
            });
          });
      }
      setTimeout(() => {
        this.attemptSubmit = false;
      }, 4000);
    },
    clearForm() {
      this.name.value = '';
      this.phone.value = '';
      this.phone.valid = false;
      this.message = '';
      this.$route.query = {};
    },
    activePhoneInput() {
      this.anim = !this.anim;
      this.phone.focus = !this.phone.focus;
    },
    validationPhone(e) {
      this.phone.valid = e.valid;

      if (e.valid) {
        this.phone.value = e.number.input;
      }
    },
    activeMailInput() {
      this.mail.focus = !this.mail.focus;
    },
    validationMail() {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.mail.valid = re.test(this.mail.value);
    }
  }
};
</script>

<style lang="scss">
.section__form {
  overflow: hidden;
  background: #041c30;
  padding: vw(80px) 0;
  @include media(767px) {
    padding: 56px 0;
  }
  .section__header {
    margin-bottom: 1em;
    color: #ffffff;
    text-transform: uppercase;
    text-align: left;
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
  .curve1 {
    position: absolute;
    z-index: 0;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: vw(717px);
    height: vw(492px);
  }
  .curve2 {
    position: absolute;
    z-index: 0;
    bottom: 0;
    left: 0;
    width: vw(716px);
    height: vw(443px);
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
    width: vw(400px);
    margin-right: vw(160px);
    @include media(767px) {
      width: 100%;
      margin: 0 0 45px;
    }
  }
  .form__desc-text {
    font-size: vw(18px);
    line-height: 1.5;
    color: #818d97;
    @include media(767px) {
      width: 100%;
      margin: 40px 0 0;
      font-size: 12px;
    }
    a {
      font-size: vw(18px);
      line-height: 1.5;
      color: $red;
      @include media(767px) {
        font-size: 12px;
      }
      &:hover {
        color: #ffffff;
      }
    }
  }
  .form {
    width: vw(496px);
    @include media(767px) {
      width: 100%;
    }
  }

  .vue-tel-input {
    height: 100%;
    padding-left: 0;
    border: none !important;
    box-shadow: none !important;
  }
  .vti__dropdown-list.below {
    width: vw(536px);
    z-index: 5;
    top: 100%;
    @include media(767px) {
      width: calc(100vw - 64px);
    }
  }
  .vti__dropdown-item {
    padding: 10px 15px;
  }
  .vti__dropdown {
    border: none;
    outline: none;
    box-shadow: none;
    border-radius: 0;
    border-right: 1.2px solid #dbdbdb;
  }
  .vti__dropdown.open {
    background: #ffffff;
    border: none;
    border-right: 1.2px solid #dbdbdb;
    outline: none;
    box-shadow: none;
  }
  .input__wr {
    position: relative;
    height: vw(64px);
    width: 100%;
    background: #ffffff;
    margin-bottom: vw(20px);
    border: 1.2px solid #dbdbdb;
    @include media(767px) {
      height: 60px;
      margin-bottom: 24px;
    }
    &.has-warning {
      .input__label {
        visibility: hidden;
        opacity: 0;
      }
      .input__error {
        visibility: visible;
        opacity: 1;
        &.tel {
          left: 65px;
        }
      }
    }
    &.has-warning.focus {
      .input__error {
        visibility: hidden;
        opacity: 0;
      }
    }
  }
  .input__label {
    width: fit-content;
    position: absolute;
    z-index: 2;
    font-size: vw(16px);
    color: #919ba2;
    top: 50%;
    left: vw(26px);
    transform: translate(0, -50%);
    transition: all 0.2s ease;
    pointer-events: none;
    @include media(767px) {
      font-size: 16px;
      left: 26px;
    }
    &.anim,
    &.not-empty {
      transform: translate(0, -220%);
      font-size: vw(12px);
      color: #bbc4cc;
      @include media(767px) {
        font-size: 12px;
        transform: translate(0, -200%);
      }
    }
    &.tel {
      left: 65px;
    }
  }
  .input__field,
  .vti__input {
    font-family: $font-1r;
    width: 100%;
    height: 100%;
    padding-left: vw(26px);
    font-size: vw(16px);
    line-height: vw(19px);
    color: #041c30;
    outline: none;
    border: none;
    @include media(767px) {
      font-size: 16px;
      padding: 0 26px;
      line-height: 19px;
    }
    &:active,
    &:focus,
    &.not-empty {
      border: none;
      outline: none;
      & ~ .input__label {
        transform: translate(0, -220%);
        font-size: vw(12px);
        color: #bbc4cc;
        @include media(767px) {
          font-size: 12px;
          transform: translate(0, -200%);
        }
      }
    }
  }

  .vue-tel-input.not-empty input {
    padding-left: 8px;
  }

  .form__textarea {
    height: 12vw;
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
          transform: translate(0, -200%);
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
  .input__error {
    visibility: hidden;
    opacity: 0;
    font-family: $font-1r;
    color: $red;
    width: fit-content;
    position: absolute;
    z-index: 2;
    top: 50%;
    left: vw(26px);
    transform: translate(0, -220%);
    transition: all 0.2s ease;
    pointer-events: none;
    font-style: normal;
    font-weight: normal;
    font-size: vw(12px);
    line-height: 1.2;
  }
  .btn {
    width: vw(232px);
    color: #ffffff;
    @include media(767px) {
      width: 100%;
      height: 60px;
      line-height: 60px;
      font-size: 18px;
    }
    &.non-active {
      // pointer-events: none;
      background: #dbdbdb;
    }
  }
}
</style>
