<template>
  <section class="section accordion">
    <div class="container">
      <div class="accordion-list">
        <div
          v-for="(vacancy, index) in getVacancies"
          :key="vacancy.id"
          :class="{ open: vacancy.open }"
          class="accordion-item gsapBottomAccordion"
          :data-delay="0.2 * index"
        >
          <div class="accordion-top" @click="changeVisible(index)">
            <div class="accordion-title">{{ vacancy.title }}</div>
            <div class="accordion-date">{{ vacancy.created_at }}</div>
            <div class="accordion-icon"></div>
          </div>
          <div v-show="vacancy.open" class="accordion-block">
            <div class="accordion-block-subtitle">
              {{ vacancy.description }}
            </div>
            <AccordionComponent :items="vacancy.components" />
            <div class="accordion-link">
              <div class="accordion-link-text">
                {{ vacancy.btn_send_cv_text }}
              </div>
              <a
                :href="`mailto:${vacancy.hr_email}`"
                class="accordion-link-email"
              >
                {{ vacancy.hr_email }}
              </a>
              <div class="accordion-link-copy" @click="copyLink(index)">
                <CopyIcon />
                <input
                  class="copy-input"
                  type="text"
                  :value="vacancy.hr_email"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AccordionComponent from '~/components/careers-accordion/accordion-component';
import CopyIcon from '~/assets/images/icons/copy.svg';
export default {
  components: {
    AccordionComponent,
    CopyIcon
  },
  props: {
    vacancies: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    getVacancies() {
      return this.vacancies;
    }
  },
  mounted() {
    setTimeout(() => {
      this.gsapTranslate();
    }, 500);
  },
  methods: {
    changeVisible(index) {
      let open = false;
      this.vacancies.map((item, itemIndex) => {
        if (index === itemIndex) {
          item.open = !item.open;
          open = item.open;
        } else {
          item.open = false;
        }
      });
      setTimeout(() => {
        if (open) {
          const item = document.getElementsByClassName('accordion-item')[index];
          const currentScroll = document.documentElement.scrollTop;
          const blockPosition = item.getBoundingClientRect().top;
          this.$nuxt.$emit('scrollTop');
          window.scrollTo({
            top: blockPosition + currentScroll,
            left: 0
          });
        }
      });
    },
    copyLink(index) {
      const currentInput = document.getElementsByClassName('copy-input');
      document.execCommand('copy', false, currentInput[index].select());
    },
    gsapTranslate() {
      Array.from(document.querySelectorAll('.gsapBottomAccordion')).forEach(
        (item) => {
          const delay = item.dataset.delay || 0;
          const duration = item.dataset.duration || 0.8;
          const hook = item.dataset.hook || 1;
          const scene = this.$scrollmagic
            .scene({
              offset: -100,
              triggerElement: item,
              triggerHook: hook,
              duration: 0,
              reverse: false
            })
            .setTween(item, duration, {
              delay,
              transform: 'translate(0, 0)',
              opacity: 1,
              overwrite: false,
              lazy: true
            });
          this.$scrollmagic.addScene(scene);
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.accordion {
  &-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: vw(34px) vw(30px) vw(34px) 0;
    cursor: pointer;
    @include media(767px) {
      padding: 32px 0;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
    &:hover {
      .accordion-title {
        color: $red;
      }
    }
  }
  &-title {
    font-family: $font-2b;
    font-size: vw(28px);
    line-height: 1.25;
    transition: color 0.5s ease;
    @include media(767px) {
      font-size: 24px;
      width: calc(100% - 30px);
      margin-right: 6px;
    }
  }
  &-date {
    margin-left: auto;
    color: $gray;
    font-size: vw(14px);
    margin-right: vw(97px);
    @include media(767px) {
      order: 1;
      margin: 4px 0 0;
      font-size: 12px;
      line-height: 1.17;
    }
  }
  &-icon {
    width: vw(24px);
    height: vw(24px);
    position: relative;
    @include media(767px) {
      width: 24px;
      height: 24px;
    }
    &:before {
      content: '';
      width: 100%;
      height: 2px;
      background: $red;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      position: absolute;
      transition: all 0.5s ease;
    }
    &:after {
      content: '';
      height: 100%;
      width: 2px;
      background: $red;
      top: 0;
      left: 50%;
      position: absolute;
      transform: translateX(-50%) rotate(0deg);
      transition: all 0.5s ease;
    }
  }
  &-item {
    border-bottom: 1px solid #f5f5f5;
    &:first-child {
      border-top: 1px solid #f5f5f5;
    }
    &.open {
      .accordion-icon:after {
        transform: translateX(-50%) rotate(90deg);
        background: #003152;
      }
      .accordion-icon:before {
        background: #003152;
      }
      .accordion-title {
        color: $red;
      }
    }
  }
  &-block {
    margin-top: vw(22px);
    overflow: hidden;
    @include media(767px) {
      margin-top: 2px;
    }
    &-subtitle {
      font-size: vw(18px);
      line-height: 1.3;
      margin-bottom: vw(48px);
      @include media(767px) {
        font-size: 14px;
        line-height: 1.5;
        margin-bottom: 20px;
      }
    }
  }
  &-link {
    background: #f9fafa;
    min-height: vw(146px);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: vw(40px);
    font-size: vw(30px);
    font-family: $font-2b;
    padding: vw(32px);
    @include media(767px) {
      margin-bottom: 32px;
      font-size: 20px;
      line-height: 1.25;
      flex-wrap: wrap;
      padding: 32px;
      min-height: auto;
    }
    &-email {
      margin-left: vw(16px);
      color: $red;
      @include media(767px) {
        margin: 0;
      }
    }
    &-text {
      @include media(767px) {
        width: 100%;
        margin-bottom: 24px;
        text-align: center;
      }
    }
    &-copy {
      padding: vw(8px);
      width: vw(15px);
      height: vw(17px);
      margin-left: vw(8px);
      box-sizing: content-box;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      @include media(767px) {
        width: 15px;
        height: 17px;
        margin-left: 8px;
      }
      svg {
        height: 100%;
        width: 100%;
      }
    }
    .copy-input {
      position: absolute;
      pointer-events: none;
      opacity: 0;
    }
  }
}
@keyframes accordeonAni {
  0% {
    max-height: 0;
  }
}
.faq-fade {
  &-enter {
    max-height: 0;
    display: block;
  }
  &-enter-active {
    animation: accordeonAni 500ms ease-out;
    overflow: hidden;
  }
  &-leave {
    display: block;
  }
  &-leave-to {
    display: block;
  }
  &-leave-active {
    animation: accordeonAni 500ms ease-out;
    animation-direction: reverse;
    overflow: hidden;
  }
}
.gsapBottomAccordion {
  opacity: 0;
  transform: translateY(100px);
}
</style>
