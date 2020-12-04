<template>
  <section class="become-list">
    <template v-if="block">
      <div class="become-list-item">
        <div
          class="become-list-overlay gsapHeightBecomeList"
          data-delay="0.3"
        ></div>
        <div class="become-list-number gsapBottomBecomeList">01</div>
        <div
          class="become-list-title gsapBottomBecomeList"
          v-html="block.first_title"
        ></div>
        <a
          :href="block.first_btn_link"
          target="_blank"
          class="become-list-link gsapBottomBecomeList"
        >
          <IconEye />
          {{ block.first_btn_title }}
        </a>
      </div>
      <div class="become-list-item">
        <div
          class="become-list-overlay gsapHeightBecomeList"
          data-delay="0.5"
        ></div>
        <div class="become-list-number gsapBottomBecomeList">02</div>
        <div
          class="become-list-title gsapBottomBecomeList"
          v-html="block.second_title"
        ></div>
        <a
          :href="block.blank_form.url"
          download
          class="become-list-link gsapBottomBecomeList"
        >
          <LoadIcon />
          {{ block.second_btn_title }}
        </a>
      </div>
      <div class="become-list-item">
        <div
          class="become-list-overlay gsapHeightBecomeList"
          data-delay="0.7"
        ></div>
        <div class="become-list-number gsapBottomBecomeList">03</div>
        <div class="become-list-title gsapBottomBecomeList">
          <span v-html="block.third_title"></span>
          <a href="">{{ block.third_email }}</a>
        </div>
      </div>
      <div class="become-list-item">
        <div
          class="become-list-overlay gsapHeightBecomeList"
          data-delay="0.9"
        ></div>
        <div class="become-list-number gsapBottomBecomeList">04</div>
        <div
          class="become-list-title gsapBottomBecomeList"
          v-html="block.forth_title"
        ></div>
      </div>
    </template>
    <!--    remove down code when api done-->
    <template v-else>
      <div class="become-list-item">
        <div class="become-list-number">01</div>
        <div class="become-list-title">
          Look at an example of the filled form
        </div>
        <a href="" class="become-list-link">
          <IconEye />
          Look at example
        </a>
      </div>
      <div class="become-list-item">
        <div class="become-list-number">02</div>
        <div class="become-list-title">
          Download a blank form and fill it out
        </div>
        <a href="" class="become-list-link">
          <LoadIcon />
          Download blank form
        </a>
      </div>
      <div class="become-list-item">
        <div class="become-list-number">03</div>
        <div class="become-list-title">
          Send filled form to <a href="">dealer@ .eu</a> or upload here
        </div>
      </div>
      <div class="become-list-item">
        <div class="become-list-number">04</div>
        <div class="become-list-title">
          We will respond within 72 hours and contact you
        </div>
      </div>
    </template>
  </section>
</template>

<script>
import IconEye from '~/assets/images/icons/eye-icon.svg';
import LoadIcon from '~/assets/images/icons/load-icon.svg';
export default {
  components: {
    IconEye,
    LoadIcon
  },
  props: {
    block: {
      type: Object,
      default: null
    }
  },
  mounted() {
    setTimeout(() => {
      this.gsapTranslate();
      this.gsapHeight();
    }, 500);
  },
  methods: {
    gsapTranslate() {
      Array.from(document.querySelectorAll('.gsapBottomBecomeList')).forEach(
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
    },
    gsapHeight() {
      Array.from(document.querySelectorAll('.gsapHeightBecomeList')).forEach(
        (item) => {
          const delay = item.dataset.delay || 0;
          const duration = item.dataset.duration || 0.8;
          const hook = item.dataset.hook || 1;
          const scene = this.$scrollmagic
            .scene({
              offset: -100,
              triggerElement: item.parentNode,
              triggerHook: hook,
              duration: 0,
              reverse: false
            })
            .setTween(item, duration, {
              delay,
              height: '100%',
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
.become {
  &-list {
    display: flex;
    margin-top: vw(40px);
    @include media(767px) {
      flex-direction: column;
      margin-top: 0;
    }
    &-item {
      width: 100%;
      min-height: vw(402px);
      margin-right: vw(12px);
      padding: vw(48px) vw(60px) vw(50px);
      display: flex;
      flex-direction: column;
      position: relative;
      align-items: flex-start;
      &:last-child {
        margin-right: 0;
      }
      @include media(767px) {
        padding: 40px 32px 35px 32px;
        min-height: 272px;
        margin: 0 0 12px 0;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    &-overlay {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      background: #f9fafa;
      z-index: -1;
    }
    &-number {
      font-size: vw(56px);
      line-height: 1.17;
      color: #d2131c;
      margin-bottom: vw(20px);
      @include media(767px) {
        font-size: 36px;
        margin-bottom: 8px;
      }
    }
    &-title {
      font-size: vw(24px);
      line-height: 1.46;
      margin-bottom: vw(40px);
      @include media(767px) {
        font-size: 20px;
        line-height: 1.5;
        margin-bottom: 32px;
        br {
          display: none;
        }
      }
      a {
        color: $gray;
        &:hover {
          text-decoration: underline;
          color: $red;
        }
      }
    }
    &-link {
      margin-top: auto;
      font-size: vw(18px);
      font-family: $font-2b;
      transition: color 0.5s ease;
      @include media(767px) {
        font-size: 20px;
      }
      &:hover {
        color: $red;
      }
      svg {
        margin-right: 12px;
        height: vw(11px);
        width: auto;
        @include media(767px) {
          height: 12px;
          margin-right: 8px;
        }
      }
      &.upload {
        svg {
          transform: rotate(180deg);
        }
      }
    }
  }
}
.gsapBottomBecomeList {
  opacity: 0;
  transform: translateY(100px);
}
</style>
