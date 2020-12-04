<template>
  <div class="page__wr">
    <section class="section section-contacts">
      <div class="container">
        <div class="section-header">{{ title }}</div>
        <div class="content">
          <div class="contact-info">
            <div class="contact-header">
              {{ literals.contact_headquarters_title.content }}
            </div>
            <div class="contact-address" v-html="contacts.address"></div>
            <a
              v-for="(item, index) in contacts.phones"
              :key="index"
              :href="`tel:${item}`"
              class="contact-phone"
              >{{ item }}</a
            >
            <a
              v-for="(item, index) in contacts.emails"
              :key="index + 1"
              :href="`mailto:${item}`"
              class="contact-mail"
              >{{ item }}</a
            >
          </div>
          <div class="contact-form">
            <div class="contact-header">
              {{ literals.contact_feedback_form_title.content }}
            </div>
            <form class="form" @submit.prevent="validateForm">
              <div
                class="input__wr"
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
                <label for="name" class="input__label">{{
                  literals.contact_form_name_placeholder.content
                }}</label>
                <div class="input__error">
                  {{ literals.contact_form_validation_name.content }}
                </div>
              </div>

              <div
                class="input__wr"
                :class="[
                  { 'has-warning': attemptSubmit && wrongNumber },
                  { focus: phone.focus }
                ]"
              >
                <client-only>
                  <vue-tel-input
                    v-model="phone.value"
                    :class="{ 'not-empty': phone }"
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
                  >{{ literals.contact_form_phone_placeholder.content }}</label
                >
                <div class="input__error tel">
                  {{ literals.contact_form_validation_phone.content }}
                </div>
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
                <label for="request" class="input__label">{{
                  literals.contact_form_message_placeholder.content
                }}</label>
                <div class="input__error"></div>
              </div>
              <Button
                btn-type="red"
                :btn-text="literals.contact_form_button_submit_text.content"
                :class="{ 'non-active': missingName || wrongNumber }"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
    <Map :lat="contacts.latitude" :lng="contacts.longitude" />
  </div>
</template>

<script>
import Button from '~/components/ui/btn/btn';
import Map from '~/components/map/map-section';

export default {
  components: { Button, Map },
  async asyncData({ $axios, $config: { baseAPI } }) {
    const response = await $axios.$get(`${baseAPI}/contacts`);
    return {
      title: response.title,
      contacts: response.contacts,
      literals: response.literals
    };
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
        valid: null,
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
    wrongNumber() {
      return this.phone.value.length < 15 || !this.phone.valid;
    },
    contactsL() {
      return this.literals;
    }
  },
  mounted() {
    this.$nuxt.$on('openThankPopup', () => {
      this.clearForm();
    });
  },
  methods: {
    async validateForm(e) {
      this.attemptSubmit = true;
      if (this.missingName || this.wrongNumber) {
        e.preventDefault();
      } else {
        const formData = {
          name: this.name.value,
          phone: this.phone.value,
          message: this.message,
          form_type: 'contact_us_form',
          from_page: 'contacts'
        };

        const _this = this;

        await this.$axios
          .post(`${this.$config.baseAPI}/feedback/contact`, formData)
          .then((response) => {
            // console.log(response);
            if (response) _this.$nuxt.$emit('openThankPopup', { isOpen: true });
          })
          .catch(function (error) {
            _this.$nuxt.$emit('openThankPopup', {
              isOpen: false,
              message: error
            });
            // console.error(error);
          });
      }

      this.attemptSubmit = false;
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
    }
  }
};
</script>
<style lang="scss" scoped>
.page__wr {
  padding-top: 90px;
  overflow: visible;
  position: relative;
  @include media(767px) {
    padding-top: 80px;
  }
}
.section-contacts {
  padding-top: vw(55px);
  @include media(767px) {
    padding-top: 48px;
  }

  .form {
    width: vw(536px);
    @include media(767px) {
      width: 100%;
    }
  }
  .form__textarea {
    height: 12vw;
    padding-top: 2vw;
    @include media(767px) {
      height: 152px;
      margin-bottom: 32px;
    }
    .input__field {
      resize: none;
      // padding-top: 2vw;
      @include media(767px) {
        padding-top: 22px;
      }
      &:active,
      &:focus,
      &.not-empty {
        outline: none;
        & ~ .input__label {
          transform: translate(0, -200%);
          @include media(767px) {
            transform: translate(0, -150%);
          }
        }
      }
    }
    .input__label {
      top: 2vw;
      left: 2vw;
      transform: translate(0, 0);
      @include media(767px) {
        top: 22px;
        left: 26px;
      }
    }
  }
  .section-header {
    margin-bottom: vw(89px, 1440px);
    font-family: $font-2b;
    font-style: normal;
    font-weight: bold;
    font-size: vw(48px);
    line-height: 1;
    text-transform: uppercase;
    color: #0d314f;
    @include media(767px) {
      font-size: 32px;
      line-height: 1.25;
      margin-bottom: 32px;
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    @include media(767px) {
      flex-direction: column;
    }
  }
  .contact-header {
    font-family: $font-2b;
    font-style: normal;
    font-weight: bold;
    font-size: vw(28px);
    line-height: 1.36;
    text-transform: uppercase;
    color: #041c30;
    margin-bottom: 49px;
    @include media(767px) {
      margin-bottom: 20px;
      font-size: 24px;
      line-height: 1.25;
    }
  }
  .contact-info {
    width: 40%;
    font-family: $font-1r;
    font-style: normal;
    font-weight: normal;
    font-size: vw(24px);
    line-height: 1.41;
    color: #041c30;
    @include media(767px) {
      width: 100%;
      font-size: 20px;
      line-height: 1.25;
      margin-bottom: 64px;
    }
  }
  .contact-form {
    width: 60%;
    @include media(767px) {
      width: 100%;
    }
  }
  .contact-address {
    margin-bottom: 48px;
    @include media(767px) {
      margin-bottom: 32px;
    }
  }
  .contact-phone {
    margin-bottom: 48px;
    display: inline-block;
    @include media(767px) {
      margin-bottom: 20px;
    }
  }
  .contact-mail {
    color: $red;
    display: block;
  }
}
</style>
<style lang="scss">
.section-contacts {
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
