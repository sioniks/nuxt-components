<template>
  <div class="summary__wr">
    <div class="summary__view">
      <img
        :src="require('~/assets/images/summary-bitmap.png')"
        alt="bitmap"
        class="summary__bitmap"
      />
      <img
        v-if="getBusImg.frontImg && busSide === 'front'"
        :src="getBusImg.frontImg.url || ''"
        :alt="getBusImg.frontImg.custom_properties.seo_alt || ''"
        class="summary__bus"
      />
      <img
        v-if="getBusImg.backImg && busSide === 'back'"
        :src="getBusImg.backImg.url || ''"
        :alt="getBusImg.backImg.custom_properties.seo_alt || ''"
        class="summary__bus"
      />
      <img
        :src="require('~/assets/images/summary-person.png')"
        alt="butmap person"
        class="summary__person"
      />
      <div
        v-if="getBusImg.frontImg && getBusImg.backImg"
        class="summary__view-toggle"
      >
        <span
          :class="{ 'summary__view--active': busSide === 'front' }"
          @click="busSide = 'front'"
        >
          Front view
        </span>
        <span class="red"> / </span>
        <span
          :class="{ 'summary__view--active': busSide === 'back' }"
          @click="busSide = 'back'"
        >
          Back view
        </span>
      </div>
    </div>
    <div class="container">
      <SummaryTotal :summary="summaryItemsTotal" />
      <div class="summary__buttons">
        <BtnDefault text="Find Dealers" type="red" :upper="true">
          <template #icon>
            <Find />
          </template>
        </BtnDefault>
        <BtnDefault text="Request a Quote" @click="openContactPopup">
          <template #icon>
            <Request />
          </template>
        </BtnDefault>
        <BtnDefault text="Keep Your Configuration" @click="toPdf">
          <template #icon>
            <Keep />
          </template>
        </BtnDefault>
        <BtnDefault text="Share Your Configuration" @click="$emit('share')">
          <template #icon>
            <Share />
          </template>
        </BtnDefault>
      </div>
    </div>
    <Tourism />
    <div v-if="getSummaryComponents.length">
      <div v-for="(comp, index) in getSummaryComponents" :key="index">
        <template v-if="comp.type === 'two_card'">
          <Ownership
            :block="comp"
            :is-tablet="isTablet"
            :is-mobile="isMobile"
          />
        </template>
        <template v-if="comp.type === 'contact_us'">
          <transition name="fade">
            <Contacts
              v-if="contactPopupOpened"
              :block="comp"
              :is-tablet="isTablet"
              :is-mobile="isMobile"
              class="summary__contacts"
              @close-popup="closeContactsPopup"
            />
          </transition>
          <div
            v-if="contactPopupOpened"
            class="summary__contacts-overlay"
            @click="closeContactsPopup"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import JsPDF from 'jspdf';
import { mapGetters, mapState } from 'vuex';
import SummaryTotal from '~/components/configurator/summary-total';
import Ownership from '~/components/sections/ownership-section';
import Tourism from '~/components/configurator/tourism';
import BtnDefault from '~/components/ui/configurator/buttons/btn-default';
import Find from '~/assets/images/icons/find-dealer.svg';
import Request from '~/assets/images/icons/request.svg';
import Keep from '~/assets/images/icons/keep.svg';
import Share from '~/assets/images/icons/share.svg';
import Contacts from '~/components/configurator/contacts.vue';
export default {
  components: {
    SummaryTotal,
    Ownership,
    Tourism,
    BtnDefault,
    Find,
    Request,
    Keep,
    Share,
    Contacts
  },
  props: {
    step: {
      type: String,
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
      contactPopupOpened: false,
      busSide: 'front'
    };
  },
  computed: {
    ...mapGetters('configurator', [
      'summaryItemsTotal',
      'getBusImg',
      'getSummaryComponents'
    ]),
    ...mapState('configurator', ['items'])
  },
  watch: {
    contactPopupOpened(val) {
      if (val) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  },
  methods: {
    openContactPopup() {
      this.contactPopupOpened = true;
    },
    closeContactsPopup() {
      this.contactPopupOpened = false;
    },
    toPdf() {
      const pdf = new JsPDF('p', 'pt', 'a4');
      const pdfEl = document.querySelector('.pdf');
      pdf.html(pdfEl, {
        callback: (pdf) => {
          pdf.save('  Build.pdf');
        }
      });
    }
  }
};
</script>
<style lang="scss">
.summary {
  &__view {
    width: 100%;
    position: relative;
    height: vw(550px, 1920px);
    @include media(1440px) {
      height: vw(550px);
    }
    @include media(767px) {
      height: 72vw;
    }
    &-toggle {
      display: block;
      position: absolute;
      bottom: vw(43px, 1920px);
      left: 50%;
      transform: translateX(-50%);
      @include media(1440px) {
        bottom: vw(43px);
      }
      @include media(767px) {
        bottom: 30px;
      }
      span {
        font-family: $font-acumin-b;
        color: #d1d1d1;
        font-size: vw(14px, 1920px);
        line-height: vw(16px, 1920px);
        transition: color 0.5s ease;
        cursor: pointer;
        @include media(1440px) {
          font-size: vw(14px);
          line-height: vw(16px);
        }
        @include media(767px) {
          font-size: 16px;
          line-height: 1;
        }
        &.red {
          color: $red;
          pointer-events: none;
        }

        &.summary__view--active {
          color: $red;
        }
      }
    }
  }

  &__bitmap {
    width: 100%;
    height: auto;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    @include media(767px) {
      width: 250%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &__bus {
    position: absolute;
    bottom: vw(87px, 1920px);
    left: vw(652px, 1920px);
    width: vw(676px, 1920px);
    z-index: 1;
    @include media(1440px) {
      bottom: vw(87px);
      left: vw(380px);
      width: vw(676px);
    }
    @include media(767px) {
      width: calc(100% - 40px);
      left: 20px;
      bottom: 64px;
    }
  }

  &__person {
    position: absolute;
    bottom: vw(100px, 1920px);
    left: vw(593px, 1920px);
    width: vw(134px, 1920px);
    z-index: 2;
    @include media(1440px) {
      bottom: vw(100px);
      left: vw(323px);
      width: vw(134px);
    }
    @include media(767px) {
      width: 17.5vw;
      height: auto;
      left: 22px;
      bottom: 75px;
    }
  }

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: vw(156px, 1920px);
    @include media(1440px) {
      margin-bottom: vw(156px);
    }
    @include media(767px) {
      margin-bottom: 56px;
      flex-direction: column;
    }

    button {
      width: vw(400px, 1920px);
      @include media(1440px) {
        width: vw(312px);
      }
      @include media(767px) {
        width: 100%;
        margin-bottom: 24px;
        height: 60px;
        line-height: 60px;
        font-size: 16px;
        &:last-child {
          margin-bottom: 0;
        }
        svg {
          margin-right: 20px;
        }
      }
    }
  }

  &__contacts {
    &.section__form {
      position: fixed;
      z-index: 999;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    &-overlay {
      position: fixed;
      z-index: 998;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }

  &__wr {
    .section__ovnership {
      .section__header {
        font-size: vw(48px, 1920px);
        line-height: vw(61px, 1920px);
        @include media(1440px) {
          font-size: vw(48px);
          line-height: vw(61px);
        }
        @include media(767px) {
          width: 100%;
          margin-bottom: 24px;
          font-size: 32px;
        }
      }
      .section__top {
        margin-bottom: vw(80px, 1920px);
        @include media(1440px) {
          margin-bottom: vw(80px);
        }
        @include media(1200px) {
          margin-bottom: 40px;
        }
        @include media(767px) {
          flex-direction: column;
          margin-bottom: 35px;
        }
      }
      .description {
        font-size: vw(22px, 1920px);
        @include media(1440px) {
          font-size: vw(22px);
        }
        @include media(1200px) {
          font-size: 14px;
        }
        @include media(767px) {
          font-size: 16px;
          line-height: 1.2;
        }
      }
      .option {
        padding: vw(40px, 1920px) vw(60px, 1920px) vw(135px, 1920px);
        @include media(1440px) {
          padding: vw(40px) vw(60px) vw(135px);
        }
        @include media(1200px) {
          padding: 20px 32px 32px;
        }
        @include media(767px) {
          padding: 20px 32px;
        }
      }
      .option__title {
        font-size: vw(32px, 1920px);
        margin-bottom: vw(16px, 1920px);
        @include media(1440px) {
          font-size: vw(32px);
          margin-bottom: vw(16px);
        }
        @include media(1200px) {
          margin-bottom: 10px;
          font-size: 18px;
        }
        @include media(767px) {
          margin: 0;
          font-size: 24px;
        }
      }
      .option__text {
        font-size: vw(16px, 1920px);
        @include media(1440px) {
          font-size: vw(16px);
        }
        @include media(1200px) {
          font-size: 12px;
        }
        @include media(767px) {
          font-size: 16px;
        }
      }
      .btn.red {
        left: vw(60px, 1920px);
        bottom: vw(48px, 1920px);
        min-width: vw(268px, 1920px);
        height: vw(60px, 1920px);
        line-height: vw(60px, 1920px);
        padding: 0;
        font-size: vw(16px, 1920px);
        @include media(1440px) {
          left: vw(60px);
          bottom: vw(48px);
          min-width: vw(268px);
          height: vw(60px);
          line-height: vw(60px);
          font-size: vw(16px);
        }
        @include media(1200px) {
          position: static;
          line-height: 56px;
          height: 56px;
          min-width: 180px;
          font-size: 14px;
          padding: 0 2.5vw;
        }
        @include media(767px) {
          min-width: 100%;
        }
        .svg-icon {
          height: vw(12px, 1920px);
          width: vw(12px, 1920px);
          @include media(1440px) {
            height: vw(12px);
            width: vw(12px);
          }
          @include media(1200px) {
            width: 12px !important;
            height: 12px !important;
          }
        }
      }
    }
  }
}

.fade-leave-active,
.fade-enter-active {
  transition: all 0.5s ease;
}
.fade-leave,
.fade-enter-to {
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
